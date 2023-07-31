import { Router } from "express";
import { errorHandler } from "../middlewares/errorHandler.js";
import { isAuth } from "../middlewares/isAuth.js";
import { isAdmin } from "../middlewares/isAdmin.js";
import { addAuthor, deleteAuthor, getAuthors, getOneAuthor, updateAuthor } from "../controllers/author.controller.js";
export const router = Router();

router.get('/authors', getAuthors, errorHandler);
router.get('/authors/:authorId', isAuth, getOneAuthor, errorHandler);
router.post('/authors', isAuth, isAdmin, addAuthor, errorHandler);
router.put('/authors/:authorId', isAuth, isAdmin, updateAuthor, errorHandler);
router.delete('/authors/:authorId', isAuth, isAdmin, deleteAuthor, errorHandler);