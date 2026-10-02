# 🔄 Cartographie des Flux Applicatifs & Données — Bureau Romdhane

| Document | Version | Domaine | Rédacteur |
|---|---|---|---|
| FLOW-SPEC-01 | 1.1 | Flux Données & Cycle Applicatif | Dhia Romdhane |

---

## 1. Vue d'Ensemble des Flux

Ce document modélise le cycle de vie des interactions utilisateurs et le traitement séquentiel des informations au sein de la plateforme web du **Bureau d'Étude Romdhane**.

L'application gère trois flux opérationnels distincts :
1. **Flux de Découverte & Filtrage du Catalogue (Flux Local Synchrone)**
2. **Flux d'Acquisition & Traitement du Devis (Flux de Données Sortant)**
3. **Flux de Rendu Graphique & Animation (Flux Événementiel Interne)**

---

## 2. Flux 1 — Consultation & Filtrage Dynamique des Références

Ce flux décrit le traitement séquentiel lors de la sélection d'un filtre de projet :

```mermaid
sequenceDiagram
    autonumber
    actor User as Visiteur
    participant Tab as Onglet Filtre (.filter-tab)
    participant Engine as Moteur JS (initFilterTabs)
    participant State as Registre d'État Local
    participant DOM as Vue Carrousel (.carousel-track)

    User->>Tab: Clic sur une catégorie (ex: "Industriel")
    Tab->>Engine: Événement 'click' capté
    Engine->>Tab: Mise à jour classe active (.active)
    Engine->>State: Mise à jour filtre actif (currentCategory = 'industriel')
    Engine->>Engine: Filtrage sur collection immuable PROJECTS[]
    Engine->>DOM: Vidage du conteneur et injection des nœuds filtrés
    Engine->>DOM: Réinitialisation position carrousel (translate3d(0,0,0))
    Engine->>DOM: Mise à jour des pastilles de pagination (renderDots)
    DOM-->>User: Affichage immédiat des projets de la catégorie
```

---

## 3. Flux 2 — Demande de Devis & Passerelle WhatsApp

Ce flux constitue le traitement central de données de l'application. Il illustre la démarche rigoureuse :
$$\text{Saisie} \longrightarrow \text{Validation/Contrôle} \longrightarrow \text{Transformation/Nettoyage} \longrightarrow \text{Formatage} \longrightarrow \text{Routage}$$

```mermaid
flowchart TD
    Start(["Saisie Utilisateur dans #whatsappForm"]) --> ReadData["Lecture des champs :<br/>• Nom / Société<br/>• Typologie Projet<br/>• Emplacement Chantier<br/>• Descriptif du besoin"]
    
    ReadData --> Validate{"Contrôles de Surface :<br/>• Champs obligatoires renseignés ?<br/>• Longueur minimale respectée ?"}
    
    Validate -- "Échec (donnée vide)" --> HandleError["Interruption de l'envoi :<br/>• event.preventDefault()<br/>• Bordure champ en rouge<br/>• Affichage notification Toast d'alerte"]
    HandleError --> EndError(["Retour à la saisie"])
    
    Validate -- "Succès (données valides)" --> CleanData["Nettoyage & Normalisation :<br/>• Suppression espaces inutiles (trim)<br/>• Échappement caractères spéciaux"]
    
    CleanData --> BuildMessage["Structuration du corps du message :<br/>Formulation standardisée d'ingénierie :<br/>'Bonjour Bureau d'Étude Romdhane,<br/>Nouvelle demande de devis : ...'"]
    
    BuildMessage --> EncodeURI["Encodage conforme RFC 3986 :<br/>encodeURIComponent(message)"]
    
    EncodeURI --> BuildURL["Construction de l'URL d'intention WhatsApp :<br/>https://wa.me/21696300558?text=..."]
    
    BuildURL --> ShowToast["Affichage Toast Succès<br/>'Redirection vers WhatsApp...'"]
    
    ShowToast --> Redirect["Exécution de la redirection :<br/>window.open(url, '_blank')"]
    
    Redirect --> ClearForm["Nettoyage du formulaire :<br/>form.reset()"]
    
    ClearForm --> EndSuccess(["Session transmise au commercial"])
```

### Détail des Règles de Contrôle & Transformation

1. **Règle de Validation R-01 (Complétude) :** Les champs clés doivent comporter au minimum 2 caractères utiles après suppression des espaces de début et fin.
2. **Règle de Transformation R-02 (Normalisation) :** Les sauts de ligne sont convertis en retours chariot standard `%0A` afin de structurer la lecture sur smartphone pour l'ingénieur receveur.
3. **Règle de Sécurité R-03 (Encodage) :** Aucun texte brut n'est injecté dans l'URL. La fonction native `encodeURIComponent()` protège contre les ruptures de syntaxe et les injections malveillantes.
4. **Politique de Persistance R-04 (Non-stockage) :** **Aucune donnée nominative n'est conservée localement** (ni dans le `localStorage`, ni dans les `cookies`, ni sur un serveur intermédiaire). La confidentialité du visiteur est totale.

---

## 4. Flux 3 — Rendu Graphique du Canevas de Particules

Ce flux s'exécute en tâche de fond dans la boucle d'animation du navigateur :

```plaintext
[Cycle requestAnimationFrame (60 FPS)]
  │
  ├── 1. Effacement du canvas (ctx.clearRect)
  │
  ├── 2. Pour chaque particule i (0 à N) :
  │       • Mise à jour position : x += vx, y += vy
  │       • Détection rebond sur les bordures du viewport
  │       • Dessin du point nodale
  │
  ├── 3. Pour chaque paire (i, j) :
  │       • Calcul distance d = sqrt((x_j - x_i)² + (y_j - y_i)²)
  │       • Si d < distance_seuil :
  │           Calcul opacité = 1 - (d / distance_seuil)
  │           Tracé de la ligne reliant i et j (simulation treillis structurel)
  │
  └── 4. Demande du frame suivant
```

---

## 5. Matrice de Traçabilité des Données

| Donnée | Type | Source | Traitement | Destination | Durée de Rétention |
|---|---|---|---|---|---|
| **Nom du Client** | Chaîne de texte | Formulaire HTML | Trim, encodage URI | URL WhatsApp | 0 seconde (Volatile) |
| **Type de Structure** | Sélecteur / Texte | Formulaire HTML | Normalisation | URL WhatsApp | 0 seconde (Volatile) |
| **Ville du Projet** | Chaîne de texte | Formulaire HTML | Encodage URI | URL WhatsApp | 0 seconde (Volatile) |
| **Description** | Texte multiligne | Formulaire HTML | Formatage syntaxique | URL WhatsApp | 0 seconde (Volatile) |
| **Index Carrousel** | Entier | Événement UI | Incrément/Décrément | Variable mémoire | Durée de la session |
