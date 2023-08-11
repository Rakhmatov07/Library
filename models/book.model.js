import { sequelize } from "../database/index.js";
import { Model, DataTypes } from "sequelize";

class Book extends Model{};

Book.init({
    bookId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    pages: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    year: {
        type: DataTypes.INTEGER,
        allowNull: false,
        min: 1800,
        max: new Date().getFullYear(),  
    },
    price: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    country: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false,
        min: 3
    }
},
{
    timestamps: true,
    sequelize,
    modelName: "books"
});

export default Book;
