import IUser from '../Interfaces/Users/IUser';
import IUserModel from '../Interfaces/Users/UserModel';
import User from '../database/models/UserModel';
import { NewUser } from '../Interfaces';

export default class UserModel implements IUserModel {
  private model = User;

  async createUser(user: NewUser<IUser>): Promise<User | null> {
    const newUser = await this.model.create(user);
    return newUser;
  }

  async findUserByEmail(email: string): Promise<User | null> {
    const user = await this.model.findOne({ where: { email } });
    return user;
  }
}
