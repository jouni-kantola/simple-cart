var apiClient = require('./api-client');
var products = [];
var current = {};

(function() {
    list();
})()

function list() {
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
}

function one(id, callback) {
    apiClient.get('/products/' + id).then(function(data) {
        current = data
        callback()
    })
}

module.exports = {
    all: products,
    one: one,
    current: current
}
