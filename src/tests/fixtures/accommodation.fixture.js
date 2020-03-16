import faker from 'faker';
import BcryptService from '../../services/bcrypt.service';
import JwtService from '../../services/jwt.service';
import models from '../../models';
import { defaultPreferences } from './users.fixture';

const { Users, Preferences, Accommodation } = models;

const fakerDate1 = faker.date.future(2);
const month1 = (`0${fakerDate1.getMonth() + 1}`).slice(-2);
const date1 = (`0${fakerDate1.getDate()}`).slice(-2);
const formattedDate1 = `${fakerDate1.getFullYear()}-${month1}-${date1}`;
const fakerDate2 = faker.date.future(10);
const month2 = (`0${fakerDate2.getMonth() + 1}`).slice(-2);
const date2 = (`0${fakerDate2.getDate()}`).slice(-2);
const formattedDate2 = `${fakerDate2.getFullYear()}-${month2}-${date2}`;

export const booking = {
  from: formattedDate1,
  to: formattedDate2
};

export const travelAdmin = {
  id: faker.random.number(),
  firstName: faker.name.firstName(),
  lastName: faker.name.lastName(),
  email: faker.internet.email(),
  password: BcryptService.hashPassword(faker.internet.password()),
  isVerified: true,
  role: 'travel_team_member',
  createdAt: new Date(),
  updatedAt: new Date(),
};
export const travelAdminToken = JwtService.generateToken({
  id: travelAdmin.id,
  firstName: travelAdmin.firstName,
  lastName: travelAdmin.lastName,
  email: travelAdmin.email,
});

const generateImage = (subjectType) => {
  const image = {
    imageUrl: faker.image.imageUrl(),
    subjectType
  };
  return image;
};
const generateRoom = () => {
  const room = {
    roomType: faker.commerce.productName(),
    numberOfPeople: faker.random.number({ min: 1, max: 6 }),
    roomPictures: [generateImage('Room'), generateImage('Room'), generateImage('Room')],
    roomPrice: faker.finance.amount(),
    numberOfRooms: faker.random.number({ min: 1, max: 100 })
  };
  return room;
};

const generateRoom2 = () => {
  const room = {
    roomType: faker.commerce.productName(),
    numberOfPeople: faker.random.number({ min: 1, max: 6 }),
    roomPictures: [generateImage('Room'), generateImage('Room'), generateImage('Room')],
    roomPrice: faker.finance.amount(),
    numberOfRooms: faker.random.number({ min: 1, max: 100 }),
    availableRooms: faker.random.number({ min: 1, max: 100 })
  };
  return room;
};
const generateAddOn = () => {
  const addOn = {
    serviceName: faker.commerce.productName(),
    price: faker.finance.amount(),
    description: faker.lorem.sentence()
  };
  return addOn;
};
const generateAmenity = () => {
  const amenity = {
    amenity: faker.commerce.productName(),
  };
  return amenity;
};

export const newAccomodation = {
  name: faker.commerce.productName(),
  typeId: faker.random.number({ min: 1, max: 5 }),
  locationId: faker.random.number({ min: 1, max: 9 }),
  rating: faker.random.number({ min: 1, max: 5 }),
  description: faker.lorem.sentence(),
  accommodationPictures: [generateImage('accommodation'), generateImage('accommodation'), generateImage('accommodation')],
  addOnServices: [generateAddOn(), generateAddOn()],
  amenities: [generateAmenity(), generateAmenity()],
  rooms: [generateRoom(), generateRoom(), generateRoom()],
};

export const generateAccomodation = async () => {
  const accommodation = {
    name: faker.commerce.productName(),
    typeId: faker.random.number({ min: 1, max: 5 }),
    locationId: faker.random.number({ min: 1, max: 9 }),
    description: faker.lorem.sentence(),
    accommodationPictures: [generateImage('accommodation'), generateImage('accommodation'), generateImage('accommodation')],
    addOnServices: [generateAddOn(), generateAddOn()],
    amenities: [generateAmenity(), generateAmenity()],
    rooms: [generateRoom2(), generateRoom2(), generateRoom2()],
    allAvailableRooms: faker.random.number({ min: 1, max: 90 }),
    totalRooms: faker.random.number({ min: 1, max: 90 })
  };
  return accommodation;
};
export const createAccommodation = async () => {
  await Accommodation.create(await generateAccomodation(), {
    include: ['addOnServices', 'accommodationPictures', 'amenities',
      {
        association: 'rooms',
        include: ['roomPictures']
      }
    ]
  });
};
export const crateMultipleAccommodations = async () => {
  await createAccommodation();
  await createAccommodation();
  await createAccommodation();
  await createAccommodation();
  await createAccommodation();
  await createAccommodation();
  await createAccommodation();
  await createAccommodation();
  await createAccommodation();
  await createAccommodation();
  await createAccommodation();
  return 0;
};


export const createTravelAdmin = async () => {
  await Users.create({ ...travelAdmin, token: travelAdminToken });
  await Preferences.create({ ...defaultPreferences, userId: travelAdmin.id });
};
