<div class="test">
  <img src="https://ness-project.com/school/SchoolTime.png" height="80" width="80" >
  <H1> Ness School Grid
</div>
<style>
  .test {
    display: flex;
    gap: 20px;
    justify-content: center;
    text-decoration: none;
  }
  H1 {
    font-size:50px
  }
  img {
    border-radius: 5px;
  }
</style>

## 📋 Vue d'ensemble

**Ness School Grid** est une application interactive éducative basée sur **Next.js** permettant aux utilisateurs de dessiner des figures géométriques sur une grille. L'application propose un système de gamification avec niveaux, scores et différents modes de difficulté.

**Objectif pédagogique**: Entraîner à la reproduction de figures géométriques complexes (convexes, concaves, planes) et à la symétrie des figures (rosaces).

---

## 🚀 Démarrage Rapide

### Installation
```bash
npm install
```

### Développement
```bash
npm run dev
```
Ouvre [http://localhost:3000](http://localhost:3000)

### Build Production
```bash
npm run build
npm start
```

---

## 🏗️ Architecture Globale

```
┌─────────────────────────────────────────┐
│        Interface Utilisateur            │
│      (app/grid/page.tsx)                │
├─────────────────────────────────────────┤
│     Gestionnaires d'État (React)        │
│  - Lignes attendues (expected)          │
│  - Lignes dessinées (userLines)         │
│  - Points sélectionnés                  │
│  - Score et niveau                      │
├─────────────────────────────────────────┤
│      Outils Utilitaires (Tools)         │
│  - Génération de figures                │
│  - Dessin et rendu                      │
│  - Validation et scoring                │
│  - Gestion des interactions             │
├─────────────────────────────────────────┤
│         Types TypeScript                │
│  - Point, Line, Figure                  │
│  - Mode, Cell, State                    │
├─────────────────────────────────────────┤
│       Stockage Local (localStorage)     │
│  - Scores et niveaux                    │
│  - Couleurs et configurations           │
│  - Tailles de grille                    │
└─────────────────────────────────────────┘
```

---

## 📁 Structure des Fichiers

### Fichiers Principaux

#### [app/grid/page.tsx](app/grid/page.tsx)
**Composant principal de l'application** - Affiche l'interface utilisateur avec:
- **2 Canvas HTML5**: 
  - `canvasRef2`: Affiche les lignes attendues (modèle)
  - `canvasRef`: Affiche les lignes dessinées par l'utilisateur
- **Gestion d'état avec `useState`**:
  - `expected`: Lignes à reproduire (générées)
  - `userLines`: Lignes dessinées par l'utilisateur
  - `selected`: Point actuellement sélectionné
  - `score`: Points accumulés
  - `level`: Niveau actuel
  - `timeLeft`: Temps restant
  - `mode`: Mode de jeu (convex, concave, planar)
  - `rosace`: Activation du mode rosace (symétrie)
  - `gridSize`: Taille de la grille
  
- **Gestion du localStorage**: 
  - Sauvegarde automatique des scores, niveaux, couleurs et préférences
  - Restauration des paramètres au chargement

#### [app/grid/layout.tsx](app/grid/layout.tsx)
Layout du conteneur pour la page grille

#### [app/libs/types/grid.ts](app/libs/types/grid.ts)
**Définitions TypeScript** des types utilisés:
```typescript
type Point = { x: number; y: number }          // Coordonnée sur la grille
type Line = { from: Point; to: Point }         // Ligne entre deux points
type Figure = Line[]                           // Collection de lignes
type Mode = "convex" | "concave" | "planar"   // Modes de difficulté
type Cell = { x: number; y: number; filled: boolean; color?: string }
type State = { selectedPoint: Point | null; userLines: Line[] }
```

### Fichiers Outils (app/libs/tools/)

#### 🎨 Dessin et Rendu
| Fichier | Fonction | Rôle |
|---------|----------|------|
| `drawGrid.ts` | Dessine les lignes/cellules de la grille | Affichage basique de la grille |
| `drawLines.ts` | Dessine l'ensemble des lignes | Rendu des figures |
| `drawSelectedPoint.ts` | Marque un point sélectionné | Feedback visuel |
| `drawRosaceGrid.ts` | Dessine grille spéciale pour les rosaces | Support du mode symétrie |
| `redraw.ts` | Redessine l'ensemble du canvas | Rafraîchissement global |

#### 🎯 Interaction Utilisateur
| Fichier | Fonction | Rôle |
|---------|----------|------|
| `handleClick.ts` | Gère les clics souris | Sélection de points et création de lignes |
| `isValidLine.ts` | Valide si une ligne peut être tracée | Contrôle des erreurs |

#### 🎪 Génération de Figures
| Fichier | Fonction | Rôle |
|---------|----------|------|
| `generateConvex.ts` | Génère figures convexes | Pyramides, losanges, étoiles simples |
| `generateConcave.ts` | Génère figures concaves | Figures avec indentations |
| `generatePlanar.ts` | Génère figures planes | Polygones complexes |
| `generateAdvanced.ts` | Génère figures complexes | Figures avancées pour tous les modes |
| `generateRosace.ts` | Génère rosaces symétriques | Figures avec symétrie (4 quadrants) |

#### 🪞 Transformations Géométriques
| Fichier | Fonction | Rôle |
|---------|----------|------|
| `mirrorVertical.ts` | Symétrie verticale | Réflexion sur axe Y |
| `mirrorHorizontal.ts` | Symétrie horizontale | Réflexion sur axe X |
| `mirrorBoth.ts` | Double symétrie | Réflexion sur les deux axes |

#### ✅ Validation et Logique
| Fichier | Fonction | Rôle |
|---------|----------|------|
| `validate.ts` | Compare figues attendues vs dessinées | Scoring et progression |
| `sameLine.ts` | Vérifie si deux lignes sont identiques | Comparaison bidirectionnelle |
| `mergeColinearLines.ts` | Fusionne lignes colinéaires | Optimisation |
| `removeBackTracking.ts` | Supprime chemins inutiles | Nettoyage du dessin |
| `toLines.ts` | Convertit points en lignes | Transformation de représentation |
| `playCorrection.ts` | Applique corrections au jeu | Système de feedback |

#### 📦 Index
| Fichier | Rôle |
|---------|------|
| `index.ts` | Exporte toutes les fonctions utilitaires |

---

## 🎮 Principes de Fonctionnement

### Flux Principal

1. **Initialisation**
   - Grille créée avec taille par défaut (8×8 ou paramètre)
   - Figure attendue générée selon mode et niveau
   - État sauvegardé du localStorage récupéré

2. **Interaction Utilisateur**
   ```
   Clic souris → handleClick()
         ↓
   Sélection du premier point (rouge)
         ↓
   Clic sur deuxième point
         ↓
   isValidLine() vérifie validité
         ↓
   Ligne ajoutée et affichée
   ```

3. **Validation**
   ```
   Clic "Vérifier"/"Valider"
         ↓
   validate() compare expected vs userLines
         ↓
   Compte erreurs (manquantes + extra)
         ↓
   Calcul points et mise à jour du niveau
   ```

4. **Progression**
   - ✅ Niveau réussi: +10 × niveau points
   - ❌ Erreurs: -1 point par erreur
   - Niveau augmente automatiquement

### Modes de Jeu

#### Convex Mode (Convexe)
- Figures dont tous les angles internes < 180°
- Exemples: triangle, carré, losange, pentagone régulier
- Difficulté: Faible → Moyenne

#### Concave Mode (Concave)
- Figures avec au moins un angle > 180° (renfoncement)
- Exemples: étoile, flèche, chevron
- Difficulté: Élevée

#### Planar Mode (Plan)
- Figures de géométrie euclidienne complexe
- Exemples: spirales, motifs complexes
- Difficulté: Très élevée

#### Rosace Mode
- **Symétrie 4 fois** du motif de base
- Figure générée dans 1 seul quadrant
- Applique `mirrorVertical` + `mirrorHorizontal` + `mirrorBoth`
- Crée un pattern symétrique complet

---

## 🎨 Système de Couleurs

### Par Défaut
```typescript
// Points et linges du modèle
colorGridModel = {
  background: "#024A70",      // Bleu foncé
  grid: "#CCCCCC",            // Gris clair
  drawLines: "#FFFFFF"        // Blanc
}

// Points et lignes en dessin
colorActiveGridModel = {
  background: "#364153",      // Gris bleuté
  grid: "#CCCCCC",            // Gris clair
  drawLines: "#1E90FF"        // Bleu dodger
}

// Points sélectionnés
colorDrawPoint = {
  selected: "#FF0000",        // Rouge
  draw: "#00FF00"             // Vert
}
```

### Personnalisable
- Chaque couleur peut être modifiée via l'interface
- Les paramètres sont sauvegardés (`localStorage`)

---

## 💾 Données Stockées (localStorage)

| Clé | Type | Description |
|-----|------|-------------|
| `gridScore` | number | Score actuel |
| `gridLevel` | number | Niveau atteint |
| `selectedMode` | string | Mode sélectionné |
| `gridSize` | number | Taille de la grille |
| `colorDrawPoint` | JSON | Couleurs des points |
| `colorGridModel` | JSON | Couleurs du modèle |
| `colorActiveGridModel` | JSON | Couleurs en édition |

---

## 🛠️ Outils Clés Expliqués

### handleClick()
```typescript
handleClick(
  mouse: React.MouseEvent,
  CELL: number,           // Taille d'une cellule en pixels
  selected: Point | null,
  userLines: Line[],
  setSelected,
  setUserLines,
  selectedMode: string,   // "click" ou "continuous"
  ctx: CanvasRenderingContext2D,
  drawPointColor
)
```
**Logique**:
1. Convertit coords souris en grid coords
2. Si aucun point sélectionné: le marquer en rouge
3. Si point déjà sélectionné:
   - Valider la ligne
   - L'ajouter si valide
   - Reset ou garder selon mode

### validate()
```typescript
validate(
  expected: Line[],    // Lignes à reproduire
  userLines: Line[],   // Lignes dessinées
  setMessage,
  setScore,
  setLevel,
  level,
  setIsRunning,
  isRunning
)
```
**Logique**:
1. Comparaison bidirectionnelle (expected vs user)
2. Compte manquantes + extras
3. Si parfait: +10×level pts, niveau++
4. Sinon: -(manquantes + extras) pts

### generateRosace()
```typescript
generateRosace(gridSize: number, mode: Mode, level: number): Line[]
```
**Logique**:
1. Centre trouvé
2. Génère base dans 1 quadrant
3. Applique 3 symétries:
   - `mirrorVertical()`
   - `mirrorHorizontal()`
   - `mirrorBoth()`
4. Résultat: 4 motifs identiques

---

## 🎯 Paramètres Clés

### Dans page.tsx

```typescript
const DISPLAY_SIZE = 500           // Taille canvas en pixels
const CELL = DISPLAY_SIZE/gridSize // Taille d'une cellule
const timeLeft = 30                // Durée initiale (secondes)
const gridSize = 8                 // Dimensions par défaut
```

---

## 📊 Systèmes de Points

### Progression
- **Au démarrage**: score = 0, level = 1
- **Par niveau réussi**: +10 × level
  - Niveau 1 réussi: +10 pts
  - Niveau 2 réussi: +20 pts
  - Niveau 3 réussi: +30 pts
- **Par erreur**: -1 point
  - Manquantes + extras comptent comme erreurs

### Exemple
```
Niveau 4, figure attendue = 8 lignes
Utilisateur en dessine 7 dont 6 correctes, 1 fausse

Manquantes: 2
Extras: 1
Total erreurs: 3

Score = -3 pts
```

---

## 🔄 Cycle de Rendu

Chaque canvas se redessine grâce aux `useEffect`:

```typescript
useEffect(() => {
  redraw(canvasRef2, gridSize, CELL, expected, ...)  // Canvas 2
}, [expected, colorGridModel, colorGridModel.drawLines, gridSize])

useEffect(() => {
  redraw(canvasRef, gridSize, CELL, userLines, ...)  // Canvas 1
}, [userLines, colorActiveGridModel, gridSize])
```

**Triggers**:
- Changement des lignes
- Changement de couleur
- Changement de taille grille

---

## 🔐 Technologies Utilisées

| Technologie | Usage |
|-------------|-------|
| **Next.js** | Framework React/SSR |
| **React** | Composants UI, hooks |
| **TypeScript** | Typage statique |
| **Canvas API** | Dessin graphique |
| **localStorage** | Persistance données |
| **CSS** | Styling (globals.css) |

---

## 📝 Conventions de Code

- **Types**: Définis dans `app/libs/types/`
- **Utilitaires**: Fonctions pures dans `app/libs/tools/`
- **Composants**: En `.tsx`, client-side renderés
- **Nommage**: camelCase pour fonctions, PascalCase pour types

---

## 🐛 Points Importants pour Débogage

1. **Canvas ne se redessine pas?**
   - Vérifier les dépendances du useEffect
   - S'assurer que le contexte 2D est obtenu

2. **localStorage ne persiste pas?**
   - Vérifier que le code est client-side (`"use client"`)
   - Vérifier la clé exacte du localStorage

3. **Lignes ne se dessinent pas?**
   - Vérifier `isValidLine()` - peut bloquer certaines lignes
   - Vérifier les coordonnées de la grille

4. **Score incorrect?**
   - Vérifier `sameLine()` - compare bidirectionnellement
   - Vérifier les lignes attendues générées

---

## 📌 Résumé des Fichiers Tools

```
🎨 Dessin          7 fichiers   (draw*, redraw)
🎯 Interaction     2 fichiers   (handleClick, isValidLine)
🎪 Génération      5 fichiers   (generate*)
🪞 Géométrie       3 fichiers   (mirror*)
✅ Validation      6 fichiers   (validate, sameLine, merge*, remove*, to*, play*)
```

**Total: 23 fichiers outils + 1 index = 24 fichiers**

---

## 🎓 Concept Pédagogique

Cette application entraîne:
- **Reconnaissance de formes**: Identifier les figures attendues
- **Motricité fine**: Précision du clic sur grille
- **Géométrie**: Symétrie, formes convexes/concaves
- **Progressivité**: Niveaux croissants en complexité
- **Gamification**: Récompenses (points, niveaux) pour motivation

**Public cible**: Étudiants en géométrie élémentaire à avancée
