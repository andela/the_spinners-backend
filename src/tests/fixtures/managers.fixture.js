import faker from 'faker';
import BcryptService from '../../services/bcrypt.service';
import JwtService from '../../services/jwt.service';
import models from '../../models';
import { defaultPreferences } from './users.fixture';

const { Users, Preferences } = models;

// create managers for management actions
export const loggedInManager1 = {
  id: faker.random.number(),
  firstName: faker.name.firstName(),
  lastName: faker.name.lastName(),
  email: faker.internet.email(),
  password: BcryptService.hashPassword(faker.internet.password()),
  isVerified: true,
  role: 'manager',
  createdAt: new Date(),
  updatedAt: new Date(),
};
export const managerToken1 = JwtService.generateToken({
  id: loggedInManager1.id
});
export const loggedInManager2 = {
  id: faker.random.number(),
  firstName: faker.name.firstName(),
  lastName: faker.name.lastName(),
  email: faker.internet.email(),
  password: BcryptService.hashPassword(faker.internet.password()),
  isVerified: true,
  role: 'manager',
  createdAt: new Date(),
  updatedAt: new Date(),
};
export const managerToken2 = JwtService.generateToken({
  id: loggedInManager2.id
});
export const loggedInNonManager = {
  id: faker.random.number(),
  firstName: faker.name.firstName(),
  lastName: faker.name.lastName(),
  email: faker.internet.email(),
  password: BcryptService.hashPassword(faker.internet.password()),
  isVerified: true,
  role: 'requester',
  createdAt: new Date(),
  updatedAt: new Date(),
};
export const nonManagerToken = JwtService.generateToken({
  id: loggedInNonManager.id
});

export const createManagers = async () => {
  const manager1 = await Users.create({ ...loggedInManager1, token: managerToken1 });
  await Users.create({ ...loggedInManager2, token: managerToken2 });
  await Users.create({ ...loggedInNonManager, token: nonManagerToken });
  await Preferences.create({ ...defaultPreferences, userId: loggedInManager1.id });
  await Preferences.create({ ...defaultPreferences, userId: loggedInManager2.id });
  return manager1.dataValues;
};
