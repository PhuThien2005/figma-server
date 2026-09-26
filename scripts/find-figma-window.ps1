Get-Process Figma | ForEach-Object {
    if ($_.MainWindowTitle) {
        Write-Output "PID: $($_.Id) - Title: $($_.MainWindowTitle)"
    }
}
