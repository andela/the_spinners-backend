import { Op } from 'sequelize';
import LocationService from '../services/location.service';
import ResponseService from '../services/response.service';
import AccommodationService from '../services/accommodation.service';
import BookingService from '../services/booking.service';


export const checkIfAccommodationTypeExists = async (req, res, next) => {
  const searchResult = await AccommodationService
    .findAccommodationType({ id: req.body.typeId });

  if (!searchResult) {
    ResponseService.setError(404, 'Accomodation type you specified doesn\'t exists');
    return ResponseService.send(res);
  }
  next();
};
export const checkIfLocationExists = async (req, res, next) => {
  const isLocationExist = await LocationService
    .findLocationByProperty({ id: req.body.locationId });

  if (!isLocationExist) {
    ResponseService.setError(404, 'Location Id you specified doesn\'t exists');
    return ResponseService.send(res);
  }
  next();
};

export const avoidDuplicateAccommodation = async (req, res, next) => {
  const doesAccomodationExist = await AccommodationService
    .findAccommodationByProperty({ name: req.body.name, locationId: req.body.locationId });

  if (doesAccomodationExist) {
    ResponseService.setError(409, 'This accomodation already exists');
    ResponseService.send(res);
  } else {
    next();
  }
};

export const checkAvailability = async (req, res, next) => {
  const searchResult = await AccommodationService
    .findAccommodationWithInclude(
      req.params.accommodationId,
      { include: [
        {
          association: 'rooms',
          where: {
            id: req.params.roomId,
            availableRooms: {
              [Op.gt]: 0
            }
          }
        }
      ]
      }
    );

  if (!searchResult) {
    ResponseService.setError(404, 'The accommodation Id or room id are not available');
    ResponseService.send(res);
  } else {
    const [{ dataValues }] = searchResult.get().rooms;
    req.availableRooms = dataValues.availableRooms;
    next();
  }
};

export const checkPermission = async (req, res, next) => {
  const searchResult = await AccommodationService
    .findBookingByProperty({ userId: req.userData.id,
      roomId: req.params.roomId,
      [Op.or]: [{
        from: {
          [Op.between]: [req.body.from, req.body.to]
        }
      },
      {
        to: {
          [Op.between]: [req.body.from, req.body.to]
        }
      }]
    });
  if (!Array.isArray(searchResult) || !searchResult.length) {
    next();
  } else {
    ResponseService.setError(409, 'You have an existing booking in this time period');
    ResponseService.send(res);
  }
};

const accommodationMiddleware = {
  checkBookingExist: async (req, res, next) => {
    const findBooking = await BookingService.findBookingByProperty({
      accommodationId: req.params.accommodationId,
      roomId: req.params.roomId,
      userId: req.userData.id
    });
    if (!findBooking) {
      ResponseService.setError(404, 'Accommodation booking not found');
      return ResponseService.send(res);
    }
    next();
  },
};

export default accommodationMiddleware;
