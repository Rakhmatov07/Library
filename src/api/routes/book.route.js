import { Router } from "express";
import { errorHandler } from "../middlewares/errorHandler.js";
import { isAuth } from "../middlewares/isAuth.js";
import { isAdmin } from "../middlewares/isAdmin.js";
import { addBook, deleteBook, getBooks, getOneBook, updateBook } from "../controllers/book.controller.js";
export const router = Router();

router.get('/books', getBooks, errorHandler);
router.get('/books/:bookId', isAuth, getOneBook, errorHandler);
router.post('/books', isAuth, isAdmin, addBook, errorHandler);
router.put('/books/:bookId', isAuth, isAdmin, updateBook, errorHandler);
router.delete('/books/:bookId', isAuth, isAdmin, deleteBook, errorHandler);

