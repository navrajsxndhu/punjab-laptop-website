# Production smoke checks - Punjab Laptop Sirsa
param(
  [string]$FrontendUrl = "https://punjab-laptop-website.vercel.app",
  [string]$ApiUrl = "https://punjab-laptop-sirsa-api.onrender.com"
)

$ErrorActionPreference = "Continue"
$failed = 0

function Test-Endpoint {
  param([string]$Name, [string]$Url, [int[]]$Ok = @(200))
  Write-Host ""
  Write-Host "[$Name] $Url" -ForegroundColor Cyan
  try {
    $res = Invoke-WebRequest -Uri $Url -UseBasicParsing -TimeoutSec 25 -MaximumRedirection 5
    if ($Ok -contains $res.StatusCode) {
      Write-Host "  OK $($res.StatusCode)" -ForegroundColor Green
      return $true
    }
    Write-Host "  FAIL status $($res.StatusCode)" -ForegroundColor Red
    return $false
  } catch {
    Write-Host "  FAIL $($_.Exception.Message)" -ForegroundColor Red
    return $false
  }
}

Write-Host "=== Punjab Laptop Sirsa - Production Verification ===" -ForegroundColor Yellow

if (-not (Test-Endpoint -Name "API Health" -Url "$ApiUrl/api/health")) { $failed++ }
if (-not (Test-Endpoint -Name "Frontend Home" -Url $FrontendUrl)) { $failed++ }
if (-not (Test-Endpoint -Name "Admin Login" -Url "$FrontendUrl/admin/login")) { $failed++ }
if (-not (Test-Endpoint -Name "Products API" -Url "$ApiUrl/api/products?limit=1")) { $failed++ }

Write-Host ""
Write-Host "[CORS] Verify admin login from the live Vercel URL in a browser." -ForegroundColor DarkGray

Write-Host ""
Write-Host "=== Local builds ===" -ForegroundColor Yellow
$root = Split-Path $PSScriptRoot -Parent
Push-Location (Join-Path $root "backend")
npm run build 2>&1 | Out-Host
if ($LASTEXITCODE -ne 0) { $failed++ }
Pop-Location

Push-Location (Join-Path $root "frontend")
npm run build 2>&1 | Out-Host
if ($LASTEXITCODE -ne 0) { $failed++ }
Pop-Location

if ($failed -gt 0) {
  Write-Host ""
  Write-Host "$failed check(s) failed." -ForegroundColor Red
  exit 1
}
Write-Host ""
Write-Host "All checks passed." -ForegroundColor Green
exit 0
