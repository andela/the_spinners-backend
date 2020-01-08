import AccommodationService from '../services/accommodation.service';
import ResponseService from '../services/response.service';

/**
 *
 *
 * @class AccommodationController
 */
class AccommodationController {
  /**
           *
           *
           * @static
           * @param {req} req
           * @param {res} res
           * @returns {response} @memberof AccommodationController
           */
  static async createAccommodation(req, res) {
    const { dataValues } = await AccommodationService.createAccommodation({ ...req.body });
    ResponseService.setSuccess(201, 'Accommodation is successfully created', dataValues);
    return ResponseService.send(res);
  }

  /**
           *
           *
           * @static
           * @param {req} req
           * @param {res} res
           * @returns {response} @memberof AccommodationController
           */
  static async getAccommodationType(req, res) {
    const accommodationtypes = await AccommodationService.findAllType();
    const availableAccommodationTypes = accommodationtypes.map((type) => {
      const { dataValues } = type;
      return dataValues;
    });
    ResponseService.setSuccess(200, 'list of available accommodation types', availableAccommodationTypes);
    return ResponseService.send(res);
  }
}

export default AccommodationController;
