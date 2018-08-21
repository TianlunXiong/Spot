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
        }
    }
});
