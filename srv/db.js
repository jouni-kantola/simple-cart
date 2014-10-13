var fs = require('fs')

module.exports = {
    collection: function(name) {
        var coll = fs.readFileSync(__dirname + '/db/' + name + '.json', {
            encoding: 'utf8'
        })
        return {
            all: function() {
                return JSON.parse(coll)
            },
            filter: {
                by: function(property, value) {
                    return JSON.parse(coll).filter(function(item){
                        return item[property] === value;
                    });
                }
            }
        }
    }
}
