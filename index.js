var app = require('koa')(),
    router = require('./server/router'),
    config = require('./config');

router(app);
app.listen(config.port);
