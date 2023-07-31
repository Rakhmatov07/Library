import { signPayload } from '../../libs/jwt.js';
import { hashPayload, comparePayload } from '../../libs/bcrypt.js';
import User from '../../../models/user.model.js';
import { CustomError } from '../../libs/customError.js';
import { userValidation } from '../../validation/user.validation.js';

export const register = async(req, res, next) => {
    try {
        const { firstname, lastname, phone, email, password } = req.body;
        const isValid = userValidation({ firstname, lastname, phone, email, password });

        if(isValid) throw new CustomError(isValid, 400);
        const findUser = await User.findOne({ phone, email });

        if(findUser){
            throw new CustomError('User already registered!', 409);
        }

        const hashedPass = await hashPayload(password);
        const newUser = await User.create({ firstname, lastname, phone, email, password: hashedPass});
 
        const token = signPayload(newUser._id.toString());
        res.cookie('token', token);
        return res.status(201).json({message: 'Successfully registered'});
    } catch (error) {
        next(error);
    }
};

export const login = async(req, res, next) => {
    try {
        const { email, password } = req.body;
        const findUser = await User.findOne({ email });
        if(!findUser){
            throw new CustomError('Email or password is incorrect', 404);
        }

        const checkPass = await comparePayload(password, findUser.password);
        if(!checkPass){
            throw new CustomError('Email or Password is incorrect', 404)
        }

        const token = signPayload(findUser._id.toString());
        res.cookie('token', token);
        return res.status(200).json({ message: 'Successfully loggedIn' });

    } catch (error) {
        next(error);
    }

};

export const logout = async(req, res, next) => {
    try {
        const userId = req.user;
        await User.deleteOne({ _id: userId });

        res.cookie('token', '');
        return res.status(200).json({ message: 'Successfully loggedOut' });
    } catch (error) {
        next(error);
    }
};

export const getProfile = async(req, res, next) => {
    try {
        const userId = req.user;
        const user = await User.findOne({ _id: userId });
        if(!user){
            throw new CustomError('User not found', 404);
        }

        return res.status(200).json({ user });
    } catch (error) {
        next(error);
    }
};

export const changePassword = async(req, res, next) => {
    try {
        const { email, currentPassword, newPassword, confirmPassword } = req.body;
        const findUser = await User.findOne({ email });
        if(!findUser){
            throw new CustomError('Invalid Email', 409);
        }

        const checkPass = await comparePayload(currentPassword, findUser.password);
        if(!checkPass){
            throw new CustomError('Incorrect Password', 404);
        }

        if(newPassword !== confirmPassword){
            throw new CustomError('Password does not match', 409);
        }

        const hashedPass = await hashPayload(newPassword);
        await User.findOneAndUpdate({ email }, { password: hashedPass });

        return res.status(200).json({ message: 'Successfully changed'});
    } catch (error) {
        next(error);
    }
};

export const editProfile = async(req, res, next) => {
    try {
        const userId = req.user;
        const { firstname, lastname, phone, email } = req.body;
        const user = await User.findById({ _id: userId });

        if(!user){
            throw new CustomError('User is not found', 404);
        }

        await User.findByIdAndUpdate(userId, { firstname: firstname?firstname:user.firstname, lastname: lastname?lastname:user.lastname,
        phone: phone?phone:user.phone, email: email?email:user.email });
        
        return res.status(200).json({ message: 'Successfully edited' });
    } catch (error) {
        next(error);
    }
};



