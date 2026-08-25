import mongoose from "mongoose";
import dns from "node:dns";

dns.setServers(["8.8.8.8", "8.8.4.4"]);

//Function to connect to the MongoDB database
const connectDB = async ()=>{
    mongoose.connection.on('connected',()=>console.log('Database connected'));
    await  mongoose.connect(`${process.env.MONGODB_URI}/job-portal`)
}

export default connectDB;