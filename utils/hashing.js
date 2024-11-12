import bcrypt from "bcryptjs/dist/bcrypt.js"

const hashPassword = (value, salt) => bcrypt.hash(value, salt)

const comparePassword = (value, hashedValue) => bcrypt.compare(value, hashedValue)

export { hashPassword, comparePassword }