import { Router } from "express";
import { errorHandler } from "../middlewares/errorHandler.js";
import { searchBooks } from "../controllers/search.controller.js";
export const router = Router();

router.get('/search', searchBooks, errorHandler);
