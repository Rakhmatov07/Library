import Book from '../../../models/book.model.js';
import { CustomError } from '../../libs/customError.js';
import { bookValidation } from '../../validation/book.validation.js';

export const getBooks = async(req, res, next) => {
    try {
        const books = await Book.findAll({ limit: 12 });
        if(books.length === 0){
            throw new CustomError('Books are not found', 404);
        }

        res.status(200).json({ books });
    } catch (error) {
        next(error);
    }
};

export const getOneBook = async(req, res, next) => {
    try {
        const { bookId } = req.params;
        const book = await Book.findByPk(bookId);
        if(!book){
            throw new CustomError('Book is not found', 404);
        }

        res.status(200).json({ book });
    } catch (error) {
        next(error);
    }
};

export const addBook = async(req, res, next) => {
    try {
        const { title, pages, year, price, country, description, author_id, category_id } = req.body;
        const isValid = bookValidation({ title, pages, year, price, country, description, author_id, category_id });

        if(isValid) throw new CustomError(isValid, 400);
        const findBook = await Book.findOne({ where: { title, pages, year }});
        if(findBook){
            throw new CustomError('This book already exists', 409);
        }

        const book = await Book.create({ title, pages, year, price, country, description, author_id, category_id });
        res.status(201).json({ message: 'Created', book });
    } catch (error) {
        next(error);
    }
};

export const updateBook = async(req, res, next) => {
    try {
        const { bookId } = req.params;
        const { title, pages, year, price, country, description, author_id, category_id } = req.body;
        const book = await Book.findByPk(bookId);

        if(!book){
            throw new CustomError('Book is not found', 404);
        }
        book.set({ title: title?title:book.title, pages: pages?pages:book.pages,
        year: year?year:book.year, price: price?price:book.price, description: description?description:book.description,
        country: country?country:book.country, author_id: author_id?author_id:book.author_id, category_id: category_id?category_id:book.category_id });
        
        await book.save();

        res.status(200).json({ message: 'Updated' });
    } catch (error) {
        next(error);
    }
};

export const deleteBook = async(req, res, next) => {
    try {
        const { bookId } = req.params;
        const book = await Book.destroy({ where: { bookId }});

        res.status(200).json({ message: 'Successfully deleted', book });
    } catch (error) {
        next(error);
    }
};

