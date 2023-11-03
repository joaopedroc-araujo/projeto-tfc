import User from '../../database/models/UserModel';

export default interface IUserModel {
  findUserById(id: string): Promise<User | null>,
  authenticateUser(email: string, password: string): Promise<User | null>,
  findUserByEmail(email: string): Promise<User | null>,
}
