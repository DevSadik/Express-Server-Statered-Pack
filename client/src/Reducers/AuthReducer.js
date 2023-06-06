

export const AuthReducer = ( state, { type, payload }) => {
    switch (type) {
        case "USER_LOGIN_SUCCESS":
            return {
                isLoggedIn : true,
                user : payload
            }
        case "LOGOUT_USER":
            return {
                isLoggedIn : false,
                user : {}
            }    
        default:
            return state;
    }
}