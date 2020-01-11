import ResponseService from '../services/response.service';
import TripService from '../services/trip.service';

const tripMiddleware = {
  checkIfTripExist: async (req, res, next) => {
    const { userData } = req;
    const userId = userData.id;
    const { tripId } = req.params;
    const findTripById = await TripService.findTripByProperty({
      tripId,
      userId
    });
    if (!findTripById) {
      ResponseService.setError(404, 'Trip Not Found.');
      return ResponseService.send(res);
    }
    next();
  }
};

export default tripMiddleware;
