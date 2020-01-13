import express from 'express';
import authMiddleware from '../middlewares/auth.middleware';
import AccommodationController from '../controllers/accommodation.controller';
import bookAccommodationValidation from '../validations/accommodation.validation';

const router = express.Router();

router.post('/:accommodationId/book', authMiddleware.checkUserLoggedIn, bookAccommodationValidation, AccommodationController.createBooking);
router.get('/', authMiddleware.checkUserLoggedIn, AccommodationController.getAccommodations);

export default router;
