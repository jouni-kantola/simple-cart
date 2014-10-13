var app = require('koa')(),
    router = require('./srv/router'),
    config = require('./config');

router(app);
app.listen(config.port);
