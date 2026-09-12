@echo off
title AGY Figma Bridge Server
cd /d "%~dp0\.."
echo ====================================================
echo Starting AGY Figma Bridge Server on localhost:8765
echo ====================================================
if exist "%~dp0\..\tools\node.exe" (
  set "PATH=%~dp0\..\tools;%PATH%"
  "%~dp0\..\tools\node.exe" bridge-server\src\server.js
) else (
  node bridge-server\src\server.js
)
pause
