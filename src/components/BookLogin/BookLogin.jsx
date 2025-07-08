import { useState } from "react";
import Login from "../../Pages/Login/Login";
import SignUp from "../../Pages/SignUp/SignUp";

import "./BookLogin.css";

function BookLogin() {
  const [isLogin, setIsLogin] = useState(true);

  const togglePage = () => {
    setIsLogin(!isLogin);
  };

  return (
    <div className="book-container">
      <div className="book">
        <div className="page left">
          {isLogin ? (
            <Login togglePage={togglePage} />
          ) : (
            <div className="register-extra">¡Únete a nosotros!</div>
          )}
        </div>
        <div className="page right">
          {isLogin ? (
            <div className="login-extra">Bienvenido de nuevo</div>
          ) : (
            <SignUp togglePage={togglePage} />
          )}
        </div>
      </div>
    </div>
  );
}

export default BookLogin;
