'use strict';

let expect = require('chai').expect;
let birthday = require('../../../src/engine/transformers/birthday');

describe('engine/transformer/birthday', () => {

  it('should randomly map in 60 days range', () => {

    let result = birthday('1982-11-23');

    expect(result).to.not.be.equal('1982-11-23');
  });

  it('should support sticky maps without salt', () => {

    let options = {
      sticky: true
    }

    let result1 = birthday('1982-11-23', options);
    let result2 = birthday('1982-11-23', options);

    expect(result1).to.be.equal(result2);
  });

  it('should support sticky maps with salt', () => {

    let options = {
      sticky: true,
      salt: 'qw23'
    }

    let result1 = birthday('1982-11-23', options);
    let result2 = birthday('1982-11-23', options);

    expect(result1).to.be.equal(result2);
  });

});
