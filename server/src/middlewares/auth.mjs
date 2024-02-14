import { CustomError } from "../utils/custom.error.mjs";
import jwt from  "jsonwebtoken"

export const authenticateUser = (req, res, next) => {
    const token = req.headers.authorization
    if(!token) {
        return next(new CustomError("unauthorized user", 401));
    }

    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET)
        const {_id} = payload
        req.user = {_id}
        next();
    } catch (err) {
        next(new CustomError("unauthorized user", 401));
    }
};

export const authorizeUser = (req, res, next) => {};