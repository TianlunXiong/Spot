<template>
    <el-container>
        <div v-show="$store.state.asideVisible" :class="covered ? 'coverLayer' :'hide-coverLayer' " @click="hideCover"></div>
        <el-aside :width="covered ? '100%' : '300px'" class="navi">
            <el-collapse-transition>
                <my-aside v-show="$store.state.asideVisible"></my-aside>
            </el-collapse-transition>
        </el-aside>
        <el-container>
            <el-container>
                <el-header height="" style="padding:1px">
                    <!-- Header content -->
                    <log-dialog></log-dialog>
                    <my-header></my-header>
                </el-header>
                <el-main height="" style="padding:0px">
                    <!-- Main content -->
                    <router-view></router-view>
                </el-main>
            </el-container>
        </el-container>
        <transition name="el-fade-in">
            <el-button @click="scrollToTop" class="el-icon-caret-top" style="position:fixed;bottom:5px;right:28px;border:none;padding:3px 20px;background-color:rgba(255,255,255,0)"></el-button>
        </transition>
    </el-container>
</template>

<script>

import MyAside from "./components/MyAside.vue";
import LogDialog from "./components/LogDialog.vue";
import MyHeader from "./components/MyHeader.vue";

export default {
    data () {
        return {
        };
    },
    computed: {
        covered () {
            if (window.innerWidth <= 726) {
                return true;
            } else {
                return false;
            }
        }
    },
    methods: {
        scrollToTop () {
            window.scrollTo({
                top: 0,
                left: 0,
                behavior: "smooth"
            });
        },
        hideCover () {
            this.$store.dispatch("aside", "toggle");
        }
    },
    created () {
        // console.log(`App has been created!`);
        this.$store.dispatch("search/getHotNews");
        setInterval(() => {
            this.$store.dispatch("search/getHotNews");
        }, 60000);
        this.$store.dispatch("user/login").then(json => {
            this.$store.state.user.isValidating = false;
            if (json.state.success && json.state.reason === "session") {
                // console.log("登陆成功");
                this.$store.dispatch("user/userUpdate", json.state.user);
                this.$store.dispatch("user/getArticle").then(() => {
                    this.$store.dispatch("user/updateArticleState", true);
                });
            } else {
                // console.log("登陆失败");
                this.$store.dispatch("loginDialog", "open");
                this.$store.dispatch("user/updateArticleState", true);
            }
        });
    },
    components: {
        MyAside,
        MyHeader,
        LogDialog
    }
};
</script>

<style lang="css" >
@import url("element-ui/lib/theme-chalk/base.css");

.el-row {
    margin-bottom: 0px;
}
.el-col {
    border-radius: 4px;
}
::-webkit-scrollbar {
    width: 8px;
}
::-webkit-scrollbar-thumb {
    background-color: rgba(206, 206, 206, 0.76);
    border-radius: 4px;
}
* {
    font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB",
        "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
}
body{
    margin: 4px;
}
em{
    font-style: normal;
}

a{
    text-decoration: none;
    color: #409eaa
}
.coverLayer{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: #111;
    opacity: 0.5;
    z-index: 1;
}
.hide-coverLayer{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
    z-index: 1;
}

.navi{
    position: fixed;
    z-index:100;
    top:49px;
}
</style>
