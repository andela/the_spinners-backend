import express from 'express';
import authMiddleware from '../middlewares/auth.middleware';
import AccommodationController from '../controllers/accommodation.controller';
import bookAccommodationValidation from '../validations/book-accommodation.validation';

const router = express.Router();

router.post('/book-accommodation', authMiddleware.checkUserLoggedIn, bookAccommodationValidation, AccommodationController.handleAccommodation);
router.get('/accommodation-types', authMiddleware.checkUserLoggedIn, AccommodationController.handleAccommodationType);

export default router;
