import mongoose from "mongoose";

// Mongodb Connection

const mongodbConnection = async () => {
    try {
        
        const connection = "mongodb://localhost:27017/starter"
        await mongoose.connect(connection)
        console.log(`Mongodb connected succsess fully`.bgGreen.black);

    } catch (error) {
        console.log(error);
    }
}



// export connection
export default mongodbConnection;