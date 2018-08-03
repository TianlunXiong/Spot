export default {
    namespaced: true,
    state: {
        articleBuffer: {
            title: "",
            content: ""
        }
    },
    actions: {
        saveArticleBuffer (context, article) {
            context.commit("ARTICLE_BUFFER_ASSIGN", article);
        },
        resetArticleBuffer (context) {
            context.commit("ARTICLE_BUFFER_RESET");
        }
    },
    mutations: {
        ARTICLE_BUFFER_ASSIGN (state, articleBuffer) {
            if (articleBuffer.title) {
                state.article_buffer.title = articleBuffer.title;
            }
            if (articleBuffer.content) {
                state.article_buffer.content = articleBuffer.content;
            }
        },
        ARTICLE_BUFFER_RESET (state) {
            state.article_buffer.title = "";
            state.article_buffer.content = "";
        }
    }
};
