var apiClient = require('./api-client');
var products = [];

(function() {
    apiClient.get('/products').then(function(data) {
        Object.keys(data).forEach(function(key) {
            var o = data[key];
            products.push({
            	href: '/products/' + key,
                id: key,
                uid: o.id,
                name: o.name
            });
        })
    })
})()

module.exports = {
    all: products
}
