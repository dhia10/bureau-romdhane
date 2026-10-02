# Procédure de Déploiement — Microsoft Azure Static Web Apps
## Domaine cible : `bureau-romdhane.tn`

---

## Option A — Script automatique (recommandé)

Ouvrez **PowerShell** dans le dossier `9aleb` et exécutez :

```powershell
Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass
.\deploy-azure.ps1
```

Le script fait tout : login, création du groupe de ressources, déploiement, et affiche les enregistrements DNS à configurer.

---

## Option B — Commandes manuelles étape par étape

### 1. Installer Azure CLI + SWA CLI
```powershell
# Vérifier Azure CLI
az --version

# Installer SWA CLI (si absent)
npm install -g @azure/static-web-apps-cli
```

### 2. Se connecter
```powershell
az login
```

### 3. Créer le groupe de ressources
```powershell
az group create --name rg-bureau-romdhane --location westeurope
```

### 4. Créer le Static Web App
```powershell
az staticwebapp create `
  --name bureau-romdhane `
  --resource-group rg-bureau-romdhane `
  --location westeurope `
  --sku Free
```

### 5. Récupérer le token de déploiement
```powershell
$TOKEN = az staticwebapp secrets list `
  --name bureau-romdhane `
  --resource-group rg-bureau-romdhane `
  --query "properties.apiKey" -o tsv
```

### 6. Déployer les fichiers
```powershell
# Depuis le dossier 9aleb
swa deploy . --deployment-token $TOKEN --env production
```

### 7. Obtenir l'URL Azure
```powershell
az staticwebapp show `
  --name bureau-romdhane `
  --resource-group rg-bureau-romdhane `
  --query "defaultHostname" -o tsv
```
→ Vous obtenez une URL comme : `lively-sea-xxxxx.azurestaticapps.net`

---

## Configurer le domaine bureau-romdhane.tn

### Étape 1 — Ajouter ces enregistrements DNS chez votre registrar

| Type  | Nom                          | Valeur                                     |
|-------|------------------------------|--------------------------------------------|
| CNAME | `www`                        | `lively-sea-xxxxx.azurestaticapps.net`     |
| TXT   | `asuid.bureau-romdhane.tn`   | *(ID validation — voir commande ci-dessous)* |
| TXT   | `asuid.www.bureau-romdhane.tn` | *(même ID validation)*                   |

Pour obtenir l'ID de validation :
```powershell
az staticwebapp show `
  --name bureau-romdhane `
  --resource-group rg-bureau-romdhane `
  --query "repositoryUrl" -o tsv
```

### Étape 2 — Lier le domaine (après propagation DNS ~15 min)
```powershell
# Sous-domaine www
az staticwebapp hostname set `
  --name bureau-romdhane `
  --resource-group rg-bureau-romdhane `
  --hostname www.bureau-romdhane.tn

# Domaine racine
az staticwebapp hostname set `
  --name bureau-romdhane `
  --resource-group rg-bureau-romdhane `
  --hostname bureau-romdhane.tn
```

### Étape 3 — Vérifier
```powershell
az staticwebapp hostname list `
  --name bureau-romdhane `
  --resource-group rg-bureau-romdhane
```

Le SSL/HTTPS est **automatique et gratuit** via Azure.

---

## Résumé des coûts

| Service              | Coût         |
|----------------------|--------------|
| Static Web Apps Free | **0 €/mois** |
| SSL / HTTPS          | **Inclus**   |
| 100 GB bande passante| **Inclus**   |
| Domaine personnalisé | **Inclus**   |

---

*Bureau d'Étude Romdhane — 2026*
