import jwt from "jsonwebtoken"

export const verifyToken = (req, res, next) => {
    try {
        const bearerHeader = req.headers["authorization"];

        if (typeof bearerHeader !== undefined) {
            const bearer = bearerHeader.split(" ")
            const token = bearer[1];
            jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
                if (err) return res.status(403).json({ error: "Invalid or expired token" });

                req.user = user;
                console.log(user)
                next();
            })
        } else {
            const error = new Error("There is not authorization header.")
            error.status = 403
            throw error
        }
        
    } catch (err) {
        next(err)
    }
}