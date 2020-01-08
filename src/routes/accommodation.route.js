import express from 'express';
import authMiddleware from '../middlewares/auth.middleware';
import AccommodationController from '../controllers/accommodation.controller';
import bookAccommodationValidation from '../validations/accommodation.validation';

const router = express.Router();

router.post('/', authMiddleware.checkUserLoggedIn, bookAccommodationValidation, AccommodationController.createAccommodation);
router.get('/types', authMiddleware.checkUserLoggedIn, AccommodationController.getAccommodationType);

export default router;
