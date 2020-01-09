import faker from 'faker';
import RequestService from '../../services/request.service';

const createRequest = async () => {
  const request = {
    id: 199,
    requesterId: faker.random.number(),
    tripId: faker.random.number(),
    status: faker.random.word(),
    lineManagerId: 199
  };
  await RequestService.createRequest(request);
};

export default createRequest;
