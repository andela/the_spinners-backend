import UsersController from '../controllers/userController';

export default (app) => {
  app.get('/api', (req, res) => res.status(200).send({
    message: 'Welcome to the BAREFOOT NOMAD API!',
  }));
  app.post('/api/v1/signup', UsersController.signUp); // API route for user to signup
};
