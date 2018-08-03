import VueRouter from "vue-router";
import home from "../pages/home.vue";
import user from "../pages/user.vue";
import profile from "../pages/profile.vue";
import articles from "../pages/articles.vue";
import creator from "../pages/creator.vue";

const router = new VueRouter({
    routes: [
        {
            path: "/",
            component: home,
            beforeEnter (to, from, next) {
                next();
            }
        },
        {
            path: "/creator",
            component: creator
        },
        {
            path: "/user/:name",
            name: "user",
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
                    router.app.$store.dispatch("login").then(json => {
                        router.app.$store.state.user.isValidating = false;
                        if (json.state.success && json.state.reason === "session") {
                            // console.log("session登陆成功")
                            router.app.$store.dispatch("userUpdate", json.state.user);
                            next();
                        } else {
                            next("/");
                            router.app.$store.dispatch("loginDialog", "open");
                        }
                    });
                } else {
                    next();
                }
            }

        }

    ]
});

router.beforeEach((to, from, next) => {
    next();
});

export default router;
