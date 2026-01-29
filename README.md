# 💻 Ticket Manager - Frontend (React)

Ce dossier contient l'interface utilisateur de l'application de gestion de tickets. C'est une application React moderne, réactive et optimisée pour une gestion fluide des tâches.

## 🎨 Interface & UX

L'interface a été conçue pour être intuitive et rapide :

- **Dashboard Dynamique :** Les statistiques en haut de page se mettent à jour automatiquement à chaque action.
- **Gestion des Modales :** Système de modales pour l'ajout et l'édition, avec fermeture intelligente (clic extérieur et touche Échap).
- **Cartes Interactives :** Chaque ticket dispose d'un menu contextuel (dropdown) pour des actions rapides.
- **Filtrage Temps Réel :** Barre de recherche permettant de filtrer instantanément par titre ou statut.

## 🛠️ Stack Technique

- **React.js** : Pour la structure en composants.
- **Fetch API** : Pour la communication avec le backend FastAPI.
- **Flexbox & Grid** : Pour un layout responsive et une grille de tickets auto-adaptative.
- **Hooks (useState, useEffect, useRef)** : Pour la gestion de l'état local, du cycle de vie et des interactions DOM.

## 📂 Architecture des Composants

- `App.jsx` : Composant racine, gère la `refreshKey` pour synchroniser les données.
- `Stats.jsx` : Calcule et affiche le résumé global des tickets.
- `TicketList.jsx` : Gère le fetch des données et le moteur de recherche.
- `TicketCard.jsx` : Affiche les détails du ticket et contient le menu d'actions.
- `AddTicketModal.jsx` / `EditTicketModal.jsx` : Formulaires de création et de modification.

## 🔄 Flux de Données (Data Flow)

L'application utilise un système de **Refresh Key** :

1. Une action (ajout, modif, suppression) est effectuée dans un composant enfant.
2. Une fois l'API répondue avec succès, une fonction `onRefresh` est appelée.
3. Cette fonction remonte jusqu'à `App.jsx` qui incrémente un compteur.
4. React détecte le changement et recharge automatiquement la liste et les statistiques sans rafraîchir toute la page.

## 🚀 Installation

1. Installez les dépendances :
    ```bash
    npm install
    ```
2. Lancez le projet :
    ```bash
    npm run dev
    ```
