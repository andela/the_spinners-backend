import express from 'express';
import authMiddleware from '../middlewares/auth.middleware';
import SettingsController from '../controllers/settings.controller';
import { validateUserRole } from '../validations/role.validation';

const router = express.Router();

router.patch('/roles', authMiddleware.checkUserLoggedIn, validateUserRole, authMiddleware.verifyIfUserIsAdmin, SettingsController.changeUserRole);

export default router;
