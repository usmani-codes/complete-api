import express from "express";
import { deleteUser, getAllUsers, signinController, signupController } from "../controllers/authController.js";

const router = express.Router()

router.post('/signup', signupController)
router.post('/signin', signinController)
router.delete('/deletuser/:id', deleteUser)
router.get("/get/users", getAllUsers)

export default router