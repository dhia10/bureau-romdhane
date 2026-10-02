# 🛡️ Politique & Revue de Sécurité — Bureau Romdhane

| Document | Version | Niveau de Confidentialité | Auteur |
|---|---|---|---|
| SEC-AUDIT-01 | 1.1 | Public / Vérifié | Dhia Romdhane |

---

## 1. Périmètre et Philosophie de Sécurité

La sécurité de la plateforme **Bureau Romdhane** repose sur le principe de **réduction drastique de la surface d'attaque** (*Attack Surface Reduction*). En éliminant tout composant applicatif serveur dynamique et toute persistance en base de données SQL exposée, la solution est nativement protégée contre la majorité des vulnérabilités critiques du Top 10 OWASP (notamment les injections SQL, les dépassements de mémoire tampon et les failles d'authentification serveur).

Le présent document consigne de manière factuelle les contrôles mis en œuvre, les dépendances externes auditées, ainsi que les limites de sécurité assumées.

---

## 2. Données Personnelles & Conformité RGPD / Législation Tunisienne

### 2.1. Données Manipulées
- Les seules informations collectées sont celles renseignées volontairement par l'utilisateur lors d'une demande de devis : nom, type d'ouvrage, ville et description du besoin.
- **Principe de Minimisation :** Aucune donnée sensible (santé, bancaire, biométrique) n'est requise ni traitée.

### 2.2. Politique de Stockage & Rétention
- **Absence de persistance locale :** L'application ne conserve aucun enregistrement dans les mécanismes de stockage du navigateur (`localStorage`, `sessionStorage`, `IndexedDB`).
- **Absence de traçage intrusif :** Aucun cookie tiers publicitaire n'est déposé sur le terminal du visiteur.
- **Canal de transmission direct :** Dès la validation du formulaire, les données sont immédiatement encapsulées dans une URL d'intention sécurisée vers WhatsApp (chiffrement de bout en bout de l'application de messagerie).

---

## 3. Contrôles de Sécurité Implémentés

### 3.1. Neutralisation des Injections XSS (Cross-Site Scripting)
- **Assainissement des données :** L'intégration des données de formulaires dans le corps de l'URL s'effectue exclusivement au moyen de la méthode native standard `encodeURIComponent()`.
- **Rendu DOM sécurisé :** L'injection dynamique des projets du catalogue s'appuie sur la manipulation stricte des attributs et nœuds d'éléments (évitant l'interprétation de chaînes brutes non contrôlées via `innerHTML` d'origine externe).

### 3.2. Sécurisation des Liens Sortants (`rel="noopener noreferrer"`)
Tous les hyperliens redirigeant vers des plateformes tierces (WhatsApp, profils professionnels, services cartographiques) disposent systématiquement des attributs :
```html
<a href="https://wa.me/..." target="_blank" rel="noopener noreferrer">
```
- `noopener` : Empêche la page cible d'accéder à l'objet `window.opener` de la page d'origine, bloquant ainsi les attaques de type *Reverse Tabnabbing*.
- `noreferrer` : Évite la fuite des en-têtes de référence contenant potentiellement des paramètres d'URL.

### 3.3. Gestion des Clés & Secrets d'Infrastructure
- **Zéro Secret dans le Dépôt :** Aucun token d'accès, mot de passe de base de données ou clé privée n'est présent dans l'historique Git (`git log`).
- Les identifiants de déploiement Azure ou Netlify sont stockés exclusivement dans les coffres-forts chiffrés **GitHub Actions Secrets**.

---

## 4. Audit des Dépendances Externes & CDN

L'application intègre des ressources hébergées sur des réseaux de distribution tiers (CDN) :

| Ressource Externe | Fournisseur / CDN | Mesure de Protection & Contrôle |
|---|---|---|
| **Google Fonts** | `fonts.googleapis.com` | Transmission via HTTPS stricte, requêtes anonymisées sans envoi de cookies |
| **FontAwesome** | `cdnjs.cloudflare.com` | Réseau Cloudflare sécurisé avec protection DDoS |

*Recommandation d'évolution :* Pour les environnements à très haute exigence d'isolation réseau, il est envisageable d'auto-héberger les polices et fichiers SVG localement dans le sous-dossier `/assets/fonts/` afin de supprimer toute dépendance à des serveurs distants.

---

## 5. Limites de Sécurité Connues

1. **Validation exclusivement côté client :** 
   - L'application ne disposant pas de backend propriétaire, la validation des champs de formulaire est réalisée dans le navigateur de l'utilisateur. Un utilisateur technique averti peut intercepter ou modifier le message avant son envoi effectif dans son propre client WhatsApp.
   - *Mesure d'atténuation :* La réception et la vérification des pièces de dossier sont assurées humainement par l'ingénieur conseil lors de la prise de contact WhatsApp.
2. **Exposition du numéro de contact professionnel :**
   - Le numéro de téléphone professionnel du cabinet est visible dans le code source HTML/JS pour permettre le fonctionnement de la redirection WhatsApp.
   - *Impact :* Risque d'indexation par des robots de démarchage téléphonique public.

---

## 6. Procédure de Signalement de Vulnérabilité

Pour toute remontée de faille de sécurité ou anomalie technique sur cette plateforme, contacter directement le responsable technique :
- **Contact Sécurité :** Dhia Romdhane
- **Email :** `dhia.romdhane@esprit.tn`
- **Délai moyen de prise en compte :** 48 heures ouvrées.
