import faker from 'faker';
import BcryptService from '../../services/bcrypt.service';
import JwtService from '../../services/jwt.service';
import models from '../../models';

const { Users, Preferences, Chat } = models;


export const user = {
  id: faker.random.number({ min: 30, max: 40 }),
  firstName: faker.name.firstName(),
  lastName: faker.name.lastName(),
  email: faker.internet.email(),
  password: BcryptService.hashPassword(faker.internet.password()),
  isVerified: true,
  lineManagerId: faker.random.number({ min: 150, max: 154 }),
  createdAt: new Date(),
  updatedAt: new Date(),
};
export const tokenUser = JwtService.generateToken({
  id: user.id,
  firstName: user.firstName,
  lastName: user.lastName,
  email: user.email
});

export const user1 = {
  id: faker.random.number({ min: 0, max: 12 }),
  firstName: faker.name.firstName(),
  lastName: faker.name.lastName(),
  email: faker.internet.email(),
  password: BcryptService.hashPassword(faker.internet.password()),
  isVerified: true,
  lineManagerId: faker.random.number({ min: 150, max: 154 }),
  createdAt: new Date(),
  updatedAt: new Date(),
};
export const tokenUser1 = JwtService.generateToken({
  id: user1.id,
  firstName: user1.firstName,
  lastName: user1.lastName,
  email: user1.email
});

export const user2 = {
  id: faker.random.number({ min: 14, max: 22 }),
  firstName: faker.name.firstName(),
  lastName: faker.name.lastName(),
  email: faker.internet.email(),
  password: BcryptService.hashPassword(faker.internet.password()),
  isVerified: true,
  lineManagerId: faker.random.number({ min: 150, max: 154 }),
  createdAt: new Date(),
  updatedAt: new Date(),
};
export const tokenUser2 = JwtService.generateToken({
  id: user2.id,
  firstName: user2.firstName,
  lastName: user2.lastName,
  email: user2.email
});

export const defaultPreferences = {
  isEmailNotification: true,
  isInAppNotification: true
};

export const createChatUsers = async () => {
  await Users.destroy({ where: {} });
  await Preferences.destroy({ where: {} });
  await Users.create({ ...user, token: tokenUser });
  await Preferences.create({ ...defaultPreferences, userId: user.id });
  await Users.create({ ...user2, token: tokenUser2 });
  await Preferences.create({ ...defaultPreferences, userId: user2.id });
  await Users.create(user1);
  await Preferences.create({ ...defaultPreferences, userId: user1.id });
};

const chat = {
  sender: user.email,
  receiver: user1.email,
  message: 'Hello'
};

export const createChat = async () => {
  await Chat.create(chat);
  await Chat.create({ ...chat, sender: user1.email });
};
