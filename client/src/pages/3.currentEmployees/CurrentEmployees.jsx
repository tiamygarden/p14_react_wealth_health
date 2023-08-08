import MainLayout from "../../layouts/MainLayout.jsx"
import { useEffect, useState } from "react"
import { employees as jsonEmployees } from "../../data/employees.json"
import Pagination from "react-js-pagination"
import {
  mergeEmployees,
  filterEmployees,
  sortEmployees,
} from "../../utils/employeeUtils.js"

/**
 * Composant représentant la liste des employés actuels.
 *
 * Ce composant affiche la liste des employés actuels en utilisant des données
 * provenant du fichier JSON `employees.json` ainsi que celles stockées dans
 * le local storage. Il permet également de trier et de filtrer les employés, ainsi
 * que de changer le nombre d'employés affichés par page et de naviguer entre les pages
 * grâce à la pagination.
 *
 * @returns {JSX.Element} Le composant de la liste des employés actuels.
 */
const CurrentEmployees = () => {
  const [employeesPerPage, setEmployeesPerPage] = useState(10)
  const [activePage, setActivePage] = useState(1)
  const [storedEmployees, setStoredEmployees] = useState([])
  const [searchQuery, setSearchQuery] = useState("")
  const [sortedColumn, setSortedColumn] = useState(null)
  const [sortDirection, setSortDirection] = useState("asc")
  const [mergedData, setMergedData] = useState([]) // Nouveau state pour stocker les données fusionnées

  useEffect(() => {
    // Récupère les employés depuis le local storage lors du chargement du composant
    const storedEmployeesData = JSON.parse(localStorage.getItem("employees"))

    // Fusion de jsonEmployees et storedEmployeesData sur le localStorage
    const mergedEmployees = mergeEmployees(jsonEmployees, storedEmployeesData)
    setStoredEmployees(mergedEmployees)
    setMergedData(mergedEmployees) // Stock les données fusionnées dans le state mergedData

    // Remet à zéro le défilement de la page
    window.scroll(0, 0)
  }, [])

  /**
   * Met à jour le nombre d'employés affichés par page en fonction de la sélection de l'utilisateur.
   *
   * @param {Event} event L'événement de changement du nombre d'employés par page.
   */
  const handlePerPageChange = (event) => {
    setEmployeesPerPage(parseInt(event.target.value, 10))
    setActivePage(1) // Reviens à la première page lorsqu'on change le nombre d'employés par page

    // Calcul les employées filtré avec la nouvelle valeur d'employés par page
    const filteredEmployees = filterEmployees(storedEmployees, searchQuery)
    setStoredEmployees(filteredEmployees)
  }

  /**
   * Met à jour la requête de recherche en fonction de l'entrée de l'utilisateur.
   *
   * @param {Event} event L'événement de saisie de recherche.
   */
  const handleSearchChange = (event) => {
    const searchValue = event.target.value
    setSearchQuery(searchValue)
    setActivePage(1) // Reviens à la première page lorsqu'on modifie la recherche

    if (searchValue === "") {
      // Si la requête de recherche est vide, réinitialise la liste aux employés fusionnés
      setStoredEmployees(mergedData)
    } else {
      // Calcul les employés filtrés avec la nouvelle valeur de requête de recherche
      const filteredEmployees = filterEmployees(storedEmployees, searchValue)
      setStoredEmployees(filteredEmployees)
    }
  }

  // Récupère les employés à afficher pour la page active
  const indexOfLastEmployee = activePage * employeesPerPage
  const indexOfFirstEmployee = indexOfLastEmployee - employeesPerPage

  // Calcule les employés filtrés en fonction des valeurs requête de recherche et d'employé par page actuelles
  const filteredEmployees = filterEmployees(storedEmployees, searchQuery)

  // Calcule totalEmployees en fonction des employés filtrés
  const totalEmployees = filteredEmployees.length // Calcul du nombre total d'employés après filtrage

  // Récupère les employés à afficher pour la page active
  const employeesToDisplay = filteredEmployees.slice(
    indexOfFirstEmployee,
    indexOfLastEmployee,
  )

  /**
   * Trie les employés en fonction de la colonne et de la direction de tri spécifiées par l'utilisateur.
   *
   * @param {string} columnName Le nom de la colonne à trier.
   */
  const handleSort = (columnName) => {
    setSortedColumn(columnName)
    setSortDirection(sortDirection === "asc" ? "desc" : "asc")

    // Tri des employés en utilisant la fonction importée depuis utils/employeeUtils.js
    const sorted = sortEmployees(
      filteredEmployees,
      columnName,
      sortDirection,
      sortedColumn,
    )

    // Met à jour les employés à afficher
    setStoredEmployees(sorted)
  }

  /**
   * Gère le changement de page de la pagination.
   *
   * @param {number} pageNumber Le numéro de page sélectionné par l'utilisateur.
   */
  const handlePageChange = (pageNumber) => {
    setActivePage(pageNumber)
  }

  return (
    <MainLayout>
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <h1 className="text-2xl font-bold mb-4">Current Employees</h1>
        <div className="dataTables_wrapper no-footer">
          <div className="flex items-center mb-4">
            <label className="mr-2">Show</label>
            <select
              name="employee-table_length"
              aria-controls="employee-table"
              className="border rounded px-2 py-1"
              onChange={handlePerPageChange} // Appel handleSearchChange lorsque l'utilisateur saisit l'entrée
              value={employeesPerPage} // Lie la valeur d'entrée à l'état employeesPerPage
            >
              <option value="10">10</option>
              <option value="25">25</option>
              <option value="50">50</option>
              <option value="100">100</option>
            </select>
            <span className="ml-2">entries</span>
          </div>
          <div className="mb-4">
            <label>Search:</label>
            <input
              type="search"
              className="border rounded px-2 py-1 ml-2"
              placeholder=""
              aria-controls="employee-table"
              onChange={handleSearchChange}
              value={searchQuery} // Lie la valeur d'entrée à l'état searchQuery
            />
          </div>
          <table className="table-auto min-w-full mx-0 text-sm">
            <thead>
              <tr>
                <th
                  className="px-4 py-2 cursor-pointer"
                  onClick={() => handleSort("firstname")} // Appel handleSort lorsque l'utilisateur clique sur l'en-tête de colonne
                >
                  First Name{" "}
                  <span
                    className={`text-gray-400 text-xs ml-1 ${
                      sortedColumn === "firstname" ? "hidden" : ""
                    }`}
                  >
                    ▲
                  </span>
                  <span
                    className={`text-gray-400 text-xs ml-1 ${
                      sortedColumn === "firstname" ? "hidden" : ""
                    }`}
                  >
                    ▼
                  </span>
                  {sortedColumn === "firstname" && (
                    <span
                      className={`${
                        sortDirection === "asc" ? "text-black" : "text-black"
                      }`}
                    >
                      {sortDirection === "asc" ? "▲" : "▼"}
                    </span>
                  )}
                </th>
                <th
                  className="px-4 py-2 cursor-pointer"
                  onClick={() => handleSort("lastname")}
                >
                  Last Name{" "}
                  <span
                    className={`text-gray-400 text-xs ml-1 ${
                      sortedColumn === "lastname" ? "hidden" : ""
                    }`}
                  >
                    ▲
                  </span>
                  <span
                    className={`text-gray-400 text-xs ml-1 ${
                      sortedColumn === "lastname" ? "hidden" : ""
                    }`}
                  >
                    ▼
                  </span>
                  {sortedColumn === "lastname" && (
                    <span>{sortDirection === "asc" ? "▲" : "▼"}</span>
                  )}
                </th>
                <th
                  className="px-4 py-2 cursor-pointer"
                  onClick={() => handleSort("starter")}
                >
                  Start Date{" "}
                  <span
                    className={`text-gray-400 text-xs ml-1 ${
                      sortedColumn === "starter" ? "hidden" : ""
                    }`}
                  >
                    ▲
                  </span>
                  <span
                    className={`text-gray-400 text-xs ml-1 ${
                      sortedColumn === "starter" ? "hidden" : ""
                    }`}
                  >
                    ▼
                  </span>
                  {sortedColumn === "starter" && (
                    <span>{sortDirection === "asc" ? "▲" : "▼"}</span>
                  )}
                </th>
                <th
                  className="px-4 py-2 cursor-pointer"
                  onClick={() => handleSort("department")}
                >
                  Department{" "}
                  <span
                    className={`text-gray-400 text-xs ml-1 ${
                      sortedColumn === "department" ? "hidden" : ""
                    }`}
                  >
                    ▲
                  </span>
                  <span
                    className={`text-gray-400 text-xs ml-1 ${
                      sortedColumn === "department" ? "hidden" : ""
                    }`}
                  >
                    ▼
                  </span>
                  {sortedColumn === "department" && (
                    <span>{sortDirection === "asc" ? "▲" : "▼"}</span>
                  )}
                </th>
                <th
                  className="px-4 py-2 hidden md:table-cell cursor-pointer"
                  onClick={() => handleSort("birthdate")}
                >
                  Date of Birth{" "}
                  <span
                    className={`text-gray-400 text-xs ml-1 ${
                      sortedColumn === "birthdate" ? "hidden" : ""
                    }`}
                  >
                    ▲
                  </span>
                  <span
                    className={`text-gray-400 text-xs ml-1 ${
                      sortedColumn === "birthdate" ? "hidden" : ""
                    }`}
                  >
                    ▼
                  </span>
                  {sortedColumn === "birthdate" && (
                    <span>{sortDirection === "asc" ? "▲" : "▼"}</span>
                  )}
                </th>
                <th
                  className="px-4 py-2 hidden md:table-cell cursor-pointer"
                  onClick={() => handleSort("street")}
                >
                  Street{" "}
                  <span
                    className={`text-gray-400 text-xs ml-1 ${
                      sortedColumn === "street" ? "hidden" : ""
                    }`}
                  >
                    ▲
                  </span>
                  <span
                    className={`text-gray-400 text-xs ml-1 ${
                      sortedColumn === "street" ? "hidden" : ""
                    }`}
                  >
                    ▼
                  </span>
                  {sortedColumn === "street" && (
                    <span>{sortDirection === "asc" ? "▲" : "▼"}</span>
                  )}
                </th>
                <th
                  className="px-4 py-2 cursor-pointer"
                  onClick={() => handleSort("city")}
                >
                  City{" "}
                  <span
                    className={`text-gray-400 text-xs ml-1 ${
                      sortedColumn === "city" ? "hidden" : ""
                    }`}
                  >
                    ▲
                  </span>
                  <span
                    className={`text-gray-400 text-xs ml-1 ${
                      sortedColumn === "city" ? "hidden" : ""
                    }`}
                  >
                    ▼
                  </span>
                  {sortedColumn === "city" && (
                    <span>{sortDirection === "asc" ? "▲" : "▼"}</span>
                  )}
                </th>
                <th
                  className="px-4 py-2 hidden md:table-cell cursor-pointer"
                  onClick={() => handleSort("state")}
                >
                  State{" "}
                  <span
                    className={`text-gray-400 text-xs ml-1 ${
                      sortedColumn === "state" ? "hidden" : ""
                    }`}
                  >
                    ▲
                  </span>
                  <span
                    className={`text-gray-400 text-xs ml-1 ${
                      sortedColumn === "state" ? "hidden" : ""
                    }`}
                  >
                    ▼
                  </span>
                  {sortedColumn === "state" && (
                    <span>{sortDirection === "asc" ? "▲" : "▼"}</span>
                  )}
                </th>
                <th
                  className="px-4 py-2 hidden md:table-cell cursor-pointer"
                  onClick={() => handleSort("zip")}
                >
                  Zip Code{" "}
                  <span
                    className={`text-gray-400 text-xs ml-1 ${
                      sortedColumn === "zip" ? "hidden" : ""
                    }`}
                  >
                    ▲
                  </span>
                  <span
                    className={`text-gray-400 text-xs ml-1 ${
                      sortedColumn === "zip" ? "hidden" : ""
                    }`}
                  >
                    ▼
                  </span>
                  {sortedColumn === "zip" && (
                    <span>{sortDirection === "asc" ? "▲" : "▼"}</span>
                  )}
                </th>
              </tr>
            </thead>
            <tbody>
              {employeesToDisplay.map(
                (
                  employee,
                  index, // Boucle sur les employés à afficher
                ) => (
                  <tr key={index}>
                    <td className="border px-4 py-2">{employee.firstname}</td>
                    <td className="border px-4 py-2">{employee.lastname}</td>
                    <td className="border px-4 py-2">{employee.starter}</td>
                    <td className="border px-4 py-2">{employee.department}</td>
                    <td className="border px-4 py-2 hidden md:table-cell">
                      {employee.birthdate}
                    </td>
                    <td className="border px-4 py-2 hidden md:table-cell">
                      {employee.street}
                    </td>
                    <td className="border px-4 py-2">{employee.city}</td>
                    <td className="border px-4 py-2 hidden md:table-cell">
                      {employee.state}
                    </td>
                    <td className="border px-4 py-2 hidden md:table-cell">
                      {employee.zip}
                    </td>
                  </tr>
                ),
              )}
            </tbody>
          </table>
          <div className="text-sm text-gray-600 mt-2">
            Showing {indexOfFirstEmployee + 1} to{" "}
            {Math.min(indexOfLastEmployee, totalEmployees)} of {totalEmployees}{" "}
            {/*// Affiche le nombre d'employés affichés sur le nombre total d'*/}
            {/*entries*/}
          </div>
          <div className="flex my-5">
            <a href="/" className="text-blue-500 hover:underline">
              Home
            </a>
          </div>
        </div>
        {/* Pagination */}
        {totalEmployees > employeesPerPage && ( // Affiche la pagination uniquement si le nombre d'employés est supérieur au nombre d'employés par page
          <Pagination
            activePage={activePage}
            itemsCountPerPage={employeesPerPage}
            totalItemsCount={totalEmployees}
            pageRangeDisplayed={5}
            onChange={handlePageChange} // Appel handlePageChange lorsque l'utilisateur clique sur un numéro de page
            itemClass="px-2 py-1 border rounded" // Ajoute une classe CSS à chaque élément de la pagination
            linkClass="text-blue-500 hover:underline" // Ajoute une classe CSS aux liens de la pagination
            innerClass="flex justify-center items-center pb-5" // Ajoute une classe CSS à la pagination
          />
        )}
      </div>
    </MainLayout>
  )
}

export default CurrentEmployees
