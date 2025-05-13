import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const url = process.env.MONGO_DB_URL
const ConnectDB = async ()=>{
    try {
        mongoose.connect(url);
        console.log('MongoDB connected successfully!');
    } catch (err) {
        console.log('MongoDB connection Failed!');
    }
} 

export default ConnectDB;