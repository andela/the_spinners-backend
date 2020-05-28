import express from 'express';
import authMiddleware from '../middlewares/auth.middleware';
import AccommodationController from '../controllers/accommodation.controller';
import {
  bookAccommodationValidation,
  createAccommodationValidations,
  validateAccommodationReaction
} from '../validations/accommodation.validation';
import accommodationMiddleware, { checkIfAccommodationTypeExists,
  checkIfLocationExists,
  avoidDuplicateAccommodation,
  checkPermission,
  checkAvailability } from '../middlewares/accommodation.middleware';

const router = express.Router();

router.post(
  '/:accommodationId/rooms/:roomId/book',
  authMiddleware.checkUserLoggedIn,
  bookAccommodationValidation, checkPermission,
  checkAvailability,
  AccommodationController.createBooking
);
router.get('/', authMiddleware.checkUserLoggedIn, AccommodationController.getAccommodations);
router.post(
  '/',
  authMiddleware.checkUserLoggedIn, authMiddleware.verifyPermissions,
  createAccommodationValidations,
  avoidDuplicateAccommodation,
  checkIfAccommodationTypeExists, checkIfLocationExists,
  AccommodationController.createAccommodation
);
router.patch(
  '/:accommodationId/rooms/:roomId/react',
  authMiddleware.checkUserLoggedIn,
  validateAccommodationReaction,
  accommodationMiddleware.checkBookingExist,
  accommodationMiddleware.checkIfLikeUnlikeAreSame,
  AccommodationController.updateAccommodationReaction
);
router.get(
  '/:accommodationId/rooms/:roomId/reactions-count',
  authMiddleware.checkUserLoggedIn,
  accommodationMiddleware.checkBookingExist,
  AccommodationController.countReactionsOnAccommodation
);
export default router;
