import express from 'express';
import TripController from '../controllers/trip.controller';
import CommentController from '../controllers/comment.controller';
import oneWayTripValidation from '../validations/one-way-trip.validation';
import authMiddleware from '../middlewares/auth.middleware';
import TripValidation from '../validations/trip.validation';
import {
  requestValidation,
  editTripRequestValidation
} from '../validations/request.validation';
import multiCityTripValidation from '../validations/multi-city-trip.validation';
import UserValidation from '../validations/user.validation';
import tripMiddleware from '../middlewares/trip.middleware';
import requestMiddleware from '../middlewares/request.middleware';
import { locationValidation } from '../validations/location.validation';

const router = express.Router();

router.post('/one-way', authMiddleware.checkUserLoggedIn, authMiddleware.checkIfUserHaveManager, oneWayTripValidation, TripController.requestOneWayTrip); // One way trip route
router.post('/return', authMiddleware.checkUserLoggedIn, authMiddleware.checkIfUserHaveManager, TripValidation, TripController.requestReturnTrip); // Return trip route
router.post('/multi-city', authMiddleware.checkUserLoggedIn, authMiddleware.checkIfUserHaveManager, multiCityTripValidation, TripController.requestMultiCityTrip);
router.get('/requests', authMiddleware.checkUserLoggedIn, requestValidation, TripController.userTripRequestList); // user request list route
router.get('/locations', authMiddleware.checkUserLoggedIn, TripController.viewAvailableLocations);
router.post('/requests/:tripId/comments', authMiddleware.checkUserLoggedIn, UserValidation.validateUserComment, CommentController.addCommentOnTripRequest); // user comment on request trip route
router.patch('/:tripId/requests/:requestId', authMiddleware.checkUserLoggedIn, editTripRequestValidation, locationValidation, tripMiddleware.checkIfTripExist, requestMiddleware.checkIfTripRequestExist, TripController.editOpenTripRequest);

export default router;
