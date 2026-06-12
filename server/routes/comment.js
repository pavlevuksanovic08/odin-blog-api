import { Router } from "express"
import * as controller from "../controllers/comment.js"
import { verifyToken } from "../controllers/authorization.js";

// /posts/:id/comments
const nestedCommentRoute = Router({ mergeParams: true});

nestedCommentRoute.get('/', controller.getCommentsByPost)

nestedCommentRoute.post('/', verifyToken, controller.postNewComment)

// /comments
const flatCommentRoute = Router();

flatCommentRoute.get('/:id', controller.getCommentById)

flatCommentRoute.put('/:id', verifyToken,controller.putCommentById)

flatCommentRoute.delete('/:id', verifyToken,controller.deleteCommentById)

export {nestedCommentRoute, flatCommentRoute}