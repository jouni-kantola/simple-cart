var fs = require('fs'),
    collections = {}

function ensureCollection(name) {
    var initData, parsedData

    if (!collections[name]) {
        initData = fs.readFileSync(__dirname + '/db/' + name + '.json', {
            encoding: 'utf8'
        })
        parsedData = JSON.parse(initData)
        collections[name] = parsedData.reduce(function(dictionary, curr, index) {
            dictionary[index + 1] = curr
            return dictionary
        }, {})
    }
    return collections[name]
}

module.exports = {
    collection: function(name) {
        var coll = ensureCollection(name)
        return {
            all: function() {
                return coll
            },
            filter: {
                by: function(property, value) {
                    return coll.filter(function(item) {
                        return item[property] === value
                    })
                },
                byId: function(id) {
                    return coll[id]
                }
            },
            add: function(object) {
                var keys = Object.keys(coll)
                var newIndex = (+(keys[keys.length - 1]) || 0) + 1
                coll[newIndex] = object
                return newIndex
            },
            update: function *(id, properties) {
                var object = coll[id]
                for (prop in properties) {
                    if (object.hasOwnProperty(prop)) {
                        object[prop] = properties[prop]
                    }
                }
            },
            delete: function *(id) {
                delete coll[id];
            }
        }
    }
}
