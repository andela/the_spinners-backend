import express from 'express';
import TripController from '../controllers/trip.controller';
import oneWayTripValidation from '../validations/one-way-trip.validation';
import authMiddleware from '../middlewares/auth.middleware';
import TripValidation from '../validations/trip.validation';
import requestValidation from '../validations/request.validation';
import multiCityTripValidation from '../validations/multi-city-trip.validation';

const router = express.Router();

router.post('/one-way-trips', authMiddleware.checkUserLoggedIn, oneWayTripValidation, TripController.requestOneWayTrip); // One way trip route
router.post('/return-trip', authMiddleware.checkUserLoggedIn, TripValidation, TripController.requestReturnTrip); // Return trip route
router.get('/requests/:userId', authMiddleware.checkUserLoggedIn, requestValidation, TripController.userTripRequestList); // user request list route
router.post('/multi-city-trips', authMiddleware.checkUserLoggedIn, multiCityTripValidation, TripController.requestMultiCityTrip);
router.get('/locations', authMiddleware.checkUserLoggedIn, TripController.viewAvailableLocations);

export default router;
