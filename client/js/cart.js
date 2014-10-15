var apiClient = require('./api-client');
var current = {
    id: '',
    rows: [],
    totalPriceIncVatAmount: 0,
    totalVatAmount: 0
};

function add(product) {
    if (current.rows.length === 0) {
        apiClient.post('/carts', {}).then(function(data) {
            current.id = data.id
            apiClient.put('/carts/' + current.id, {
                rows: [product]
            }).then(function() {
                apiClient.get('/carts/' + current.id).then(function(data) {
                    current.rows.push.apply(current.rows, data.entity.rows);
                })
            })
        })
    } else {
        var products = current.rows.map(function(item) {
            return {
                productId: item.id,
                quantity: item.quantity
            }
        });
        products.push(product);
        apiClient.put('/carts/' + current.id, {
            rows: products
        }).then(function() {
            apiClient.get('/carts/' + current.id).then(function(data) {
                current.rows.length = 0
                current.rows.push.apply(current.rows, data.entity.rows);
            })
        })
    }
}

function all() {
    apiClient.get('/carts')
}

module.exports = {
    items: current.rows,
    add: add
}
