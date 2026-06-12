import { prisma } from "../lib/prisma.js"
import { body, validationResult } from "express-validator"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

const validateRegister = [
    body("fullName").trim()
    .isLength({min: 2}).withMessage("Full name must have at least 2 characters."),
    body("email").trim()
    .isEmail().withMessage("Email must be a valid email."),
    body("password").trim()
    .isLength({min: 5}).withMessage("Password must have at least 5 characters.")
]

export const postRegister = [
    validateRegister,
    async (req, res, next) => {

        try {

            const { fullName, email, password } = req.body

            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                const error = new Error(errors.array()[0].msg)
                error.status = 400
                throw error
            }

            const hashedPassword = await bcrypt.hash(password, 10)

            const newUser = await prisma.user.create({
                data: {
                    fullName: fullName,
                    email: email,
                    password: hashedPassword
                }
            })

            const token = jwt.sign(
                { id: newUser.id }, 
                process.env.JWT_SECRET, 
                { expiresIn: '1d' }
            );

            res.status(200).json({
                message: "User registred successfuly.",
                token: `Bearer ${token}`
            })

        } catch (err) {
            next(err)
        }   
    }
]

export const postLogin = async (req, res, next) => {
    try {
        const { email, password } = req.body

        const user = await prisma.user.findUnique({
            where: {
                email: email
            }
        })

        if (!user) {
            const error = new Error("Incorrect username or password.")
            error.status = 401
            throw error
        }

        const passwordMatch = await bcrypt.compare(password, user.password)

        if (!passwordMatch) {
            const error = new Error("Incorrect username or password.")
            error.status = 401
            throw error
        }

        const token = jwt.sign(
            { id: user.id }, 
            process.env.JWT_SECRET, 
            { expiresIn: '1d' }
        );

        res.status(200).json({
            message: "User logined successfuly.",
            token: `Bearer ${token}`
        })

    } catch (err) {
        next(err)
    }
}