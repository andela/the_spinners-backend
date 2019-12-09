import model from '../models';

const { Users } = model;

class SignupService {
  static async addUser(newUser){
    return await Users.create(newUser);
  }

  static async checkUserExistByEmail(userEmail){
    return await Users.findOne({where: { email: userEmail }})
  }
}

export default SignupService;
