import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Login from "../../Pages/Login/Login";
import SignUp from "../../Pages/SignUp/SignUp";

import "./BookLogin.css";

function BookLogin() {
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();

  const togglePage = () => {
    setIsLogin(!isLogin);
    navigate(isLogin ? "/signup" : "/login");
  };

  return (
    <div className="book-container">
      <div className="book">
        <div className="page left">
          {isLogin ? <Login /> : <div className="register-extra">¡Únete a nosotros!</div>}
        </div>
        <div className="page right">
          {isLogin ? (
            <div className="login-extra">Bienvenido de nuevo</div>
          ) : (
            <SignUp />
          )}
        </div>
      </div>
      <button onClick={togglePage} className="toggle-button">
        {isLogin ? "Crear cuenta" : "Iniciar sesión"}
      </button>
    </div>
  );
}

export default BookLogin;
