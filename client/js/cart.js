var apiClient = require('./api-client');
var current = {
    id: '',
    items: []
};

function add(product, cartId) {
    if (current.items.length === 0) {
        apiClient.post('/carts', {
            id: 'a-generated-id',
            rows: []
        }).then(function(data) {
            current.id = data.id
            apiClient.put('/carts/' + current.id, {
                rows: [product]
            })
        })
    } else {
        apiClient.put('/carts/' + cartId, {
            rows: current.items.push(product)
        })
    }
}

function all() {
    apiClient.get('/carts')
}

module.exports = {
    items: current.items,
    add: add
}
