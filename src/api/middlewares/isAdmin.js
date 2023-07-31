import User from '../../../models/user.model.js';
import { comparePayload } from '../../libs/bcrypt.js';
import { CustomError } from '../../libs/customError.js';

export const isAdmin = async(req, res, next) => {
    try {
        const userId = req.user;
        const admin = await User.findOne({_id: userId});
        
        if(admin.email !== 'admin@gmail.com'){
            throw new CustomError('Not Allowed', 409);
        }
        
        const checkPass = await comparePayload('admin', admin.password);
        if(!checkPass){
            throw new CustomError('Not Allowed', 409);
        }

        next();
    } catch (error) {
        next(error);   
    }
};