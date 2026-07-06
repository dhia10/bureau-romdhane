# 🚀 Alternatives de Déploiement Gratuit (Sans Azure) — Bureau Romdhane

Puisque votre abonnement Azure a expiré, vous pouvez héberger votre site vitrine **100% gratuitement et de manière permanente** (sans expiration ni carte de crédit requise) sur d'autres plateformes modernes spécialisées dans le statique.

Voici les 3 meilleures options :

---

## 1. Option A — Netlify (La plus simple, sans commande)

Netlify est excellent pour les sites HTML/CSS/JS statiques. Vous pouvez déployer sans installer de logiciel.

### Étape 1 — Déployer le site
1. Créez un compte gratuit sur [Netlify](https://app.netlify.com/).
2. Compressez tout le contenu du dossier `9aleb` dans un fichier **ZIP** (assurez-vous que `index.html` est directement à la racine du ZIP).
3. Sur votre tableau de bord Netlify, allez dans la section **Sites** et glissez-déposez le fichier `.zip` dans la zone de téléversement ("Drag and drop your site folder here").
4. Votre site est instantanément en ligne avec une URL du type `xxxxxx.netlify.app`.

### Étape 2 — Configurer votre nom de domaine `bureau-romdhane.tn`
1. Sur Netlify, allez dans les paramètres de votre site : **Site Settings** > **Domain management** > **Add a custom domain**.
2. Entrez `www.bureau-romdhane.tn` et `bureau-romdhane.tn`.
3. Netlify va vous donner les valeurs CNAME et ANAME/A à configurer chez votre registrar DNS (le site où vous avez acheté votre domaine, par exemple OVH, GoDaddy, ou un registrar tunisien).

---

## 2. Option B — Vercel (Déploiement en une ligne de commande)

Vercel est une plateforme ultra-rapide très appréciée des développeurs.

### Étape 1 — Déployer
Ouvrez **PowerShell** dans votre dossier `9aleb` et exécutez la commande suivante :
```powershell
npx vercel
```
*Si vous ne l'avez pas fait, cela vous demandera de créer un compte gratuit ou de vous connecter.*
Répondez aux questions dans le terminal (appuyez sur Entrée pour accepter les valeurs par défaut) :
- Set up and deploy? **Yes**
- Which scope? *(votre compte)*
- Link to existing project? **No**
- What’s your project’s name? **bureau-romdhane**
- In which directory is your code located? **./**
- Want to modify the settings? **No**

Votre site sera déployé immédiatement et vous obtiendrez une URL `bureau-romdhane.vercel.app`.

### Étape 2 — Configurer le domaine `bureau-romdhane.tn`
1. Allez sur votre tableau de bord [Vercel](https://vercel.com/), cliquez sur votre projet.
2. Allez dans **Settings** > **Domains**.
3. Ajoutez votre domaine `www.bureau-romdhane.tn` (et configurez la redirection de `bureau-romdhane.tn` vers le `www`).
4. Suivez les instructions DNS fournies par Vercel (généralement un enregistrement CNAME pointant vers `cname.vercel-dns.com`).

---

## 3. Option C — Cloudflare Pages (Performance maximale)

Cloudflare est le leader mondial du CDN. C'est parfait si vous utilisez déjà Cloudflare pour gérer vos serveurs DNS.

### Étape 1 — Déployer
1. Créez un compte gratuit sur [Cloudflare](https://dash.cloudflare.com/).
2. Allez dans **Workers & Pages** > **Pages** > **Create a project** > **Direct upload**.
3. Glissez-déposez le dossier de votre site (ou son ZIP).
4. C'est en ligne !

### Étape 2 — Configurer le domaine
Dans l'onglet **Custom Domains** du projet Cloudflare Pages, ajoutez votre domaine. Si vos DNS sont déjà chez Cloudflare, la configuration se fera automatiquement en un clic.

---

## 🌐 Configuration DNS typique chez votre Registrar

Quelle que soit la plateforme choisie, connectez-vous à votre espace client chez le fournisseur de votre nom de domaine (Ex: OVH, ATI, etc.) et mettez à jour votre zone DNS :

| Type | Nom | Valeur / Cible | Note |
| :--- | :--- | :--- | :--- |
| **CNAME** | `www` | *[URL donnée par l'hébergeur (ex: bureau-romdhane.vercel.app)]* | Remplace l'ancien lien Azure |
| **A / ALIAS / ANAME** | `@` (racine) | *[IP ou URL de l'hébergeur]* | Optionnel, pour rediriger le domaine sans `www` |

*Note: Le certificat HTTPS/SSL est **généré automatiquement et gratuitement** par Netlify, Vercel ou Cloudflare une fois le domaine lié.*
