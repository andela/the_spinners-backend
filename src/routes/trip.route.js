import express from 'express';
import TripController from '../controllers/trip.controller';
import oneWayTripValidation from '../validations/one-way-trip.validation';
import authMiddleware from '../middlewares/auth.middleware';

const router = express.Router();

router.post('/one-way-trips', authMiddleware.checkUserLoggedIn, oneWayTripValidation, TripController.requestOneWayTrip);


export default router;
