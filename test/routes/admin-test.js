var chai = require('chai');
var expect = chai.expect;

describe('Test test', function () {
    it('Should fail', function () {
        var zero = 0;
        expect(zero).to.equal(1);
    });
});