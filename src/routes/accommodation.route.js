import express from 'express';
import authMiddleware from '../middlewares/auth.middleware';
import AccommodationController from '../controllers/accommodation.controller';
import { bookAccommodationValidation, createAccommodationValidations } from '../validations/accommodation.validation';
import { checkIfAccommodationTypeExists, checkIfLocationExists, avoidDuplicateAccommodation } from '../middlewares/accomodation.middleware';

const router = express.Router();

router.post('/:accommodationId/book', authMiddleware.checkUserLoggedIn, bookAccommodationValidation, AccommodationController.createBooking);
router.get('/', authMiddleware.checkUserLoggedIn, AccommodationController.getAccommodations);
router.post(
  '/',
  authMiddleware.checkUserLoggedIn, createAccommodationValidations,
  authMiddleware.verifyPermissions,
  avoidDuplicateAccommodation,
  checkIfAccommodationTypeExists, checkIfLocationExists,
  AccommodationController.createAccommodation
);


export default router;
