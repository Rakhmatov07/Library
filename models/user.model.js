import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const User = new Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        unique: true,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    }
  },
  {
    stimestamps: true
  }
);

export default model('User', User);
