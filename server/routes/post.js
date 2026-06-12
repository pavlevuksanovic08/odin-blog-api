
import { Router } from "express";
import * as controller from "../controllers/post.js"
import {nestedCommentRoute} from "./comment.js"
import { verifyToken } from "../controllers/authorization.js";

const router = Router();

router.get('/', controller.getAllPosts)

router.post('/', verifyToken, controller.postNewPost)

router.get('/:id', controller.getPostById)

router.put('/:id', verifyToken, controller.putPostById)

router.delete('/:id', verifyToken, controller.deletePostById)

router.use('/:id/comments', nestedCommentRoute)

export default router;