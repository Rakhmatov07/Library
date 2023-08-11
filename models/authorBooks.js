import { Model, DataTypes } from "sequelize";
import { sequelize } from "../database/index.js";

class AuthorBook extends Model{};

AuthorBook.init({
    author_book_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    }
},
{
    sequelize,
    timestamps: true,
    modelName: 'authorBooks'
});

export default AuthorBook;