export default {
    namespaced:true,
    state:{
        article_buffer: {
            title: '',
            content: ''
        }
    },
    actions:{
        saveArticleBuffer(context, article) {
            context.commit('ARTICLE_BUFFER_ASSIGN', article)
        },
        resetArticleBuffer(context) {
            context.commit("ARTICLE_BUFFER_RESET");
        },
    },
    mutations:{
        ARTICLE_BUFFER_ASSIGN(state, article_buffer) {
            if (article_buffer.title) {
                state.article_buffer.title = article_buffer.title;
            }
            if (article_buffer.content) {
                state.article_buffer.content = article_buffer.content;
            }
        },
        ARTICLE_BUFFER_RESET(state) {
            state.article_buffer.title = '';
            state.article_buffer.content = '';
        },
    }
}