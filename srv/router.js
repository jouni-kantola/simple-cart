var route = require('koa-route'),
    parse = require('co-body'),
    db = require('./db.js');

module.exports = function(srv) {
    // Register routes

    // GET -> /products
    srv.use(route.get('/products', function*() {
        this.body = db.collection('products').all();
    }))

    // GET -> /products/some-url-friendly-identifier
    srv.use(route.get('/products/:id', function*(id) {
        this.body = db.collection('products').filter.by('id', id);
    }))

    // POST -> /products
    srv.use(route.post('/products', function*() {
    }));

    // PUT -> /products/some-url-friendly-identifier
    srv.use(route.put('/products/:id', function*(id) {
    }));

    // DELETE -> /products/some-url-friendly-identifier
    srv.use(route.del('/products/:id', function*(id) {
    }));
};
