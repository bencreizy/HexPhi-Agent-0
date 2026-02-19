@echo off
echo ===================================================
echo   IGNITING AGENT ZERO: THE HEXPHI CORE
echo ===================================================
echo [1/3] Syncing with Global Library (GitHub)...
git pull origin master

echo [2/3] Pulse Check: Verifying Dependencies...
call npm install
python -m pip install antigravity zeromq torch

echo [3/3] Launching Sovereign Lattice Dashboard...
npm start

echo ===================================================
echo   MISSION STATUS: ACTIVE. PHI RESONANCE ACHIEVED.
echo ===================================================
pause
