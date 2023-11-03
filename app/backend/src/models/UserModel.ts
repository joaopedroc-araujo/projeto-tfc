import * as bcrypt from 'bcryptjs';
import IUserModel from '../Interfaces/Users/IUserModel';
import User from '../database/models/UserModel';

export default class UserModel implements IUserModel {
  private model = User;

  async findUserById(id: string): Promise<User | null> {
    const user = await this.model.findOne({ where: { id } });
    // console.log('user', user?.role);
    return user;
  }

  async authenticateUser(email: string, password: string): Promise<User | null> {
    const user = await this.model.findOne({ where: { email } });
    if (user && await bcrypt.compare(password, user.password)) {
      return user;
    }
    return null;
  }

  async findUserByEmail(email: string): Promise<User | null> {
    const user = await this.model.findOne({ where: { email } });
    // console.log('userbyemail', user?.role);
    return user;
  }
}
