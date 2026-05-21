# Prints Render env checklist (values from local backend/.env — do not commit .env)
$envFile = Join-Path $PSScriptRoot "..\backend\.env"
if (-not (Test-Path $envFile)) {
  Write-Host "Missing backend/.env — copy from backend/.env.example and fill in." -ForegroundColor Red
  exit 1
}

$vars = @(
  "NODE_ENV=production",
  "PORT=5000",
  "SUPABASE_URL",
  "SUPABASE_SERVICE_KEY",
  "JWT_SECRET",
  "CLOUDINARY_CLOUD_NAME",
  "CLOUDINARY_API_KEY",
  "CLOUDINARY_API_SECRET",
  "CLOUDINARY_UPLOAD_PRESET",
  "CLOUDINARY_UPLOAD_FOLDER",
  "CORS_ORIGIN=https://punjab-laptop-website-4epm.vercel.app"
)

Write-Host "Render service: punjab-laptop-website (onrender.com)" -ForegroundColor Yellow
Write-Host "Dashboard: https://dashboard.render.com" -ForegroundColor Yellow
Write-Host ""
Write-Host "Set these in Environment (paste from backend/.env where noted):" -ForegroundColor Cyan

$content = Get-Content $envFile
foreach ($line in $content) {
  if ($line -match '^\s*#' -or $line -notmatch '=') { continue }
  $name = $line.Split('=', 2)[0].Trim()
  if ($vars -contains $name -or $name -eq 'NODE_ENV' -or $name -eq 'PORT') {
    $val = $line.Split('=', 2)[1].Trim()
    if ([string]::IsNullOrWhiteSpace($val)) {
      Write-Host "  [MISSING] $name" -ForegroundColor Red
    } else {
      $masked = if ($val.Length -gt 8) { $val.Substring(0, 4) + '...' + $val.Substring($val.Length - 4) } else { '****' }
      Write-Host "  $name = $masked"
    }
  }
}
Write-Host "  CORS_ORIGIN = https://punjab-laptop-website-4epm.vercel.app" -ForegroundColor Green
Write-Host ""
Write-Host "After saving: Manual Deploy, then test /api/products and /api/auth/login" -ForegroundColor Yellow
