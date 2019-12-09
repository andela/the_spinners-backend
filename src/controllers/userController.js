import model from '../models';

const { Users } = model;

class UsersController {
  static signUp(req, res) {
    if (!req.body.firstName || !req.body.lastName || !req.body.username || !req.body.email || !req.body.password) {
      return res.status(400).send({
        status: 400,
        error: 'All fields are required'
      });
    } 
      const { firstName, lastName, username, email, password } = req.body;
      return Users
        .create({ firstName, lastName, username, email, password 
})
        .then(userData => res.status(201).send({
          status: 201,
          message: 'User successfully created',
          userData
        }));
    
  }
}

export default UsersController;
