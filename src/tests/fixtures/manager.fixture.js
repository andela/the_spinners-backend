import faker from 'faker';
import BcryptService from '../../services/bcrypt.service';
import JwtService from '../../services/jwt.service';
import models from '../../models';

const { Users, Request } = models;
// create managers for management actions
export const loggedInManager1 = {
  id: faker.random.number({ min: 200, max: 205 }),
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
  id: faker.random.number({ min: 206, max: 210 }),
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

export const createManagers = async () => {
  await Request.destroy({ where: {} });
  await Users.create({ ...loggedInManager1, token: managerToken1 });
  await Users.create({ ...loggedInManager2, token: managerToken2 });
};
