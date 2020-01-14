import faker from 'faker';
import RequestService from '../../services/request.service';
import models from '../../models';
import { createManagers } from './managers.fixture';
import { cleanDb } from './users.fixture';


const { Request } = models;

const createRequests = async () => {
  await cleanDb();
  const manager1 = await createManagers();
  const pendingRequest = {
    id: faker.random.number({ min: 1, max: 5 }),
    requesterId: faker.random.number(),
    tripId: faker.random.number(),
    status: 'pending',
    lineManagerId: manager1.id
  };
  await Request.destroy({ where: {} });
  const { dataValues } = await RequestService.createRequest(pendingRequest);
  return dataValues;
};

export default createRequests;
