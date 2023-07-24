import { useRef } from "react"
import { Link } from "react-router-dom"
import Modal from "../../components/Modal.jsx"

function RegistrationForm() {
  const modalRef = useRef()

  async function save() {
    // do save

    modalRef.current.open()
  }

  return (
    <div className="relative mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 bg-logo bg-clip-content  bg-no-repeat bg-center h-screen mb-40 backdrop-blur-md">
      <div className="absolute top-0 left-0 w-full h-full bg-white bg-opacity-90 backdrop-filter backdrop-blur-md rounded-md">
        <h1 className="text-center p-4">NEW EMPLOYEE</h1>
        <div className="mb-4">
          <form className="max-w-md mx-auto p-4">
            <label className="block" htmlFor="first-name">
              First Name
              <input
                className="w-full border border-gray-300 rounded-md px-3 py-2 mt-1"
                type="text"
                id="first-name"
              />
            </label>
            <label className="block mt-4" htmlFor="last-name">
              Last Name
              <input
                className="w-full border border-gray-300 rounded-md px-3 py-2 mt-1"
                type="text"
                id="last-name"
              />
            </label>
            <label className="block mt-4" htmlFor="date-of-birth">
              Date of Birth
              <input
                className="w-full border border-gray-300 rounded-md px-3 py-2 mt-1"
                type="date"
                id="date-of-birth"
              />
            </label>
            <label className="block mt-4" htmlFor="start-date">
              Start Date
              <input
                className="w-full border border-gray-300 rounded-md px-3 py-2 mt-1"
                type="date"
                id="start-date"
              />
            </label>
            <fieldset className="border border-gray-300 rounded-md p-4 mt-4">
              <legend className="mb-2 font-medium">Address</legend>

              <label className="block" htmlFor="street">
                Street
                <input
                  className="w-full border border-gray-300 rounded-md px-3 py-2 mt-1"
                  type="text"
                  id="street"
                />
              </label>
              <label className="block mt-4" htmlFor="city">
                City
                <input
                  className="w-full border border-gray-300 rounded-md px-3 py-2 mt-1"
                  type="text"
                  id="city"
                />
              </label>
              <label className="block mt-4" htmlFor="state">
                State
                <select
                  className="w-full border border-gray-300 rounded-md px-3 py-2 mt-1"
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
              <label className="block mt-4" htmlFor="zip-code">
                Zip Code
                <input
                  className="w-full border border-gray-300 rounded-md px-3 py-2 mt-1"
                  type="number"
                  id="zip-code"
                />
              </label>
            </fieldset>

            <label className="block mt-4 pb-5" htmlFor="department">
              Department
              <select
                className="w-full border border-gray-300 rounded-md px-3 py-2 mt-1"
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

            <Modal
              ref={modalRef}
              title="Employee Created!"
              body={
                <>
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
                </>
              }
              footer={""}
            />
            <button
              type="button"
              onClick={() => save()}
              className="bg-stone-400 p-2 px-4 rounded-md text-stone-50"
            >
              Save
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default RegistrationForm
