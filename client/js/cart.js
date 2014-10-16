var apiClient = require('./api-client');
var current = {
    id: '',
    rows: [],
    totalPriceIncVatAmount: 0,
    totalVatAmount: 0
};

function createCart(){
    return apiClient.post('/carts', {})
}

function refreshCart() {
    apiClient.get('/carts/' + current.id).then(function(data) {
        current.rows.length = 0
        current.rows.push.apply(current.rows, data.entity.rows)
        current.totalPriceIncVatAmount = data.entity.totalPriceIncVatAmount
        current.totalVatAmount = data.entity.totalVatAmount
    })
}

function add(product) {
    if (current.rows.length === 0) {
        createCart().then(function(data) {
            current.id = data.id
            apiClient.put('/carts/' + current.id, {
                rows: [product]
            }).then(refreshCart)
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
        }).then(refreshCart)
    }
}

module.exports = {
    cart: current,
    add: add
}
