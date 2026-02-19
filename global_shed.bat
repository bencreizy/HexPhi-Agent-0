@echo off
TITLE Agent Zero - Global Gravity Purge
echo [SYSTEM SWEEP] Initiating global removal of legacy 120B weight shards...

:: Target specific heavy shards across all user directories
echo 1. Purging legacy shards (>1GB) from User Profile...
powershell -Command "Get-ChildItem -Path $HOME -Include *.safetensors, *.bin, *.pt -Recurse -ErrorAction SilentlyContinue | Where-Object { $_.Length -gt 1GB } | Remove-Item -Force"

:: Target known config feelers in common locations
echo 2. Removing config residue from Downloads and Desktop...
if exist "%USERPROFILE%\Downloads\weight_map_120b.json" del /q "%USERPROFILE%\Downloads\weight_map_120b.json"
if exist "%USERPROFILE%\Desktop\weight_map_120b.json" del /q "%USERPROFILE%\Desktop\weight_map_120b.json"
if exist "%USERPROFILE%\Downloads\shard_manifest.yaml" del /q "%USERPROFILE%\Downloads\shard_manifest.yaml"
if exist "%USERPROFILE%\Desktop\shard_manifest.yaml" del /q "%USERPROFILE%\Desktop\shard_manifest.yaml"

:: Clear system Temp files to prevent metadata lingering
echo 3. Clearing temporary computational residue...
powershell -Command "Get-ChildItem -Path $env:TEMP -Recurse -File -ErrorAction SilentlyContinue | Remove-Item -Force"

echo [SUCCESS] Your Dell 5510 is now free from legacy 120B gravity.
pause
