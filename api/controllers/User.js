import User from "../models/UsersModel.js"
import Token from "../models/TokenModel.js"
import bcrypt from "bcryptjs"
import createError from "./createError.js";
import jwt from "jsonwebtoken"
import { SendEmail } from "../utility/SendEmail.js";
import { CreateToken } from "../utility/CreateToken.js";
import { json } from "express";


/**
 * @method GET
 * @access public
 * @route /api/users
 */

export const getAllUsers = async ( req, res, next ) => {
    try {
        const user = await User.find();

        if( !user ){
            return next(createError("400", "No User Avaialabel"))
        }

        res.status(200).json(user)
    } catch (error) {
        next(error)
    }
}

/**
 * @method POST
 * @access public
 * @route /api/user
 */

export const createUser = async ( req, res, next ) => {
    
    const salt = await bcrypt.genSalt(10);
    const hash_pass = await bcrypt.hash(req.body.password, salt)
    try {
        const data = await User.create({...req.body, password : hash_pass})
        await SendEmail(user.email, 'Intagram', `<span>Welcome to our instgram</span>`)
        res.status(201).json(data)
    } catch (error) {
       next(error)
    }
}

/**
 * @method GET
 * @access public
 * @route /api/singleuser/:id
 */

export const getSingleUser = async ( req, res, next ) => {
    const {id} = req.params
    try {
        const data = await User.findById(id);
        res.status(200).json(data);
    } catch (error) {
        next(error)
    }
}

/**
 * @method PUT/PACTH
 * @access public
 * @route /api/singleuser/:id
 */

export const editSingleUser = async ( req, res, next ) => {
    const {id} = req.params
    try {
        const data = await User.findByIdAndUpdate(id, { new : true})
        res.status(200).json(data)
    } catch (error) {
        next(error)
    }
}

/**
 * @method DELETE
 * @access public
 * @route /api/deleteuser/:id
 */

export const deleteSingleUser = async ( req, res ) => {
    const {id} = req.params
    try {
        const data = await User.findByIdAndDelete(id)
        res.status(200).json(data);
        
    } catch (error) {
        next(error)
    }
}

/**
 * @method POST
 * @access public
 * @route /api/user/login
 */

export const userLogin = async (req, res, next) => {
    // get body data 


    try {
        
        // find user 
        const login_user = await User.findOne({ email : req.body.email });

        // check user exists or not 
        if( !login_user ){
            return next(createError(404, "User not found"));
        }

        // check password
        const passwordCheck = await bcrypt.compare(req.body.password, login_user.password);

        // password handle 
        if( !passwordCheck ){
            return next(createError(404, "Wrong password"));
        }

        // create a token
        const token = jwt.sign({ id : login_user._id, isAdmin : login_user.isAdmin }, process.env.JWT_SECRET );

        // login user info 
        const { password, isAdmin,  ...login_info } = login_user._doc; 

        res.cookie("access_token", token).status(200).json({
            token :  token,
            user : login_info, 
        });

    } catch (error) {
        next(error)
    }
   
}

/**
 * @method POST
 * @access public
 * @route /api/user/register
 */
export const userRegister = async ( req, res, next ) => {
    // Password hash
    const salt = await bcrypt.genSalt(10);
    const hash_pass = await bcrypt.hash(req.body.password, salt);

    try {
        const user = await User.create({...req.body, password : hash_pass});

        // create token
        const token = CreateToken({id : user.id});

        // token store in server
       await Token.create({ userId : user.id , token })


        // Send verify link by email
        const verify_link = `http://localhost:3000/user/${user._id}/verify/${token}`
        await SendEmail(user.email, 'Email verification', `${verify_link}`)
        res.status(200).json(user)
    } catch (error) {
        next(error)
    }
}


/**
 * @method GET
 * @access auth
 * @route /api/user/me
 */
export const getLoggedInUser = async(req, res, next) => {

    try {
        
        const bearer_token = req.headers.authorization;
        if( bearer_token ){

            let token = ''
            token = bearer_token.split(' ')[1];
            const user_loggedin = jwt.verify( token , process.env.JWT_SECRET );

            if( !token ){
                next(createError('401', 'Invalid Token'))
            }

            if( user_loggedin ){
                const user = await User.findById(user_loggedin.id)
                res.status('200').json(user)
            }

        }
    } catch (error) {
        next(error)
    }

    
}


export const verifyUserAccount = async(req, res, next) => {
    try {
        const {id , token} = req.body;

        const verify = await Token.findOne({ userId : id, token : token });

        if( !verify ){
            createError('404', 'User not verifed')
        }else{
            await User.findByIdAndUpdate(id , {
                isVerifed : true
            },{ new : true })
            res.status(200).json({ message : 'Account verify success'});
            verify.remove()
        }

        
    } catch (error) {
        console.log(error);
    }
}

export const forgotPassword = async( req, res, next ) => {
    try {
        const {email} = req.body;
        
       const recover_user = await User.findOne({ email });
       
       if( !recover_user ){
        res.status(404).json({ message : 'User do not match'})
       }
       
       if( recover_user ){
        const token = CreateToken({ id : recover_user._id}, '5m')

        await Token.create({ userId : recover_user.id , token : token})
        const verify_url = `http://localhost:3000/user/${token}`
        SendEmail(recover_user.email, 'Password Reset', verify_url)
        res.status(200).json({ message : 'Please check your email'})
       }

        
    } catch (error) {
        next(error)
    }
}




export const resetPassword = async (req, res, next) => {
    try {
        // Get form data for token & password
        const {token, password } = req.body;
        
        // Token to filter user id or user info
        // const [header, payload, signature] = token.split('.');
        // const decodedPayload = atob(payload);
        // const jsonPayload = JSON.parse(decodedPayload);
        // const user_id = jsonPayload.id;

        const {id} = jwt.verify( token , process.env.JWT_SECRET)
    

        // Password hash
        const salt = await bcrypt.genSalt(10);
        const hash_pass = await bcrypt.hash(password, salt);

        // Get user & update password
        const user_info = await User.findByIdAndUpdate(id, {
            password : hash_pass
        })
        
        res.status(200).json({
            message : " User password changed successfull "
        })
       


    } catch (error) {
        next(error)
    }
}