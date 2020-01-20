import express from 'express';
import authMiddleware from '../middlewares/auth.middleware';
import SettingsController from '../controllers/settings.controller';
import { validateUserRole } from '../validations/role.validation';
import assignManagerValidation from '../validations/assign-manager.validation';

const router = express.Router();

router.patch('/roles', authMiddleware.checkUserLoggedIn, validateUserRole, authMiddleware.verifyIfUserIsAdmin, SettingsController.changeUserRole);
router.patch('/:userId/line-manager/:lineManagerId', authMiddleware.checkUserLoggedIn, authMiddleware.verifyIfUserIsAdmin, assignManagerValidation, SettingsController.assignRequesterToManager);

export default router;
