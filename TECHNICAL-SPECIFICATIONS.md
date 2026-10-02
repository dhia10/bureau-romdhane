# 📋 Spécifications Techniques — Bureau Romdhane

| Référence Document | Date de Révision | Statut | Auteur |
|---|---|---|---|
| SPEC-TECH-BE-01 | Octobre 2026 | Validé | Dhia Romdhane |

---

## 1. Objectifs du Document

Le présent document a pour objet de formaliser les spécifications techniques et fonctionnelles de la plateforme web du **Bureau d'Étude Romdhane**. Il détaille l'organisation du code source, les responsabilités de chaque module, les règles de gestion, les dépendances techniques, ainsi que les procédures de maintenance et d'évolution.

---

## 2. Périmètre Fonctionnel

La plateforme remplit cinq fonctions majeures :
1. **Vitrine institutionnelle :** Présentation du cabinet, de ses ingénieurs, de son histoire et de son positionnement en génie civil.
2. **Catalogue de services :** Description modulaire des prestations (calculs de structures béton/métal, réhabilitation, contrôle technique, métré, BIM).
3. **Médiathèque de projets (Portfolio) :** Consultation interactive de 20 références industrielles et tertiaires avec tri dynamique par catégorie.
4. **Acquisition de prospects (Lead Generation) :** Recueil interactif du besoin client avec assistant de devis et passerelle directe vers WhatsApp.
5. **Valorisation des compétences logicielles :** Présentation des outils de calcul et modélisation maîtrisés (Robot Structural Analysis, Tekla, Revit, AutoCAD).

---

## 3. Cartographie des Composants & Responsabilités

L'architecture applicative est scindée en trois blocs découplés :

```plaintext
┌────────────────────────────────────────────────────────────────────────┐
│                              NAVIGATEUR                                │
│                                                                        │
│   ┌─────────────────────┐   ┌─────────────────┐   ┌────────────────┐   │
│   │     index.html      │   │    index.css    │   │   script.js    │   │
│   │                     │   │                 │   │                │   │
│   │ • Structure HTML5   │   │ • Design System │   │ • Logique DOM  │   │
│   │ • Sémantique & A11y │◄──┼─┤ • Layout CSS  │◄──┼─┤ • Événements   │   │
│   │ • Conteneurs DOM    │   │ • Animations    │   │ • Particules   │   │
│   │ • Balises SEO       │   │ • Media Queries │   │ • Validation   │   │
│   └─────────────────────┘   └─────────────────┘   └────────────────┘   │
└────────────────────────────────────▲───────────────────────────────────┘
                                     │ Intègre
                    ┌────────────────┴────────────────┐
                    │      Ressources Statiques       │
                    │ • /projects/ (Photographies)    │
                    │ • /assets/ & logos              │
                    │ • CDN: Google Fonts & FontAwes. │
                    └─────────────────────────────────┘
```

