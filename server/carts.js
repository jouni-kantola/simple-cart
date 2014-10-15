var uuid = require('node-uuid'),
    collection = require('./db.js').collection('carts')

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