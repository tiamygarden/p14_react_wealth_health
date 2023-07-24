import React from "react"
import { useEffect } from "react"

const CurrentEmployees = () => {
  useEffect(() => {
    window.scroll(0, 0)
  }, [])

  return (
    <div
      id="employee-div"
      className="relative h-[90vh] mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 bg-logo bg-clip-content bg-no-repeat bg-center bg-opacity-10 backdrop-blur-sm "
    >
      <div className="absolute top-0 left-0 w-full h-full bg-white bg-opacity-90 backdrop-filter backdrop-blur-md rounded-md overflow-y-hidden">
        <h1 className="text-2xl font-bold mb-4">Current Employees</h1>
        <div className="dataTables_wrapper no-footer">
          <div className="flex items-center mb-4">
            <label className="mr-2">Show</label>
            <select
              name="employee-table_length"
              aria-controls="employee-table"
              className="border rounded px-2 py-1"
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
              <tr>
                <td className="border px-4 py-2">John</td>
                <td className="border px-4 py-2">WOO</td>
                <td className="border px-4 py-2">01/01/2000</td>
                <td className="border px-4 py-2">SALE</td>
                <td className="border px-4 py-2 hidden md:table-cell">
                  01/01/1975
                </td>
                <td className="border px-4 py-2 hidden md:table-cell">
                  1 RUE DU PUIT
                </td>
                <td className="border px-4 py-2">PARIS</td>
                <td className="border px-4 py-2 hidden md:table-cell">IDF</td>
                <td className="border px-4 py-2 hidden md:table-cell">75000</td>
              </tr>
            </tbody>
          </table>
          <div className="text-sm text-gray-600 mt-2">
            Showing 1 to 7 of 7 entries
          </div>
          <div className="flex mt-4">
            <a href="/" className="text-blue-500 hover:underline">
              Home
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CurrentEmployees
