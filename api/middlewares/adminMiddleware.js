import createError from "../controllers/createError.js";
import jwt from 'jsonwebtoken';



// check user is authenticated or not 
export const adminMiddleware = (req, res, next) => {

    try {
        const token = req.cookies.access_token;

        // chekc token 
        if( !token ){
            return next(createError(401, "You are not authenticated"));
        }

        // if logged in 
        const login_user = jwt.verify(token, process.env.JWT_SECRET);

        if( !login_user ){
            return next(createError(401, "Invalid token"));
        }

        if( !login_user.isAdmin ){ 
            return next(createError(401, "Only admin can access this fetures"));
        }

        if( login_user ){
            req.user = login_user;
            next();
        }

            
    } catch (error) {
        return next(error);
    }




}

export default adminMiddleware;