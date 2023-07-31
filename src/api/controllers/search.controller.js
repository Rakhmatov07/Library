import Book from '../../../models/book.model.js';
import Author from '../../../models/author.model.js';
import { CustomError } from '../../libs/customError.js';

export const searchBooks = async(req, res, next) => {
    try {
        const { author, book } = req.query;
        const searchCriteria = {};
        let searchResult;

        if(author){
            searchCriteria.author = { $regex: author, $options: 'i'};
            searchResult = await Author.find({ firstname: searchCriteria.author }).limit(12);
        } 
        if(book){
            searchCriteria.book = { $regex: book, $options: 'i' };
            searchResult = await Book.find({ title: searchCriteria.book }).limit(12);
        } 
    
        if(searchResult.length === 0){
            throw new CustomError('Not Found', 404);
        };
    
        return res.status(200).json({ searchResult });
    } catch (error) {
        next(error);
    }
};

