var rivets = require('rivets'),
    products = require('../products'),
    cart = require('../cart');

(function() {

    var productList = document.getElementById('products'),
        productDetails = document.getElementById('product-details'),
        cartDetails = document.getElementById('cart');

    rivets.formatters.quantity = function(items) {
        return items.reduce(function(quantity, current) {
            return quantity + current.quantity
        }, 0)
    }

    rivets.formatters.percentage = function(number) {
        return (number * 100) + ' %'
    }

    rivets.bind(productList, {
        products: products.all
    })

    rivets.bind(productDetails, products.current)

    rivets.bind(cartDetails, cart)

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
