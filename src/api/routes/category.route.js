import { Router } from "express";
import { isAuth } from "../middlewares/isAuth.js";
import { isAdmin } from "../middlewares/isAdmin.js";
import { errorHandler } from "../middlewares/errorHandler.js";
import { addCategory, deleteCategory, getBooksByCategory, getCategories, updateCategory } from "../controllers/category.controller.js";
export const router = Router();

router.post('/category', isAuth, isAdmin, addCategory, errorHandler);
router.put('/category/:categoryId', isAuth, isAdmin, updateCategory, errorHandler);
router.get('/category', isAuth, isAdmin, getCategories, errorHandler);
router.get('/category/books/:categoryId', getBooksByCategory, errorHandler);
router.delete('/category/:categoryId', isAuth, isAdmin, deleteCategory, errorHandler);