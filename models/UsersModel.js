import mongoose from "mongoose";


const UserModel = mongoose.Schema({
    name : {
        type : String,
        trim : true, 
        required : true
    },
    user_name : {
        type : String,
        trim : true, 
        required : true,
        unique : true
    },
    phone : {
        type : String,
        trim : true, 
        required : true,
        unique : true
    },
    email : {
        type : String,
        trim : true, 
        required : true,
        unique : true
    },
    password : {
        type : String,
        trim : true, 
        required : true
    },
    photo : {
        type : String,
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