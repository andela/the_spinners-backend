import faker from 'faker';
import BcryptService from '../../services/bcrypt.service';
import JwtService from '../../services/jwt.service';
import models from '../../models';

const { Users } = models;

export const userPassword = faker.internet.password();
export const signupFixtures = {
  firstName: faker.name.firstName(),
  lastName: faker.name.lastName(),
  email: faker.internet.email(),
  password: faker.internet.password()
};

export default {
  signupFixtures
};

const payload = {
  id: 20,
  email: faker.internet.email(),
  firstName: faker.name.firstName(),
  lastName: faker.name.lastName()
};
// get some fake data for example
export const activeUser = {
  id: 2,
  firstName: faker.name.firstName(),
  lastName: faker.name.lastName(),
  email: faker.internet.email(),
  password: BcryptService.hashPassword(userPassword),
  isVerified: true,
  createdAt: new Date(),
  updatedAt: new Date(),
};
export const wrongToken = 'eyJhbGcihgvasdbjvdskmnhwb erfqr63489u2bnlsdkvqerui2346R5cCJ9';
export const notActive = {
  id: 3,
  firstName: faker.name.firstName(),
  lastName: faker.name.lastName(),
  email: faker.internet.email(),
  password: BcryptService.hashPassword(userPassword),
  isVerified: false,
  createdAt: new Date(),
  updatedAt: new Date(),
};
export const wrongUser = {
  email: 'test1@spinners.com',
  password: 'aspword1234'
};
export const wrongEmail = {
  email: 'testspinners.com',
  password: 'Pass1234'
};
export const tokenWithWrongUser = JwtService.generateToken(payload);
export const loggedInUser = {
  id: 30,
  firstName: faker.name.firstName(),
  lastName: faker.name.lastName(),
  email: faker.internet.email(),
  password: BcryptService.hashPassword(userPassword),
  isVerified: true,
  createdAt: new Date(),
  updatedAt: new Date(),
};

export const loggedInToken = JwtService.generateToken({
  id: loggedInUser.id,
  firstName: loggedInUser.firstName,
  lastName: loggedInUser.lastName,
  email: loggedInUser.email,
});

export const createUsers = async () => {
  await Users.create(activeUser);
  await Users.create(notActive);
  await Users.create({ ...loggedInUser, token: loggedInToken });
};

export const user = {
  email: activeUser.email,
  password: userPassword,
};
