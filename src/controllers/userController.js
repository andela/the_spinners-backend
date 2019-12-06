import model from '../models';

const { Users } = model;

/**
 * Adds two numbers together.
 * @param {int} num1 The first number.
 * @param {int} num2 The second number.
 * @returns {int} The sum of the two numbers.
 */

class UsersController {
  static async signUp(req, res) {
    if (!req.body.firstName || !req.body.lastName || !req.body.username
      || !req.body.email || !req.body.password) {
        return res.status(400).send({
          status: 400,
          error: 'Operation not performed. All fields are required'
        })
    }else{
      const newUser = req.body;
      const createdUser = await Users.create(newUser);
      return res.status(200).send({
        status: 200,
        message: 'User created successfully',
        data: createdUser
      })
    }
  }
}

export default UsersController;
