<template>
    <div>
        <el-row>
            <el-col :span="24">
                <div class="bg" style="background-color:rgba(127,26,179,0.9);text-align:center;height:40px;border-radius:4px">
                    <div style="position:absolute;left:0px;top:0px;height:40px;width:40px" >
                        <el-button type="text" @click="toggleAsideBar" style="color:white;padding:13px;border:none" >
                            <i class="el-icon-menu"></i>
                        </el-button>
                    </div>
                    <span class="title">Spot</span>
                    <el-switch style="position:absolute;top:0px;right:5px;height:40px;" :value="login" active-color="#13ce66" inactive-color="#C0CCDA" @change="notify" :disabled="isLogouting">
                    </el-switch>
                </div>
            </el-col>
        </el-row>
        <el-row>
            <el-col :md="6" :xs="24">
                <el-alert v-show="showOperationButton()" :title="`您正在编辑随笔: ${$store.state.editor.articleBuffer.title}`" :closable="false" type="info" show-icon></el-alert>
            </el-col>
        </el-row>
        <el-row>
            <el-col :md="8"  :xs="0" >&nbsp;</el-col>
            <el-col :md="8"  :xs="24">
                <div class="light-bgc" v-loading="searchHotLoading" >
                    <el-carousel height="62px" style="" trigger="click" indicator-position="none">
                        <el-carousel-item class="bg-filter" v-for="(item, index) in $store.state.search.hotTopic.zhihu" :key="index">
                            <span style="line-height:60px;font-size:24px;font-weight:700;cursor:pointer;" title="点击搜索" @click="searchHotTopic(item.display_query)">{{ item.display_query }}</span>
                            <i class="iconfont icon-cus-zhihu" style="color:#409EFF"></i>
                        </el-carousel-item>
                    </el-carousel>
                </div>
                <transition name="el-fade-in-linear">
                    <el-form @submit.native.prevent="getSearchNews" v-show="$store.state.searchBarVisible">
                        <el-form-item >
                            <el-input  v-model="searchText" placeholder="在知乎搜索" clearable>
                                <el-button slot="append" :loading="searchLoading" icon="el-icon-search"  @click="getSearchNews"></el-button>
                            </el-input>
                        </el-form-item>
                    </el-form>
                </transition>
            </el-col>
            <el-col :md="8" :xs="0">&nbsp;</el-col>
        </el-row>
    </div>

</template>

<script>
export default {
    data () {
        return {
            searchText: "",
            isLogouting: false,
            searchLoading: false,
            searchHotLoading: false
        };
    },
    computed: {
        login () {
            if (this.$store.state.user.isLogin === true) {
                return true;
            } else {
                return false;
            }
        }
    },
    methods: {
        toggleAsideBar () {
            this.$store.dispatch("aside", "toggle");
        },
        searchHotTopic (topic) {
            this.searchHotLoading = true;
            this.$store
                .dispatch("search/searchNews", {
                    keyWords: topic,
                    type: "general",
                    offset: 0,
                    limit: 5
                })
                .then(() => {
                    this.$store.dispatch("search/setSearchText", topic).then(() => {
                        this.$router.push("/search");
                        this.searchHotLoading = false;
                    });
                });
        },
        getHotNews  () {
            this.$store.dispatch("search/getHotNews");
        },
        getSearchNews  () {
            if (this.searchText.search(/^ *$/g) === -1) {
                this.searchLoading = true;
                this.$store
                    .dispatch("search/searchNews", {
                        keyWords: this.searchText,
                        type: "general",
                        offset: 0,
                        limit: 5
                    })
                    .then(() => {
                        this.$store.dispatch("search/setSearchText", this.searchText).then(() => {
                            this.$router.push("/search");
                            this.searchLoading = false;
                        });
                    })
                    .catch(e => {
                        this.$message({
                            message: "网络或服务器错误",
                            type: "error"
                        });
                    });
            } else {
                this.$message({
                    message: "无效搜索",
                    type: "info",
                    duration: 750
                });
            }
        },
        showLoginDialog () {
            this.$store.dispatch("loginDialog", "open");
        },
        hideLoginDialog () {
            this.$store.dispatch("loginDialog", "close");
        },
        showOperationButton () {
            switch (this.$store.state.user.operation.article) {
            case "new":
                return false;
            case "revise":
                return true;
            }
        },
        notify (value) {
            if (value === false) {
                this.isLogouting = true;
                this.$store
                    .dispatch("user/logout", {
                        username: this.$store.state.user.name
                    })
                    .then(json => {
                        if (json.state.success) {
                            this.$store.dispatch("user/userReset").then(() => {
                                this.$message({
                                    message: "注销成功",
                                    type: "success",
                                    duration: 1000
                                });
                                this.$router.replace("/");
                                this.$store.dispatch("user/resetArticle");
                            });
                        } else {
                            this.$message({
                                message: "注销失败,马上为您刷新页面",
                                type: "error",
                                duration: 1000
                            });
                            setTimeout(() => {
                                location.reload();
                            }, 750);
                        }
                    })
                    .then(() => {
                        this.isLogouting = false;
                    })
                    .catch(e => {
                        this.isLogouting = false;
                        this.$message({
                            message: "网络或服务器错误",
                            type: "error"
                        });
                    });
            } else {
                this.$store.dispatch("loginDialog", "open");
            }
        }
    }
};
</script>

<style lang="css" scoped>
.el-row {
    margin-bottom: 5px;
}
.title{
    font-style:italic;
    line-height:40px;
    font-size:24px;
    color:gold;
    user-select: none;
}
</style>
