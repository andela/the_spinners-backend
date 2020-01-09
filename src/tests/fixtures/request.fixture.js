import faker from 'faker';
import RequestService from '../../services/request.service';
import models from '../../models';

const { Request } = models;

const request = {
  id: 199,
  requesterId: faker.random.number(),
  tripId: faker.random.number(),
  status: faker.random.word(),
  lineManagerId: 199
};
const createRequest = async () => {
  await Request.destroy({ where: {} });
  await RequestService.createRequest(request);
};

export default createRequest;
