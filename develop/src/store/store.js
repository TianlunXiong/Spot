import Vue from 'vue'
import Vuex from 'vuex'

import user from './modules/user'
import search from './modules/search'
import editor from './modules/editor'

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        asideVisible: false,
        loginDialogVisble: false,
        searchBarVisible: false,
    },
    modules: {
        user,
        search,
        editor
    },
    getters: {

    },
    mutations: {

        OPEN_LOGIN_DIALOG(state) {
            state.loginDialogVisble = true;
        },
        CLOSE_LOGIN_DIALOG(state) {
            state.loginDialogVisble = false;
        },

        TOGGLE_SEARCHBAR(state){
            state.searchBarVisible = !state.searchBarVisible;
        },
        
        TOGGLE_ASIDE(state){
            state.asideVisible = !state.asideVisible;
        }

    },
    actions: {

        loginDialog(context, param) {
            switch (param) {
                case "open":
                    context.commit("OPEN_LOGIN_DIALOG")
                    break;
                case "close":
                    context.commit("CLOSE_LOGIN_DIALOG")
                default:
                    break;
            }
        },
        searchBar(context,param){
            switch(param){
                case "toggle":
                    context.commit("TOGGLE_SEARCHBAR");
                    break;
                default:
                    break;
            }
        },

        aside(context,param){
            switch(param){
                case "toggle":
                    context.commit("TOGGLE_ASIDE");
                    break;
                default:
                    break;
            }
        }
    }

})
