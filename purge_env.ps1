# ==========================================
# AGENT ZERO: ENVIRONMENT PURGE PROTOCOL
# ==========================================
Write-Host "Initiating deep purge of legacy development environments..." -ForegroundColor Cyan

$targets = @(
    # VS Code
    "$env:LocalAppData\Programs\Microsoft VS Code",
    "$env:AppData\Code",
    "$env:UserProfile\.vscode",
    
    # Android Studio & Android Residue
    "C:\Program Files\Android\Android Studio",
    "$env:AppData\Google\AndroidStudio*",
    "$env:LocalAppData\Google\AndroidStudio*",
    "$env:LocalAppData\Android",
    "$env:UserProfile\.android",
    "$env:UserProfile\AndroidStudioProjects",
    
    # Ollama
    "$env:LocalAppData\Ollama",
    "$env:UserProfile\.ollama",
    
    # Goose AI & OpenCode (Searching common areas)
    "$env:UserProfile\Goose*",
    "$env:UserProfile\Documents\Goose*",
    "$env:UserProfile\OpenCode*",
    "$env:UserProfile\Documents\OpenCode*",
    "$env:LocalAppData\Goose*",
    "$env:AppData\Goose*"
)

foreach ($path in $targets) {
    if (Test-Path $path) {
        Write-Host "Purging: $path" -ForegroundColor Yellow
        try {
            Remove-Item -Path $path -Recurse -Force -ErrorAction Stop
        }
        catch {
            Write-Host "Skipping $path (likely in use or requires elevation)" -ForegroundColor Gray
        }
    }
}

Write-Host "Environment purge complete. Resonant workspace achieved." -ForegroundColor Green
