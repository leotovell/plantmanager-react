import { Routes, Route } from "react-router-dom"
import Home from "./pages/Home";
import Features from "./pages/Features";

const App = () => {
  return (
    <>
    <Routes>
        <Route path="/" Component={<Home />} />
        <Route path="/features" Component={<Features />} />
      </Routes>
    </>
  )
}

export default App;