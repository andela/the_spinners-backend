import faker from 'faker';
import BcryptService from '../../services/bcrypt.service';
import JwtService from '../../services/jwt.service';
import models from '../../models';

const { Users, Preferences } = models;

export const userPassword = faker.internet.password();
export const signupFixtures = {
  firstName: faker.name.firstName(),
  lastName: faker.name.lastName(),
  email: faker.internet.email(),
  password: faker.internet.password()
};

export const signedUpUserToken = JwtService.generateToken({ email: signupFixtures.email });
export const unregisteredEmail = {
  email: 'higustave123@gmail.com'
};
export const unregisteredUserToken = JwtService.generateToken({ email: unregisteredEmail });
export const signupExpiredToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImhpZ3VzdGF2ZUBnbWFpbC5jb20iLCJpYXQiOjE1NzcxOTg5MjUsImV4cCI6MTU3NzE5ODkyNX0.cAYmYykkBtddmq7YyP3OKVrtVXwCrpxBxhFPJNDUYxE';

const payload = {
  id: 20,
  email: faker.internet.email(),
  firstName: faker.name.firstName(),
  lastName: faker.name.lastName()
};
// crete real user to that help receive email
const realUser = 'icyiiddy@gmail.com';

export const createUser = {
  id: faker.random.number({ min: 40, max: 50 }),
  firstName: faker.name.firstName(),
  lastName: faker.name.lastName(),
  email: realUser,
  password: BcryptService.hashPassword(userPassword),
  isVerified: true,
  createdAt: new Date(),
  updatedAt: new Date(),
};
export const activeUser = {
  id: faker.random.number({ min: 150, max: 154 }),
  firstName: faker.name.firstName(),
  lastName: faker.name.lastName(),
  email: faker.internet.email(),
  password: BcryptService.hashPassword(userPassword),
  isVerified: true,
  lineManagerId: createUser.id,
  createdAt: new Date(),
  updatedAt: new Date(),
};
export const activeUserToken = JwtService.generateToken({
  id: activeUser.id,
  firstName: activeUser.firstName,
  lastName: activeUser.lastName,
  email: activeUser.email,
});
export const wrongToken = 'eyJhbGcihgvasdbjvdskmnhwb erfqr63489u2bnlsdkvqerui2346R5cCJ9';
export const wrongUser = {
  email: 'test1@spinners.com',
  password: 'aspword1234'
};
export const wrongEmail = {
  email: 'testspinners.com',
  password: 'Pass1234'
};
export const tokenWithWrongUser = JwtService.generateToken(payload);
export const resetToken = JwtService.generateToken({ email: activeUser.email });
export const loggedInUser = {
  id: faker.random.number({ min: 100, max: 150 }),
  firstName: faker.name.firstName(),
  lastName: faker.name.lastName(),
  email: faker.internet.email(),
  password: BcryptService.hashPassword(userPassword),
  isVerified: true,
  lineManagerId: activeUser.id,
  createdAt: new Date(),
  updatedAt: new Date(),
};

export const loggedInToken = JwtService.generateToken({
  id: loggedInUser.id,
  firstName: loggedInUser.firstName,
  lastName: loggedInUser.lastName,
  email: loggedInUser.email,
});

export const userWithoutManager = {
  id: faker.random.number({ min: 1, max: 9 }),
  firstName: faker.name.firstName(),
  lastName: faker.name.lastName(),
  email: realUser,
  password: BcryptService.hashPassword(userPassword),
  isVerified: true,
  createdAt: new Date(),
  updatedAt: new Date(),
};

export const loggedInToken2 = JwtService.generateToken({
  id: userWithoutManager.id,
  firstName: userWithoutManager.firstName,
  lastName: userWithoutManager.lastName,
  email: userWithoutManager.email,
});

export const lineManager = {
  id: 31,
  firstName: faker.name.firstName(),
  lastName: faker.name.lastName(),
  email: realUser,
  password: BcryptService.hashPassword(userPassword),
  role: 'manager',
  isVerified: true,
  createdAt: new Date(),
  updatedAt: new Date(),
};

