<template>
    <el-row >
        <el-col :span="24">
            <el-menu background-color="#7F2EB3" text-color="gold" active-text-color="white" style="border-top:2px solid gold;margin-right:9px;margin-left:1px"  mode="verticle" :default-active="'1'" @select="handleSelect" :collapse="false" >
                <el-menu-item index="1" class="iconfont icon-cus-home">
                    主页
                </el-menu-item>
                <el-menu-item index="2" class="iconfont icon-cus-creator">
                    随笔
                </el-menu-item>

                <el-submenu index="3">
                    <template slot="title">
                        <span class="iconfont icon-cus-user" style="color:gold;font-size:16px"> 我的</span>
                    </template>
                    <el-menu-item index="3-1">
                        <span>用户信息</span>
                    </el-menu-item>
                    <el-menu-item index="3-2">
                        <span>随笔</span>
                    </el-menu-item>
                </el-submenu>

                <el-menu-item index="4" class="iconfont icon-cus-sousuo">
                        发现
                </el-menu-item>
            </el-menu>
        </el-col>
    </el-row>

</template>

<script>
export default {
    data () {
        return {
            asideCollapse: false,
            message: ""
        };
    },
    methods: {
        handleSelect (key, keyPath) {
            this.message = `key:${key},keyPath:${keyPath},${typeof keyPath[0]}`;
            switch (keyPath[0]) {
            case "1":
                this.$router.push({ path: "/" });
                break;
            case "2":
                this.$router.push({ path: "/creator" });
                break;
            case "3":
                this.toUser().then(r => {
                    if (r) {
                        switch (keyPath[1]) {
                        case "3-1":
                            this.$router.replace({ name: "profile" });
                            break;
                        case "3-2":
                            this.$router.replace({ name: "articles" });
                            break;
                        case "3-3":
                            this.$router.replace({ name: "articles" });
                            break;
                        }
                    }
                });
                break;
            case "4":
                this.$store.dispatch("searchBar", "toggle");
                this.$router.push({name: "search"});
            }
            this.$store.dispatch("aside", "toggle");
        },
        toUser () {
            return new Promise((resolve, reject) => {
                if (this.$store.state.user.isValidating) {
                    this.$message({
                        message: "请等待验证",
                        type: "info"
                    });
                } else {
                    if (this.$store.state.user.isLogin) {
                        this.$router.replace({
                            path: "/user/" + this.$store.state.user.name
                        });
                        resolve(true);
                    } else {
                        this.$message({
                            message: "请登陆",
                            type: "info"
                        });
                        resolve(false);
                    }
                }
            });
        }
    }
};
</script>

<style >
@import "../assets/icon/iconfont.css";

.light-bgc {
    text-align: center;
}
.switch-log {
    line-height: 64px;
    height: 64px;
}
.el-menu{
    border: none;
}
</style>
