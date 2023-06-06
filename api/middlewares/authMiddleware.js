import jwt from "jsonwebtoken"



const authMiddleware = (req, res, next) => {
    
    try {
        const token = req.cookies.access_token
    
        if( !token ){
            return res.json("You are not authenticated user")
        }

        // jwt token match
        const login_user = jwt.verify(token, process.env.JWT_SECRET);

        if(!login_user){
            return res.status(401).json("Token invalid")
        }

        // if(login_user !== req.params.id){
        //     return next(createError("401", "Your not user"))
        // }

        if(login_user ){
            req.user = login_user;
            next()
        }

    } catch (error) {
        next(error)
    }

}

export default authMiddleware;