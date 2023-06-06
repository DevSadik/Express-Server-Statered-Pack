import express from "express";
import colors from "colors";

import path from "path";
import cookieParser from "cookie-parser";
import userRoute from './routes/UserRoute.js';
import errorHandeler from "./middlewares/errorHandeler.js";
import mongodbConnection from "./config/db.js";
import cors from 'cors'
import env from "dotenv/config";



// enviroment variables
const port = process.env.PORT ||8000;


// init express
const app = express();

// data manage
app.use(express.json());
app.use(express.urlencoded( {extended : false} ));
app.use(cookieParser())
app.use(cors())

// // static folder
// app.use(express.static("public"));


// Route
app.use( '/api/user', userRoute );

// Custom error handeler
app.use(errorHandeler)


// server listen
app.listen( port , () => {
    // MongoDB Connection
    mongodbConnection()
    console.log(`Server Runing in your port ${port}`.bgBlue.black);
})