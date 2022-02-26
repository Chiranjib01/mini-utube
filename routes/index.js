import express from 'express';
const router = express.Router();

// routers
import userRouter from './userRouter.js';
import videosRouter from './videosRouter.js';

router.use('/', userRouter);
router.use('/', videosRouter);

export default router;
