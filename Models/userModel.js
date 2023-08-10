import mongoose from "mongoose";


const userSchema = mongoose.Schema({
    name:{
        type:String,
        required:[true,"Contact name is required"]
    },
    contact_number:{
        type:Number,
        required:[true,"Contact number is required"],
    },
    relation:{
        type:String,
        required:true
    },
    avatar_id:Number
})

userSchema.set('toJSON',{
    transform:(doc,returnedObject)=>{
        delete returnedObject.__v
    }
})

export default mongoose.model("User",userSchema,"user-database")