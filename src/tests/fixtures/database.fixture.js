import models from '../../models';

const {
  Accommodation,
  AddOnServices,
  Amenities,
  Booking,
  Comments,
  Image,
  Notifications,
  Preferences,
  Request,
  Rooms,
  Trip,
  Users } = models;

const cleanAllTables = async () => {
  await Accommodation.destroy({ where: {} });
  await AddOnServices.destroy({ where: {} });
  await Amenities.destroy({ where: {} });
  await Booking.destroy({ where: {} });
  await Comments.destroy({ where: {} });
  await Image.destroy({ where: {} });
  await Notifications.destroy({ where: {} });
  await Preferences.destroy({ where: {} });
  await Request.destroy({ where: {} });
  await Rooms.destroy({ where: {} });
  await Trip.destroy({ where: {} });
  await Users.destroy({ where: {} });
};

export default cleanAllTables;
