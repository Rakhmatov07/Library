import Joi from 'joi';


export const authorValidation = (author) => {
    const Author = Joi.object({
        firstname: Joi.string().min(3).required(),
        lastname: Joi.string().min(3).required(),
        date_of_birth: Joi.string().max(new Date().getFullYear()).required(),
        date_of_death: Joi.string().max(new Date().getFullYear()).required(),
        country: Joi.string().min(4).required(),
        bio: Joi.string().min(5).required()
    });

    const { error } = Author.validate(author);

    return error ? error.message : false;
};