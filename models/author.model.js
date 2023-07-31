import mongoose from "mongoose";
const { Schema, model } = mongoose;

const Author = new Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    date_of_birth: {
        type: Date,
        required: true
    },
    date_of_death: {
        type: Date,
    },
    country: {
        type: String,
        required: true
    },
    bio: {
        type: String,
        required: true,
    }
},
{
    timestamps: true
});

export default model('Author', Author);
