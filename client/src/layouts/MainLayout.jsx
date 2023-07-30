import Navbar from "../components/header/Navbar.jsx"
import Footer from "../components/footer/Footer.jsx"

const MainLayout = ({ children }) => {
  return (
    <div className="flex flex-col">
      <div className="relative">
        <Navbar />
        <div className="bg-logo bg-content bg-no-repeat bg-center bg-opacity-30 h-fit min-[80.5vh] backdrop-blur-sm">
          <div className="relative w-full bg-white bg-opacity-90 backdrop-filter rounded-md">
            {children}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default MainLayout
