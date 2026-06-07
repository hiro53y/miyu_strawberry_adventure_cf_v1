@echo off
chcp 65001 >nul
cd /d "%~dp0"

echo ============================================
echo  Local preview server
echo ============================================
echo.
echo Open one of these in your browser:
echo   http://localhost:8000/voice_preview.html   (voice list / preview)
echo   http://localhost:8000/index.html           (the game)
echo.
echo Press Ctrl+C in this window to stop the server.
echo.

where python >nul 2>nul
if "%ERRORLEVEL%"=="0" (
  python -m http.server 8000
  goto :eof
)

where py >nul 2>nul
if "%ERRORLEVEL%"=="0" (
  py -m http.server 8000
  goto :eof
)

where npx >nul 2>nul
if "%ERRORLEVEL%"=="0" (
  npx --yes http-server -p 8000 -c-1 .
  goto :eof
)

echo [ERROR] Could not find python or npx to start a server.
echo Install Python, or run any static file server in this folder.
pause
