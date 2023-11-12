const combineRouters = require('koa-combine-routers');
const messageRouter = require('./message/index.js');
const fileRouter = require('./file/index.js');

const router = combineRouters(
    messageRouter,
    fileRouter
);

module.exports = router;