import express from "express";
import dotenv from 'dotenv'
import mongoose from "mongoose";
import userRouter from "./Routes/userRoute.js";
import path,{dirname} from 'path'
import { fileURLToPath } from "url";
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
        res.status(200).sendFile(path.join(dirname(fileURLToPath(import.meta.url)),'views/index.html'))
    } catch (error) {
        res.status(500).json({msg:error.message})
    }
})




//routes
app.use('/api/users', userRouter)
app.use('*',(req,res)=>{
    res.status(404).json({msg:"Page you are looking is not found"})
})

//Handling errors
app.use((err,req,res,next)=>{
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