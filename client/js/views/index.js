var rivets = require('rivets');
var products = require('../products');
var cart = require('../cart');

(function() {

    var productList = document.getElementById('products');
    var productDetails = document.getElementById('product-details');
    var cartDetails = document.getElementById('cart');

    rivets.bind(productList, {
        products: products.all
    })

    rivets.bind(productDetails, {
        product: products.current
    })

    rivets.bind(cartDetails, {
        cartItems: cart.items
    })

    productList.addEventListener('click', function(e) {
        if (e.target.nodeName.toLowerCase() === 'span') {
            var productId = +(e.target.getAttribute('data-id'))
            products.one(productId, function() {
                productDetails.classList.remove('hide')
            })
            return false;
        }
    })

    productDetails.addEventListener('click', function(e) {
        if (e.target.nodeName.toLowerCase() === 'a') {
            var product = {
                productId: +(e.target.getAttribute('data-id')),
                quantity: +(document.getElementById('number-to-cart').value)
            }
            cart.add(product);
            return false;
        }
    })

})()
