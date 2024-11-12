// @desc Get singup

import authSchema from "../middlewares/validator.js"
import { User } from "../models/usersModel.js"
import { hashPassword, comparePassword } from "../utils/hashing.js"

// @route POST /api/v1/auth/signup
const signupController = async (req, res, next) => {
    const { email, password } = req.body

    const { error, value } = authSchema.validate({ email, password })

    if (error) {
        const err = new Error(error.details[0].message)
        err.status = 400
        return next(err)
    }

    const userExists = await User.findOne({ email })

    if (userExists) {
        res.status(401).json({ success: false, message: "user already exists" })
    }
    const hashedPassword = await hashPassword(password, 10)

    const newUser = new User({ email, password: hashedPassword })
    newUser.save()
    // newUser.password = undefined

    res.status(200).json({ message: 'user Created Successfully', data: newUser })
}

// @desc post singin
// @route POST /api/v1/auth/login
const signinController = async (req, res, next) => {
    const { email, password } = req.body
    const { error, value } = authSchema.validate({ email, password })

    if (error) {
        const err = new Error(error.details[0].message)
        err.status = 400
        return next(err)
    }

    const userExists = await User.findOne({ email }).select("+password")
    console.log("exiting user: ", userExists)

    if (!userExists) {
        res.status(401).json({ success: false, message: "user dos not exists" })
    }

    const passwordMatched = await comparePassword(password, userExists.password)
    // console.log(passwordMatched)

    if (!passwordMatched) {
        return res.status(401).json({ success: false, message: "Invalid credentials" })
    }
    userExists.password = undefined

    res.status(200).json({ message: 'user logged In successfully', data: userExists })
}
// @desc DELETE User
// @route DELETE /api/v1/auth/deleteuser/:id
const deleteUser = async (req, res, next) => {
    const id = req.params.id

    const userExists = await User.findOne({ _id: id })

    if (!userExists) {
        res.status(401).json({ success: false, message: "user dos not exists" })
    }

    const user = await User.findOneAndDelete({ _id: id })

    res.json({ message: 'user deleted ..', data: user })
}


const getAllUsers = async (req, res, next) => {
    const users = await User.find({}).select("+password")
    res.status(200).json({ message: 'all users', data: users })
}

export { signinController, signupController, getAllUsers, deleteUser }