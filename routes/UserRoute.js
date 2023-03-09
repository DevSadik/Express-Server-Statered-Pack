import express from "express"
import { createUser, deleteSingleUser, editSingleUser, getAllUsers, getSingleUser, userLogin, userRegister } from "../controllers/User.js";
import adminMiddleware from "../middlewares/adminMiddleware.js";
import authMiddleware from "../middlewares/authMiddleware.js";
import userMiddleware from "../middlewares/userMiddleware.js";



const router = express.Router();

router.route('/').get( adminMiddleware, getAllUsers ).post( adminMiddleware, createUser )
router.route('/:id').get( userMiddleware, getSingleUser ).put( userMiddleware, editSingleUser ).patch( userMiddleware, editSingleUser ).delete( userMiddleware, deleteSingleUser )

// Auth route
router.post("/login", userLogin)
router.post("/register", userRegister)

export default router;