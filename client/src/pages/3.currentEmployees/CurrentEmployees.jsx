import MainLayout from "../../layouts/MainLayout.jsx"
import { useEffect, useState } from "react"
import { employees as jsonEmployees } from "../../data/employees.json"
import Pagination from "react-js-pagination"
import {
  mergeEmployees,
  filterEmployees,
  sortEmployees,
} from "../../utils/employeeUtils.js"

const CurrentEmployees = () => {
  const [employeesPerPage, setEmployeesPerPage] = useState(10)
  const [activePage, setActivePage] = useState(1)
  const [storedEmployees, setStoredEmployees] = useState([])
  const [searchQuery, setSearchQuery] = useState("")
  const [sortedColumn, setSortedColumn] = useState(null)
  const [sortDirection, setSortDirection] = useState("asc")
  const [mergedData, setMergedData] = useState([]) // New state for merged data

  useEffect(() => {
    // Récupérer les employés depuis le local storage lors du chargement du composant
    const storedEmployeesData = JSON.parse(localStorage.getItem("employees"))

    // Merge jsonEmployees and storedEmployeesData
    const mergedEmployees = mergeEmployees(jsonEmployees, storedEmployeesData)
    setStoredEmployees(mergedEmployees)
    setMergedData(mergedEmployees) // Store merged data in a separate state

    // Remettre à zéro le défilement de la page
    window.scroll(0, 0)
  }, [])

  // Fonction pour mettre à jour la liste d'employés par page
  const handlePerPageChange = (event) => {
    setEmployeesPerPage(parseInt(event.target.value, 10))
    setActivePage(1) // Revenir à la première page lorsqu'on change le nombre d'employés par page

    // Calculate filtered employees with the new employeesPerPage value
    const filteredEmployees = filterEmployees(storedEmployees, searchQuery)
    setStoredEmployees(filteredEmployees)
  }

  // Fonction pour mettre à jour la recherche en fonction de l'input de l'utilisateur
  const handleSearchChange = (event) => {
    const searchValue = event.target.value
    setSearchQuery(searchValue)
    setActivePage(1) // Revenir à la première page lorsqu'on modifie la recherche

    if (searchValue === "") {
      // If the search query is empty, reset the list to the merged employees
      setStoredEmployees(mergedData)
    } else {
      // Calculate filtered employees with the new searchQuery value
      const filteredEmployees = filterEmployees(storedEmployees, searchValue)
      setStoredEmployees(filteredEmployees)
    }
  }

  // Récupérer les employés à afficher pour la page active
  const indexOfLastEmployee = activePage * employeesPerPage
  const indexOfFirstEmployee = indexOfLastEmployee - employeesPerPage

  // Calculate filtered employees based on the current searchQuery and employeesPerPage values
  const filteredEmployees = filterEmployees(storedEmployees, searchQuery)

  // Calculate totalEmployees based on the filtered employees
  const totalEmployees = filteredEmployees.length // Calcul du nombre total d'employés après filtrage

  // Récupérer les employés à afficher pour la page active
  const employeesToDisplay = filteredEmployees.slice(
    indexOfFirstEmployee,
    indexOfLastEmployee,
  )

  // Fonction pour trier les employés en fonction de la colonne et de la direction de tri
  const handleSort = (columnName) => {
    const newSortDirection =
      columnName === sortedColumn && sortDirection === "asc" ? "desc" : "asc"
    setSortedColumn(columnName)
    setSortDirection(newSortDirection)

    // Tri des employés en utilisant la fonction importée depuis utils/employeeUtils.js
    const sorted = sortEmployees(
      filteredEmployees,
      columnName,
      newSortDirection,
      sortedColumn,
    )

    // Mettre à jour les employés à afficher
    setStoredEmployees(sorted)
  }

  // Fonction pour gérer le changement de page
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
                  onClick={() => handleSort("firstname")}
                >
                  First Name{" "}
                  {sortedColumn === "firstname" && (
                    <span>{sortDirection === "asc" ? "▲" : "▼"}</span>
                  )}
                </th>
                <th
                  className="px-4 py-2 cursor-pointer"
                  onClick={() => handleSort("lastname")}
                >
                  Last Name{" "}
                  {sortedColumn === "lastname" && (
                    <span>{sortDirection === "asc" ? "▲" : "▼"}</span>
                  )}
                </th>
                <th
                  className="px-4 py-2 cursor-pointer"
                  onClick={() => handleSort("starter")}
                >
                  Start Date{" "}
                  {sortedColumn === "starter" && (
                    <span>{sortDirection === "asc" ? "▲" : "▼"}</span>
                  )}
                </th>
                <th
                  className="px-4 py-2 cursor-pointer"
                  onClick={() => handleSort("department")}
                >
                  Department{" "}
                  {sortedColumn === "department" && (
                    <span>{sortDirection === "asc" ? "▲" : "▼"}</span>
                  )}
                </th>
                <th
                  className="px-4 py-2 hidden md:table-cell cursor-pointer"
                  onClick={() => handleSort("birthdate")}
                >
                  Date of Birth{" "}
                  {sortedColumn === "birthdate" && (
                    <span>{sortDirection === "asc" ? "▲" : "▼"}</span>
                  )}
                </th>
                <th
                  className="px-4 py-2 hidden md:table-cell cursor-pointer"
                  onClick={() => handleSort("street")}
                >
                  Street{" "}
                  {sortedColumn === "street" && (
                    <span>{sortDirection === "asc" ? "▲" : "▼"}</span>
                  )}
                </th>
                <th
                  className="px-4 py-2 cursor-pointer"
                  onClick={() => handleSort("city")}
                >
                  City{" "}
                  {sortedColumn === "city" && (
                    <span>{sortDirection === "asc" ? "▲" : "▼"}</span>
                  )}
                </th>
                <th
                  className="px-4 py-2 hidden md:table-cell cursor-pointer"
                  onClick={() => handleSort("state")}
                >
                  State{" "}
                  {sortedColumn === "state" && (
                    <span>{sortDirection === "asc" ? "▲" : "▼"}</span>
                  )}
                </th>
                <th
                  className="px-4 py-2 hidden md:table-cell cursor-pointer"
                  onClick={() => handleSort("zip")}
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
