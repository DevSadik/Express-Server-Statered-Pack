import express from "express";
import colors from "colors";
import dotenv from "dotenv";
import path from "path";
import mongodbConnection from "./config/db.js";
import cookieParser from "cookie-parser";
import userRoute from './routes/UserRoute.js';
import errorHandeler from "./middlewares/errorHandeler.js";




// enviroment variables
dotenv.config();
const PORT = process.env.PORT || 8080;



// init express
const app = express();

// data manage
app.use(express.json());
app.use(express.urlencoded( {extended : false} ));
app.use(cookieParser())

// static folder
app.use(express.static("public"));


// Route
app.use( '/api/user', userRoute );

// Custom error handeler
app.use(errorHandeler)


// server listen
app.listen( PORT , () => {
    // MongoDB Connection
    mongodbConnection()
    console.log(`Server Runing in your port ${PORT}`.bgBlue.black);
})