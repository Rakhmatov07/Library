import mongoose from "mongoose";
const { Schema, model } = mongoose;

const Book = new Schema({
    title: {
        type: String,
        required: true
    },
    pages: {
        type: Number,
        required: true
    },
    year: {
        type: Number,
        required: true,
        min: 1800,
        max: new Date().getFullYear(),  
    },
    price: {
        type: Schema.Types.Decimal128,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true,
        minlength: 3
    },
    author_id: {
        type: Schema.Types.ObjectId,
        required: true
    },
    category_id: {
        type: Schema.Types.ObjectId,
        required: true
    }
},
{
    timestamps: true
});

export default model('Book', Book);
