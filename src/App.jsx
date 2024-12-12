import { Outlet } from "react-router-dom"
import Header from "./mainComponents/Header"
import { useContext } from "react"
import AuthContext from "./context/AuthContext/AuthContext"
import Footer from "./mainComponents/Footer";


function App() {

  const {loading} = useContext(AuthContext);

  if(loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loading loading-bars loading-lg"></span>
      </div>
    );
  }

  return (
    <>
      <Header />
      <main className="max-w-screen-xl mx-auto px-4 min-h-[calc(100vh-300px)]">
        <Outlet />
      </main>
      <Footer />
    </>
  )
}

export default App
