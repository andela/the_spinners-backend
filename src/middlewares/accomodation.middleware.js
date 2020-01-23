import LocationService from '../services/location.service';
import ResponseService from '../services/response.service';
import AccommodationService from '../services/accommodation.service';


export const checkIfAccommodationTypeExists = async (req, res, next) => {
  const searchResult = await AccommodationService
    .findAccommodationType({ id: req.body.typeId });

  if (!searchResult) {
    ResponseService.setError(403, 'Accomodation type you specified doesn\'t exists');
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
