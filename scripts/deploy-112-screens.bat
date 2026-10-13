@echo off
title ARKI Vietnam 112 Screens Industrial Deployment
cd /d "%~dp0\.."

echo ====================================================================
echo ARKI VIETNAM 112-SCREEN INDUSTRIAL DEPLOYMENT PIPELINE
echo ====================================================================

tools\node.exe scripts\deploy-112-screens.js

pause
