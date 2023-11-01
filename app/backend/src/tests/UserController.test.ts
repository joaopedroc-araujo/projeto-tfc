import * as sinon from 'sinon';
import * as chai from 'chai';
import * as jwt from 'jsonwebtoken';
// @ts-ignore
import chaiHttp = require('chai-http');
import { Request, Response } from 'express';

import UserService from '../services/User.service';
import UserController from '../controllers/User.controller';
import { UserMock } from './mocks/UserMock';
import IUser from '../Interfaces/Users/IUser';
import { LoginResponse, ServiceResponseError } from '../Interfaces/ServiceResponse';

chai.use(chaiHttp);

const { expect } = chai;

describe('UserController', () => {
  let userController: UserController;
  let userServiceStub: sinon.SinonStubbedInstance<UserService>;
  let req: Partial<Request>;
  let res: Partial<Response>;

  beforeEach(() => {
    userServiceStub = sinon.createStubInstance(UserService);
    userController = new UserController(userServiceStub as any);
    req = {};
    res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub().returnsThis(),
    };
  });

  afterEach(() => {
    sinon.restore();
  });


  it('createUser cria um novo usuário e retorna um token', async () => {
    const user: IUser = UserMock[0];
    const secret = process.env.SECRET || 'your-secret-key';
    const token = jwt.sign({ id: user.id }, secret);

    const loginResponse: LoginResponse = { token };

    userServiceStub.createUser.resolves(loginResponse);

    const req = { body: user } as Request;
    const res = { status: sinon.stub().returnsThis(), json: sinon.stub() } as unknown as Response;

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub();

    await userController.createUser(req, res);

    expect((res.status as sinon.SinonStub).calledWith(200)).to.be.true;
    expect((res.json as sinon.SinonStub).calledWith(loginResponse)).to.be.true;
  });



  it('createUser retorna um erro se os dados do usuário forem inválidos', async () => {
    const user = UserMock[0];
    const req = { body: user } as Request;
    const res = { status: sinon.stub().returnsThis(), json: sinon.stub() } as unknown as Response;
    const errorResponse: ServiceResponseError = { status: 'INVALID_DATA', data: { message: 'Invalid user data' } };
  
    userServiceStub.createUser.resolves(errorResponse);
  
    await userController.createUser(req, res);
  
    expect((res.status as sinon.SinonStub).calledWith(400)).to.be.true;
    expect((res.json as sinon.SinonStub).calledWith(errorResponse)).to.be.true;
  });
});
