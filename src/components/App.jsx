import NavBar from "./NavBar/NavBar";
import Home from "../Pages/Home/Home";
import { Route, Routes } from "react-router-dom";
import Login from "../Pages/Login/Login";
import SignUp from "../Pages/SignUp/SignUp";
import Biblioteca from "../Pages/Biblioteca/Biblioteca";
import AuthRoute from "./AuthRoutes/AuthRoute";


import '../css/App.css';




function App() {

  return (
    <div>
      <NavBar /> 

      <Routes >
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/biblioteca" element={<AuthRoute><Biblioteca /></AuthRoute>} />
      </Routes>
    </div>
  );
}

export default App;




//IMPORTANTE - SIEMPRE comprobar que se IMPORTE el componente

//Retornar UN SOLO elemento en la funcion del componente, es decir, entre () retornamos lo que queremos que se vea en la pagina web para que se muestre como UN SÓLO elemento