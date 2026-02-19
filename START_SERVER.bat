@echo off
echo ============================================
echo   CodeAssess - Coding Test Platform
echo ============================================
echo.
echo [1/3] Installing dependencies...
cd /d "%~dp0server"
call npm install
echo.
echo [2/3] Seeding database with questions...
call node seed.js
echo.
echo [3/3] Starting server...
echo.
echo  Server: http://localhost:5000
echo  Open index.html in your browser to use the platform!
echo.
call node index.js
pause
