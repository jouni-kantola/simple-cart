var uuid = require('node-uuid'),
    collection = require('./db').collection('products')

function single(id) {
    return collection.filter.byId(id)
}

function all() {
    return collection.all()
}

function add(product) {
    index = collection.add({
        id: uuid.v1(),
        name: product.name,
        priceIncVat: product.priceIncVat,
        vatAmount: product.vatAmount
    })
    return collection.filter.byId(index)
}

function update(id, properties) {
    collection.update(id, properties)
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