<template>
    <el-row>
            <el-col :md="8"  :xs="0" >&nbsp;</el-col>
            <el-col :md="8"  :xs="24">
                <el-collapse-transition>
                    <el-card :body-style="{ padding: '0px' }" style="margin-top:5px">
                        <div slot="header">
                            <span style="color:rgba(0,0,0,0.5)">{{$store.state.search.searchText}}</span>
                            <el-button :loading="isLoading" type="text" style="padding:3px;color:rgba(0,0,0,0.5)" class="el-icon-plus" @click="addSearch"></el-button>
                        </div>
                        <search-item v-for="(item, index) in $store.getters['search/searchBufferDone'].slice( pageStart, pageEnd)" :key="index" :qData="item"></search-item>
                        <div>
                            <el-pagination  :current-page="currentPage" layout="prev, pager, next" @next-click="handleNext" @prev-click="handlePrev" @current-change="handleCurrentChange" :page-size="5" :total="$store.getters['search/searchBufferDone'].length">
                            </el-pagination>
                            <div style="float:right">
                                <el-button :loading="isLoading" type="text" style="padding:6px;color:rgba(0,0,0,0.5)" class="el-icon-plus" @click="addSearch"></el-button>
                            </div>
                        </div>
                    </el-card>
                </el-collapse-transition>
            </el-col>
            <el-col :md="8" :xs="0">&nbsp;</el-col>
        </el-row>
</template>

<script>
import SearchItem from "./SearchItem.vue";
export default {
    data () {
        return {
            currentPage: 1,
            maxPage: 1,
            closeSignal: true,
            isLoading: false
        };
    },
    computed: {
        pageStart () {
            return 5 * (this.currentPage - 1);
        },
        pageEnd () {
            return 5 * this.currentPage;
        }
    },
    beforeUpdate () {
        //  当此组件不是第一页时 从输入框搜索会空白 所以这里要初始化一下
        if (this.$store.getters["search/searchBufferDone"].length === 5) {
            this.currentPage = 1;
            this.maxPage = 1;
        }
        //  让所有答案折叠
        this.$store.dispatch("search/emitInitialSignal");
    },
    methods: {
        cancelSearch () {
            this.showSearch = false;
        },
        addSearch  () {
            this.isLoading = true;
            this.$store
                .dispatch("search/addSearch", {
                    name: "zhihu",
                    keyWords: this.$store.state.search.searchText,
                    type: "general",
                    offset: 5 * this.maxPage,
                    limit: 5
                })
                .then(r => {
                    if (r !== 0) {
                        this.currentPage = ++this.maxPage;
                    } else {
                        if (this.currentPage === this.maxPage) {
                            this.$message({
                                message: "已经是最后一页啦!",
                                type: "info"
                            });
                        } else {
                            this.currentPage = this.maxPage;
                        }
                    }
                    this.isLoading = false;
                })
                .catch(e => {
                    this.isLoading = false;
                });
        },
        handleNext (curr) {
            this.currentPage = curr;
        },
        handlePrev (curr) {
            this.currentPage = curr;
        },
        handleCurrentChange (curr) {
            this.currentPage = curr;
        }
    },
    components: {
        SearchItem
    }
};
</script>

<style scoped>
.el-row {
    margin-bottom: 5px;
}
</style>
