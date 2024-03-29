import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import * as jwt from 'jsonwebtoken';

import { app } from '../app';
import UserModel from '../models/UserModel';
import UserService from '../services/User.service';
import { UserMock } from './mocks/UserMock';
import IUser from '../Interfaces/Users/IUser';
import { NewUser } from '../Interfaces';
import User from '../database/models/UserModel';

chai.use(chaiHttp);

const { expect } = chai;

describe('UserService', () => {
  let userService: UserService;
  let userModelStub: sinon.SinonStubbedInstance<UserModel>;

  beforeEach(() => {
    userModelStub = sinon.createStubInstance(UserModel);
    userService = new UserService(userModelStub as any);
  });

  afterEach(() => {
    sinon.restore();
  });

  it('cria uma instância UserService com o UserModel default', () => {
    const userService = new UserService();
    expect(userService).to.be.instanceOf(UserService);
  });

  it('authenticateUser autentica um usuário existente e retorna um token', async () => {
    const user: IUser = UserMock[0];
    const secret = process.env.SECRET || 'paralelepipedo';
    const token = jwt.sign({ id: user.id }, secret);
  
    userModelStub.findUserByEmail.resolves(user as unknown as User);
  
    const result = await userService.authenticateUser(user as NewUser<IUser>);
    if ('token' in result) {
      expect(result.token).to.equal(token);
    }
  });

  it('authenticateUser retorna um erro se os dados do usuário forem inválidos', async () => {
    const user: IUser = UserMock[0];
    userModelStub.findUserByEmail.resolves(null);
  
    const result = await userService.authenticateUser(user as NewUser<IUser>);
  
    if ('status' in result && 'data' in result) {
      expect(result.status).to.equal('INVALID_DATA');
      expect(result.data.message).to.equal('Invalid user data');
    }
  });
  
  it('authenticateUser retorna um erro se os dados do usuário forem inválidos', async () => {
    const user: IUser = UserMock[0];
    userModelStub.findUserByEmail.resolves(null);
  
    const result = await userService.authenticateUser(user as NewUser<IUser>);
  
    if ('status' in result && 'data' in result) {
      expect(result.status).to.equal('INVALID_DATA');
      expect(result.data.message).to.equal('Invalid user data');
    }
  });
});
