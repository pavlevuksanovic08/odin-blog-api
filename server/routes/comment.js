
import { Router } from "express"
import * as controller from "../controllers/comment.js"

// /posts/:id/comments
const nestedCommentRoute = Router({ mergeParams: true});

nestedCommentRoute.get('/', controller.getCommentsByPost)

nestedCommentRoute.post('/', controller.postNewComment)

// /comments
const flatCommentRoute = Router();

flatCommentRoute.get('/:id', controller.getCommentById)

flatCommentRoute.put('/:id', controller.putCommentById)

flatCommentRoute.delete('/:id', controller.deleteCommentById)

export {nestedCommentRoute, flatCommentRoute}