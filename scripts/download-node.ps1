$ErrorActionPreference = "Stop"
$zipPath = "$PSScriptRoot\..\node-temp.zip"
$destFolder = "$PSScriptRoot\..\tools"
$tempExtract = "$PSScriptRoot\..\node-temp"
$url = "https://nodejs.org/dist/v20.18.0/node-v20.18.0-win-x64.zip"

Write-Host "Downloading Node.js v20.18.0 from $url..."
curl.exe -L -o $zipPath $url

Write-Host "Extracting archive..."
if (Test-Path $tempExtract) { Remove-Item -Recurse -Force $tempExtract }
Expand-Archive -Path $zipPath -DestinationPath $tempExtract -Force

if (Test-Path $destFolder) { Remove-Item -Recurse -Force $destFolder }
Move-Item -Path "$tempExtract\node-v20.18.0-win-x64" -Destination $destFolder

Remove-Item -Recurse -Force $tempExtract
if (Test-Path $zipPath) { Remove-Item -Force $zipPath }

Write-Host "Node.js successfully installed into $destFolder!"
& "$destFolder\node.exe" -v
& "$destFolder\npm.cmd" -v
