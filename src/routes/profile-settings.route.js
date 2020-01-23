import express from 'express';
import ProfileSettingsController from '../controllers/profile-settings.controller';
import RouteAccessMiddleware from '../middlewares/route-access.middleware';
import { validateToken } from '../validations/auth.validation';
import { validateAccountProfile } from '../validations/account-profile.validation';
import authMiddleware from '../middlewares/auth.middleware';
import SettingsController from '../controllers/settings.controller';
import { validateUserRole } from '../validations/role.validation';

const router = express.Router();

router.get('/view-profile', RouteAccessMiddleware.checkRouteAccess, validateToken, ProfileSettingsController.viewProfile);
router.patch('/edit-profile', RouteAccessMiddleware.checkRouteAccess, validateToken, validateAccountProfile, ProfileSettingsController.editProfile);
router.patch('/settings/roles', authMiddleware.checkUserLoggedIn, validateUserRole, authMiddleware.verifyIfUserIsAdmin, SettingsController.changeUserRole);
export default router;
