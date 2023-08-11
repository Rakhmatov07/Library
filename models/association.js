import Author from "./author.model.js";
import Book from "./book.model.js";
import Category from "./category.model.js";
import AuthorBook from "./authorBooks.js";


export function runAssociation(){
    Category.hasMany(Book, { foreignKey: 'category_id' });
    Book.belongsTo(Category, { foreignKey: "category_id" });

    Book.belongsToMany(Author, { through: AuthorBook }, { foreignKey: "bookId" });
    Author.belongsToMany(Book, { through: AuthorBook }, { foreignKey: "authorId" });
}


