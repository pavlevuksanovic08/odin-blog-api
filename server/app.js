import "dotenv/config"
import express from "express"
import postRoute from "./routes/post.js"
import { flatCommentRoute } from "./routes/comment.js";
import { postRegister, postLogin } from "./controllers/authentication.js";
import cors from "cors"

const app = express();

app.use(express.json())

app.use(cors({
  origin: '*', // Change this to your exact React URL if different
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true // Allow tokens/cookies to pass through if needed later
}));

app.post('/register', postRegister)
app.post('/login', postLogin)

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