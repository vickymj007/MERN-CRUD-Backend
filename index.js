import express from "express";
import dotenv from 'dotenv'
import mongoose from "mongoose";
import userRouter from "./Routes/userRoute.js";
import cors from 'cors'

//Configuring ENV files
dotenv.config()

//Initializing express server
const app = express()
app.use(express.json())
app.use(cors())
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
    // const error = new Error()
    err.status = err.status || 400
    err.message = err.message || "Something went wrong"

    res.status(err.status).json({
        success : false,
        message: err.message,
        stack: err.stack
    })
})


//Listening to request
app.listen(PORT,()=>{
    console.log("Server is running");
    connectDB()
})