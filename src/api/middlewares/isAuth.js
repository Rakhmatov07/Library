import { CustomError } from "../../libs/customError.js";
import { verifyPayload } from "../../libs/jwt.js";

export const isAuth = async(req, res, next) => {
    try {
        const { token } = req.cookies;
        if(!token){
            throw new CustomError('Token not found', 401);
        }
        const userId = verifyPayload(token);
        if(!userId){
            throw new CustomError('Invalid token', 403);
        };

        req.user = userId;
        next();
    } catch (error) {
        next(error);
    }
};