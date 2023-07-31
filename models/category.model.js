import mongoose from "mongoose";
const { Schema, model } = mongoose;

const Category = new Schema({
    name: {
        type: String,
        unique: true,
        required: true
    }
});

export default model('Category', Category);