import express from 'express';
import RequestController from '../controllers/request.controller';
import authMiddleware from '../middlewares/auth.middleware';
import requestMiddleware from '../middlewares/request.middleware';

const router = express.Router();

router.get('/manager/pending',
  authMiddleware.checkUserLoggedIn,
  authMiddleware.checkIfUserIsManager,
  RequestController.pendingRequestList); // pending request list route

router.patch('/:requestId/reject',
  authMiddleware.checkUserLoggedIn,
  authMiddleware.checkIfUserIsManager,
  requestMiddleware,
  RequestController.updateRequestStatus);
router.patch('/:requestId/approve',
  authMiddleware.checkUserLoggedIn,
  authMiddleware.checkIfUserIsManager,
  requestMiddleware,
  RequestController.updateRequestStatus);

export default router;
