var app = require('koa')(),
    serve = require('koa-static'),
    router = require('./server/router'),
    config = require('./config');

app.use(serve(__dirname + '/client'))
router(app)
app.listen(config.port)
