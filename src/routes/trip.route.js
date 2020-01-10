import express from 'express';
import TripController from '../controllers/trip.controller';
import CommentController from '../controllers/comment.controller';
import oneWayTripValidation from '../validations/one-way-trip.validation';
import authMiddleware from '../middlewares/auth.middleware';
import TripValidation from '../validations/trip.validation';
import requestValidation from '../validations/request.validation';
import multiCityTripValidation from '../validations/multi-city-trip.validation';
import UserValidation from '../validations/user.validation';

const router = express.Router();

router.post('/one-way-trips', authMiddleware.checkUserLoggedIn, authMiddleware.checkIfUserHaveManager, oneWayTripValidation, TripController.requestOneWayTrip); // One way trip route
router.post('/return-trip', authMiddleware.checkUserLoggedIn, authMiddleware.checkIfUserHaveManager, TripValidation, TripController.requestReturnTrip); // Return trip route
router.get('/requests/:userId', authMiddleware.checkUserLoggedIn, requestValidation, TripController.userTripRequestList); // user request list route
router.post('/multi-city-trips', authMiddleware.checkUserLoggedIn, authMiddleware.checkIfUserHaveManager, multiCityTripValidation, TripController.requestMultiCityTrip);
router.get('/locations', authMiddleware.checkUserLoggedIn, TripController.viewAvailableLocations);
router.post('/trip-requests/:tripId/comments', authMiddleware.checkUserLoggedIn, UserValidation.validateUserComment, CommentController.addCommentOnTripRequest); // user comment on request trip route

export default router;
