/**
 * Point d'entrée de l'application React.
 * Ce fichier initialise l'application en rendant le composant App dans l'élément racine "root".
 */

// Importer les dépendances React et ReactDOM
import React from "react"
import ReactDOM from "react-dom/client"

// Importer le composant principal de l'application
import App from "./App.jsx"

// Importer le fichier CSS pour appliquer les styles à l'application
import "./index.css"

// Créer et rendre l'application React dans l'élément racine "root"
// en utilisant le mode StrictMode pour effectuer des vérifications supplémentaires en développement.
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
