import Vue from "vue";
import VueRouter from "vue-router";
import router from "./route/index.js";
import Vuex from "vuex";
import store from "./store/store";

// 全局引入
// import ElementUI from "element-ui"
// import "element-ui/lib/theme-chalk/index.css"
// Vue.use(ElementUI);
import VueQuillEditor from "vue-quill-editor";
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
import App from "./App.vue";
// 局部引入
import "element-ui/lib/theme-chalk/base.css";
import {
    Pagination,
    Dialog,
    Dropdown,
    DropdownItem,
    DropdownMenu,
    Badge,
    Menu,
    Submenu,
    MenuItem,
    MenuItemGroup,
    Input,
    Switch,
    Button,
    TabPane,
    Tabs,
    Table,
    TableColumn,
    Form,
    FormItem,
    Alert,
    Slider,
    Icon,
    Row,
    Col,
    Card,
    Carousel,
    CarouselItem,
    Container,
    Header,
    Aside,
    Main,
    Footer,
    Loading,
    MessageBox,
    Message
} from "element-ui";
// fade/zoom 等
// collapse 展开折叠
import CollapseTransition from "element-ui/lib/transitions/collapse-transition";

Vue.component(CollapseTransition.name, CollapseTransition);
Vue.use(Pagination);
Vue.use(Dialog);
Vue.use(Dropdown);
Vue.use(DropdownItem);
Vue.use(DropdownMenu);
Vue.use(Menu);
Vue.use(Submenu);
Vue.use(Badge);
Vue.use(MenuItem);
Vue.use(MenuItemGroup);
Vue.use(Input);
Vue.use(Switch);
Vue.use(Button);
Vue.use(Tabs);
Vue.use(TabPane);
Vue.use(Table);
Vue.use(TableColumn);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Alert);
Vue.use(Slider);
Vue.use(Icon);
Vue.use(Row);
Vue.use(Col);
Vue.use(Card);
Vue.use(Carousel);
Vue.use(CarouselItem);
Vue.use(Container);
Vue.use(Header);
Vue.use(Aside);
Vue.use(Main);
Vue.use(Footer);
Vue.use(Loading.directive);
Vue.prototype.$loading = Loading.service;
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;
Vue.prototype.$confirm = MessageBox.confirm;
Vue.prototype.$prompt = MessageBox.prompt;
Vue.prototype.$message = Message;
Vue.use(VueQuillEditor);
Vue.use(VueRouter);
Vue.use(Vuex);

new Vue({
    el: "#app",
    store,
    router,
    render: h => h(App)
});
