import React from "react"
import Navbar from "../components/header/Navbar"
import Footer from "../components/footer/Footer"

/**
 * Composant de mise en page principal de l'application.
 * Ce composant enveloppe le contenu de l'application avec une barre de navigation en haut et un pied de page en bas.
 *
 * @param {Object} props - Les propriétés passées au composant.
 * @param {React.ReactNode} props.children - Les éléments enfants du composant à afficher dans le contenu principal.
 * @returns {JSX.Element} Le composant MainLayout.
 */
const MainLayout = ({ children }) => {
  return (
    <div className="flex flex-col flex-grow">
      {/* Barre de navigation en haut de la page */}
      <Navbar />
      <div className="bg-logo bg-content bg-no-repeat bg-center bg-opacity-30 backdrop-blur-sm flex-grow">
        {/* Contenu principal de la page avec un arrière-plan semi-transparent */}
        <div className="relative w-full bg-white bg-opacity-90 backdrop-filter rounded-md">
          {/* Affiche les éléments enfants passés au composant */}
          {children}
        </div>
      </div>
      {/* Pied de page en bas de la page */}
      <Footer />
    </div>
  )
}

export default MainLayout
