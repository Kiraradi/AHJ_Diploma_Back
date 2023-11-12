const Router = require('koa-router');
const fileService = require('../../services/file-service');

const router = new Router();
router.post('/file/upload', async (ctx) => {

    try {
        fileService.upload(ctx.request.files.file);
    }
    catch (err) {
        console.log(err)
        ctx.response.status = 400;
    }
});


router.get('/file/download', async (ctx) => {
    const { path, fileName } = ctx.request.query;
    try {
        ctx.body = fileService.download(path, fileName);
        ctx.attachment(fileName);
    }
    catch (err) {
        console.log(err)
        ctx.response.status = 400;
    }
});

module.exports = router;