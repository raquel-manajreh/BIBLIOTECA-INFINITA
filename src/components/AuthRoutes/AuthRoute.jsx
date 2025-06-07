import {Navigate} from "react-router-dom";
import { useAuth } from "../../Context/AuthContext";

function AuthRoute({children}) {
    const {user} = useAuth(); //Sacándolo del contexto, para usar user donde quiera

    if(!user) return <Navigate to="/login" />;
    return children;
}

export default AuthRoute;
