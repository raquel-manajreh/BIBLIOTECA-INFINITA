import { initializeApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
// import { getAnalytics } from "firebase/analytics"; // Solo si lo necesitas

const firebaseConfig = {
  apiKey: "AIzaSyCVEWr4G048VCfn4EcAP9Hi_sf_B6zcT6E",
  authDomain: "biblioteca-infinita-356ba.firebaseapp.com",
  projectId: "biblioteca-infinita-356ba",
  storageBucket: "biblioteca-infinita-356ba.firebasestorage.app",
  messagingSenderId: "45766090394",
  appId: "1:45766090394:web:9f45bb251ef48673fa0923",
  measurementId: "G-4DL9WH7L74"
};

// ✅ Inicializar Firebase solo si no está ya inicializado
const app = getApps().length === 0 
  ? initializeApp(firebaseConfig) 
  : getApps()[0];

// Exportar solo los servicios que usas
const auth = getAuth(app);
// const analytics = getAnalytics(app); // Solo si vas a usarlo

export { auth };
