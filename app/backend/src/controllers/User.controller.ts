import { Request, Response } from 'express';
import UserService from '../services/User.service';
import { RequestWithUserId } from '../Interfaces/RequestWithUserId';

export default class UserController {
  constructor(
    private userService = new UserService(),
  ) { }

  public async findUserById(req: RequestWithUserId, res: Response): Promise<Response> {
    if (req.userId) {
      // console.log('req.userId', req.userId);
      const user = await this.userService.findUserById(req.userId);
      // console.log('finduserbyid metodo', user);
      if (user === null) {
        // console.log('User not found');
        return res.status(404).json({ message: 'User not found' });
      }
      // console.log(user.role);
      return res.status(200).json({ role: user.role });
    }
    // console.log('User ID not provided');
    return res.status(400).json({ message: 'User ID not provided' });
  }

  public async authenticateUser(req: Request, res: Response): Promise<Response> {
    const data = await this.userService.authenticateUser(req.body);
    if ('token' in data) {
      return res.status(200).json({ token: data.token });
    }
    return res.status(400).json(data);
  }
}
