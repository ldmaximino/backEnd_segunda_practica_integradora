import { Router } from 'express';
import productRouter from './product_router.js';
import cartRouter from './cart_router.js';
import userRouter from './user_router.js';
import viewRouter from './views_router.js';
import sessionsRouter from './sessions_router.js';

export default class MainRouter {
    constructor() {
        this.router = Router();
        this.init();
    }

    init() {
        this.router.use('/api/products', productRouter);
        this.router.use('/api/carts', cartRouter);
        this.router.use('/users', userRouter);
        this.router.use('/', viewRouter);
        this.router.use('/api/sessions', sessionsRouter);
    }

    getRouter() {
        return this.router;
    }
}