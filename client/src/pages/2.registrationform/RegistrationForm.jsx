import MainLayout from "../../layouts/MainLayout.jsx"
import { useRef } from "react"
import { Link } from "react-router-dom"
import Modal from "../../components/Modal.jsx"

function RegistrationForm() {
  const modalRef = useRef()

  async function save() {
    const firstname = document.getElementById("firstname").value
    const lastname = document.getElementById("lastname").value
    const birthdate = document.getElementById("birthdate").value
    const starter = document.getElementById("starter").value
    const street = document.getElementById("street").value
    const city = document.getElementById("city").value
    const state = document.getElementById("state").value
    const zip = document.getElementById("zip").value
    const department = document.getElementById("department").value

    const newEmployee = {
      firstname,
      lastname,
      birthdate,
      starter,
      street,
      city,
      state,
      zip,
      department,
    }

    // Récupération des employés actuels depuis le local storage
    const employeesFromStorage =
      JSON.parse(localStorage.getItem("employees")) || []

    // Ajout du nouvel employé à la liste des employés
    employeesFromStorage.push(newEmployee)

    // Sauvegarde de la liste mise à jour dans le local storage
    localStorage.setItem("employees", JSON.stringify(employeesFromStorage))

    modalRef.current.open()
  }

  return (
    <MainLayout>
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <h1 className="text-center p-4">NEW EMPLOYEE</h1>
        <div className="mb-1 md:flex md:justify-between pb-0">
          <form className="mx-auto p-4 space-y-4 md:flex md:flex-wrap md:w-full md:mx-0 md:items-baseline md:justify-between">
            <div className="md:w-1/2 md:pr-4 md:flex md:flex-col gap-[40px]">
              <fieldset className="border w-full border-gray-300 rounded-md p-4 ">
                <legend className="mb-2 font-medium">Identity</legend>
                <label className="block" htmlFor="firstname">
                  First Name
                  <input
                    className="w-full h-10 px-3 border border-gray-300 rounded"
                    type="text"
                    id="firstname"
                  />
                </label>
                <label className="block mt-4" htmlFor="lastname">
                  Last Name
                  <input
                    className="w-full h-10 px-3 border border-gray-300 rounded"
                    type="text"
                    id="lastname"
                  />
                </label>
                <label className="block mt-4" htmlFor="birthdate">
                  Date of Birth
                  <input
                    className="w-full h-10 px-3 border border-gray-300 rounded"
                    type="date"
                    id="birthdate"
                  />
                </label>
              </fieldset>
              <label className="block mt-6" htmlFor="starter">
                Start Date
                <input
                  className="w-full h-10 px-3 border border-gray-300 rounded"
                  type="date"
                  id="starter"
                />
              </label>
            </div>
            <div className="md:w-1/2 md:flex md:flex-col md:items-center md:mt-4">
              <fieldset className="border w-full border-gray-300 rounded-md p-4 mt-4">
                <legend className="mb-2 font-medium">Address</legend>
                <label className="block" htmlFor="street">
                  Street
                  <input
                    className="w-full h-8 px-3 border border-gray-300 rounded"
                    type="text"
                    id="street"
                  />
                </label>
                <label className="block mt-4" htmlFor="city">
                  City
                  <input
                    className="w-full h-8 px-3 border border-gray-300 rounded"
                    type="text"
                    id="city"
                  />
                </label>
                <label className="block mt-4" htmlFor="state">
                  State
                  <select
                    className="w-full h-8 px-3 border border-gray-300 rounded"
                    name="state"
                    id="state"
                  >
                    <option>Sales</option>
                    <option>Marketing</option>
                    <option>Engineering</option>
                    <option>Human Resources</option>
                    <option>Legal</option>
                  </select>
                </label>
                <label className="block mt-4" htmlFor="zip">
                  Zip Code
                  <input
                    className="w-full h-8 px-3 border border-gray-300 rounded"
                    type="number"
                    id="zip"
                  />
                </label>
              </fieldset>
              <label className="w-full block mt-4 pb-5" htmlFor="department">
                Department
                <select
                  className="w-full h-10 border border-gray-300 rounded"
                  name="department"
                  id="department"
                >
                  <option>Sales</option>
                  <option>Marketing</option>
                  <option>Engineering</option>
                  <option>Human Resources</option>
                  <option>Legal</option>
                </select>
              </label>
            </div>
          </form>
        </div>
        <div className="md:w-full pb-[5vh] sm:pb-[16vh] flex justify-center">
          <button
            type="button"
            onClick={() => save()}
            className="bg-stone-400 p-2 px-4 rounded-md text-stone-50"
          >
            Save
          </button>
        </div>
        <Modal
          ref={modalRef}
          title="Employee Created!"
          footer={""}
          body={
            <p className="mx-1">
              You have successfully created a new employee. Check the{" "}
              <Link
                onClick={() => modalRef.current.close()}
                to="/currentEmployees"
                className="underline underline-offset-1"
              >
                directory
              </Link>{" "}
              to see the new employee
            </p>
          }
        />
      </div>
    </MainLayout>
  )
}

export default RegistrationForm
