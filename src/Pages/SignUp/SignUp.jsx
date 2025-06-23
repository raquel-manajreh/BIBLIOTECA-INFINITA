import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../components/AuthRoutes/firebaseConfig";
import { crearUsuarioSiNoExiste } from "../../components/AuthRoutes/firebaseUsers";
import { useNavigate } from "react-router-dom";

import "../SignUp/SignUp.css";


function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      //1. Registramos al usuario con el email y contraseña
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    navigate("/biblioteca");

    //2. Creamps su documento en firestore si no existe
    await crearUsuarioSiNoExiste(user.uid);
    // console.log("Usuario registrado:", userCredential.user);
    
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
    //El ACTION del form especifica la URL donde se enviarán los datos del formulario cuando se envíe. Sin él, la información no sabe a dónde ir
    //(e) + onChange --> es la función que se ejecuta cuando el valor del campo de entrada cambia

    <form onSubmit={handleRegister}>

      <label htmlFor="email">Email
        <input id="email" type="email" value={email} placeholder="email..." onChange={e => setEmail(e.target.value)} />
      </label>

      <label htmlFor="password">Contraseña
        <input id="password" type="password" value={password} placeholder="password..." onChange={e => setPassword(e.target.value)}/>
      </label>

      <button type="submit">¡Regístrate!</button>
    </form>
  );
}

export default SignUp;
