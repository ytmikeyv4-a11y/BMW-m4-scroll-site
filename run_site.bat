@echo off
title BMW M4 Scroll Experience
echo ==============================================
echo   STARTING BMW M4 COMPETITION SCROLL SHOWCASE
echo ==============================================
echo Opening browser at http://localhost:8081 ...
start http://localhost:8081
echo Server is running. Press Ctrl+C or close this window to stop.
echo.
python -m http.server 8081
pause
