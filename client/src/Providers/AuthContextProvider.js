import AuthContext from "../Context/AuthContext";
import Cookies from "js-cookie";
import { useReducer } from "react";
import { AuthReducer } from "../Reducers/AuthReducer";


export const INITIAL_STATE = {
    isLoggedIn : false ,
    user : {} ,
};

const AuthContextProviders = ({ children }) => {

    const [ state , dispatch ] = useReducer( AuthReducer, INITIAL_STATE)

    return (
        <AuthContext.Provider 
            value={{
                isLoggedIn : state.isLoggedIn,
                user : state.user,
                dispatch
            }}
        >
            { children }
        </AuthContext.Provider>
    )
}

export default AuthContextProviders;