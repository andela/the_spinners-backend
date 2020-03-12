import express from 'express';
import authMiddleware from '../middlewares/auth.middleware';
import AccommodationController from '../controllers/accommodation.controller';
import { bookAccommodationValidation, createAccommodationValidations } from '../validations/accommodation.validation';
import { checkIfAccommodationTypeExists,
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


export default router;
