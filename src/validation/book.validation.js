import Joi from 'joi';

export const bookValidation = (book) => {
    const Book = Joi.object({
        title: Joi.string().min(3).required(),
        pages: Joi.number().required(),
        year: Joi.number().min(1800).max(new Date().getFullYear()).required(),
        price: Joi.number().required(),
        country: Joi.string().min(4).required(),
        description: Joi.string().min(5).required(),
        author_id: Joi.string().required(),
        category_id: Joi.string().required()
    });

    const { error } = Book.validate(book);

    return error ? error.message : false;
};