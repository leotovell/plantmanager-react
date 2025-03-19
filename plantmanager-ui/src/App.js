import { Routes, Route, BrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Features from "./pages/Features";
import ProtectedRoute from "./components/ProtectedRoute";
import Plant from "./pages/Plant";
import "react-toastify/ReactToastify.css";
import "@coreui/coreui/dist/css/coreui.min.css";
import { ToastContainer } from "react-toastify";
// import SideNav from "./components/SideNav";
import SideBar from "./components/SideBar";

const App = () => {
  return (
    <>
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css"
        integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH"
        crossOrigin="anonymous"
      />
      {/* <SideNav /> */}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/features"
            element={
              <ProtectedRoute>
                <Features />
              </ProtectedRoute>
            }
          />
          <Route path="/plant/:id" element={<Plant />} />
          <Route path="/login" element={<Login />} />
        </Routes>
        <ToastContainer position="top-center" />
      </BrowserRouter>
    </>
  );
};

export default App;
