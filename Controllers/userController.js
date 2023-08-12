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
        if(!req.body){
            throw Error("Request body is missing")
        }

        const user = await Contact.create(req.body)

        if(!user){
            throw Error("Unable to create new user")
        }
        res.status(201).json(user)
    } catch (error) {

        next(error)
    }
}

export const updateUser = async(req,res,next)=>{
    try {
        const updatedUser = req.body
        const {id} = req.params
        if(!id) throw Error("Contact ID is needed")
        if(!updatedUser) throw Error("Request body is missing")

        const result = await Contact.findByIdAndUpdate(id,updatedUser,{new:true})

        if(!result)throw Error("Unable to update Contact")
        
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
        if(!id) throw Error("Contact ID is needed")

        const result = await Contact.findByIdAndDelete(id)

        if(!result)throw Error("Unable to Delete Contact")

        res.status(201).json({
            success:true,
            deletedUser:result
        })
    } catch (error) {
        next(error)
    }
}