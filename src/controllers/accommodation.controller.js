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
  static async handleAccommodation(req, res) {
    const { dataValues } = await AccommodationService.createAccommodation({ ...req.body });
    const { updatedAt, createdAt, ...newAccommodation } = dataValues;
    ResponseService.setSuccess(201, 'Accommodation is successfully created', newAccommodation);
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
  static async handleAccommodationType(req, res) {
    const accommodationtypes = await AccommodationService.findAllType();
    const availableAccommodationTypes = [];
    accommodationtypes.map((type) => {
      const { dataValues } = type;
      const { updatedAt, createdAt, ...accommodationType } = dataValues;
      return availableAccommodationTypes.push(accommodationType);
    });
    ResponseService.setSuccess(200, 'list of available accommodation types', availableAccommodationTypes);
    return ResponseService.send(res);
  }
}

export default AccommodationController;
