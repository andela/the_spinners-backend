import faker from 'faker';
import RequestService from '../../services/request.service';
import models from '../../models';
import { loggedInManager1 } from './manager.fixture';


const { Request } = models;


const pendingRequest = {
  id: faker.random.number({ min: 1, max: 5 }),
  requesterId: faker.random.number(),
  tripId: faker.random.number(),
  status: 'pending',
  lineManagerId: loggedInManager1.id
};
const createRequests = async () => {
  await Request.destroy({ where: {} });
  await RequestService.createRequest(pendingRequest);
};

export default createRequests;
