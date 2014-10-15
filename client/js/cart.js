var apiClient = require('./api-client');
var current = {
    id: '',
    items: []
};

function add(product) {
    if (current.items.length === 0) {
        apiClient.post('/carts', {}).then(function(data) {
            current.id = data.id
            current.items.push(product)
            apiClient.put('/carts/' + current.id, {
                rows: current.items
            })
        })
    } else {
        current.items.push(product)
        apiClient.put('/carts/' + current.id, {
            rows: current.items
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
