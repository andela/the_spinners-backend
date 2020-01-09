import express from 'express';
import RequestController from '../controllers/request.controller';
import authMiddleware from '../middlewares/auth.middleware';
import requestApprovalRejectionValidation from '../validations/request-approval-rejection.validation';
import authorization from '../middlewares/authorization.middleware';

const router = express.Router();

router.patch('/:requestId/reject', authMiddleware.checkUserLoggedIn, authorization.checkManager, requestApprovalRejectionValidation, RequestController.rejectRequest);

export default router;
