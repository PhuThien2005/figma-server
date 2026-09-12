# PowerShell wrapper for Figma Bridge Dispatch
param (
    [Parameter(Position = 0, Mandatory = $false)]
    [string]$Payload,

    [Parameter(Mandatory = $false)]
    [string]$File,

    [Parameter(Mandatory = $false)]
    [switch]$Health,

    [Parameter(Mandatory = $false)]
    [string]$Url = "http://localhost:8765"
)

$ErrorActionPreference = "Stop"

if ($Health) {
    try {
        $res = Invoke-RestMethod -Uri "$Url/health" -Method Get
        $res | ConvertTo-Json -Depth 5
        exit 0
    } catch {
        Write-Error "Cannot connect to Bridge Server at $Url : $_"
        exit 1
    }
}

if ($File) {
    if (-not (Test-Path $File)) {
        Write-Error "File not found: $File"
        exit 1
    }
    $body = Get-Content -Raw -Path $File
} elseif ($Payload) {
    $body = $Payload
} else {
    Write-Host "Usage:"
    Write-Host "  .\scripts\figma-dispatch.ps1 -Payload '{""action"":""PING""}'"
    Write-Host "  .\scripts\figma-dispatch.ps1 -File my-flow.json"
    Write-Host "  .\scripts\figma-dispatch.ps1 -Health"
    exit 1
}

try {
    $response = Invoke-RestMethod -Uri "$Url/execute" -Method Post -Body $body -ContentType "application/json"
    $response | ConvertTo-Json -Depth 10
} catch {
    Write-Error "Execution error: $_"
    exit 1
}
