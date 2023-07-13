import mongoose from "mongoose";


const userSchema = mongoose.Schema({
    name:{
        type:String,
        required:[true,"Username is required"]
    },
    email:{
        type:String,
        required:[true,"Email is required"],
        unique:[true,"Email already exist"]
    }
})

userSchema.set('toJSON',{
    transform:(doc,returnedObject)=>{
        delete returnedObject.__v
    }
})

export default mongoose.model("User",userSchema,"user-database")