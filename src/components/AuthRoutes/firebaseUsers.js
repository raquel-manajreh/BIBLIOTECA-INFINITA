import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "./firebaseConfig";

export const crearUsuarioSiNoExiste = async (uid) => {
  const userRef = doc(db, "users", uid);
  const docSnap = await getDoc(userRef);

  if (!docSnap.exists()) {
    await setDoc(userRef, {
      books: {
        favoritos: [],
        leidos: [],
        enCurso: [],
        proximaHistoria: []
      }
    });
    console.log("Documento creado en Firestore");
  } else {
    console.log("El documento ya existe en Firestore");
  }
};
