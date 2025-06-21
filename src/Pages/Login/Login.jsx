import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../components/AuthRoutes/firebaseConfig"; //Auth -> para trabajar con los usuarios  |  db -> Para trabajar con la database de firestore
import { crearUsuarioSiNoExiste } from "../../components/AuthRoutes/firebaseUsers";
import {doc, getDoc} from "firebase/firestore"; // doc ->crea la referencia a un documento en firestore |  getDoc -> recupera los datos de ese documento desde la bbdd
import { useNavigate } from "react-router-dom";

import "../Login/Login.css";


function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState(""); //Para guardar los valores que escribe el usuario en el formulario
  const navigate = useNavigate(); // Creamos la const navigate para dar funcionalidad a la funcion useNavigate cuando queramos usarlo

  const handleLogin = async (e) => {
    e.preventDefault(); //Para que la pagina se renderice una vez y no se renderice otra vez cuando se envien los datos del formulario
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      // alert('¡Login exitoso!');

      const uid = userCredential.user.uid;

      navigate("/biblioteca"); //Primero quiero que navegue a la biblioteca y luego cargue todo, para que se vea más rápido y directo el acceso

      await crearUsuarioSiNoExiste(uid);

      const userDocRef = doc(db, "users", uid);
      const userDoc = await getDoc(userDocRef);

      if (userDoc.exists()) {
        const booksData = userDoc.data().books;
        console.log("Libros del usuario:", booksData);
      } else {
        console.log("No se encontró el documento del usuario");
      }

      // navigate("/biblioteca"); Aquí ponemos si queremos que cargue todo y luego navegue a la biblioteca.

    } catch (error) {
      console.error(error.message);
      alert('Error al iniciar sesión');
    }
  };


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
