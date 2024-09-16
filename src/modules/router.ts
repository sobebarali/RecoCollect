import express from 'express';
import collectionsRouter from './collections/routes/collections.routes';

const router = express.Router();

router.use(collectionsRouter);

export default router;
