import MainLayout from "../../layouts/MainLayout.jsx"
import { useEffect, useState } from "react"
import { employees as jsonEmployees } from "../../data/employees.json"
import Pagination from "react-js-pagination"

const CurrentEmployees = () => {
  const [employeesPerPage, setEmployeesPerPage] = useState(10)
  const [activePage, setActivePage] = useState(1)
  const [storedEmployees, setStoredEmployees] = useState([])
  const [searchQuery, setSearchQuery] = useState("")
  const [sortedColumn, setSortedColumn] = useState(null)
  const [sortDirection, setSortDirection] = useState("asc")

  useEffect(() => {
    // Récupérer les employés depuis le local storage lors du chargement du composant
    const storedEmployeesData = JSON.parse(localStorage.getItem("employees"))

    // Merge jsonEmployees and storedEmployeesData
    const mergedEmployees = mergeEmployees(jsonEmployees, storedEmployeesData)
    setStoredEmployees(mergedEmployees)

    // Remettre à zéro le défilement de la page
    window.scroll(0, 0)
  }, [])

  // Fonction pour fusionner les employés du fichier JSON avec ceux du local storage
  const mergeEmployees = (jsonEmployees, localEmployees) => {
    let merged = [...jsonEmployees]
    if (localEmployees) {
      merged = merged.concat(localEmployees)
    }

    // Trier les employés par date de naissance (birthdate)
    merged.sort((a, b) => {
      const dateA = a.birthdate ? new Date(a.birthdate) : new Date("1970-01-01")
      const dateB = b.birthdate ? new Date(b.birthdate) : new Date("1970-01-01")
      return dateA - dateB
    })

    return merged
  }

  // Filtrer les employés en fonction de la recherche de l'utilisateur
  const filteredEmployees = storedEmployees.filter((employee) => {
    const fullName = `${employee.firstname} ${employee.lastname}`
    return fullName.toLowerCase().includes(searchQuery.toLowerCase())
  })

  // Fonction pour trier les employés en fonction de la colonne et de la direction de tri
  const sortEmployees = (columnName) => {
    // Si sur la même colonne, basculer la direction de tri
    const newSortDirection =
      columnName === sortedColumn && sortDirection === "asc" ? "desc" : "asc"
    setSortedColumn(columnName)
    setSortDirection(newSortDirection)

    // Cloner et trier le tableau filtré
    const sorted = [...filteredEmployees]

    sorted.sort((a, b) => {
      if (columnName === "starter") {
        // Tri des dates de début (format : yyyy-mm-dd)
        const dateA = new Date(a[columnName])
        const dateB = new Date(b[columnName])
        return newSortDirection === "asc" ? dateA - dateB : dateB - dateA
      } else if (columnName === "birthdate") {
        // Tri des dates de naissance (format : yyyy-mm-dd)
        const dateA = a[columnName] ? new Date(a[columnName]) : null
        const dateB = b[columnName] ? new Date(b[columnName]) : null

        // Gérer les dates vides ou non définies
        if (!dateA) return newSortDirection === "asc" ? -1 : 1
        if (!dateB) return newSortDirection === "asc" ? 1 : -1

        return newSortDirection === "asc" ? dateA - dateB : dateB - dateA
      } else {
        // Tri des chaînes de caractères (format : insensible à la casse)
        const aValue = a[columnName]?.toLowerCase()
        const bValue = b[columnName]?.toLowerCase()
        if (aValue < bValue) {
          return newSortDirection === "asc" ? -1 : 1
        } else if (aValue > bValue) {
          return newSortDirection === "asc" ? 1 : -1
        }
        return 0
      }
    })

    // Mettre à jour le tableau filtré trié
    setStoredEmployees(sorted)
  }

  // Fonction pour mettre à jour la liste d'employés par page
  const handlePerPageChange = (event) => {
    setEmployeesPerPage(parseInt(event.target.value, 10))
    setActivePage(1) // Revenir à la première page lorsqu'on change le nombre d'employés par page
  }

  // Fonction pour mettre à jour la recherche en fonction de l'input de l'utilisateur
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value)
    setActivePage(1) // Revenir à la première page lorsqu'on modifie la recherche
  }

  // Calcul du nombre total d'employés après filtrage
  const totalEmployees = filteredEmployees.length

  // Calcul du premier et dernier index pour l'affichage des employés
  const indexOfLastEmployee = activePage * employeesPerPage
  const indexOfFirstEmployee = indexOfLastEmployee - employeesPerPage

  // Récupérer les employés à afficher pour la page active
  const employeesToDisplay = filteredEmployees.slice(
    indexOfFirstEmployee,
    indexOfLastEmployee,
  )

  // Fonction pour afficher les employés en fonction de la page active
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
              onChange={handlePerPageChange}
              value={employeesPerPage}
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
              className="border rounded px-2 py-1"
              placeholder=""
              aria-controls="employee-table"
              onChange={handleSearchChange} // Call handleSearchChange when the user types in the input
              value={searchQuery} // Bind the input value to the searchQuery state
            />
          </div>
          <table className="table-auto min-w-full mx-0 text-sm md:text-base lg:text-lg">
            <thead>
              <tr>
                <th
                  className="px-4 py-2 cursor-pointer"
                  onClick={() => sortEmployees("firstname")}
                >
                  First Name{" "}
                  {sortedColumn === "firstname" && (
                    <span>{sortDirection === "asc" ? "▲" : "▼"}</span>
                  )}
                </th>
                <th
                  className="px-4 py-2 cursor-pointer"
                  onClick={() => sortEmployees("lastname")}
                >
                  Last Name{" "}
                  {sortedColumn === "lastname" && (
                    <span>{sortDirection === "asc" ? "▲" : "▼"}</span>
                  )}
                </th>
                <th
                  className="px-4 py-2 cursor-pointer"
                  onClick={() => sortEmployees("starter")}
                >
                  Start Date{" "}
                  {sortedColumn === "starter" && (
                    <span>{sortDirection === "asc" ? "▲" : "▼"}</span>
                  )}
                </th>
                <th
                  className="px-4 py-2 cursor-pointer"
                  onClick={() => sortEmployees("department")}
                >
                  Department{" "}
                  {sortedColumn === "department" && (
                    <span>{sortDirection === "asc" ? "▲" : "▼"}</span>
                  )}
                </th>
                <th
                  className="px-4 py-2 hidden md:table-cell cursor-pointer"
                  onClick={() => sortEmployees("birthdate")}
                >
                  Date of Birth{" "}
                  {sortedColumn === "birthdate" && (
                    <span>{sortDirection === "asc" ? "▲" : "▼"}</span>
                  )}
                </th>
                <th
                  className="px-4 py-2 hidden md:table-cell cursor-pointer"
                  onClick={() => sortEmployees("street")}
                >
                  Street{" "}
                  {sortedColumn === "street" && (
                    <span>{sortDirection === "asc" ? "▲" : "▼"}</span>
                  )}
                </th>
                <th
                  className="px-4 py-2 cursor-pointer"
                  onClick={() => sortEmployees("city")}
                >
                  City{" "}
                  {sortedColumn === "city" && (
                    <span>{sortDirection === "asc" ? "▲" : "▼"}</span>
                  )}
                </th>
                <th
                  className="px-4 py-2 hidden md:table-cell cursor-pointer"
                  onClick={() => sortEmployees("state")}
                >
                  State{" "}
                  {sortedColumn === "state" && (
                    <span>{sortDirection === "asc" ? "▲" : "▼"}</span>
                  )}
                </th>
                <th
                  className="px-4 py-2 hidden md:table-cell cursor-pointer"
                  onClick={() => sortEmployees("zip")}
                >
                  Zip Code{" "}
                  {sortedColumn === "zip" && (
                    <span>{sortDirection === "asc" ? "▲" : "▼"}</span>
                  )}
                </th>
              </tr>
            </thead>
            <tbody>
              {employeesToDisplay.map((employee, index) => (
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
              ))}
            </tbody>
          </table>
          <div className="text-sm text-gray-600 mt-2">
            Showing {indexOfFirstEmployee + 1} to{" "}
            {Math.min(indexOfLastEmployee, totalEmployees)} of {totalEmployees}{" "}
            entries
          </div>
          <div className="flex my-5">
            <a href="/" className="text-blue-500 hover:underline">
              Home
            </a>
          </div>
        </div>
        {/* Pagination */}
        {totalEmployees > employeesPerPage && (
          <Pagination
            activePage={activePage}
            itemsCountPerPage={employeesPerPage}
            totalItemsCount={totalEmployees}
            pageRangeDisplayed={5}
            onChange={handlePageChange}
            itemClass="px-2 py-1 border rounded"
            linkClass="text-blue-500 hover:underline"
            innerClass="flex justify-center items-center pb-5"
          />
        )}
      </div>
    </MainLayout>
  )
}

export default CurrentEmployees
