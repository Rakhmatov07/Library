import Author from '../../../models/author.model.js';
import { CustomError } from '../../libs/customError.js';
import { authorValidation } from '../../validation/author.validation.js';

export const getAuthors = async(req, res, next) => {
    try {
        const authors = await Author.findAll({ limit: 12 });
        if(authors.length === 0){
            throw new CustomError('Authors are not found', 404);
        }

        res.status(200).json({ authors });
    } catch (error) {
        next(error);
    }
};

export const getOneAuthor = async(req, res, next) => {
    try {
        const { authorId } = req.params;
        const author = await Author.findByPk(authorId);

        if(!author){
            throw new CustomError('Author is not found', 404);
        }

        res.status(200).json({ author });
    } catch (error) {
        next(error);
    }
};

export const addAuthor = async(req, res, next) => {
    try {
        let { firstname, lastname, date_of_birth, date_of_death, country, bio } = req.body;
        const isValid = authorValidation({ firstname, lastname, date_of_birth, date_of_death, country, bio });

        if(isValid) throw new CustomError(isValid, 400);
        
        const findAuthor = await Author.findOne({ where: { firstname, lastname, date_of_birth }});
        const dateOfBirth = new Date(date_of_birth);
            dateOfBirth.setDate(dateOfBirth.getDate() + 1);
        const dateOfDeath = new Date(date_of_death);
            dateOfDeath.setDate(dateOfDeath.getDate() + 1);

        if(findAuthor){
            throw new CustomError('This Author already exists', 409);
        }

        const author = await Author.create({ firstname, lastname, date_of_birth: dateOfBirth, date_of_death: date_of_death?dateOfDeath:null, country, bio });
        res.status(201).json({ message: 'Created', author });
    } catch (error) {
        next(error);
    }
};

export const updateAuthor = async(req, res, next) => {
    try {
        const { authorId } = req.params;
        const { firstname, lastname, date_of_birth, date_of_death, country, bio } = req.body;
        const author = await Author.findByPk(authorId);

        if(!author){
            throw new CustomError('Author is not found', 404);
        }
        author.set({ firstname: firstname?firstname:author.firstname, lastname: lastname?lastname:author.lastname,
            date_of_birth: date_of_birth?date_of_birth:author.date_of_birth, date_of_death: date_of_death?date_of_death:author.date_of_death,
            country: country?country:author.country, bio: bio?bio:author.bio});
        
        await author.save();

        res.status(200).json({ message: 'Updated' });
    } catch (error) {
        next(error);
    }
};

export const deleteAuthor = async(req, res, next) => {
    try {
        const { authorId } = req.params;
        const author = await Author.destroy({ where: { authorId } });

        res.status(200).json({ message: 'Successfully deleted', author });
    } catch (error) {
        next(error);
    }
};

