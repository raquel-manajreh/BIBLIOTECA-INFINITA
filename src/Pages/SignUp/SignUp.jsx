import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../components/AuthRoutes/firebaseConfig";
import { crearUsuarioSiNoExiste } from "../../components/AuthRoutes/firebaseUsers";
import { useNavigate } from "react-router-dom";

import "../SignUp/SignUp.css";

function SignUp({ togglePage }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      navigate("/biblioteca");
      await crearUsuarioSiNoExiste(user.uid);

      alert("¡Te has registrado con éxito!");
    } catch (error) {
      let message = "";

      switch (error.code) {
        case "auth/email-already-in-use":
          message = "Este email ya está registrado.";
          break;
        case "auth/invalid-email":
          message = "El correo no es válido.";
          break;
        case "auth/weak-password":
          message = "La contraseña es demasiado débil - (mínimo 6 caracteres).";
          break;
        default:
          message = "Ocurrió un error inesperado. Inténtalo de nuevo.";
      }

      alert(message);
    }
  };

  return (
    <form onSubmit={handleRegister} className="signup-form">
      <label htmlFor="email">
        Email
        <input
          id="email"
          type="email"
          value={email}
          placeholder="email..."
          onChange={(e) => setEmail(e.target.value)}
        />
      </label>

      <label htmlFor="password">
        Contraseña
        <input
          id="password"
          type="password"
          value={password}
          placeholder="password..."
          onChange={(e) => setPassword(e.target.value)}
        />
      </label>

      <button className="toggle-login" type="submit">¡Regístrate!</button>

      <button type="button" onClick={togglePage} className="toggle-button">
        ¿Ya tienes cuenta? Iniciar sesión
      </button>
    </form>
  );
}

export default SignUp;
