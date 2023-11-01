import User from '../../database/models/UserModel';

export default interface UserModel {
  createUser(user: Partial<User>): Promise<User | null>,
}
