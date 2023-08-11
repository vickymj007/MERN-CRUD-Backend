import mongoose from "mongoose";


const contactSchema = mongoose.Schema({
    name:{
        type:String,
        required:[true,"Contact name is required"]
    },
    contact_number:{
        type:Number,
        required:[true,"Contact number is required"],
        unique:true
    },
    relation:{
        type:String,
        required:true
    },
    avatar_id:Number
})

contactSchema.set('toJSON',{
    transform:(doc,returnedObject)=>{
        delete returnedObject.__v
    }
})

export default mongoose.model("Contact",contactSchema)