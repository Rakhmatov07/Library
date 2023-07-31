import Author from '../../../models/author.model.js';
import { CustomError } from '../../libs/customError.js';
import { authorValidation } from '../../validation/author.validation.js';

export const getAuthors = async(req, res, next) => {
    try {
        const authors = await Author.find();
        if(authors.length === 0){
            return res.status(404).json({ message: 'Authors are not found' });
        }

        return res.status(200).json({ authors });
    } catch (error) {
        next(error);
    }
};

export const getOneAuthor = async(req, res, next) => {
    try {
        const { authorId } = req.params;
        const author = await Author.findById(authorId);

        if(!author){
            throw new CustomError('Author is not found', 404);
        }

        return res.status(200).json({ author });
    } catch (error) {
        next(error);
    }
};

export const addAuthor = async(req, res, next) => {
    try {
        const { firstname, lastname, date_of_birth, date_of_death, country, bio } = req.body;
        const isValid = authorValidation({ firstname, lastname, date_of_birth, date_of_death, country, bio });

        if(isValid) throw new CustomError(isValid, 400);
        const findAuthor = await Author.findOne({ firstname, lastname, date_of_birth });
        const dateOfBirth = new Date(date_of_birth);
            dateOfBirth.setDate(dateOfBirth.getDate() + 1);
        const dateOfDeath = new Date(date_of_death);
            dateOfDeath.setDate(dateOfDeath.getDate() + 1);

        if(findAuthor){
            throw new CustomError('This Author already exists', 409);
        }

        const author = await Author.create({ firstname, lastname, date_of_birth: dateOfBirth, date_of_death: date_of_death?dateOfDeath:null, country, bio });
        return res.status(201).json({ message: 'Created', author });
    } catch (error) {
        next(error);
    }
};

export const updateAuthor = async(req, res, next) => {
    try {
        const { authorId } = req.params;
        const { firstname, lastname, date_of_birth, date_of_death, country, bio } = req.body;
        const author = await Author.findById({ _id: authorId });

        if(!author){
            throw new CustomError('Author is not found', 404);
        }
        await Author.updateOne({ _id: authorId }, { firstname: firstname?firstname:author.firstname, lastname: lastname?lastname:author.lastname,
            date_of_birth: date_of_birth?date_of_birth:author.date_of_birth, date_of_death: date_of_death?date_of_death:author.date_of_death,
            country: country?country:author.country, bio: bio?bio:author.bio});
        
        return res.status(200).json({ message: 'Updated' });
    } catch (error) {
        next(error);
    }
};

export const deleteAuthor = async(req, res, next) => {
    try {
        const { authorId } = req.params;
        const author = await Author.findByIdAndDelete({ _id: authorId });

        return res.status(200).json({ message: 'Successfully deleted', author });
    } catch (error) {
        next(error);
    }
};

