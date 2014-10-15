var rivets = require('rivets');
var products = require('./products');

(function() {
    rivets.bind(document.getElementById('products'), {
        products: products.all
    })
})()