export const notAllowedManager = {
  id: 32,
  firstName: faker.name.firstName(),
  lastName: faker.name.lastName(),
  email: realUser,
  password: BcryptService.hashPassword(userPassword),
  role: 'manager',
  isVerified: true,
  createdAt: new Date(),
  updatedAt: new Date(),
};

export const tokenOfNotAllowedManager = JwtService.generateToken({
  id: notAllowedManager.id,
  firstName: notAllowedManager.firstName,
  lastName: notAllowedManager.lastName,
  email: notAllowedManager.email,
});

// create a user who does not have a trip
export const userWithNoTrip = {
  id: faker.random.number({ min: 155, max: 160 }),
  firstName: faker.name.firstName(),
  lastName: faker.name.lastName(),
  email: faker.internet.email(),
  password: BcryptService.hashPassword(userPassword),
  lineManagerId: 6,
  isVerified: true,
  createdAt: new Date(),
  updatedAt: new Date(),
};

// generate a token for a user who does not have a trip
export const userWithNoTripToken = JwtService.generateToken({
  id: userWithNoTrip.id,
  firstName: userWithNoTrip.firstName,
  lastName: userWithNoTrip.lastName,
  email: userWithNoTrip.email,
});

export const user = {
  email: activeUser.email,
  password: userPassword,
};

// password that does not match
export const passMatch = {
  newPassword: faker.internet.password(),
  confirmPass: faker.internet.password()
};

// reseting password
const password = faker.internet.password();
export const resetPass = {
  newPassword: password,
  confirmPass: password
};

export const emailNotExists = {
  email: faker.internet.email()
};

export const defaultPreferences = {
  userId: activeUser.id,
  isEmailNotification: true,
  isInAppNotification: true
};
export const token = JwtService.generateToken({
  id: activeUser.id,
  firstName: activeUser.firstName,
  lastName: activeUser.lastName,
  email: activeUser.email });

export const createUsers = async () => {
  await Users.destroy({ where: {} });
  await Preferences.destroy({ where: {} });
  await Users.create({ ...activeUser, token });
  await Users.create(createUser);
  await Users.create({ userWithoutManager, token: loggedInToken2 });
  await Users.create({ ...loggedInUser, token: loggedInToken });
  await Users.create(lineManager);
  await Users.create({ ...notAllowedManager, token: tokenOfNotAllowedManager });
  await Users.create({ ...userWithNoTrip, token: userWithNoTripToken });
  await Preferences.create({ ...defaultPreferences, userId: activeUser.id });
  await Preferences
    .create({ isEmailNotification: false, isInAppNotification: false, userId: createUser.id });
  await Preferences.create({ ...defaultPreferences, userId: loggedInUser.id });
};
export const cleanDb = async () => {
  await Users.destroy({ where: {} });
};

export const googleFacebookUser = {
  id: 7,
  firstName: 'userfirstname',
  lastName: 'userlastname',
  email: 'socialuser@gmail.com',
  provider: 'google or facebook'
};
export const googleProfile = {
  _json: {
    given_ame: 'userfirstname',
    family_name: 'userlastname',
    email: 'googleuser@gmail.com'
  }
};
export const facebookProfile = {
  _json: {
    first_ame: 'userfirstname',
    last_name: 'userlastname',
    email: 'facebookuser@gmail.com'
  }
};
export const OAuthTokens = {
  accessToken: 'oidhfioerhfrhfuierghfr8u438r9h34wf',
  refreshToken: 'fruyfg78w43gf78w4gfwf8hw43hf89hf8',
};

export const userData = {
  gender: 'M',
  birthDate: '1990-10-17',
  preferredLanguage: 'french',
  preferredCurrency: 'Euro',
  residence: 'Kigali',
  department: 'IT',
  profilePicture: 'https://res.cloudinary.com/higustave/image/upload/v1578147858/jju0kvgyb8a3nrj8j5oz.jpg'
};
