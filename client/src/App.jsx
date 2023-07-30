import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import "./App.css"
import Home from "./pages/1.home/Home.jsx"
import RegistrationForm from "./pages/2.registrationform/RegistrationForm.jsx"
import CurrentEmployees from "./pages/3.currentEmployees/CurrentEmployees.jsx"

function App() {
  return (
    <div className="min-h-screen">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/registrationForm" element={<RegistrationForm />} />
          <Route path="/currentEmployees" element={<CurrentEmployees />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
