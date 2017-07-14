"use strict";

process.env.NODE_ENV = 'test';
process.env.DEBUG = null;

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app');
const should = chai.should();
chai.use(chaiHttp);

describe('Atmosbot', () => {
    beforeEach((done) => { //Before each test we empty the database
        done();
    });
    /*
      * Test the /GET route
      */
    describe('/GET home', () => {
        it('it should GET the homepage', (done) => {
            chai.request(server)
                .get('/')
                .end((err, res) => {
                    res.should.have.status(200);
                    done();
                });
        });
    });
});