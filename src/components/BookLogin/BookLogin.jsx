import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Login from "../../Pages/Login/Login";
import SignUp from "../../Pages/SignUp/SignUp";

import "./BookLogin.css";

function BookLogin() {
  const location = useLocation();
  const [isLogin, setIsLogin] = useState(location.pathname === "/login");

  const togglePage = () => {
    setIsLogin(!isLogin);
  };

  useEffect(() => {
    setIsLogin(location.pathname === "/login");
  }, [location.pathname]);

  return (
    <div className="book-container">
      <div className="book">
        {/* Página izquierda (desktop): formulario login o texto registro */}
        <div className={`page left`}>
          {isLogin ? (
            <Login togglePage={togglePage} />
          ) : (
            <div className="register-extra desktop-only">¡Únete a nosotros!</div>
          )}
        </div>

        {/* Página derecha (desktop): texto login o formulario signup */}
        <div className={`page right`}>
          {isLogin ? (
            <div className="login-extra desktop-only">Bienvenido de nuevo</div>
          ) : (
            <SignUp togglePage={togglePage} />
          )}
        </div>

        {/* Texto + formulario juntos SOLO para móvil */}
        <div className="mobile-only">
          {isLogin ? (
            <>
              <div className="login-extra">Bienvenido de nuevo</div>
              <Login togglePage={togglePage} />
            </>
          ) : (
            <>
              <div className="register-extra">¡Únete a nosotros!</div>
              <SignUp togglePage={togglePage} />
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default BookLogin;
