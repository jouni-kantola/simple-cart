;
var Q = require('q')

function createAjaxRequest(url, options, data) {
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
    }
    request.onerror = function() {
        deferred.reject(request.status)
        // There was a connection error of some sort
    }
    if (data) {
        request.setRequestHeader('Content-Type', 'application/json')
        request.send(JSON.stringify(data))
    } else {
        request.send()
    }
    return deferred.promise
}

function action(url, method, data) {
    var ajaxRequest = createAjaxRequest(url, {
        method: method
    }, data)
    return Q(ajaxRequest)
}

function get(url) {
    return action(url, 'GET');
}

function post(url, data) {
    return action(url, 'POST', data);
}

module.exports = {
    get: get,
    post: post
}
