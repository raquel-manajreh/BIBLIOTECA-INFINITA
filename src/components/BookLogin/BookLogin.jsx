import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

import Login from "../../Pages/Login/Login";
import SignUp from "../../Pages/SignUp/SignUp";

import "./BookLogin.css";

function BookLogin() {
  const location = useLocation();
  const [isLogin, setIsLogin] = useState(location.pathname === "/login");

  const togglePage = () => {
    setIsLogin((prev) => !prev);
  };

  useEffect(() => {
    setIsLogin(location.pathname === "/login");
  }, [location.pathname]);

  return (
    <div className="book-container">
      <motion.div
        className="book"
        key={isLogin ? "login" : "signup"}
        initial={{ rotateY: isLogin ? -180 : 180, opacity: 0 }}
        animate={{ rotateY: 0, opacity: 1 }}
        exit={{ rotateY: isLogin ? 180 : -180, opacity: 0 }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
      >
        {/* Desktop View */}
        <AnimatePresence mode="wait">
          {isLogin ? (
            <>
              <motion.div
                key="login-left"
                className="page left"
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -50, opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Login togglePage={togglePage} />
              </motion.div>

              <motion.div
                key="login-right"
                className="page right"
                initial={{ x: 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: 50, opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="login-extra desktop-only">Bienvenido de nuevo</div>
              </motion.div>
            </>
          ) : (
            <>
              <motion.div
                key="signup-left"
                className="page left"
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -50, opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="register-extra desktop-only">¡Únete a nosotros!</div>
              </motion.div>

              <motion.div
                key="signup-right"
                className="page right"
                initial={{ x: 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: 50, opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                <SignUp togglePage={togglePage} />
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* Mobile View */}
        <div className="mobile-only">
          <AnimatePresence mode="wait">
            {isLogin ? (
              <motion.div
                key="mobile-login"
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -30, opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="login-extra">Bienvenido de nuevo</div>
                <Login togglePage={togglePage} />
              </motion.div>
            ) : (
              <motion.div
                key="mobile-signup"
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -30, opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="register-extra">¡Únete a nosotros!</div>
                <SignUp togglePage={togglePage} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}

export default BookLogin;
