import { Request, Response, NextFunction } from 'express';
import ValidateMatch from '../../utils/validateMatches';

export default async function validateMatchMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const match = req.body;
  const validateMatchInstance = new ValidateMatch();
  const error = await validateMatchInstance.validateMatch(match);
  if (error) {
    res.status(error.status).json({ message: error.message });
  } else {
    next();
  }
}
