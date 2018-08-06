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
                state.articleBuffer.title = articleBuffer.title;
            }
            if (articleBuffer.content) {
                state.articleBuffer.content = articleBuffer.content;
            }
        },
        ARTICLE_BUFFER_RESET (state) {
            state.articleBuffer.title = "";
            state.articleBuffer.content = "";
        }
    }
};
