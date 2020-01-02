import express from 'express';
import ProfileSettingsController from '../controllers/profile-settings.controller';
import RouteAccessMiddleware from '../middlewares/route-access.middleware';
import { validateToken } from '../validations/auth.validation';
import {
  validateAccountProfile
} from '../validations/account-profile.validation';

const router = express.Router();

router.get('/view-profile', RouteAccessMiddleware.checkRouteAccess, validateToken, ProfileSettingsController.viewProfile);
router.patch('/edit-profile', RouteAccessMiddleware.checkRouteAccess, validateToken, validateAccountProfile, ProfileSettingsController.editProfile);
export default router;
