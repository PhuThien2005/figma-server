$code = @'
using System;
using System.Text;
using System.Collections.Generic;
using System.Runtime.InteropServices;

public class FigmaFinder {
    public delegate bool EnumThreadDelegate(IntPtr hWnd, IntPtr lParam);

    [DllImport("user32.dll")]
    public static extern bool EnumThreadWindows(int dwThreadId, EnumThreadDelegate lpfn, IntPtr lParam);

    [DllImport("user32.dll", CharSet = CharSet.Auto, SetLastError = true)]
    public static extern int GetWindowText(IntPtr hWnd, StringBuilder lpString, int nMaxCount);

    [DllImport("user32.dll")]
    [return: MarshalAs(UnmanagedType.Bool)]
    public static extern bool IsWindowVisible(IntPtr hWnd);

    [DllImport("user32.dll")]
    public static extern bool SetForegroundWindow(IntPtr hWnd);

    [DllImport("user32.dll")]
    public static extern bool ShowWindow(IntPtr hWnd, int nCmdShow);

    public static List<IntPtr> windows = new List<IntPtr>();
    public static List<string> titles = new List<string>();

    public static void FindWindows(int threadId) {
        EnumThreadWindows(threadId, (hWnd, lParam) => {
            if (IsWindowVisible(hWnd)) {
                StringBuilder sb = new StringBuilder(256);
                GetWindowText(hWnd, sb, 256);
                string t = sb.ToString();
                if (!string.IsNullOrEmpty(t)) {
                    windows.Add(hWnd);
                    titles.Add(t);
                }
            }
            return true;
        }, IntPtr.Zero);
    }
}
'@

Add-Type -TypeDefinition $code
Add-Type -AssemblyName System.Windows.Forms

$procs = Get-Process Figma -ErrorAction SilentlyContinue
foreach ($p in $procs) {
    foreach ($t in $p.Threads) {
        [FigmaFinder]::FindWindows($t.Id)
    }
}

$foundHwnd = [IntPtr]::Zero
for ($i = 0; $i -lt [FigmaFinder]::windows.Count; $i++) {
    $title = [FigmaFinder]::titles[$i]
    $hwnd = [FigmaFinder]::windows[$i]
    Write-Host "Window: $title (HWND: $hwnd)"
    if ($title -match "Figma" -or $title -match "Project Management") {
        $foundHwnd = $hwnd
    }
}

if ($foundHwnd -ne [IntPtr]::Zero) {
    Write-Host "Activating Figma Window: $foundHwnd"
    [FigmaFinder]::ShowWindow($foundHwnd, 9)
    [FigmaFinder]::SetForegroundWindow($foundHwnd)
    Start-Sleep -Milliseconds 600
    [System.Windows.Forms.SendKeys]::SendWait("^%{p}")
    Write-Host "Sent Ctrl+Alt+P successfully!"
} else {
    Write-Host "No Figma window found."
}
