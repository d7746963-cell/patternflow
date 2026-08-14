@echo off
echo Starting SmartAnalyzer Backend...
cd backend
start "SmartAnalyzer Backend" cmd /k "node server.js"

echo Starting SmartAnalyzer Frontend...
cd ../frontend
start "SmartAnalyzer Frontend" cmd /k "npm.cmd run dev"

echo Both servers are starting up! Please keep the two new windows open.
exit
