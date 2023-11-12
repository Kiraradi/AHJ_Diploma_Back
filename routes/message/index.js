const Router = require('koa-router');
const messagesService = require('../../services/message-service');

const router = new Router();
router.post('/message/send', async (ctx) => {
    const { text, geolocation, type } = ctx.request.body;
    console.log(text, geolocation, type)
    try {
        messagesService.send(text, geolocation, type);
    }
    catch (err) {
        ctx.response.status = 400;
    }
});

router.get('/messages', async (ctx) => {
    const lastMessageNumber = ctx.request.query.lastMessageNumber;

    try {
        const messages = messagesService.getMessages(lastMessageNumber);
        ctx.response.body = { messages: messages };
    }
    catch (err) {
        ctx.response.status = 400;
    }
});

router.get('/fixedMessage', async (ctx) => {
    const fixedMessageNumber = ctx.request.query.messageNumber;
    console.log(fixedMessageNumber)

    try {
        messagesService.toFixMessage(fixedMessageNumber);
        ctx.response.status = 200;
    }
    catch (err) {
        console.log(err)
        ctx.response.status = 400;
    }
});

module.exports = router;