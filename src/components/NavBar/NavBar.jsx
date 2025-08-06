import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext";
import { signOut } from "firebase/auth";
import { auth } from "../AuthRoutes/firebaseConfig";
import "./NavBar.css";
import { useState } from "react";

function NavBar () {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/login"); // redirige después de cerrar sesión
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  const oppenMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const closeMenu = () =>{
    setMenuOpen(false);
  };

  return (
    <header>
      <nav className='navBar'>

      <div className="hamburger" onClick={oppenMenu}>
      <i className="fa-solid fa-bars"></i>
      </div>

        <ul className={`ulList ${menuOpen ? "open" : ""}`}>
          <li className='logo'>
            <i className="fa-regular fa-bookmark"></i>
            BIBLIOTECA INFINITA
          </li>

          <li><Link to="/" onClick={closeMenu}>HOME</Link></li>

          {user && <li><Link to="/biblioteca" onClick={closeMenu} >BIBLIOTECA</Link></li>}

          {!user && <li><Link to="/login" onClick={closeMenu} >LOGIN</Link></li>}
          {!user && <li><Link to="/signup" onClick={closeMenu} >REGISTRO</Link></li>}

          {user && (
            <li>
              <button onClick={handleLogout} className="logoutBtn">CERRAR SESIÓN</button>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
}

export default NavBar;
