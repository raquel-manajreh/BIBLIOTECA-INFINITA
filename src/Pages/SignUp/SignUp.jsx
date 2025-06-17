import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../components/AuthRoutes/firebaseConfig";


import "../SignUp/SignUp.css";



function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


    const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword (auth, email, password);
      alert('¡Has sido registrado!');
    } catch (error) {
      console.error(error.message);
      alert('Error de registro');
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
