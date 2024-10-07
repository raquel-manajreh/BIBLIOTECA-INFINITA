import './NavBar.css';


function NavBar () {
    return <header >
        <nav className='navBar'>
            <ul className='ulList'>
                <li className='logo'>
                <i className="fa-regular fa-bookmark"></i>
                BIBLIOTECA INFINITA</li>
                <li className='home'>HOME</li>
            </ul>
        </nav>
    </header>
}

export default NavBar;

//Para añadir clases para luego el scss - "classname", e importar el archivo scss AQUI para vincularlo