import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext";
import { signOut } from "firebase/auth";
import { auth } from "../AuthRoutes/firebaseConfig";
import "./NavBar.css";

function NavBar () {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/login"); // redirige después de cerrar sesión
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  return (
    <header>
      <nav className='navBar'>
        <ul className='ulList'>
          <li className='logo'>
            <i className="fa-regular fa-bookmark"></i>
            BIBLIOTECA INFINITA
          </li>

          <li><Link to="/">HOME</Link></li>

          {user && <li><Link to="/biblioteca">BIBLIOTECA</Link></li>}

          {!user && <li><Link to="/login">LOGIN</Link></li>}
          {!user && <li><Link to="/signup">REGISTRO</Link></li>}

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
