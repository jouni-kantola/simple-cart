require('mocha')

var db = require('../srv/db'),
    expect = require('chai').expect

describe('db', function() {
    
    beforeEach(function() {
        
    });

    afterEach(function() {
        // restore the environment as it was before
        
    });

    it('all should return all items for given collection', function() {
        return expect(db.collection('products').all().length).to.equal(3)
    });
});