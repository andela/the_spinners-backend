import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../app';
import { loggedInToken, userWithNoTripToken } from '../fixtures/users.fixture';
import { createTrip } from '../fixtures/trip.fixture';

chai.should();
chai.use(chaiHttp);

describe('/Get view comments posted on trips requests', () => {
  let trip;
  before(async () => {
    trip = await createTrip();
  });
  it('Should get comments posted on trip requests', (done) => {
    chai.request(app)
      .get(`/api/trips/request/${trip.id}/comments?page=1&limit=1`)
      .set('Authorization', loggedInToken)
      .end((err, res) => {
        res.body.should.be.an('object');
        res.status.should.be.equal(200);
        res.body.data.should.have.property('pageMeta');
        res.body.data.should.have.property('rows');
        res.body.data.rows.should.be.an('array');
        res.body.data.rows[0].should.have.property('id');
        res.body.data.rows[0].should.have.property('userId');
        res.body.data.rows[0].should.have.property('subjectId');
        res.body.data.rows[0].should.have.property('subjectType');
        res.body.data.rows[0].should.have.property('comment');
        res.body.data.rows[0].should.have.property('createdAt');
        res.body.data.rows[0].should.have.property('updatedAt');
        res.body.should.have.property('message').equal('List all comments');
        done();
      });
  });

  it('Should get comments posted on trip requests', (done) => {
    chai.request(app)
      .get(`/api/trips/request/${trip.id}/comments`)
      .set('Authorization', loggedInToken)
      .end((err, res) => {
        res.body.should.be.an('object');
        res.status.should.be.equal(200);
        res.body.data.should.have.property('pageMeta');
        res.body.data.should.have.property('rows');
        res.body.data.rows.should.be.an('array');
        res.body.data.rows[0].should.have.property('id');
        res.body.data.rows[0].should.have.property('userId');
        res.body.data.rows[0].should.have.property('subjectId');
        res.body.data.rows[0].should.have.property('subjectType');
        res.body.data.rows[0].should.have.property('comment');
        res.body.data.rows[0].should.have.property('createdAt');
        res.body.data.rows[0].should.have.property('updatedAt');
        res.body.should.have.property('message').equal('List all comments');
        done();
      });
  });

  it('Should not show requested trip comments when no comment found or does not belong to the trip', (done) => {
    chai.request(app)
      .get(`/api/trips/request/${trip.id}/comments?page=1&limit=1`)
      .set('Authorization', userWithNoTripToken)
      .end((err, res) => {
        res.body.should.be.an('object');
        res.status.should.be.equal(404);
        res.body.should.have.property('message').equal('Comments not found or does not belong to this trip');
        done();
      });
  });
});
