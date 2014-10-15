var apiClient = require('./api-client'),
    items = []

function create() {
    apiClient.post('/carts', { id: '1234', rows: [] })
}

function add(id, product) {
    apiClient.put('/carts/' + id)
}

function all(){
	apiClient.get('/carts')
}

module.exports = {
    items: items,
    create: create,
    add: add
}