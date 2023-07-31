import Book from '../../../models/book.model.js';
import { CustomError } from '../../libs/customError.js';
import { bookValidation } from '../../validation/book.validation.js';

export const getBooks = async(req, res, next) => {
    try {
        const books = await Book.find().limit(12);
        if(books.length === 0){
            return res.status(404).json({ message: 'Books are not found' });
        }

        return res.status(200).json({ books });
    } catch (error) {
        next(error);
    }
};

export const getOneBook = async(req, res, next) => {
    try {
        const { bookId } = req.params;
        const book = await Book.findById(bookId);
        if(!book){
            throw new CustomError('Book is not found', 404);
        }

        return res.status(200).json({ book });
    } catch (error) {
        next(error);
    }
};

export const addBook = async(req, res, next) => {
    try {
        const { title, pages, year, price, country, description, author_id, category_id } = req.body;
        const isValid = bookValidation({ title, pages, year, price, country, description, author_id, category_id });

        if(isValid) throw new CustomError(isValid, 400);
        const findBook = await Book.findOne({ title, pages, year });
        if(findBook){
            throw new CustomError('This book already exists', 409);
        }

        const book = await Book.create({ title, pages, year, price, country, description, author_id, category_id });
        return res.status(201).json({ message: 'Created', book });
    } catch (error) {
        next(error);
    }
};

export const updateBook = async(req, res, next) => {
    try {
        const { bookId } = req.params;
        const { title, pages, year, price, country, description, author_id, category_id } = req.body;
        const book = await Book.findById({ _id: bookId });

        if(!book){
            throw new CustomError('Book is not found', 404);
        }
        await Book.updateOne({ _id: bookId }, { title: title?title:book.title, pages: pages?pages:book.pages,
        year: year?year:book.year, price: price?price:book.price, description: description?description:book.description,
        country: country?country:book.country, author_id: author_id?author_id:book.author_id, category_id: category_id?category_id:book.category_id });
        
        return res.status(200).json({ message: 'Updated' });
    } catch (error) {
        next(error);
    }
};

export const deleteBook = async(req, res, next) => {
    try {
        const { bookId } = req.params;
        const book = await Book.findByIdAndDelete({ _id: bookId });

        return res.status(200).json({ message: 'Successfully deleted', book });
    } catch (error) {
        next(error);
    }
};

