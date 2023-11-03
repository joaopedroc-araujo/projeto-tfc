import { signToken } from '../middleware/Auth/AuthToken.middleware';
import IUser from '../Interfaces/Users/IUser';
import { NewUser } from '../Interfaces';
import UserModel from '../models/UserModel';
import { LoginResponse } from '../Interfaces/ServiceResponse';

export default class UserService {
  constructor(
    private userModel = new UserModel(),
  ) { }

  public async findUserById(id: string): Promise<IUser | null> {
    const user = await this.userModel.findUserById(id);
    return user;
  }

  public async authenticateUser(user: NewUser<IUser>): Promise<LoginResponse> {
    const existingUser = await this.userModel.findUserByEmail(user.email);

    if (!existingUser) {
      return { status: 'INVALID_DATA', data: { message: 'User not found' } };
    }

    const token = signToken({ id: existingUser.id });

    return { token };
  }
}
