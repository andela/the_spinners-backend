import express from 'express';
import RequestController from '../controllers/request.controller';
import authMiddleware from '../middlewares/auth.middleware';
import { validateChangingRequestStatus } from '../validations/request.validation';

const router = express.Router();

router.get(
  '/requests', // pending request list route
  authMiddleware.checkUserLoggedIn,
  authMiddleware.checkIfUserIsManager,
  RequestController.findRequests
);
router.patch('/requests/:requestId', authMiddleware.checkUserLoggedIn, authMiddleware.checkIfUserIsManager, validateChangingRequestStatus, RequestController.updateRequestStatus);


export default router;
