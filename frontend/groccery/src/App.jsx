import Addproduct from "./Components/Addproduct"
import Navbar from "./Components/Navbar"
import Productpage from "./Components/Productpage"
import { Route, Routes } from "react-router-dom"

function App() {

  return (
    <>
      <div className='min-h-screen bg-[#030637] w-full grid grid-cols-[1fr_3fr] gap-2 flex-row p-5'>
        <Navbar />
        <Routes>
          <Route path="/" element={<Productpage />} />
          <Route path="/add" element={<Addproduct />} />
        </Routes>
      </div>
    </>
  )
}

export default App
