import express from "express"
import {  createUser, deleteSingleUser, editSingleUser, getAllUsers, getSingleUser, userLogin, userRegister, getLoggedInUser, verifyUserAccount, forgotPassword, resetPassword, resetUserInfo } from "../controllers/User.js";
import adminMiddleware from "../middlewares/adminMiddleware.js";
import authMiddleware from "../middlewares/authMiddleware.js";
import userMiddleware from "../middlewares/userMiddleware.js";



const router = express.Router();

// Auth route
router.post("/login", userLogin)
router.post("/register", userRegister)
router.get("/me", getLoggedInUser)
router.post("/verify", verifyUserAccount)
router.post("/forgot-password", forgotPassword)
router.post("/info-password/:token", resetUserInfo)
router.post("/reset-password", resetPassword)

// public route
router.route('/').get( adminMiddleware, getAllUsers ).post( createUser )
router.route('/:id').get( userMiddleware, getSingleUser ).put( userMiddleware, editSingleUser ).patch( userMiddleware, editSingleUser ).delete( userMiddleware, deleteSingleUser )



export default router;