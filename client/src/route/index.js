import VueRouter from "vue-router";
import home from "../pages/home.vue";
import user from "../pages/user.vue";
import profile from "../pages/profile.vue";
import articles from "../pages/articles.vue";
import creator from "../pages/creator.vue";
import search from "../pages/search.vue";

const router = new VueRouter({
    routes: [
        {
            path: "*",
            redirect: "/"
        },
        {
            path: "/",
            component: home,
            beforeEnter (to, from, next) {
                router.app.$store.dispatch("user/getArticle").then(() => {
                    router.app.$store.dispatch("user/updateArticleState", true);
                });
                next();
            }

        },
        {
            path: "/search",
            name: "search",
            component: search,
            beforeEnter (to, from, next) {
                const _store = router.app.$store;
                if (_store.state.search.searchText === "") {
                    _store.dispatch("search/getHotNews").then(() => {
                        const randomKey =
                            _store.state.search.hotTopic.zhihu[Math.floor(_store.state.search.hotTopic.zhihu.length * Math.random())].display_query;
                        _store
                            .dispatch("search/searchNews", {
                                keyWords: randomKey,
                                type: "general",
                                offset: 0,
                                limit: 5
                            })
                            .then(() => {
                                _store.dispatch(
                                    "search/setSearchText",
                                    randomKey
                                );
                            });
                    });
                }
                next();
            }
        },
        {
            path: "/creator",
            component: creator
        },
        {
            path: "/user",
            beforeEnter (to, from, next) {
                if (!router.app.$store.state.user.isLogin) {
                    router.app.$store.dispatch("user/login").then(json => {
                        router.app.$store.state.user.isValidating = false;
                        if (
                            json.state.success &&
                            json.state.reason === "session"
                        ) {
                            // console.log("session登陆成功")
                            router.app.$store.dispatch(
                                "user/userUpdate",
                                json.state.user
                            );
                            next();
                        } else {
                            next("/");
                            router.app.$store.dispatch("loginDialog", "open");
                        }
                    });
                } else {
                    next("/user/" + router.app.$store.state.user.name);
                }
            }
        },
        {
            path: "/user/:name",
            component: user,
            children: [
                {
                    path: "",
                    component: profile
                },
                {
                    path: "profile",
                    name: "profile",
                    component: profile
                },
                {
                    path: "articles",
                    name: "articles",
                    component: articles
                }
            ],
            beforeEnter (to, from, next) {
                if (!router.app.$store.state.user.isLogin) {
                    router.app.$store.dispatch("user/login").then(json => {
                        router.app.$store.state.user.isValidating = false;
                        if (
                            json.state.success &&
                            json.state.reason === "session"
                        ) {
                            // console.log("session登陆成功")
                            router.app.$store.dispatch(
                                "user/userUpdate",
                                json.state.user
                            );
                            next();
                        } else {
                            next("/");
                            router.app.$store.dispatch("loginDialog", "open");
                        }
                    });
                } else {
                    if (router.app.$store.state.user.name === to.params.name) {
                        next();
                    } else {
                        router.app.$store.dispatch("loginDialog", "open");
                        next("/");
                    }
                }
            }
        }
    ]
});

export default router;
