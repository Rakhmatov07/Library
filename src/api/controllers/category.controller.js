import Category from '../../../models/category.model.js';
import Book from '../../../models/book.model.js';
import { CustomError } from '../../libs/customError.js';

export const getCategories = async(req, res, next) => {
    try {
        const categories = await Category.findAll();
        if(categories.length === 0){
            throw new CustomError('Categories are not found', 404);
        }

        res.status(200).json({ categories });
    } catch (error) {
        next(error);
    }
};

export const getBooksByCategory = async(req, res, next) => {
    try {
        const { categoryId } = req.params;
        const books = await Book.findAll({ where: { categoryId }, limit: 12});

        res.status(200).json({ books });
    } catch (error) {
        next(error);
    }
};

export const addCategory = async(req, res, next) => {
    try {
        const { name } = req.body;
        let category = await Category.findOne({ where: {name}});
    
        if(!category){
           category =  await Category.create({name});
        }

        res.status(201).json({ message: 'Created', category});
    } catch (error) {
        next(error);
    }
};

export const updateCategory = async(req, res, next) => {
    try {
        const { name } = req.body;
        const { categoryId } = req.params;
        let category = await Category.findByPk(categoryId);
        if(!category) {
            throw new CustomError('Not Found', 404);
        }

        category.set({ name: name ? name : category.name });

        await category.save();

        res.status(200).json({ message: 'Updated' });
    } catch (error) {
        next(error);
    }
};

export const deleteCategory = async(req, res, next) => {
    try {
        const { categoryId } = req.params;
        const category = await Category.destroy({ where: { categoryId }});

        res.status(200).json({ message: 'Deleted', category });
    } catch (error) {
        next(error);
    }
};

