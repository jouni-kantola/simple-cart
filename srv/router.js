var route = require('koa-route'),
    parse = require('co-body'),
    db = require('./db.js');

module.exports = function(srv) {
    // Register routes

    // GET -> /products
    srv.use(route.get('/:entity', function *(entity) {
        this.body = db.collection(entity).all()
    }))

    // GET -> /products/some-url-friendly-identifier
    srv.use(route.get('/:entity/:id', function *(entity, id) {
        var entity = db.collection(entity).filter.byId(id)
        if (!entity)
            this.status = 404
        else
            this.body = entity
    }))

    // POST -> /products
    srv.use(route.post('/:entity', function *(entity) {
        var collection, statusCode, newEntity, index
        try {
            collection = db.collection(entity)
        } catch (e) {
            statusCode = 400
        }

        if (collection) {
            newEntity = yield parse(this.request)
            index = collection.add(newEntity)
            this.set('Location', '/' + entity + '/' + index)
            statusCode = 201
        }
        this.status = statusCode
    }))

    // PUT -> /products/some-url-friendly-identifier
    srv.use(route.put('/:entity/:id', function *(entity, id) {
        var collection, statusCode, properties
        try {
            collection = db.collection(entity)
        } catch (e) {
            statusCode = 400
        }

        if (collection) {
            properties = yield parse(this.request)
            yield collection.update(id, properties)
            statusCode = 202
        }
        this.status = statusCode
    }))

    // DELETE -> /products/some-url-friendly-identifier
    srv.use(route.del('/:entity/:id', function *(entity, id) {
        var collection, statusCode
        try {
            collection = db.collection(entity)
        } catch (e) {
            statusCode = 400
        }

        if (collection) {
            yield collection.delete(id)
            statusCode = 202
        }
        this.status = statusCode
    }))
};
