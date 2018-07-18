<template>
    <el-container>

        <el-aside width="65px" v-show="$store.state.asideVisible">
            <!-- Aside content -->
            <el-collapse-transition name="aside">
                <div v-show="$store.state.asideVisible">
                    <my-aside></my-aside>
                </div>
            </el-collapse-transition>
        </el-aside>

        <el-container>
            <el-container>
                <el-header height="">
                    <!-- Header content -->
                    <log-dialog></log-dialog>
                    <my-header></my-header>
                </el-header>
                <el-main height="" style="">
                    <router-view></router-view>
                </el-main>
            </el-container>
        </el-container>
        <!-- Main content -->
        <div style="position:fixed;bottom:5px;right:28px">
            <el-button @click="scrollToTop" class="el-icon-caret-top" style="padding:5px 20px;"></el-button>
        </div>
    </el-container>
</template>

<script>
import MyAside from "./components/MyAside.vue";
import LogDialog from "./components/LogDialog.vue";
import MyHeader from "./components/MyHeader.vue";
export default {
    data() {
        return {
            length_scroll: document.documentElement.scrollTop
        };
    },
    computed: {
        isShow() {
            if (this.length_scroll === 0) {
                return false;
            } else {
                return true;
            }
        }
    },
    methods: {
        scrollToTop() {
            window.scrollTo({
                top: 0,
                left: 0,
                behavior: "smooth"
            });
        }
    },
    created() {
        console.log(`App has been created!`);
        this.$store.dispatch("search/getHotNews");
        setInterval(() => {
            this.$store.dispatch("search/getHotNews");
        }, 60000);
        this.$store.dispatch("user/login").then(json => {
            this.$store.state.user.isValidating = false;
            if (json.state.success && json.state.reason === "session") {
                console.log("登陆成功");
                this.$store.dispatch("user/userUpdate", json.state.user);
                this.$store.dispatch("user/getArticle").then(() => {
                    setTimeout(() => {
                        this.$store.dispatch("user/updateArticleState", true);
                    }, 350);
                });
            } else {
                console.log("登陆失败");
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

<style lang="scss">
.el-row {
    margin-bottom: 0px;
    &:last-child {
        margin-bottom: 0;
    }
}
.el-col {
    border-radius: 4px;
}

.bg-purple-dark {
    background: #99a9bf;
}
.bg-purple {
    background: #d3dce6;
}
.bg-purple-light {
    background: #e5e9f2;
}
.grid-content {
    border-radius: 4px;
    min-height: 60px;
}
.row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
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

em{
    font-style: normal;
}

a{
    text-decoration: none;
    color: #409eaa
}
</style>
