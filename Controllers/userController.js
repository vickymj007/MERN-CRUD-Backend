import Contact from "../Models/contactModel.js"


//Get users
export const getAllUsers = async(req,res,next)=>{
    try {
        const userData = await Contact.find()
        res.status(200).json(userData)
    } catch (error) {
        next(error)
    }
}

export const getUserByID = async(req,res,next)=>{
    try {
        const userData = await Contact.findById(req.params.id)
        if(!userData){
            throw Error("Invalid user ID")
        }
        res.status(200).json(userData)
    } catch (error) {
        next(error)
    }
}

export const createUser = async(req,res,next)=>{
    try {
        const user = await Contact.create(req.body)

        if(!user){
            throw Error("Unable to create new user")
        }
        res.status(201).json(user)
    } catch (error) {
        // if(error.code == 11000){
        //     error.message = "Contact already exist, try a differnt one"
        //     next(error)
        //     return
        // }
        console.log(error.message);
        console.log(error.stack);
        next(error)
    }
}

export const updateUser = async(req,res,next)=>{
    try {
        const updatedUser = req.body
        const {id} = req.params

        const result = await Contact.findByIdAndUpdate(id,updatedUser,{new:true})
        
        res.status(201).json({
            success:true,
            updatedUser:result
        })
    } catch (error) {
        next(error)
    }
}

export const deleteUser = async(req,res,next)=>{
    try {
        const {id} = req.params

        const result = await Contact.findByIdAndDelete(id)
        res.status(201).json({
            success:true,
            deletedUser:result
        })
    } catch (error) {
        next(error)
    }
}