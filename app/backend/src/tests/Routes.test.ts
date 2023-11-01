import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../app';

chai.use(chaiHttp);
const { expect } = chai;

describe('Testes de rota', () => {
    describe('/GET teams', () => {
        it('deve retornar todos os times', (done) => {
            chai.request(app)
                .get('/teams')
                .end((err, res) => {
                    expect(res.status).to.equal(200);
                    expect(res.body).to.be.a('array');
                    done();
                });
        });
    });

    describe('/GET teams/:id', () => {
        it('deve retornar um time específico', (done) => {
            const id = 1;
            chai.request(app)
                .get(`/teams/${id}`)
                .end((err, res) => {
                    expect(res.status).to.equal(200);
                    expect(res.body).to.be.a('object');
                    done();
                });
        });
    });
});