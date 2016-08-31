'use strict';

let expect = require('chai').expect;
let transformer = require('../../src/engine/transformer');

describe('engine/transformer', () => {

  let simpleRules = {
    rules: [
      {
        name: 'ssn',
        matcher: 'ssn',
        transformer: {
          type: 'ssn'
        }
      }
    ]
  }
  let simpleTransform = transformer(simpleRules);

  it('should transform simple rule', () => {

    let empl = {
      ssn: '123-1232-2323'
    };

    let result = simpleTransform(empl);

    expect(result.ssn).to.be.equal('xxx-xxxx-2323');
  });

  it('should transform simple rule in array', () => {

    let empls = [{
      ssn: '123-1232-2323'
    },{
      ssn: '123-1232-2323'
    }];

    let result = simpleTransform(empls);

    expect(result[0].ssn).to.be.equal('xxx-xxxx-2323');
    expect(result[1].ssn).to.be.equal('xxx-xxxx-2323');
  });


});
