import faker from 'faker';
import BcryptService from '../../services/bcrypt.service';
import AuthHandler from '../../services/jwt.service';

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
  password: BcryptService.hashPassword('Pass1234'),
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
  password: BcryptService.hashPassword('Pass1234'),
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
export const tokenWithWrongUser = AuthHandler.generateToken(payload);
