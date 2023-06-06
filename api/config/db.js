import mongoose from "mongoose";

// Mongodb Connection

const mongodbConnection = async () => {
    try {
        
        
        await mongoose.connect(process.env.MONGO_STRING)
        console.log(`Mongodb connected succsess fully`.bgGreen.black);

    } catch (error) {
        console.log(error);
    }
}



// export connection
export default mongodbConnection;