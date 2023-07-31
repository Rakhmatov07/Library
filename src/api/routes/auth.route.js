import { Router } from 'express';
import { errorHandler } from '../middlewares/errorHandler.js';
import { changePassword, editProfile, getProfile, login, logout, register } from '../controllers/auth.controller.js';
import { isAuth } from '../middlewares/isAuth.js';
export const router = Router();

router.post('/auth/register', register, errorHandler);
router.post('/auth/login', login, errorHandler);
router.get('/auth/profile', isAuth, getProfile, errorHandler);
router.put('/auth/profile', isAuth, editProfile, errorHandler);
router.put('/auth/password', isAuth, changePassword, errorHandler);
router.delete('/auth/logout', isAuth, logout, errorHandler);

