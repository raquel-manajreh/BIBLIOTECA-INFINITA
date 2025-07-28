import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../components/AuthRoutes/firebaseConfig";
import { crearUsuarioSiNoExiste } from "../../components/AuthRoutes/firebaseUsers";
import { doc, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

import "../Login/Login.css";

function Login({ togglePage }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const uid = userCredential.user.uid;

      navigate("/biblioteca");

      await crearUsuarioSiNoExiste(uid);

      const userDocRef = doc(db, "users", uid);
      const userDoc = await getDoc(userDocRef);

      if (userDoc.exists()) {
        const booksData = userDoc.data().books;
        console.log("Libros del usuario:", booksData);
      } else {
        console.log("No se encontró el documento del usuario");
      }
    } catch (error) {
      console.error(error.message);
      alert("Error al iniciar sesión");
    }
  };

  return (
    <form onSubmit={handleLogin} className="login-form">
        <label className="text-register" htmlFor="email">
          Email
          <input
            id="email"
            type="email"
            value={email}
            placeholder="email..."
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label className="text-register" htmlFor="password">
          Contraseña
          <input
            id="password"
            type="password"
            value={password}
            placeholder="password..."
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>

      <button className="toggle-login" type="submit">Iniciar Sesión</button>

      <button type="button" onClick={togglePage} className="toggle-button">
        ¿No tienes cuenta? Crear una
      </button>
    </form>
  );
}

export default Login;
