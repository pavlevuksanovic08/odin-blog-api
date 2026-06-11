import "dotenv/config"
import express from "express"
import postRoute from "./routes/post.js"
import { flatCommentRoute } from "./routes/comment.js";

const app = express();

app.use(express.json())

app.use('/posts', postRoute);
app.use('/comments', flatCommentRoute)


app.use((req, res, next) => {
    const error = new Error(`Cannot ${req.method} ${req.originalUrl} - Route not found`)
    error.status = 404
    next(error)
})

app.use((err, req, res, next) => {

    const statusCode = err.status || 500;
    const message = err.message || "Something went wrong on the server";

    res.status(statusCode).json({
        error: message
    });
});

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})