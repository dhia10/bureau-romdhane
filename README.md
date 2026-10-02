# Bureau d'Étude Romdhane — Plateforme Web et Passerelle de Chiffrage


> Site vitrine officiel et passerelle de devis interactive pour le **Bureau d'Étude Romdhane**, cabinet d'ingénierie et d'expertise en génie civil et structures basé en Tunisie.

---

## 1. Contexte & Problématique Métier

Les cabinets d'ingénierie en génie civil traitent quotidiennement avec des maîtres d'ouvrage, des industriels et des promoteurs nécessitant un accès rapide aux références de projets réalisés (béton armé, charpentes métalliques, usines) et un canal fluide de demande de chiffrage.

Ce projet répond à un triple besoin opérationnel :
1. **Valorisation du savoir-faire technique :** Présentation claire des domaines d'expertise (études structurelles, expertise géotechnique, métré, BIM).
2. **Consultation interactive des références :** Galerie de réalisations filtrable par typologie (bâtiment, structure, industriel) avec carrousel responsive et visionneuse plein écran (lightbox).
3. **Capture et pré-qualification des demandes :** Formulaire de contact avec validation client et routage immédiat vers le canal professionnel WhatsApp sans dépendance à une base de données lourde.

---

## 2. Fonctionnalités Principales

- **Expérience Utilisateur Fluide :** Interface responsive (Desktop, Tablette, Mobile) avec navigation dynamique, défilement fluide (*smooth scroll*) et loader visuel initial.
- **Arrière-plan dynamique interactif :** Rendu d'un réseau de particules nodales sur `<canvas>` HTML5 illustrant symboliquement les maillages et structures du génie civil.
- **Compteurs statistiques animés :** Animation déclenchée lors de l'apparition dans le viewport via l'API *Intersection Observer*.
- **Galerie de Réalisations & Carrousel :**
  - Données structurées des projets (source, titre, catégorie).
  - Filtres dynamiques par catégorie sans rechargement de page.
  - Carrousel tactile avec support du swipe mobile, auto-play temporisé et pagination interactive.
  - Modale Lightbox avec navigation clavier (`Flèche Gauche`, `Flèche Droite`, `Échap`).
- **Passerelle de Devis WhatsApp :** Validation côté client des données saisies (nom, projet, message) et encodage sécurisé vers l'API WhatsApp Business.
- **Notification Toast :** Système de retour utilisateur non intrusif pour confirmer l'envoi ou signaler les erreurs de saisie.

---

## 3. Architecture & Choix Technologiques

Afin de garantir des temps de chargement minimaux (< 1 seconde), une disponibilité maximale et une maintenance facilitée, la solution repose sur une architecture statique découplée (*JAMstack light*) :

| Composant | Technologie | Rôle |
|---|---|---|
| **Structure & Sémantique** | HTML5 standard | Balisage accessible, balises meta SEO, structuration sémantique |
| **Design & Mise en page** | CSS3 natif | Variables CSS (`:root`), Grid, Flexbox, media queries responsives |
| **Logique & Interactivité** | JavaScript ES6+ (Vanilla) | Gestion du DOM, carrousel, filtres, canvas de particules, validation |
| **Typographie & Icônes** | Google Fonts & FontAwesome 6 | Polices *Outfit* & *Space Grotesk*, iconographie vectorielle |
| **Hébergement / CDN** | Azure SWA / Netlify / Vercel | Déploiement continu haute performance, cache CDN mondial |

Pour une description exhaustive de l'architecture, se référer au document [ARCHITECTURE.md](ARCHITECTURE.md).

---

## 4. Structure du Dépôt

```plaintext
bureau-romdhane/
 .github/                      # Workflows CI/CD (GitHub Actions)
 assets/                       # Fichiers graphiques et icônes
 projects/                     # Photographies des projets d'ingénierie (img-01.jpg à img-20.jpg)
 cv_dhia_romdhane_FR.html      # CV associé au profil concepteur (version FR)
 cv_dhia_romdhane_EN.html      # CV associé au profil concepteur (version EN)
 favicon.ico                   # Icône de navigateur
 logo.svg                      # Logo vectoriel du cabinet
 index.html                    # Point d'entrée principal (structure sémantique)
 index.css                     # Feuille de style globale et responsive
 script.js                     # Logique applicative, gestionnaires d'événements
 robots.txt                    # Directives d'indexation moteurs de recherche
 sitemap.xml                   # Plan du site pour le référencement naturel (SEO)

 README.md                     # Présentation générale du projet (ce fichier)
 ARCHITECTURE.md               # Architecture globale et choix de conception
 TECHNICAL-SPECIFICATIONS.md   # Spécifications fonctionnelles et techniques détaillées
 APPLICATION-FLOWS.md          # Cartographie des flux applicatifs et de données
 USER-GUIDE.md                 # Guide d'utilisation et procédures de navigation
 SECURITY.md                   # Politique de sécurité, contrôles et limites
 DEPLOY-AZURE.md               # Procédure de déploiement Azure Static Web Apps
 DEPLOY-ALTERNATIVE.md         # Procédures alternatives (Netlify, Vercel, Cloudflare)
```

---

## 5. Installation & Exécution Locale

Le projet ne nécessite aucun environnement d'exécution backend lourd (ni Node.js, ni base de données locale).

### Prérequis
- Un navigateur web moderne (Chrome, Edge, Firefox, Safari).
- Un serveur HTTP local (recommandé pour les chemins relatifs et les polices).

### Procédure
1. **Cloner le repository :**
   ```bash
   git clone https://github.com/dhia10/bureau-romdhane.git
   cd bureau-romdhane
   ```

2. **Démarrer un serveur local de développement :**
   - Avec Python :
     ```bash
     python -m http.server 8080
     ```
   - Ou avec l'extension VS Code *Live Server*.

3. **Accéder à l'application :**
   Ouvrir `http://localhost:8080` dans votre navigateur.

---

## 6. Procédures de Déploiement

Le projet dispose de procédures de déploiement documentées et testées :
- Déploiement cloud Microsoft Azure via script automatisé : consulter [DEPLOY-AZURE.md](DEPLOY-AZURE.md).
- Déploiement gratuit multi-plateformes (Netlify / Vercel / Cloudflare) : consulter [DEPLOY-ALTERNATIVE.md](DEPLOY-ALTERNATIVE.md).

---

## 7. Limites Connues & Perspectives d'Évolution

- **Stockage des demandes :** Dans sa version actuelle, l'application ne persiste pas les demandes en base de données centrale : chaque interaction est transmise directement au compte WhatsApp du cabinet via URL d'intention.
- **Évolution future :** Intégration optionnelle d'une fonction Cloud Serverless (Azure Function / AWS Lambda) connectée à une base PostgreSQL / MongoDB pour historiser les demandes de devis et calculer des métriques d'acquisition (taux de conversion).

---

## 8. Auteur & Contact

- **Concepteur & Développeur :** Dhia Romdhane — Élève-Ingénieur Data Science & Analytics (ESPRIT)
- **LinkedIn / GitHub :** [github.com/dhia10](https://github.com/dhia10)
