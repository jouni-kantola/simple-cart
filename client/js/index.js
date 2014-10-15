var rivets = require('rivets');
var products = require('./products');

(function() {
    var productList = document.getElementById('products'),
        productDetails = document.getElementById('product-details')

    rivets.bind(productList, {
        products: products.all
    })
    rivets.bind(productDetails, {
        product: products.current
    })

    productList.addEventListener('click', function(e) {
        if (e.target.nodeName.toLowerCase() === 'span') {
            var productId = +(e.target.getAttribute('data-id'))
            products.one(productId, function() {
                console.log(productDetails)
                console.log(products)
                productDetails.classList.remove('hide')
            })
            return false;
        }
    });
})()
