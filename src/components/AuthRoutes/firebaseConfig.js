// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// (Solo necesitas analytics si vas a usarlo, puedes quitarlo si no)
import { getAnalytics } from "firebase/analytics";

// Tu configuración personalizada
const firebaseConfig = {
  apiKey: "AIzaSyAGXWpo6I8JJJE9RJjH-jKZYSJbQjDwvEU",
  authDomain: "biblioteca-infinita-d2df9.firebaseapp.com",
  projectId: "biblioteca-infinita-d2df9",
  storageBucket: "biblioteca-infinita-d2df9.appspot.com", // ojo: aquí había un error en el dominio
  messagingSenderId: "225825456591",
  appId: "1:225825456591:web:653af47d2208018eda92ba",
  measurementId: "G-L4BD59PMCX"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);

// Exporta los servicios que vayas a usar
const auth = getAuth(app);
// const analytics = getAnalytics(app); // Solo si vas a usarlo

export { auth };
