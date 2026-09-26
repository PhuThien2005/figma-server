Add-Type -AssemblyName System.Windows.Forms
$wshell = New-Object -ComObject WScript.Shell
$success = $wshell.AppActivate("Figma")
Write-Output "AppActivate Figma: $success"
if ($success) {
    Start-Sleep -Milliseconds 400
    [System.Windows.Forms.SendKeys]::SendWait("^%p")
    Write-Output "Sent Ctrl+Alt+P"
}
