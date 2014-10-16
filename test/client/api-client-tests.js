var apiClient = require('../../client/js/api-client'),
    expect = require('chai').expect

describe('api-client', function() {

    it('should be ok', function() {
        return expect(apiClient).to.be.ok
    })

})