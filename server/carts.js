var uuid = require('node-uuid'),
    collection = require('./db').collection('carts')

function single(id) {
    return collection.filter.byId(id)
}

function all() {
    return collection.all()
}

function add() {
    index = collection.add({
        id: uuid.v1(),
        rows: [],
        totalPriceIncVatAmount: 0,
        totalVatAmount: 0
    })
    return collection.filter.byId(index)
}

function update(id, cart) {
    var products = require('./products')
    cart.rows = cart.rows.map(function(item) {
        var product = products.single(item.productId)
        return {
            id: product.id,
            name: product.entity.name,
            priceIncVat: product.entity.priceIncVat,
            vatAmount: product.entity.vatAmount,
            quantity: item.quantity,
            priceIncVatAmount: (product.entity.priceIncVat * item.quantity)
        }
    })
    cart.totalPriceIncVatAmount = cart.rows.reduce(function(priceIncVat, curr){
        return priceIncVat + curr.priceIncVatAmount;
    }, 0);
    cart.totalVatAmount = cart.rows.reduce(function(vatAmount, curr){
        return vatAmount + curr.vatAmount;
    }, 0);
    collection.update(id, cart)
}

function del(id) {
    collection.delete(id)
}

module.exports = {
    single: single,
    all: all,
    add: add,
    update: update,
    delete: del
}
