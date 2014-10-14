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
            dictionary[index] = curr
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
                var index = Object.keys(coll).length;
                coll[index] = object
                return index
            },
            update: function(id, object) {
                coll[id] = object
            },
            delete: function *(id) {
                delete coll[id];
            }
        }
    }
}
