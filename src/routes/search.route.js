import express from 'express';
import searchController from '../controllers/search.controller';
import authMiddleware from '../middlewares/auth.middleware';

const router = express.Router();

router.get('/', authMiddleware.checkUserLoggedIn, searchController.searchRequests);

export default router;
