
import { Router } from "express";
import * as controller from "../controllers/post.js"

const router = Router();

router.get('/', controller.getAllPosts)

router.post('/', controller.postNewPost)

router.get('/:id', controller.getPostById)

router.put('/:id', controller.putPostById)

router.delete('/:id', controller.deletePostById)

export default router;