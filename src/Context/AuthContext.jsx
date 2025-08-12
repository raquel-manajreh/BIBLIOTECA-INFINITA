import { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../components/AuthRoutes/firebaseConfig";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);

      if (currentUser) {
        // Guardar la hora actual como última actividad
        localStorage.setItem("lastActivity", Date.now().toString());
      } else {
        localStorage.removeItem("lastActivity");
      }
    });

    return () => unsubscribe();
  }, []);

  // ⏳ Expiración por inactividad (30 min)
  useEffect(() => {
    const updateActivity = () => {
      if (user) {
        localStorage.setItem("lastActivity", Date.now().toString());
      }
    };

    // Eventos que cuentan como actividad
    window.addEventListener("click", updateActivity);
    window.addEventListener("keydown", updateActivity);
    window.addEventListener("mousemove", updateActivity);
    window.addEventListener("scroll", updateActivity);

    const checkInactivity = () => {
      const lastActivity = localStorage.getItem("lastActivity");
      if (lastActivity && user) {
        const now = Date.now();
        const thirtyMinutes = 30 * 60 * 1000;
        if (now - Number(lastActivity) > thirtyMinutes) {
          signOut(auth)
            .then(() => {
              localStorage.removeItem("lastActivity");
              console.log("Sesión cerrada por inactividad");
            })
            .catch((err) => console.error("Error al cerrar sesión", err));
        }
      }
    };

    // Verificar cada minuto
    const interval = setInterval(checkInactivity, 60 * 1000);

    return () => {
      clearInterval(interval);
      window.removeEventListener("click", updateActivity);
      window.removeEventListener("keydown", updateActivity);
      window.removeEventListener("mousemove", updateActivity);
      window.removeEventListener("scroll", updateActivity);
    };
  }, [user]);

  return (
    <AuthContext.Provider value={{ user }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
