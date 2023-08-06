/**
 * Composant principal de l'application.
 * Ce composant définit les routes de l'application à l'aide de React Router.
 */

// Importer les dépendances React et React Router
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import "./App.css"

// Importer les pages de l'application
import Home from "./pages/1.home/Home.jsx"
import RegistrationForm from "./pages/2.registrationForm/RegistrationForm.jsx"
import CurrentEmployees from "./pages/3.currentEmployees/CurrentEmployees.jsx"

/**
 * Composant App qui définit les routes de l'application à l'aide de React Router.
 * @returns {JSX.Element} Le composant App.
 */
function App() {
  return (
    <div className="min-h-screen">
      {/* Utilisation de React Router pour définir les routes de l'application */}
      <Router>
        <Routes>
          {/* Page d'accueil */}
          <Route path="/" element={<Home />} />

          {/* Page du formulaire d'inscription */}
          <Route path="/registrationForm" element={<RegistrationForm />} />

          {/* Page des employés actuels */}
          <Route path="/currentEmployees" element={<CurrentEmployees />} />

          {/* Redirection vers la page d'accueil en cas d'URL invalide */}
          <Route path="*" element={<Home />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
