import express from "express";
import dotenv from 'dotenv'
import mongoose from "mongoose";
import userRouter from "./Routes/userRoute.js";

//Configuring ENV files
dotenv.config()

//Initializing express server
const app = express()
app.use(express.json())

//ENV Variables
const PORT = process.env.PORT
const MONGO_URL = process.env.MONGO_URL


mongoose.set('strictQuery',false)

//DB Connection
const connectDB = async()=>{
    try {
        await mongoose.connect(MONGO_URL)
        console.log("Connected to MongoDB");
    } catch (error) {
        console.log("Unable to connect MongoDB",error.message);
    }
}

//Sample get request
app.get('/', (req,res)=>{
    try {
        res.status(200).send("Home Page")
    } catch (error) {
        console.log(error.message);
    }
})


//routes
app.use('/api/users', userRouter)

//Handling errors
app.use((err,req,res,next)=>{
    const error = new Error()
    error.status = err.status || 400
    error.message = err.message || "Something went wrong"

    res.status(error.status).json({
        success : false,
        message: error.message,
        stack: error.stack
    })
})


//Listening to request
app.listen(PORT,()=>{
    console.log("Server is running");
    connectDB()
})