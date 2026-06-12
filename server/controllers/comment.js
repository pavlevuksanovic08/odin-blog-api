import { prisma } from "../lib/prisma.js"
import { body, validationResult } from "express-validator"

const validateComment = [
    body("content").trim()
    .isLength({min: 1}).withMessage("Comment cannot be empty string.")
]

export const getCommentsByPost = async (req, res, next) => {
    try {
        const postId = req.params.id

        const comments = await prisma.comment.findMany({
            where: {
                postId: Number(postId)
            }
        })

        res.status(200).json({comments})
    } catch (err) {
        next(err)
    }
}

export const postNewComment = [
    validateComment,
    async (req, res, next) => {
        try {
            const postId = req.params.id;
            const { content } = req.body

            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                const err = new Error(errors.array()[0].msg)
                err.status = 400;
                throw err
            }

            const comment = await prisma.comment.create({
                data: {
                    content: content,
                    postId: Number(postId),
                    authorId: req.user.id
                }
            })

            res.status(200).json({ comment })
        } catch (err) {
            next(err)
        }  
    }
]

export const getCommentById = async (req, res, next) => {

    try {
        const id = req.params.id

        const comment = await prisma.comment.findUnique({
            where: {
                id: Number(id)
            }
        })

        res.status(200).json(comment)
    } catch (err) {
        next(err)
    }
}

export const putCommentById = [
    validateComment,
    async (req, res, next) => {
        try {
            const id = req.params.id
            const { content } = req.body

            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                const error = new Error(errors.array()[0].msg)
                error.status = 400;
                throw error
            }

            const comment = await prisma.comment.findUnique({
                where: {
                    id: Number(id),
                }
            })

            if (comment.authorId !== req.user.id) {
                const error = new Error("Forbidden: You do not have permission to modify this resource.")
                error.status = 403
                throw error
            }

            const updated = await prisma.comment.update({
                where: {
                    id: Number(id)
                },
                data: {
                    content: content
                }
            })

            res.status(200).json({ updated })
        } catch (err) {
            next(err)
        } 
    } 
]

export const deleteCommentById = async (req, res, next) => {
    try {
        const id = req.params.id

        const comment = await prisma.comment.findUnique({
            where: {
                id: Number(id)
            }
        })

        if (comment.authorId !== req.user.id) {
            const error = new Error("Forbidden: You do not have permission to delete this resource.")
            error.status = 403
            throw error
        }

        await prisma.comment.delete({
            where: {
                id: Number(id)
            }
        })

        res.status(200).json({
            message: "Successfuly deleted comment."
        })
    } catch (err) {
        if (err.code === 'P2025') {
            const error = new Error("Cannot delete post: Record not found.");
            error.status = 404;
            return next(error); 
        }
        next(err)
    }
}