# Punjab Laptop Sirsa — automated Supabase provisioning
# Requires: SUPABASE_ACCESS_TOKEN (Personal Access Token from dashboard/account/tokens)
# Usage:  $env:SUPABASE_ACCESS_TOKEN = "sbp_..."; .\scripts\setup-supabase.ps1

$ErrorActionPreference = "Stop"
$Root = Split-Path -Parent (Split-Path -Parent $MyInvocation.MyCommand.Path)
Set-Location $Root

if (-not $env:SUPABASE_ACCESS_TOKEN) {
  Write-Error "SUPABASE_ACCESS_TOKEN is not set. Create one at https://supabase.com/dashboard/account/tokens"
}

$ProjectName = "punjab-laptop-sirsa"
$Region = "ap-southeast-1"
$SchemaFile = Join-Path $Root "database\schema.sql"
$SeedFile = Join-Path $Root "database\seed.sql"
$VerifyFile = Join-Path $Root "database\verify.sql"

function Invoke-Supabase {
  param([string[]]$Args)
  $prev = $ErrorActionPreference
  $ErrorActionPreference = 'Continue'
  $out = & npx supabase @Args 2>&1 | ForEach-Object { "$_" }
  $code = $LASTEXITCODE
  $ErrorActionPreference = $prev
  if ($code -ne 0) { throw "supabase $($Args -join ' ') failed (exit $code): $($out -join "`n")" }
  return $out
}

Write-Host "==> Validating SQL files..."
foreach ($f in @($SchemaFile, $SeedFile)) {
  if (-not (Test-Path $f)) { throw "Missing $f" }
  $content = Get-Content $f -Raw
  if ($content.Length -lt 100) { throw "$f is too small" }
}
Write-Host "    schema.sql: $((Get-Item $SchemaFile).Length) bytes"
Write-Host "    seed.sql:   $((Get-Item $SeedFile).Length) bytes"

Write-Host "==> Logging in to Supabase CLI..."
Invoke-Supabase @("login", "--token", $env:SUPABASE_ACCESS_TOKEN) | Out-Null

Write-Host "==> Resolving organization..."
$orgsJson = Invoke-Supabase @("orgs", "list", "-o", "json") | Out-String
$orgs = $orgsJson | ConvertFrom-Json
if (-not $orgs -or $orgs.Count -eq 0) { throw "No Supabase organizations found on this account." }
$orgId = $orgs[0].id
Write-Host "    Using org: $($orgs[0].name) ($orgId)"

Write-Host "==> Looking for existing project '$ProjectName'..."
$projectsJson = Invoke-Supabase @("projects", "list", "-o", "json") | Out-String
$projects = $projectsJson | ConvertFrom-Json
$project = $projects | Where-Object { $_.name -eq $ProjectName } | Select-Object -First 1

$dbPassword = $null
if (-not $project) {
  Write-Host "==> Creating project (region: $Region)..."
  $dbPassword = -join ((48..57) + (65..90) + (97..122) | Get-Random -Count 24 | ForEach-Object { [char]$_ })
  $createOut = Invoke-Supabase @(
    "projects", "create", $ProjectName,
    "--org-id", $orgId,
    "--region", $Region,
    "--db-password", $dbPassword,
    "-o", "json"
  ) | Out-String
  $project = $createOut | ConvertFrom-Json
  Write-Host "    Project created. Waiting 90s for database to become ready..."
  Start-Sleep -Seconds 90
} else {
  Write-Host "    Found existing project ref: $($project.id)"
}

$ref = $project.id
if (-not $ref) { $ref = $project.ref }
if (-not $ref) { throw "Could not determine project ref." }

Write-Host "==> Linking project ref: $ref"
if ($dbPassword) {
  Invoke-Supabase @("link", "--project-ref", $ref, "--password", $dbPassword) | Out-Null
} else {
  if ($env:SUPABASE_DB_PASSWORD) {
    Invoke-Supabase @("link", "--project-ref", $ref, "--password", $env:SUPABASE_DB_PASSWORD) | Out-Null
  } else {
    Invoke-Supabase @("link", "--project-ref", $ref) | Out-Null
  }
}

Write-Host "==> Checking if schema already applied..."
$checkSql = "SELECT COUNT(*) AS n FROM information_schema.tables WHERE table_schema='public' AND table_name='products';"
$checkOut = Invoke-Supabase @("db", "query", $checkSql, "--linked", "-o", "json") | Out-String
$hasSchema = $false
try {
  $parsed = $checkOut | ConvertFrom-Json
  if ($parsed -and $parsed[0].n -gt 0) { $hasSchema = $true }
} catch { }

if (-not $hasSchema) {
  Write-Host "==> Applying schema.sql..."
  Invoke-Supabase @("db", "query", "--file", $SchemaFile, "--linked") | Out-Null
  Write-Host "==> Applying seed.sql..."
  Invoke-Supabase @("db", "query", "--file", $SeedFile, "--linked") | Out-Null
} else {
  Write-Host "    Schema already present - skipping schema/seed (idempotent guard)."
}

Write-Host "==> Running verification queries..."
@'
SELECT tablename, rowsecurity FROM pg_tables
WHERE schemaname='public' AND tablename IN (
  'admin_users','categories','brands','products','offers',
  'testimonials','blog_posts','contact_inquiries','banners'
) ORDER BY tablename;
'@ | Set-Content -Path $VerifyFile -Encoding UTF8
Invoke-Supabase @("db", "query", "--file", $VerifyFile, "--linked") | Write-Host

$adminSql = "SELECT email, role FROM admin_users WHERE email='admin@punjablaptopsirsa.com';"
Write-Host "==> Admin user:"
Invoke-Supabase @("db", "query", $adminSql, "--linked") | Write-Host

$countsSql = @"
SELECT 'categories' AS t, COUNT(*)::int AS c FROM categories
UNION ALL SELECT 'brands', COUNT(*)::int FROM brands
UNION ALL SELECT 'products', COUNT(*)::int FROM products
UNION ALL SELECT 'blog_posts', COUNT(*)::int FROM blog_posts;
"@
Write-Host "==> Row counts:"
Invoke-Supabase @("db", "query", $countsSql, "--linked") | Write-Host

Write-Host "==> Fetching API keys..."
$keysJson = Invoke-Supabase @("projects", "api-keys", "--project-ref", $ref, "-o", "json") | Out-String
$keys = $keysJson | ConvertFrom-Json

$anon = ($keys | Where-Object { $_.name -eq "anon" -or $_.type -eq "anon" }).api_key
$service = ($keys | Where-Object { $_.name -eq "service_role" -or $_.type -eq "service_role" }).api_key
if (-not $anon) { $anon = ($keys | Where-Object { $_.name -like "*anon*" } | Select-Object -First 1).api_key }
if (-not $service) { $service = ($keys | Where-Object { $_.name -like "*service*" } | Select-Object -First 1).api_key }

$supabaseUrl = "https://$ref.supabase.co"

Write-Host "==> Writing backend/.env and frontend/.env.local..."
$backendPath = Join-Path $Root "backend" | Join-Path -ChildPath ".env"
$frontendPath = Join-Path $Root "frontend" | Join-Path -ChildPath ".env.local"

$backendLines = @(
  "# Server",
  "PORT=5000",
  "NODE_ENV=development",
  "",
  "# Supabase (auto-provisioned)",
  "SUPABASE_URL=$supabaseUrl",
  "SUPABASE_SERVICE_KEY=$service",
  "",
  "# JWT",
  "JWT_SECRET=xNk0XoF7y1GXmVQDVZV3ePNleE04f-4HaoHBgHN91t9_-4wiIXUP9Xt6YakU5iRZ",
  "",
  "# Cloudinary",
  "CLOUDINARY_CLOUD_NAME=dtfiywaxm",
  "CLOUDINARY_API_KEY=",
  "CLOUDINARY_API_SECRET=",
  "CLOUDINARY_UPLOAD_PRESET=punjab_laptop_sirsa_admin",
  "CLOUDINARY_UPLOAD_FOLDER=punjab-laptop-sirsa",
  "",
  "# CORS",
  "CORS_ORIGIN=http://localhost:3000",
  ""
)
$backendLines | Set-Content -Path $backendPath -Encoding UTF8

$frontendLines = @(
  "NEXT_PUBLIC_API_URL=http://localhost:5000",
  "NEXT_PUBLIC_SUPABASE_URL=$supabaseUrl",
  "NEXT_PUBLIC_SUPABASE_ANON_KEY=$anon",
  "NEXT_PUBLIC_SITE_URL=https://punjablaptopsirsa.com",
  "NEXT_PUBLIC_WHATSAPP_NUMBER=919991020143",
  ""
)
$frontendLines | Set-Content -Path $frontendPath -Encoding UTF8

if ($dbPassword) {
  $credFile = Join-Path $Root "database" | Join-Path -ChildPath ".supabase-credentials.local.txt"
  $credLines = @(
    "# SAVE SECURELY - gitignored",
    "Project: $ProjectName",
    "Project ref: $ref",
    "URL: $supabaseUrl",
    "DB password: $dbPassword",
    ""
  )
  $credLines | Set-Content -Path $credFile -Encoding UTF8
  Write-Host "    DB password saved to database/.supabase-credentials.local.txt (gitignored)"
}

Write-Host ""
Write-Host "========================================"
Write-Host "  Supabase setup complete"
Write-Host "========================================"
Write-Host "  Project:  $ProjectName"
Write-Host "  Ref:      $ref"
Write-Host "  URL:      $supabaseUrl"
Write-Host "  Admin:    admin@punjablaptopsirsa.com / admin123 (CHANGE NOW)"
Write-Host "========================================"
