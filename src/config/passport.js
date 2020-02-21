import passport from 'passport';
import GoogleStrategy from 'passport-google-oauth20';
import FacebookStrategy from 'passport-facebook';
import dotenv from 'dotenv';
import googleAuthMiddleware from '../middlewares/google-auth.middleware';
import facebookAuthMiddleware from '../middlewares/facebook-auth.middleware';

dotenv.config();

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: '/api/auth/google/redirect'
}, googleAuthMiddleware));

passport.use(new FacebookStrategy({
  clientID: process.env.FACEBOOK_APP_ID,
  clientSecret: process.env.FACEBOOK_APP_SECRET,
  callbackURL: `${process.env.API_URL}/api/auth/facebook/redirect`,
  scope: ['public_profile', 'email'],
  profileFields: ['id', 'email', 'name', 'photos']
}, facebookAuthMiddleware));
