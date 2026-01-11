import { log } from "console";
import mongoose from "mongoose";

const connectDB = async () =>{
    await mongoose.connect(process.env.MONGO_URI as string);
    console.log("Mongo DB connected");
    
}

export default connectDB