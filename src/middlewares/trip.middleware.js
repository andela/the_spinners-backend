/* eslint-disable no-trailing-spaces */
/* eslint-disable no-mixed-operators */
/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
import ResponseService from '../services/response.service';
import TripService from '../services/trip.service';
import LocationService from '../services/location.service';
import RequestService from '../services/request.service';
/**
 *
 *
 * @class CommentMiddleware
 */
class TripMiddleware {
  /**
*
*
* @static
* @param {req} req
* @param {res} res
* @param {next} next
* @returns {object} This function check if trip exists
* @memberof TripMiddleware
*/
  static async checkTripExist(req, res, next) {
    const currentTrip = await TripService.findTripByProperty({
      id: parseInt(req.params.tripId, 10)
    });
    if (!currentTrip) {
      ResponseService.setError(404, 'Trip Not Found.Try Another tripId');
      return ResponseService.send(res);
    }
    next();
  }

  /**
 *
 *
 * @static
 * @param {req} req
 * @param {res} res
 * @param {next} next
 * @returns {object} This function check if origin and destination are equal
 * @memberof TripMiddleware
 */
  static async checkOriginDestinationEquality(req, res, next) {
    const { originId, destinationId } = req.body;
    if (originId === destinationId) {
      ResponseService.setError(400, 'Origin and destination must be different');
      return ResponseService.send(res);
    }
    next();
  }

  /**
*
*
* @static
* @param {req} req
* @param {res} res
* @param {next} next
* @returns {object} This function check if returnDate is inputted on one-way and multi-city trips
* @memberof TripMiddleware
*/
  static async checkReturnDate(req, res, next) {
    const currentTrip = await TripService.findTripByProperty({
      id: parseInt(req.params.tripId, 10)
    });
    if ((currentTrip.tripType !== 'return-trip') && (req.body.returnDate)) {
      ResponseService.setError(400, 'Return Date Only Allowed On return Trip');
      return ResponseService.send(res);
    }
    next();
  }

  /**
*
*
* @static
* @param {req} req
* @param {res} res
* @param {next} next
* @returns {object} This function check if returnDate is inputted on one-way and multi-city trips
* @memberof TripMiddleware
*/
  static async checkRequestStatus(req, res, next) {
    const currentTrip = await TripService.findTripByProperty({
      id: parseInt(req.params.tripId, 10)
    });
    const currentRequest = await RequestService.findRequestByProperty(
      {
        id: currentTrip.requestId
      }
    );
    if (currentRequest.status !== 'pending') {
      ResponseService.setError(400, 'Only Pending Trip Request Can Be Updated');
      ResponseService.send(res);
    }
    req.currentTrip = currentTrip;
    req.currentRequest = currentRequest;
    next();
  }

  /**
*
*
* @static
* @param {req} req
* @param {res} res
* @param {next} next
* @returns {object} This function check if origin is not equal due to the upate from sibling trip update
* @memberof TripMiddleware
*/
  static async checkTripOrigin(req, res, next) {
    const currentTrip = await TripService.findTripByProperty({
      id: parseInt(req.params.tripId, 10)
    });
    const multicityPrevNextTrips = await TripService.findAllByProperty({
      requestId: currentTrip.requestId
    });
    let previousTripOriginId;

    const previousTripId = currentTrip.id - 1;
    let previousTrip;
    if (previousTripId !== 0) {
      previousTrip = multicityPrevNextTrips.find(prevTrip => prevTrip.id === currentTrip.id - 1);
      if (previousTrip && req.body.originId) {
        previousTripOriginId = previousTrip.originId;
        if (previousTripOriginId === req.body.originId) {
          req.body.originId = currentTrip.originId;
          const originData = await LocationService.findLocationByProperty({
            id: previousTripOriginId
          });
          const originName = originData.country;
          ResponseService.setError(400, `Origin must be different to previous trip origin(${originName})`);
          ResponseService.send(res);
        }
      }
    }
    next();
  }

  /**
*
*
* @static
* @param {req} req
* @param {res} res
* @param {next} next
* @returns {object} This function check if destination is not equal due to the upate from sibling trip update
* @memberof TripMiddleware
*/
  static async checkTripDestination(req, res, next) {
    const currentTrip = await TripService.findTripByProperty({
      id: parseInt(req.params.tripId, 10)
    });
    const multicityPrevNextTrips = await TripService.findAllByProperty({
      requestId: currentTrip.requestId
    });

    let nextTripDestinationId;

    const nextTripId = currentTrip.id + 1;
    let nextTrip;

    if (nextTripId !== 0) {
      nextTrip = multicityPrevNextTrips.find(nexTrip => nexTrip.id === currentTrip.id + 1);
      if (nextTrip && req.body.destinationId) {
        nextTripDestinationId = nextTrip.destinationId;
        if (nextTripDestinationId === req.body.destinationId) {
          req.body.destinationId = currentTrip.destinationId;
          const destinationData = await LocationService.findLocationByProperty({
            id: nextTripDestinationId
          });
          const destinationName = destinationData.country;
          ResponseService.setError(400, `Destination must be different to next trip Destination(${destinationName})`);
          ResponseService.send(res);
        }
      }
    }
    next();
  }
}

export default TripMiddleware;
