import util from "../../util";
import config from "../../config";

const URL = config.URL;

export default {
    namespaced: true,

    state: {
        isValidating: true,
        isLogin: false,
        email: "",
        name: "",
        icon: "",
        articles: [],
        articleFinished: false,
        operation: {
            article: "new",
            id: ""
        }
    },

    actions: {
        getArticle (context) {
            util.getData(URL + "/find?type="+"articles")
                .then(json => {
                    context.commit("ARTICLE_ASSIGN", json.state.success ? json.state.articles : []);
                });
        },
        resetArticle (context) {
            context.commit("ARTICLE_RESET");
        },
        updateArticleState (context, finished) {
            context.commit("UPDATE_ARTICLESTATE", finished);
        },
        userReset (context) {
            context.commit("USER_RESET");
        },
        userUpdate (context, load) {
            context.commit("USER_UPDATE", {
                isLogin: true,
                name: load.name,
                email: load["e-mail"],
                icon: load.icon
            });
        },
        userOS (context, load) {
            context.commit("USER_OS", load);
        },
        removeArticle (context, index) {
            context.dispatch("ARTICLE_REMOVE", index);
        },
        login (context, load) {
            //  发送给后台 验证邮箱与密码
            return util.postDataJson(URL + "/login", {
                ...load
            });
        },
        logout (context, load) {
            return util.postDataJson(URL + "/logout", {
                ...load
            });
        },
        query (context, load) {
            var keys = Object.keys(load);
            var name = keys[0];
            var value = load[name];
            return util.getData(URL + `/query?${name}=${value}`);
        },
        post (context, load) {
            return util.postData(URL + "/post", load);
        },
        posj (context, load) {
            return util.postDataJson(URL + "/post", load);
        },
        update (context, load) {
            return util.postDataJson(URL + "/update", load);
        },
        delete (context, load) {
            return util.postDataJson(URL + "/delete", load);
        },
        register (context, load) {
            return util.postDataJson(URL + "/register", load);
        }
    },

    mutations: {
        ARTICLE_ASSIGN (state, articles) {
            state.articles = articles;
        },
        UPDATE_ARTICLESTATE (state, finished) {
            state.articleFinished = finished;
        },
        ARITICLE_REMOVE (state, index) {
            state.articles.splice(index, 1);
        },
        ARTICLE_RESET (state) {
            state.articles = [];
        },
        USER_UPDATE (state, newUser) {
            state.isLogin = newUser.isLogin;
            state.name = newUser.name;
            state.icon = newUser.icon;
            state.email = newUser.email;
        },
        USER_RESET (state) {
            state.isLogin = false;
            state.name = "";
            state.icon = "";
            state.email = "";
            state.operation.article = "new";
        },
        USER_OS (state, operation) {
            state.operation.article = operation.article;
            state.operation.id = operation.id;
        }
    }
};
