import faker from 'faker';
import RequestService from '../../services/request.service';
import models from '../../models';
import { loggedInManager1 } from './managers.fixture';
import BcryptService from '../../services/bcrypt.service';
import JwtService from '../../services/jwt.service';
import { defaultPreferences } from './users.fixture';


const { Request, Users, Preferences } = models;

const requestor = {
  id: faker.random.number({ min: 100, max: 150 }),
  firstName: faker.name.firstName(),
  lastName: faker.name.lastName(),
  email: faker.internet.email(),
  password: BcryptService.hashPassword(faker.internet.password()),
  isVerified: true,
  lineManagerId: loggedInManager1.id,
  createdAt: new Date(),
  updatedAt: new Date(),
};

export const requestorToken = JwtService.generateToken({
  id: requestor.id,
  firstName: requestor.firstName,
  lastName: requestor.lastName,
  email: requestor.email
});

export const pendingRequest = {
  id: faker.random.number({ min: 1, max: 5 }),
  requesterId: requestor.id,
  tripId: faker.random.number({ min: 10, max: 19 }),
  status: 'pending',
  lineManagerId: requestor.lineManagerId
};

export const createRequests = async () => {
  await Request.destroy({ where: {} });
  const { dataValues } = await RequestService.createRequest(pendingRequest);
  await Users.create({ ...requestor, token: requestorToken });
  await Preferences.create({ ...defaultPreferences, userId: requestor.id });
  return dataValues;
};

export const invalidTripRequestId = faker.random.number({ min: 100000, max: 100001 });
