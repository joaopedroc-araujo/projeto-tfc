import { Request, Response } from 'express';
import UserService from '../services/User.service';

export default class UserController {
  constructor(
    private userService = new UserService(),
  ) { }

  public async createUser(req: Request, res: Response): Promise<Response> {
    const data = await this.userService.createUser(req.body);
    if ('token' in data) {
      return res.status(200).json({ token: data.token });
    }
    return res.status(400).json(data);
  }
}
