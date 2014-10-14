;
var Q = require('q')

function createAjaxRequest(url, options) {
    var deferred = Q.defer()
    var request = new XMLHttpRequest();
    request.open(options.method, url, true);
    request.onload = function() {
        if (request.status >= 200 && request.status < 400) {
            // Success!
            data = JSON.parse(request.responseText)
            deferred.resolve(data)
        } else {
            // We reached our target server, but it returned an error
            deferred.reject(request.status)
        }
    };
    request.onerror = function() {
        deferred.reject(request.status)
        // There was a connection error of some sort
    };
    request.send()
    return deferred.promise
}

function get(url) {
    var ajaxRequest = createAjaxRequest(url, {
        method: 'GET'
    })
    Q(ajaxRequest).then(function(data){
        console.log(data);
    })
}

module.exports = {
    get: get
}
