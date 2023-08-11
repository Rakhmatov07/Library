import { Model, DataTypes } from "sequelize";
import { sequelize } from "../database/index.js";

class Author extends Model{};

Author.init({
    authorId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    firstname: {
        type: DataTypes.STRING,
        allowNull: false
    },
    lastname: {
        type: DataTypes.STRING,
        allowNull: false
    },
    date_of_birth: {
        type: DataTypes.DATE,
        allowNull: false
    },
    date_of_death: {
        type: DataTypes.DATE,
        allowNull: true
    },
    country: {
        type: DataTypes.STRING,
        allowNull: false
    },
    bio: {
        type: DataTypes.STRING,
        allowNull: false,
    }
},
{
    sequelize,
    timestamps: true,
    modelName: "authors"
});

export default Author;
