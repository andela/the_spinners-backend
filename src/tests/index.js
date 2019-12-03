import chai from 'chai';

import chaiHttp from 'chai-http';

chai.should();
chai.use(chaiHttp);

const dummyData = [{ Name: 'Gustave', Age: 26 }, { Name: 'Peter', Age: 23 }, { Name: 'Anne', Age: 20 }];

describe('Test on the array:', () => {
  it('Should return array type', (done) => {
    dummyData.should.be.an('array');
    done();
  });
  it('Should return length of array equal to 3', (done) => {
    dummyData.should.have.lengthOf(3);
    done();
  });
});
