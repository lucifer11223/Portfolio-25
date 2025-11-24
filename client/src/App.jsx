import { Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import About from "./pages/About"
import Landing from "./pages/Landing";
import CustomCursor from "./components/CustomCursor";


const App = () => {

  return (
    <>
      <CustomCursor />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </>
  )
}


export default App
