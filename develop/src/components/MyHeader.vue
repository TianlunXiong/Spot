<template>
    <div>
        <el-row>
            <el-col :span="24">
                <div class="bg" style="background-color:#7F2EB3;text-align:center;height:40px;border-radius:4px">
                    <div style="position:absolute;left:0px;top:0px;height:40px;width:40px" @click="toggleAsideBar">
                        <span class="el-icon-menu" style="color:white;margin-top:12px;margin-left:12px"></span>
                    </div>
                    <span class="slide-shine" style="font-style:italic;line-height:40px;font-size:24px;color:gold">Spot</span>
                    <el-switch style="position:absolute;top:0px;right:5px;height:40px;" :value="login" active-color="#13ce66" inactive-color="#ff4949" @change="notify">
                    </el-switch>
                </div>
            </el-col>
        </el-row>
        <transition name="el-zoom-in-top">
            <el-row v-show="$store.state.searchBarVisible">
                <el-col :span="24">
                    <div>
                        <el-input v-model="searchText" placeholder="在知乎搜索" clearable>
                            <el-button style="" slot="prepend" class="el-icon-search" @click="getSearchNews"></el-button>
                        </el-input>
                    </div>
                </el-col>
            </el-row>
        </transition>
        <el-row>
            <el-alert v-show="showOperationButton()" :title="`您正在编辑随笔: ${$store.state.editor.article_buffer.title}`" :closable="false" type="info" show-icon></el-alert>
        </el-row>

        <el-row>
            <el-col :span="24">
                <div class="light-bgc">
                    <el-carousel height="62px" style="" trigger="click" indicator-position="none">
                        <el-carousel-item class="bg-filter" v-for="(item, index) in $store.state.search.hotTopic.zhihu" :key="index">
                            <span style="line-height:60px;font-size:24px;font-weight:700;cursor:pointer;" title="点击搜索" @click="searchHotTopic(item.display_query)">{{ item.display_query }}</span>
                            <i class="iconfont icon-cus-zhihu" style="color:#409EFF"></i>
                        </el-carousel-item>
                    </el-carousel>
                </div>
                <el-collapse-transition>
                    <el-card :body-style="{ padding: '0px' }" style="margin-top:5px" v-show="showSearch">
                        <div slot="header">
                            <span style="color:rgba(0,0,0,0.5)">{{searchText_hide}}</span>
                            <el-button type="text" style="padding:3px;color:#409EFF" class="el-icon-plus" @click="addSearch"></el-button>
                            <el-button type="danger" class="el-icon-close" @click="cancelSearch" style="float:right;padding:3px"></el-button>
                        </div>
                        <search-line v-for="(item, index) in $store.getters['search/searchBufferDone'].slice( pageStart, pageEnd)" :key="index" :qData="item"></search-line>
                        <div>
                            <div style="position:absolute;right:15px;">
                                <el-button type="text" style="padding:6px;color:#409EFF" class="el-icon-plus" @click="addSearch"></el-button>
                            </div>
                            <el-pagination  :current-page="currentPage" layout="prev, pager, next" @next-click="handleNext" @prev-click="handlePrev" @current-change="handleCurrentChange" :page-size="5" :total="$store.getters['search/searchBufferDone'].length">
                            </el-pagination>
                        </div>
                    </el-card>
                </el-collapse-transition>
            </el-col>
        </el-row>
    </div>

</template>

<script>
import SearchLine from "./SearchLine.vue";
import { setTimeout } from "timers";
export default {
    data() {
        return {
            searchText: "",
            searchText_hide: "",
            showSearch: false,
            currentPage: 1,
            maxPage: 1
        };
    },
    computed: {
        login() {
            if (this.$store.state.user.isLogin === true) {
                return true;
            } else {
                return false;
            }
        },
        pageStart() {
            return 5 * (this.currentPage - 1);
        },
        pageEnd() {
            return 5 * this.currentPage;
        }
    },
    methods: {
        toggleAsideBar() {
            this.$store.dispatch("aside", "toggle");
        },
        cancelSearch() {
            this.showSearch = false;
        },
        searchHotTopic(topic) {
            this.$store
                .dispatch("search/searchNews", {
                    keyWords: topic,
                    type: "general",
                    offset: 0,
                    limit: 5
                })
                .then(() => {
                    this.searchText_hide = topic;
                    this.showSearch = true;
                    this.currentPage = 1;
                    this.maxPage = 1;
                });
        },
        getHotNews() {
            this.$store.dispatch("search/getHotNews").then(() => {});
        },
        getSearchNews() {
            this.$store
                .dispatch("search/searchNews", {
                    keyWords: this.searchText,
                    type: "general",
                    offset: 0,
                    limit: 5
                })
                .then(() => {
                    this.showSearch = true;
                    this.searchText_hide = this.searchText;
                    this.currentPage = 1;
                    this.maxPage = 1;
                });
        },
        addSearch() {
            this.$store
                .dispatch("search/addSearch", {
                    name: "zhihu",
                    keyWords: this.searchText_hide,
                    type: "general",
                    offset: 5 * this.maxPage,
                    limit: 5
                })
                .then(r => {
                    if (r !== 0) {
                        this.currentPage = ++this.maxPage;
                    }else{
                        this.$message({
                            message : "已经是最后一页啦!",
                            type : "info"
                        })
                    }
                });
        },
        handleNext(curr) {
            this.currentPage = curr;
        },
        handlePrev(curr) {
            this.currentPage = curr;
        },
        handleCurrentChange(curr) {
            this.currentPage = curr;
        },
        showLoginDialog() {
            this.$store.dispatch("loginDialog", "open");
        },
        hideLoginDialog() {
            this.$store.dispatch("loginDialog", "close");
        },
        showOperationButton() {
            switch (this.$store.state.user.operation.article) {
                case "new":
                    return false;
                    break;
                case "revise":
                    return true;
                    break;
            }
        },
        notify(value) {
            if (value === false) {
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
                                console.log("reset user completed");
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
                    });
            } else {
                this.$store.dispatch("loginDialog", "open");
            }
        }
    },
    components: {
        SearchLine
    }
};
</script>

<style lang="scss" scoped>
.el-row {
    margin-bottom: 5px;
}
</style>
