import Author from "./author.model.js";
import Book from "./book.model.js";
import Category from "./category.model.js";
import AuthorBook from "./authorBooks.js";


export function runAssociation(){
    Category.hasMany(Book, { foreignKey: 'category_id' });
    Book.belongsTo(Category, { foreignKey: "category_id" });

    AuthorBook.hasMany(Book, { foreignKey: "book_id" });
    AuthorBook.hasMany(Author, { foreignKey: "author_id" });

    Book.belongsToMany(Author, { through: AuthorBook });
    Author.belongsToMany(Book, { through: AuthorBook });
}


