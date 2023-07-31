import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import router from '../api/routes/index.js';

export const modules = (app) => {
    app.use(express.json());
    app.use(express.urlencoded({extended: true}));
    app.use(cors({origin: '*'}));
    app.use(cookieParser());
    app.use(router);

};