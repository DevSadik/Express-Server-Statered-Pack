import { useContext } from "react";
import { Navigate } from "react-router-dom";
import AuthContext from "../../Context/AuthContext";



const AuthRedirectUser = ({children}) => {
    const { isLoggedIn } = useContext( AuthContext );
    return isLoggedIn ? <Navigate to={'/'} /> : children 

    // if( !token ){
    //    return <Navigate to={'/login'}/>
    // }else{
    //     return children
    // }
}


export default AuthRedirectUser;