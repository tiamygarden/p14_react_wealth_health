/**
 * Composant de pied de page de l'application.
 * Ce composant affiche le pied de page avec les droits d'auteur et les informations de l'entreprise.
 * @returns {JSX.Element} Le composant Footer.
 */
export default function Footer() {
  return (
    <footer className="w-full bg-gray-900">
      <div className="mx-auto max-w-7xl px-6 py-12 md:flex md:items-center md:justify-between lg:px-8">
        <div className="mt-8 md:order-1 md:mt-0">
          <p className="text-center text-xs leading-5 text-gray-500">
            &copy; 2023 Wealth Health, Inc. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
