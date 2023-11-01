import * as jwt from 'jsonwebtoken';
import { IJwt } from '../../Interfaces/JWT/IJwt';

export default class JsonWebTokenAdapter implements IJwt {
  private jwt = jwt;

  static secret = process.env.JWT_TOKEN || 'Pneumoultramicroscopicossilicovulcanoconiótico';

  sign(payload: object): string {
    return this.jwt.sign(payload, JsonWebTokenAdapter.secret);
  }

  verify(token: string): object {
    console.log(token);
    return this.jwt.verify(token, JsonWebTokenAdapter.secret) as object;
  }
}
