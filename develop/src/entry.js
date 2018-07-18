import Vue from 'vue'

import VueRouter from 'vue-router'
import router from './route/index.js'

import Vuex from 'vuex'
import store from './store/store'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import VueQuillEditor from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import App from './App.vue'

// const hotNews = ()=>import(/*webpackChunkName: "hotnews"*/ './pages/hotNews.vue')
// const router = new VueRouter(route)

Vue.use(ElementUI);
Vue.use(VueQuillEditor);
Vue.use(VueRouter);
Vue.use(Vuex);


const vm = new Vue({
    el: '#app',
    store,
    router,
    render: h => h(App)
})