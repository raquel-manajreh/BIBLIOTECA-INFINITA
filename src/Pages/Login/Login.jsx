import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../components/AuthRoutes/firebaseConfig";

import "../Login/Login.css";


function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert('¡Login exitoso!');
    } catch (error) {
      console.error(error.message);
      alert('Error al iniciar sesión');
    };
  }


  return (
    //El ACTION del form especifica la URL donde se enviarán los datos del formulario cuando se envíe. Sin él, la información no sabe a dónde ir
    <form onSubmit={handleLogin}>
      <label htmlFor="email">Email
        <input id="email" type="email" value={email} placeholder="email..." onChange={e => setEmail(e.target.value)}/>
      </label>

      <label htmlFor="password">Contraseña
        <input id="password" type="password" value={password} placeholder="password..." onChange={e => setPassword(e.target.value)}/>
      </label>

      <button type="submit">Iniciar Sesión</button>
    </form>
  )
}

export default Login;
