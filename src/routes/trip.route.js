import express from 'express';
import TripController from '../controllers/trip.controller';
import oneWayTripValidation from '../validations/one-way-trip.validation';
import authMiddleware from '../middlewares/auth.middleware';
import TripValidation from '../validations/trip.validation';

const router = express.Router();

router.post('/one-way-trips', authMiddleware.checkUserLoggedIn, oneWayTripValidation, TripController.requestOneWayTrip); // One way trip route

router.post('/return-trip', authMiddleware.checkUserLoggedIn, TripValidation, TripController.requestReturnTrip); // Return trip route

export default router;
