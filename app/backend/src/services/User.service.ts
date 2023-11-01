import * as jwt from 'jsonwebtoken';
import IUser from '../Interfaces/Users/IUser';
import { NewUser } from '../Interfaces';
import UserModel from '../models/UserModel';
import { LoginResponse } from '../Interfaces/ServiceResponse';

export default class UserService {
  constructor(
    private userModel = new UserModel(),
  ) { }

  public async createUser(user: NewUser<IUser>): Promise<LoginResponse> {
    const newUser = await this.userModel.createUser(user);
    const secret = process.env.SECRET || 'your-secret-key';

    if (newUser === null) {
      return {
        status: 'INVALID_DATA',
        data: { message: 'Invalid user data' },
      };
    }

    const token = jwt.sign({ id: newUser.id }, secret);

    return { token };
  }
}
