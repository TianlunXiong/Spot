import Vue from "vue";
import Vuex from "vuex";
import user from "./modules/user";
import search from "./modules/search";
import editor from "./modules/editor";
import canvas from "./modules/canvas";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        asideVisible: false,
        loginDialogVisble: false,
        searchBarVisible: false,
        canvasOptionVisible: false
    },
    modules: {
        user,
        search,
        editor,
        canvas
    },
    getters: {

    },
    mutations: {

        OPEN_LOGIN_DIALOG (state) {
            state.loginDialogVisble = true;
        },
        CLOSE_LOGIN_DIALOG (state) {
            state.loginDialogVisble = false;
        },

        TOGGLE_SEARCHBAR (state) {
            state.searchBarVisible = !state.searchBarVisible;
        },

        TOGGLE_ASIDE (state) {
            state.asideVisible = !state.asideVisible;
        },
        CLOSE_ASIDE (state) {
            state.asideVisible = false;
        },

        TOGGLE_CANVAS_OPTION (state) {
            state.canvasOptionVisible = !state.canvasOptionVisible;
        }

    },
    actions: {

        loginDialog (context, param) {
            switch (param) {
            case "open":
                context.commit("OPEN_LOGIN_DIALOG");
                break;
            case "close":
                context.commit("CLOSE_LOGIN_DIALOG");
                break;
            default:
                break;
            }
        },
        searchBar (context, param) {
            switch (param) {
            case "toggle":
                context.commit("TOGGLE_SEARCHBAR");
                break;
            default:
                break;
            }
        },

        aside (context, param) {
            switch (param) {
            case "toggle":
                context.commit("TOGGLE_ASIDE");
                break;
            case "close":
                context.commit("CLOSE_ASIDE");
                break;
            default:
                break;
            }
        },

        canvasOption (context) {
            context.commit("TOGGLE_CANVAS_OPTION");
        },

        scrollTo (context, load) {
            const s = Date.now()
            const html = document.documentElement
            const delta = -(Math.abs(html.scrollTop - load.p))
            let ani1, ani2
            if(html.scrollTop > load.p) {
                (function smooth(){
                    if(html.scrollTop > load.p){
                        html.scrollTop += delta * (0.05 + 0.3 * Math.exp(-(Date.now() - s)/20))
                        ani1 = requestAnimationFrame(smooth)
                    } else {
                        cancelAnimationFrame(ani1)
                    }
                    if((Date.now() - s)> 700) {
                        cancelAnimationFrame(ani1)
                    }
                })()
            } 
            if(html.scrollTop < load.p) {
                (function aa(){
                    if(html.scrollTop < load.p){
                        html.scrollTop -= delta * (0.05 + 0.3 * Math.exp(-(Date.now() - s)/20))
                        ani2 = requestAnimationFrame(aa)
                    } else {
                        cancelAnimationFrame(ani2)
                    }
                    if((Date.now() - s)> 700) {
                        cancelAnimationFrame(ani2)
                    }
                })()
            }
        }
    }
});
