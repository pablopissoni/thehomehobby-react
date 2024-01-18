import { Route, Routes } from "react-router-dom";
import { HomePage } from "./components/page/HomePage.jsx";
import { NavBar } from "./components/NavBar.jsx";
import { Login } from "./components/page/Login.jsx";


function App() {

  return (
    <div>
        <NavBar/>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login/>} />
        {/* <Route path="/detail/:id" element={<Login/>} /> */}
      </Routes>
    </div>
  );
}

export default App
