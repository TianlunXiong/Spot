const engine = require('../methods/engine')


module.exports = {

    async hotNews(ctx, next) {
        ctx.set('Content-Type', 'application/json');
        await engine.zhihu.topTopic().then(r => {
            ctx.body = r;
        });

        await next();
    },

    async search(ctx, next) {
        ctx.set('Content-Type', 'application/json');
        await engine.zhihu.search({
            keyWords: ctx.query.keyWords,
            type: ctx.query.type,
            offset: ctx.query.offset,
            limit: ctx.query.limit
        }).then(r => {
            ctx.body = r;
        })

        await next();
    },

    async answer(ctx, next) {
        ctx.set('Content-Type', 'application/json');
        await engine.zhihu.answer({
            questionId: ctx.query.questionId,
            offset: ctx.query.offset,
            limit: ctx.query.limit,
            sort_by: ctx.query.sort_by
        }).then(r => {
            ctx.body = r;
        })
        await next()
    },

    async comment(ctx, next) {
        ctx.set('Content-Type', 'application/json');
        await engine.zhihu.comment({
            answerId: ctx.query.answerId,
            offset: ctx.query.offset,
            limit: ctx.query.limit,
            order: ctx.query.order,
            type: ctx.query.type
        }).then(r => {
            ctx.body = r;
        })

        await next();
    },

    async agent(ctx, next) {
        await engine.agent.fetch(ctx.query.url).then(r=>{
            ctx.set(r.header);
            ctx.body = r.body;
        })

        await next();
    }

}