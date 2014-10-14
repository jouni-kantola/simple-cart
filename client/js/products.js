var apiClient = require('./api-client')

module.exports = {
    all: function() {
        return apiClient.get('/products')
    }
}
