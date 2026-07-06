# Script d'aide pour initialiser et pousser le projet sur GitHub
# Bureau d'Étude Romdhane - 2026

Write-Host "================================================" -ForegroundColor Cyan
Write-Host "  Initialisation de Git & Préparation pour GitHub" -ForegroundColor Cyan
Write-Host "================================================" -ForegroundColor Cyan
Write-Host ""

# 1. Vérifier si git est initialisé
if (!(Test-Path .git)) {
    Write-Host "-> Initialisation du dépôt Git local..." -ForegroundColor Yellow
    git init
    git branch -M main
} else {
    Write-Host "-> Dépôt Git déjà initialisé." -ForegroundColor Green
}

# 2. Demander l'URL du dépôt GitHub
Write-Host ""
$repoUrl = Read-Host "Entrez l'URL de votre dépôt GitHub (ex: https://github.com/votre-compte/votre-depot.git)"
$repoUrl = $repoUrl.Trim()

if ([string]::IsNullOrEmpty($repoUrl)) {
    Write-Host "[ERREUR] L'URL GitHub ne peut pas être vide. Relancez le script." -ForegroundColor Red
    pause
    exit 1
}

# Configurer le remote
git remote remove origin 2>$null
git remote add origin $repoUrl

# 3. Ajouter et commiter les fichiers
Write-Host ""
Write-Host "-> Préparation des fichiers..." -ForegroundColor Yellow
git add .
git commit -m "Initialisation du site vitrine B.E. Romdhane"

# 4. Pousser sur GitHub
Write-Host ""
Write-Host "-> Envoi des fichiers vers GitHub (main)..." -ForegroundColor Yellow
git push -u origin main

if ($LASTEXITCODE -eq 0) {
    Write-Host ""
    Write-Host "================================================" -ForegroundColor Green
    Write-Host "  Fichiers envoyés avec succès sur GitHub ! 🎉" -ForegroundColor Green
    Write-Host "  Vous pouvez maintenant lier ce dépôt sur Netlify." -ForegroundColor Green
    Write-Host "================================================" -ForegroundColor Green
} else {
    Write-Host ""
    Write-Host "[ERREUR] Échec de l'envoi vers GitHub." -ForegroundColor Red
    Write-Host "Vérifiez vos identifiants ou que le dépôt distant est bien vide." -ForegroundColor Yellow
}

Write-Host ""
pause