### 3.1. Structure Sémantique — `index.html`
- **En-tête (`<head>`) :** Métadonnées viewport, encodage UTF-8, balises OpenGraph, préconnexions DNS (`dns-prefetch` / `preconnect` vers Google Fonts).
- **Navigation (`<nav>`) :** Barre fixe avec logo vectoriel SVG, menu principal et déclencheur menu mobile.
- **Section Héro (`#hero`) :** Titre d'impact, accroche métier, boutons d'action rapide, et canevas HTML5 pour le rendu graphique nodale.
- **Section Chiffres Clés (`#stats`) :** 4 blocs métriques (projets livrés, années d'expérience, surface étudiée, taux de satisfaction).
- **Section Réalisations (`#projects`) :** Onglets de filtrage (`.filter-tab`), carrousel d'images (`.carousel-track`) et conteneur modale Lightbox.
- **Section Devis & Contact (`#contact`) :** Formulaire interactif (`#whatsappForm`) comprenant les champs de qualification du projet.

### 3.2. Feuille de Style & Design System — `index.css`
- **Variables CSS (`:root`) :** Centralisation de la palette chromatique (bleu marine structure `#0f2744`, or architectural `#c5a059`, gris neutres), espacements et typographies.
- **Moteur Responsive :** Utilisation de CSS Grid (2 à 4 colonnes auto-ajustables) et Flexbox. Points de rupture (*breakpoints*) normalisés :
  - Mobile : `< 768px`
  - Tablette : `768px - 1024px`
  - Desktop : `> 1024px`
- **Performance de rendu :** Propriétés `will-change: transform` sur les éléments animés, transitions accélérées par le processeur graphique (GPU via `translate3d`).

### 3.3. Logique Applicative — `script.js`
Le module JavaScript est structuré sous forme de fonctions pures et de gestionnaires d'état dédiés :

| Fonction | Rôle & Mécanisme |
|---|---|
| `initNavbar()` / `initMobileMenu()` | Détection du scroll, bascule des classes d'ombrage et gestion du volet mobile |
| `initParticles()` | Animation sur `<canvas>` : calcul trigonométrique de nœuds interconnectés simulant un treillis |
| `initStats()` | Compteurs numériques incrémentaux déclenchés par `IntersectionObserver` |
| `buildCarousel()` / `renderCarousel()` | Instanciation dynamique des cartes projets à partir du tableau d'objets `PROJECTS` |
| `initFilterTabs()` | Filtrage réactif par clé de catégorie (`structure`, `industriel`, `batiment`) |
| `initLightbox()` / `openLightbox()` | Gestion du zoom d'image plein écran avec écouteurs d'événements clavier |
| `sendToWhatsApp(event)` | Contrôle de surface des inputs, encodage URI et génération du lien d'intention |
| `toast(message, type)` | Affichage d'une alerte transitoire en bas d'écran (durée d'affichage : 3500ms) |

---

## 4. Dépendances Externes & Intégrité

Pour limiter les risques de chaîne logistique logicielle tout en garantissant des temps d'accès optimaux :
1. **Google Fonts :** Familles `Outfit` (titrages) et `Space Grotesk` (données et corps). Chargées en mode asynchrone avec directive `display=swap`.
2. **FontAwesome 6.5.0 :** CDN Cloudflare pour les pictogrammes vectoriels d'ingénierie et de contact.
3. **Zéro dépendance NPM en production :** Aucun framework (ni React, ni jQuery), assurant une empreinte mémoire quasi-nulle côté client.

---

## 5. Gestion des Erreurs & Comportements Attendus

| Cas d'Usage | Condition d'Erreur | Comportement Système | Retour Utilisateur |
|---|---|---|---|
| **Validation Devis** | Champ requis manquant ou vide | Interruption de la soumission (`event.preventDefault()`) | Bordure rouge sur le champ + Notification Toast d'alerte |
| **Chargement Image** | Fichier image non disponible ou corrompu | Attribut HTML `alt` affiché, pas d'interruption du carrousel | Rendu alternatif sans blocage du DOM |
| **API WhatsApp** | Navigateur sans application WhatsApp | Le navigateur ouvre l'interface Web WhatsApp (`web.whatsapp.com`) | Continuité du service garantie sur desktop |
| **Affichage Mobile** | Écran < 480px | Le carrousel bascule en mode carte unique avec swipe tactile | Expérience fluide sans débordement horizontal |

---

## 6. Guide de Maintenance & Points de Configuration

### 6.1. Modification du numéro WhatsApp de contact
Dans le fichier `script.js`, localiser la constante ou la fonction `sendToWhatsApp` :
```javascript
const WHATSAPP_PHONE = "21696300558"; // Remplacer par le nouveau numéro avec indicatif international
```

### 6.2. Ajout d'une nouvelle référence de projet
Dans le fichier `script.js`, ajouter un objet dans le tableau `PROJECTS` :
```javascript
{
  src: 'projects/nom-image.jpg',
  title: 'Titre du Projet – Ville',
  cat: 'structure' // Valeurs admises : 'structure' | 'industriel' | 'batiment'
}
```
*Note : déposer l'image correspondante dans le répertoire `/projects/` avec une résolution optimale de 800x600 px compressée en JPEG/WebP.*

### 6.3. Ajustement des compteurs statistiques
Dans le fichier `index.html`, modifier les attributs `data-target` des éléments `.stat-number` :
```html
<span class="stat-number" data-target="250">0</span>
```
Le script animera automatiquement l'incrémentation jusqu'à la nouvelle valeur cible.
