var fs = require('fs'),
    collections = {}

function ensureCollection(name) {
    if (!collections[name]) {
        var initData = fs.readFileSync(__dirname + '/db/' + name + '.json', {
            encoding: 'utf8'
        })
        collections[name] = JSON.parse(initData)
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
                        return item[property] === value;
                    });
                }
            }
        }
    }
}
