import User from "../models/UsersModel.js"
import bcrypt from "bcryptjs"
import createError from "./createError.js";
import jwt from "jsonwebtoken"

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
        const data = await User.findById(id)
        res.status(200).json(data)
    } catch (error) {
        next(error)
    }
}

/**
 * @method PUT/PACTH
 * @access public
 * @route /api/singleuser/:id
 */

export const editSingleUser = async ( req, res ) => {
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
    try {
        const user = await User.create(req.body);
        res.status(200).json(user)
    } catch (error) {
        next(error)
    }
}