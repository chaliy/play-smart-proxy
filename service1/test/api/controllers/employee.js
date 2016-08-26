var should = require('should');
var request = require('supertest');
var server = require('../../../app');

describe('controllers', () => {

  describe('employee', () => {

    describe('GET /employee', () => {

      it('should return all employees', done => {

        request(server)
          .get('/employee')
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(200)
          .end((err, res) => {
            should.not.exist(err);
            res.body.should.not.be.empty;

            done();
          });
      });

    });

  });

});
