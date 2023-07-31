import MainLayout from "../../layouts/MainLayout.jsx"
import { useEffect, useState } from "react"
import { employees as jsonEmployees } from "../../data/employees.json"
import Pagination from "react-js-pagination"

const CurrentEmployees = () => {
  const [employeesPerPage, setEmployeesPerPage] = useState(10)
  const [activePage, setActivePage] = useState(1)
  const [storedEmployees, setStoredEmployees] = useState([])
  const [searchQuery, setSearchQuery] = useState("")

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
    const merged = [...jsonEmployees]
    if (localEmployees) {
      localEmployees.forEach((localEmployee) => {
        if (
          !jsonEmployees.some(
            (jsonEmployee) => jsonEmployee.id === localEmployee.id,
          )
        ) {
          merged.push(localEmployee)
        }
      })
    }
    return merged
  }

  // Fonction pour mettre à jour la liste d'employés par page
  const handlePerPageChange = (event) => {
    setEmployeesPerPage(parseInt(event.target.value, 10))
    setActivePage(1) // Revenir à la première page lorsqu'on change le nombre d'employés par page
  }

  // Calcul du premier et dernier index pour l'affichage des employés
  const indexOfLastEmployee = activePage * employeesPerPage
  const indexOfFirstEmployee = indexOfLastEmployee - employeesPerPage

  // Filtrer les employés en fonction de la recherche de l'utilisateur
  const filteredEmployees = storedEmployees.filter((employee) => {
    const fullName = `${employee.firstname} ${employee.lastname}`
    return fullName.toLowerCase().includes(searchQuery.toLowerCase())
  })

  // Récupérer les employés à afficher pour la page active
  const displayedEmployees = filteredEmployees.slice(
    indexOfFirstEmployee,
    indexOfLastEmployee,
  )

  // Fonction pour mettre à jour la recherche en fonction de l'input de l'utilisateur
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value)
    setActivePage(1) // Revenir à la première page lorsqu'on modifie la recherche
  }

  // Calcul du nombre total d'employés après filtrage
  const totalEmployees = filteredEmployees.length

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
                <th className="px-4 py-2">First Name</th>
                <th className="px-4 py-2">Last Name</th>
                <th className="px-4 py-2">Start Date</th>
                <th className="px-4 py-2">Department</th>
                <th className="px-4 py-2 hidden md:table-cell">
                  Date of Birth
                </th>
                <th className="px-4 py-2 hidden md:table-cell">Street</th>
                <th className="px-4 py-2">City</th>
                <th className="px-4 py-2 hidden md:table-cell">State</th>
                <th className="px-4 py-2 hidden md:table-cell">Zip Code</th>
              </tr>
            </thead>
            <tbody>
              {displayedEmployees.map((employee, index) => (
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
