Add-Type -AssemblyName System.Windows.Forms
$wshell = New-Object -ComObject WScript.Shell
$proc = Get-Process -Name "Figma" | Where-Object { $_.MainWindowTitle -ne "" } | Select-Object -First 1
if ($proc) {
    [void]$wshell.AppActivate($proc.Id)
    Start-Sleep -Milliseconds 500
    [System.Windows.Forms.SendKeys]::SendWait("^%p")
    Write-Output "Sent Ctrl+Alt+P to Figma ($($proc.MainWindowTitle))"
} else {
    Write-Output "Figma window not found"
}
