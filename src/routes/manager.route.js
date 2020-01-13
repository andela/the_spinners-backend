import express from 'express';
import RequestController from '../controllers/request.controller';
import authMiddleware from '../middlewares/auth.middleware';

const router = express.Router();

router.get(
  '/requests', // pending request list route
  authMiddleware.checkUserLoggedIn,
  authMiddleware.checkIfUserIsManager,
  RequestController.findRequests
);

export default router;
