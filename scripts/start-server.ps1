# Start AGY Figma Bridge Server
$scriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$rootDir = Split-Path -Parent $scriptDir
$progNode = "C:\Program Files\nodejs\node.exe"
$toolsNode = Join-Path $rootDir "tools\node.exe"

Write-Host "=============================================" -ForegroundColor Cyan
Write-Host " Starting AGY Figma Bridge Server..." -ForegroundColor Green
Write-Host "=============================================" -ForegroundColor Cyan

if (Test-Path $progNode) {
    $env:PATH = "C:\Program Files\nodejs;$env:PATH"
    & $progNode "$rootDir\bridge-server\src\server.js"
} elseif (Test-Path $toolsNode) {
    $env:PATH = "$rootDir\tools;$env:PATH"
    & $toolsNode "$rootDir\bridge-server\src\server.js"
} else {
    node "$rootDir\bridge-server\src\server.js"
}

