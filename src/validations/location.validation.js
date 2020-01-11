import { Op } from 'sequelize';
import ResponseService from '../services/response.service';
import LocationService from '../services/location.service';

/**
 * @param {req} req
 * @param {res} res
 * @param {next} next
 * @returns {returns} return values
*/
export async function locationValidation(req, res, next) {
  const isLocationExist = await LocationService.findAllLocationByProperty({
    id: {
      [Op.in]: [req.body.originId, req.body.destinationId]
    }
  });
  if (isLocationExist.length !== 2) {
    ResponseService.setError(404, 'Trip Not Updated. Check if two locations inputs are available and Not equal');
    return ResponseService.send(res);
  }
  next();
}

export default {
  locationValidation
};
