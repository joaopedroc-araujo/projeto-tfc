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
      findUserByEmail: sinon.stub(),
      // authenticateUser: sinon.stub(),
      findOne: sinon.stub(),
    };
    userModel = new UserModel();
    (userModel as any).model = modelStub;
  });

  afterEach(() => {
    sinon.restore();
  });

  // it('authenticateUser autentica um usuário existente e retorna o usuário autenticado', async () => {
  //   const user: IUser = UserMock[0];
  //   modelStub.findOne.resolves(user);
  
  //   const result = await userModel.authenticateUser(user.email, user.password);
  
  //   expect(result).to.deep.equal(user);
  //   expect(modelStub.findOne.calledWith({ where: { email: user.email } })).to.be.true;
  // });

  it('findUserByEmail encontra um usuário por email e retorna o usuário encontrado', async () => {
    const user: IUser = UserMock[0];
    modelStub.findOne.resolves(user);

    const result = await userModel.findUserByEmail(user.email);
    // console.log(result);

    expect(result).to.deep.equal(user);
    expect(modelStub.findOne.calledWith({ where: { email: user.email } })).to.be.true;
  });

  it('retorna null se nenhum usuário é encontrado pelo id', async () => {
    modelStub.findOne.resolves(null);
    const result = await userModel.findUserById('2');
    expect(result).to.be.null;
  });

  it('retorna null se nenhum usuário é encontrado pelo email', async () => {
    modelStub.findOne.resolves(null);
    const result = await userModel.authenticateUser('test2@test.com', 'password');
    expect(result).to.be.null;
  });

  it('retorna null se o password não é igual ao cadastrado', async () => {
    const user: IUser = UserMock[0];
    modelStub.findOne.resolves(user);
    const result = await userModel.authenticateUser(user.email, 'wrongpassword');
    expect(result).to.be.null;
  });
});
