import { useContext } from "react";
import { Navigate } from "react-router-dom";
import AuthContext from "../../Context/AuthContext";



const AuthenticateUser = ({children}) => {
    const { isLoggedIn } = useContext( AuthContext );
    return isLoggedIn ? children : <Navigate to={'/login'}/>

    // if( !token ){
    //    return <Navigate to={'/login'}/>
    // }else{
    //     return children
    // }
}


export default AuthenticateUser;