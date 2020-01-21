import ResponseService from '../services/response.service';
import RequestService from '../services/request.service';

const requestMiddleware = {
  checkIfTripRequestExist: async (req, res, next) => {
    const { userData } = req;
    const userId = userData.id;
    const tripRequestId = req.params.requestId;
    const { tripId } = req.params;
    const findTripRequest = await RequestService.findRequestByProperty({ id: tripRequestId, requesterId: userId, tripId, status: 'pending' });
    if (!findTripRequest) {
      ResponseService.setError(404, 'Trip Request Not Found.');
      return ResponseService.send(res);
    }
    next();
  }
};

export default requestMiddleware;
