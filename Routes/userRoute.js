import express from "express";
import { createUser, getAllUsers, getUserByID, updateUser, deleteUser } from "../Controllers/userController.js";


const router = express.Router()


router.get("/", getAllUsers)
router.get("/:id",getUserByID)
router.post("/", createUser)
router.put("/:id", updateUser)
router.delete("/:id", deleteUser)


export default router;