import UserService from '../services/user.service';
import BcryptService from '../services/bcrypt.service';

export default async (accessToken, refreshToken, profile, done) => {
  // eslint-disable-next-line no-underscore-dangle
  const facebookProfile = profile._json;
  const userExist = await UserService.findUserByProperty({ email: facebookProfile.email });
  if (!userExist) {
    const userdata = {
      firstName: facebookProfile.first_name,
      lastName: facebookProfile.last_name,
      email: facebookProfile.email,
      password: BcryptService.hashPassword(Math.random().toString(36)),
      isVerified: true
    };
    const { dataValues } = await UserService.addUser(userdata);
    delete dataValues.updatedAt;
    delete dataValues.createdAt;
    return done(null, { ...dataValues, provider: profile.provider });
  }
  delete userExist.dataValues.updatedAt;
  delete userExist.dataValues.createdAt;

  return done(null, { ...userExist.dataValues, provider: profile.provider });
};
