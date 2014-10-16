require('mocha')

var db = require('../../server/db'),
    expect = require('chai').expect

describe('db', function() {

    ['products', 'carts'].forEach(function(collection) {
        it('should find collection ' + collection, function() {
            return expect(db.collection(collection).all()).to.be.ok
        })
    })

    describe('products', function() {

        it('should be able to get by id', function() {
            var item = db.collection('products').filter.byId(1)
            return expect(item.entity.name).to.equal('Milk')
        })

        it('should be able to filter by property', function() {
            var item = db.collection('products').filter.by('name', 'Milk')
            return expect(item.entity.name).to.equal('Milk')
        })

        it('should be able to add product', function() {
        	var product = {
                "id": "37deb3ff-0198-421e-8f87-a1f4f08ab033",
                "name": "Bread",
                "priceIncVat": 10.0,
                "vatPercentage": 0.25,
                "vatAmount": 5
            }
            var id = db.collection('products').add(product)
            var item = db.collection('products').filter.byId(id)
            return expect(item.entity.id).to.equal(product.id)
        })

        it('should be able to update product', function() {
        	var id = 1
            var before = db.collection('products').filter.byId(id).entity.name
            db.collection('products').update(id, {name: 'Pizza'})
            var after = db.collection('products').filter.byId(id).entity.name
            return expect(before).to.not.equal(after)
            	&& expect(before).to.be.ok
            	&& expect(after).to.be.ok
        })

        it('should be able to delete product', function() {
        	var id = 1
            var before = db.collection('products').filter.byId(id).entity
            db.collection('products').delete(id)
            var after = db.collection('products').filter.byId(id).entity
            return expect(before).to.be.ok
            	&& expect(after).to.not.be.ok
        })

    })
})

/*
            
            delete: function (id) {
            }*/
