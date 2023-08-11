import { sequelize } from "../database/index.js";
import { Model, DataTypes } from "sequelize";

class Category extends Model{};

Category.init({
    categoryId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    }
},
{
    sequelize,
    modelName: "categories",
    timestamps: true
});

export default Category;