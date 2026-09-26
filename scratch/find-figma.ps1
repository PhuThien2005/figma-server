$source = @'
using System;
using System.Text;
using System.Runtime.InteropServices;

namespace Win32 {
    public class WindowEnum {
        public delegate bool EnumWindowsProc(IntPtr hWnd, IntPtr lParam);
        [DllImport("user32.dll")]
        public static extern bool EnumWindows(EnumWindowsProc lpEnumFunc, IntPtr lParam);
        [DllImport("user32.dll", CharSet = CharSet.Auto, SetLastError = true)]
        public static extern int GetWindowText(IntPtr hWnd, StringBuilder lpString, int nMaxCount);
        [DllImport("user32.dll", SetLastError = true, CharSet = CharSet.Auto)]
        public static extern int GetWindowTextLength(IntPtr hWnd);
        [DllImport("user32.dll")]
        [return: MarshalAs(UnmanagedType.Bool)]
        public static extern bool IsWindowVisible(IntPtr hWnd);
        [DllImport("user32.dll")]
        public static extern bool SetForegroundWindow(IntPtr hWnd);
        [DllImport("user32.dll")]
        public static extern bool ShowWindow(IntPtr hWnd, int nCmdShow);
    }
}
'@

Add-Type -TypeDefinition $source
Add-Type -AssemblyName System.Windows.Forms

$script:found = [IntPtr]::Zero
[Win32.WindowEnum]::EnumWindows({
    param($hWnd, $lParam)
    if ([Win32.WindowEnum]::IsWindowVisible($hWnd)) {
        $len = [Win32.WindowEnum]::GetWindowTextLength($hWnd)
        if ($len -gt 0) {
            $sb = New-Object System.Text.StringBuilder ($len + 1)
            [Win32.WindowEnum]::GetWindowText($hWnd, $sb, $sb.Capacity) | Out-Null
            $title = $sb.ToString()
            if ($title -match 'Figma') {
                Write-Host "Found: HWND=$hWnd Title=$title"
                $script:found = $hWnd
                return $false
            }
        }
    }
    return $true
}, [IntPtr]::Zero) | Out-Null

if ($script:found -ne [IntPtr]::Zero) {
    Write-Host "Activating Figma window..."
    [Win32.WindowEnum]::ShowWindow($script:found, 9)
    [Win32.WindowEnum]::SetForegroundWindow($script:found)
    Start-Sleep -Milliseconds 600
    [System.Windows.Forms.SendKeys]::SendWait("^%{p}")
    Write-Host "Sent Ctrl+Alt+P (Run Last Plugin)!"
} else {
    Write-Host "No visible Figma window found."
}
