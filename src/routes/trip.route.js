import express from 'express';
import TripController from '../controllers/trip.controller';
import CommentController from '../controllers/comment.controller';
import oneWayTripValidation from '../validations/one-way-trip.validation';
import authMiddleware from '../middlewares/auth.middleware';
import returnTripValidation from '../validations/return-trip.validation';
import { requestValidation } from '../validations/request.validation';
import multiCityTripValidation from '../validations/multi-city-trip.validation';
import UserValidation from '../validations/user.validation';
import CommentMiddleware from '../middlewares/comment.middleware';
import TripMiddleware from '../middlewares/trip.middleware';

const router = express.Router();

router.post('/one-way', authMiddleware.checkUserLoggedIn, authMiddleware.checkIfUserHaveManager, oneWayTripValidation, TripMiddleware.checkOriginDestinationEquality, TripController.requestOneWayTrip); // One way trip route
router.post('/return', authMiddleware.checkUserLoggedIn, authMiddleware.checkIfUserHaveManager, returnTripValidation, TripMiddleware.checkOriginDestinationEquality, TripController.requestReturnTrip); // Return trip route
router.post('/multi-city', authMiddleware.checkUserLoggedIn, authMiddleware.checkIfUserHaveManager, multiCityTripValidation, TripController.requestMultiCityTrip);
router.get('/requests', authMiddleware.checkUserLoggedIn, requestValidation, TripController.userTripRequestList); // manager's request list route
router.get('/locations', authMiddleware.checkUserLoggedIn, TripController.viewAvailableLocations);
router.post('/requests/:tripId/comments', authMiddleware.checkUserLoggedIn, UserValidation.validateUserComment, CommentController.addCommentOnTripRequest); // user comment on request trip route
router.delete('/:tripId/comments/:commentId', authMiddleware.checkUserLoggedIn, UserValidation.validateDeleteTripComment, CommentMiddleware.checkCommentExist, CommentController.deleteComment); // user deletes comment route
router.get('/request/:tripId/comments', authMiddleware.checkUserLoggedIn, CommentMiddleware.validateViewComment, CommentController.viewCommentPostedOnTripRequest); // user view comment posted on the thread

export default router;
