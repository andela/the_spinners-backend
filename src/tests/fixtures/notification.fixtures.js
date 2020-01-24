import faker from 'faker';
import { loggedInUser } from './users.fixture';
import models from '../../models';

const { Notifications } = models;

export const readNotification = {
  id: faker.random.number({ min: 170, max: 175 }),
  userId: loggedInUser.id,
  message: faker.lorem.sentence(),
  isRead: true,
  type: 'new_request',
  requestId: faker.random.number({ min: 1, max: 40 })
};
export const unreadNotification = {
  id: faker.random.number({ min: 176, max: 180 }),
  userId: loggedInUser.id,
  message: faker.lorem.sentence(),
  isRead: false,
  type: 'new_request',
  requestId: faker.random.number({ min: 1, max: 40 })
};
export const notification2 = {
  id: faker.random.number({ min: 181, max: 200 }),
  userId: loggedInUser.id,
  message: faker.lorem.sentence(),
  isRead: false,
  type: 'new_request',
  requestId: faker.random.number({ min: 1, max: 40 })
};

export const createNotifications = async () => {
  await Notifications.destroy({ where: {} });
  await Notifications.create(readNotification);
  await Notifications.create(unreadNotification);
  await Notifications.create(notification2);
};
