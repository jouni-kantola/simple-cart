var apiClient = require('./api-client'),
    products = [],
    current = {
        id: '',
        name: '',
        priceIncVat: 0,
        vatAmount: 0,
        vatPercentage: 0
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
        current.id = data.id
        current.name = data.entity.name
        current.priceIncVat = data.entity.priceIncVat
        current.vatAmount = data.entity.vatAmount
        current.vatPercentage = data.entity.vatPercentage
        callback()
    })
}

module.exports = {
    all: products,
    one: one,
    current: current
}
