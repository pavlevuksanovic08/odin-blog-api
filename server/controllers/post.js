import { prisma } from "../lib/prisma.js"
import { body, validationResult } from "express-validator"

const validatePost = [
    body('title')
        .trim()
        .isLength({ min: 2 }).withMessage('Title must have at least 2 characters.'),
    body('content')
        .trim()
        .isLength({ min: 1 }).withMessage('Content cannot be empty.'),
]

export const getAllPosts = async (req, res, next) => {
    try {
        const posts = await prisma.post.findMany();
        res.status(200).json({posts})
    } catch (err) {
        next(err)
    }
}

export const postNewPost = [
    validatePost,
    async (req, res, next) => {
        try {

            const errors = validationResult(req)

            if (!errors.isEmpty()) {
                const error = new Error(errors.array()[0].msg);
                error.status = 400;
                throw error;
            }

            const { title, content } = req.body;

            const post = await prisma.post.create({
                data: {
                    title: title,
                    content: content,
                    authorId: req.user.id 
                }
            })

            res.status(200).json({ post })
        } catch (err) {
            next(err)
        }
        
    }
]

export const getPostById = async (req, res, next) => {
    try {
        const id = req.params.id

        const post = await prisma.post.findUniqueOrThrow({
            where: {
                id: Number(id)
            },
            include: {
                author: true,
                comments: true
            }
        })

        res.status(200).json({ post })
    } catch (err) {
        next(err)
    }
}

export const putPostById = [
    validatePost,
    async (req, res, next) => {
        try {
            const id =  req.params.id
            const { title, content } = req.body

            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                const error = new Error(errors.array()[0].msg);
                error.status = 400;
                throw error;
            }

            const post = await prisma.post.findUnique({
                where: {
                    id: Number(id)
                }
            })

            if (post.authorId !== req.user.id) {
                const error = new Error("Forbidden: You do not have permission to modify this resource.")
                error.status = 403
                throw error
            }

            const updated = await prisma.post.update({
                where: {
                    id: Number(id)
                },
                data: {
                    title: title,
                    content: content,
                    authorId: req.user.id
                }
            })

            res.status(200).json({ updated })
        } catch (err) {
            next(err)
        }
    }
]
export const deletePostById = async (req, res, next) => {
    try {
        const id = req.params.id;

        const post = await prisma.post.findUnique({
            where: {
                id: Number(id)
            }
        })

        if (post.authorId !== req.user.id) {
            const error = new Error("Forbidden: You do not have permission to delete this resource.")
            error.status = 403
            throw error
        }

        const deletedPost = await prisma.post.delete({
            where: {
                id: Number(id)
            }
        });

        return res.status(200).json({ 
            message: "Post deleted successfully",
            post: deletedPost 
        });

    } catch (err) {
        if (err.code === 'P2025') {
            const error = new Error("Cannot delete post: Record not found.");
            error.status = 404;
            return next(error); 
        }

        next(err);
    }
};


