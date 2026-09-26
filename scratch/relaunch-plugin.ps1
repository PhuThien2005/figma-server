Add-Type -AssemblyName System.Windows.Forms
$proc = Get-Process Figma -ErrorAction SilentlyContinue | Where-Object { $_.MainWindowTitle -ne '' } | Select-Object -First 1
if ($proc) {
    Write-Host "Found Figma window: $($proc.MainWindowTitle)"
    $sig = @'
    [DllImport("user32.dll")]
    public static extern bool SetForegroundWindow(IntPtr hWnd);
    [DllImport("user32.dll")]
    public static extern bool ShowWindow(IntPtr hWnd, int nCmdShow);
'@
    $type = Add-Type -MemberDefinition $sig -Name Win32Utils -Namespace Win32 -PassThru
    $type::ShowWindow($proc.MainWindowHandle, 9) # SW_RESTORE
    $type::SetForegroundWindow($proc.MainWindowHandle)
    Start-Sleep -Milliseconds 800
    [System.Windows.Forms.SendKeys]::SendWait("^%{p}")
    Write-Host "Sent Ctrl+Alt+P to re-run last plugin!"
} else {
    Write-Host "No Figma main window found."
}
