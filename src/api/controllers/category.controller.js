import Category from '../../../models/category.model.js';
import Book from '../../../models/book.model.js';
import { CustomError } from '../../libs/customError.js';

export const getCategories = async(req, res, next) => {
    try {
        const categories = await Category.find();
        if(categories.length === 0){
            return res.status(404).json({ message: 'Categories are not found' });
        }

        return res.status(200).json({ categories });
    } catch (error) {
        next(error);
    }
};

export const getBooksByCategory = async(req, res, next) => {
    try {
        const { categoryId } = req.params;
        const books = await Book.find({ category_id: categoryId }).limit(12);

        return res.status(200).json({ books });
    } catch (error) {
        next(error);
    }
};

export const addCategory = async(req, res, next) => {
    try {
        const { name } = req.body;
        let category = await Category.findOne({name});
    
        if(!category){
           category =  await Category.create({name});
        }

        return res.status(201).json({ message: 'Created', category});
    } catch (error) {
        next(error);
    }
};

export const updateCategory = async(req, res, next) => {
    try {
        const { name } = req.body;
        const { categoryId } = req.params;
        let category = await Category.findById({ _id: categoryId });
        if(!category) {
            throw new CustomError('Not Found', 404);
        }

        await Category.updateOne({ name: category.name }, { name: name ? name : category.name });

        return res.status(200).json({ message: 'Updated' });
    } catch (error) {
        next(error);
    }
};

export const deleteCategory = async(req, res, next) => {
    try {
        const { categoryId } = req.params;
        const category = await Category.findByIdAndDelete({ _id: categoryId });

        return res.status(200).json({ message: 'Deleted', category });
    } catch (error) {
        next(error);
    }
};

