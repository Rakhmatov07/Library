import User from '../../../models/user.model.js';
import { comparePayload } from '../../libs/bcrypt.js';
import { CustomError } from '../../libs/customError.js';

export const isAdmin = async(req, res, next) => {
    try {
        const userId = req.user;
        const admin = await User.findByPk(userId);
        
        if(admin.email !== 'admin@gmail.com'){
            throw new CustomError('Not Allowed', 409);
        }
        
        const checkPass = await comparePayload('admin123', admin.password);
        if(!checkPass){
            throw new CustomError('Not Allowed', 409);
        }

        next();
    } catch (error) {
        next(error);   
    }
};