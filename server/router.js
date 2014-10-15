var route = require('koa-route'),
    parse = require('co-body'),
    db = require('./db.js')

function repository(entity) {
    return require('./' + entity)
}

module.exports = function(srv) {
    // Register routes

    srv.use(route.get('/:entity', function * (entity) {
        this.body = repository(entity).all()
    }))

    srv.use(route.get('/:entity/:id', function * (entity, id) {
        var entity = repository(entity).single(id)
        if (!entity)
            this.status = 404
        else
            this.body = entity
    }))

    srv.use(route.post('/:entity', function * (entity) {
        var newEntity = yield parse(this.request)
        var item = repository(entity).add(newEntity)
        this.body = item
        this.set('Location', '/' + entity + '/' + item.id)
        this.status = 201
    }))

    srv.use(route.put('/:entity/:id', function * (entity, id) {
        var properties = yield parse(this.request)
        repository(entity).update(id, properties)
        this.status = 202
    }))

    srv.use(route.del('/:entity/:id', function * (entity, id) {
        repository(entity).delete(id, properties)
        this.status = 202
    }))
}
