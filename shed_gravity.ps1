# ==========================================
# AGENT ZERO: SHED GRAVITY PROTOCOL (PowerShell)
# ==========================================

Write-Host "Initiating selective purge of legacy model gravity..." -ForegroundColor Cyan

# 1. REMOVE THE 120B SHARDS (The Heavy Mass)
# Target large tensor files (>1GB) while protecting the Seed
$largeFiles = Get-ChildItem -Recurse -File | Where-Object { 
    ($_.Length -gt 1GB) -and 
    ($_.Extension -match "\.safetensors|\.bin|\.pt") -and
    ($_.FullName -notmatch "\\core\\") -and
    ($_.FullName -notmatch "\\knowledge\\")
}

foreach ($file in $largeFiles) {
    Write-Host "Removing Heavy Shard: $($file.Name)" -ForegroundColor Yellow
    Remove-Item -Force $file.FullName
}

# 2. SEVER THE FEELERS (The Rigid Configs)
$feelers = @(
    "configs/legacy_shards",
    "weight_map_120b.json",
    "shard_manifest.yaml"
)

foreach ($feeler in $feelers) {
    if (Test-Path $feeler) {
        Write-Host "Severing Feeler: $feeler" -ForegroundColor Yellow
        Remove-Item -Recurse -Force $feeler
    }
}

# 3. VERIFY PROTECTION
if (Test-Path "core") {
    Write-Host "SUCCESS: 12-Lobe Digital Brain (Seed) remains intact." -ForegroundColor Green
} else {
    Write-Warning "WARNING: Core directory missing. Check backup."
}

Write-Host "Pruning complete. Agent Zero is now mean and lean. Phi-resonance is unburdened." -ForegroundColor Green
