import { Op } from 'sequelize';
import ResponseService from '../services/response.service';
import TripService from '../services/trip.service';
import LocationService from '../services/location.service';

export default async (req, res, schema, next) => {
  const { error } = schema.validate(req.body);
  const allErrorMessages = [];
  if (error) {
    const errorMessages = error.details.map((err) => err.message.replace(/[^a-zA-Z0-9 .-]/g, ''));
    if (typeof req.body.map !== 'function') {
      ResponseService.setError(400, errorMessages);
      return ResponseService.send(res);
    }
    allErrorMessages.push(errorMessages);
  }
  if (allErrorMessages.length !== 0) {
    ResponseService.setError(400, allErrorMessages);
    return ResponseService.send(res);
  }
  let locations;
  if (typeof req.body.map !== 'function') {
    locations = [Number(req.body.originId), Number(req.body.destinationId)];
  } else {
    const originIds = req.body.map(({ originId }) => originId);
    const destinationIds = req.body.map(({ destinationId }) => destinationId);
    locations = [...originIds, ...destinationIds];
  }
  const locationsData = await LocationService.findLocationsByProperty({
    id: { [Op.in]: locations }
  });
  const locationsDataIds = locationsData.map(({ dataValues }) => dataValues.id);
  const NoExistLocation = locations.filter((location) => !locationsDataIds.includes((location)));
  if (NoExistLocation.length !== 0) {
    ResponseService.setError(400, `location with id ${NoExistLocation} is not available`);
    return ResponseService.send(res);
  }
  if (typeof req.body.map === 'function') {
    const filteredTrips = req.body.filter((trip, index) => index !== 0);
    try {
      filteredTrips.forEach((trip, index) => {
        if (req.body[index + 1].originId !== req.body[index].destinationId) throw new Error('Next origin location have to be the same as previous destination location');
      });
    } catch (err) {
      ResponseService.setError(400, err.message);
      return ResponseService.send(res);
    }
  }
  let originId;
  let destinationId;
  let departureDate;
  if (typeof req.body.map !== 'function') {
    originId = req.body.originId;

    destinationId = req.body.destinationId;
    departureDate = { [Op.between]: [new Date(`${req.body.departureDate}T00:00:00.000Z`), new Date(`${req.body.departureDate}T23:59:59.999Z`)] };
  } else {
    const trips = req.body;
    const originIds = trips.map(trip => trip.originId);
    const destinationIds = trips.map(trip => trip.destinationId);
    const departureDates = trips.map(trip => new Date(`${trip.departureDate}T00:00:00.000Z`));
    originId = { [Op.in]: originIds };
    destinationId = { [Op.in]: destinationIds };
    departureDate = { [Op.in]: departureDates };
  }
  const tripExist = await TripService.findTripsByProperty({
    originId, destinationId, departureDate
  });
  if (tripExist.length !== 0) {
    ResponseService.setError(409, 'Trip request already created');
    return ResponseService.send(res);
  }
  next();
};
