var apiClient = require('./api-client'),
    products = [],
    current = {
        id: '',
        name: ''
    };

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

(function() {
    list();
})()

function one(id, callback) {
    apiClient.get('/products/' + id).then(function(data) {
        current['name'] = data.name
        current['id'] = data.id
        callback()
    })
}

module.exports = {
    all: products,
    one: one,
    current: current
}
