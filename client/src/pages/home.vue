<template>
    <div v-loading="!this.$store.state.user.articleFinished">
        <el-row>
            <el-col :lg="24">
                <template v-if="!this.$store.state.user.articleFinished">
                    <div style="height:400px"></div>
                </template>
                <template v-else>
                    <my-article v-for="(item, index) in $store.state.user.articles" :key="index" :post="item" :number="index"></my-article>
                    <div style="height:400px;text-align:center" v-show="showWhenNone">

                        <span v-if="this.$store.state.user.isLogin" style="line-height:300px;color:rgba(0,0,0,0.3)">
                            空空如也...
                            <i style="color:#4e4e4e" class="iconfont icon-cus-xiaoku"></i> ...写点什么吧
                        </span>
                        <span v-else style="line-height:300px;color:rgba(0,0,0,0.3)">
                            请先登录...
                            <i  class="el-icon-remove"></i> ...再写点什么吧
                        </span>
                    </div>
                </template>
            </el-col>
            <el-col :lg="0"></el-col>
        </el-row>
    </div>
</template>

<script>
import MyArticle from "../components/MyArticle";
export default {
    components: {
        MyArticle
    },
    computed: {
        showWhenNone () {
            if (this.$store.state.user.articles.length === 0) {
                return true;
            } else {
                return false;
            }
        }
    }
};
</script>

<style scoped>

</style>
