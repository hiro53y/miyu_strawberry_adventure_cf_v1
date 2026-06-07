@echo off
chcp 65001 >nul
setlocal

echo ============================================
echo  VOICEVOX voice generator
echo ============================================
echo.
echo VOICEVOX (engine at 127.0.0.1:50021) must be running.
echo Start the VOICEVOX app first, then continue.
echo.
pause

echo.
echo Checking VOICEVOX engine...
curl -s -o nul -w "%%{http_code}" http://127.0.0.1:50021/version > "%TEMP%\vv_check.txt" 2>nul
set /p VVCODE=<"%TEMP%\vv_check.txt"
del "%TEMP%\vv_check.txt" >nul 2>nul
if not "%VVCODE%"=="200" (
  echo.
  echo [ERROR] VOICEVOX engine not reachable at 127.0.0.1:50021 ^(code=%VVCODE%^).
  echo Start the VOICEVOX app and run this again.
  echo.
  pause
  exit /b 1
)
echo Engine OK.
echo.

echo Generating voice WAV files... this may take a few minutes.
echo.
node "%~dp0tools\generate_voicevox_assets.mjs"
set RC=%ERRORLEVEL%
echo.
if "%RC%"=="0" (
  echo ============================================
  echo  Done. WAV files written under assets\audio\voice
  echo  Open voice_preview.html to check the voices.
  echo ============================================
) else (
  echo [ERROR] Generation failed ^(exit code %RC%^).
  echo Make sure VOICEVOX is running and Node.js is installed.
)
echo.
pause
endlocal
