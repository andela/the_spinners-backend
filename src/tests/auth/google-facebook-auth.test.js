import chai, { expect } from 'chai';
import sinon from 'sinon';
import httpMocks from 'node-mocks-http';
import sinonHttp from 'sinon-chai';
import AuthController from '../../controllers/auth.controller';
import {
  googleFacebookUser,
  googleProfile,
  facebookProfile,
  OAuthTokens,
} from '../fixtures/users.fixture';
import googleAuthMiddleware from '../../middlewares/google-auth.middleware';
import facebookAuthMiddleware from '../../middlewares/facebook-auth.middleware';
import cleanAllTables from '../fixtures/database.fixture';


chai.use(sinonHttp);
chai.should();

describe('Test Google and Facebook authentication:', () => {
  const resp = httpMocks.createResponse();
  const { accessToken, refreshToken } = OAuthTokens;
  before(async () => {
    await cleanAllTables();
  });
  afterEach(() => {
    sinon.restore();
  });
  it('Should return status code 200 on successiful login with google or facebook', async () => {
    await AuthController.googleFacebookAuthHandler({ user: googleFacebookUser }, resp);
    expect(resp.finished).to.equal(true);
  });
  it('should return data from google user profile', async () => {
    const callBack = sinon.spy();
    await googleAuthMiddleware(accessToken, refreshToken, googleProfile, callBack);
    expect(callBack.withArgs(null, googleProfile));
  });
  it('should return data from facebook user profile', async () => {
    const callBack = sinon.spy();
    await facebookAuthMiddleware(accessToken, refreshToken, facebookProfile, callBack);
    expect(callBack.withArgs(null, facebookProfile));
  });
  it('should return data from google user profile', async () => {
    const callBack = sinon.spy();
    await googleAuthMiddleware(accessToken, refreshToken, googleProfile, callBack);
    expect(callBack.withArgs(null, googleProfile));
  });
  it('should return data from facebook user profile', async () => {
    const callBack = sinon.spy();
    await facebookAuthMiddleware(accessToken, refreshToken, facebookProfile, callBack);
    expect(callBack.withArgs(null, facebookProfile));
  });
});
