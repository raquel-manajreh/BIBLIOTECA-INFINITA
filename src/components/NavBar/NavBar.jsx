import { Link } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext";
import "../NavBar/NavBar.css";


function NavBar () {

    const {user} = useAuth();

    return (
    <header >
        <nav className='navBar'>
            <ul className='ulList'>
                <li className='logo'>
                <i className="fa-regular fa-bookmark"></i>
                BIBLIOTECA INFINITA</li>
                <li><Link to="/">HOME</Link></li>
                {user && <li><Link to="/biblioteca">BIBLIOTECA</Link></li>}
                {!user && <li><Link to="/login">LOGIN</Link></li>}
                {!user && <li><Link to="/signup">REGISTRO</Link></li>}
            </ul>
        </nav>
    </header>
    );
}

export default NavBar;