import * as sinon from 'sinon';
import * as chai from 'chai';
import UserModel from '../models/UserModel';
import { UserMock } from './mocks/UserMock';
import IUser from '../Interfaces/Users/IUser';

const { expect } = chai;

describe('UserModel', () => {
  let userModel: UserModel;
  let modelStub: sinon.SinonStubbedInstance<any>;

  beforeEach(() => {
    modelStub = {
      create: sinon.stub(),
      findOne: sinon.stub(),
    };
    userModel = new UserModel();
    (userModel as any).model = modelStub;
  });

  afterEach(() => {
    sinon.restore();
  });

  it('createUser cria um novo usuário e retorna o usuário criado', async () => {
    const user: IUser = UserMock[0];
    modelStub.create.resolves(user);

    const result = await userModel.createUser(user);

    expect(result).to.deep.equal(user);
    expect(modelStub.create.calledWith(user)).to.be.true;
  });

  it('findUserByEmail encontra um usuário por email e retorna o usuário encontrado', async () => {
    const user: IUser = UserMock[0];
    modelStub.findOne.resolves(user);
    
    const result = await userModel.findUserByEmail(user.email);
    // console.log(result);

    expect(result).to.deep.equal(user);
    expect(modelStub.findOne.calledWith({ where: { email: user.email } })).to.be.true;
  });
});
