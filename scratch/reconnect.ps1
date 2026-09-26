Add-Type -AssemblyName System.Windows.Forms

$sig = @'
[DllImport("user32.dll")]
public static extern bool SetForegroundWindow(IntPtr hWnd);
[DllImport("user32.dll")]
public static extern bool ShowWindow(IntPtr hWnd, int nCmdShow);
[DllImport("user32.dll")]
public static extern IntPtr FindWindow(string lpClassName, string lpWindowName);
'@
$win32 = Add-Type -MemberDefinition $sig -Name Win32Native -Namespace System -PassThru

# Look for Figma window
$p = Get-Process Figma -ErrorAction SilentlyContinue | Where-Object { $_.MainWindowHandle -ne 0 } | Select-Object -First 1
if ($p) {
    Write-Host "Found Figma process with MainWindowHandle: $($p.Id)"
    $win32::ShowWindow($p.MainWindowHandle, 9)
    $win32::SetForegroundWindow($p.MainWindowHandle)
    Start-Sleep -Milliseconds 800
    [System.Windows.Forms.SendKeys]::SendWait("^%{p}")
    Write-Host "Sent Ctrl+Alt+P to Figma window!"
} else {
    Write-Host "No process has MainWindowHandle != 0 directly."
}
