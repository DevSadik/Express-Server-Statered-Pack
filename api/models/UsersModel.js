import mongoose from "mongoose";


const UserModel = mongoose.Schema({
    name : {
        type : String,
        trim : true, 
        required : true
    },
    username : {
        type : String,
        trim : true,   
    },
    phone : {
        type : String,
        trim : true, 
        
    },
    email : {
        type : String,
        trim : true, 
        required : true,
        unique : true
    },
    gender : {
        type : String,
        trim : true, 
    },
    bio : {
        type : String,
        trim : true, 
    },
    password : {
        type : String,
        trim : true, 
        required : true
    },
    photo : {
        type : String,
    },
    isVerifed : {
        type : Boolean,
        default : false
    },
    isAdmin : {
        type : Boolean,
        default : false
    },
    status : {
        type : Boolean,
        default : true
    },
},{
    timestamps : true
});


export default mongoose.model('User' , UserModel)