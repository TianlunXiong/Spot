<template>
    <el-card :body-style="{ padding: '5px' }" style="margin:20px 2px" shadow="hover" ref="anchorI">
        <div slot="header">
            <span style="color:white;background-color:#409EFF;border-radius:2px">{{type}}</span>
            <a class="href" style="font-weight:bold" v-html="qData.highlight.title"> </a>
            <el-button :loading="isLoading" v-if="addButtonShown" type="text" style="color:rgba(0,0,0,0.5)" @click="getMoreAnswer" title="更多答案" icon="el-icon-plus"></el-button>
            <el-button v-if="!isClose" type="text" style="color:rgba(0,0,0,0.5)" @click="closeMe" title="折叠" icon="el-icon-minus"></el-button>
        </div>
        <div>
            <el-collapse-transition>
                <answer v-if="isClose" :aData="qData.object"></answer>
                <div v-else>
                    <answer v-for="(item, index) in answerList.slice(pageStart, pageEnd)" :key="index" :aData="item"></answer>
                    <el-pagination :total="answerList.length" @prev-click="handlePrev" @next-click="handleNext" @current-change="handleCurrentChange" :page-size="5" :current-page="currentPage" layout="prev, pager, next">
                    </el-pagination>
                </div>
            </el-collapse-transition>
        </div>
    </el-card>
</template>

<script>
import Answer from "./Answer.vue";

export default {
    props: ["qData"],
    data () {
        return {
            isClose: true,
            answerList: [],
            currentPage: 0,
            maxPage: 0,
            isLoading: false,
        };
    },
    watch: {
        qData (newQ, oldQ) {
            this.isClose = true;
            this.answerList = [];
            this.currentPage = 0;
            this.maxPage = 0;
        }
    },
    computed: {
        pageStart () {
            return 5 * (this.currentPage - 1);
        },
        pageEnd () {
            return 5 * this.currentPage;
        },
        addButtonShown () {
            if (this.qData.object.type === "answer") {
                return true;
            } else {
                return false;
            }
        },
        type () {
            switch (this.qData.object.type) {
            case "answer":
                return "答";
            case "article":
                return "专";
            case "question":
                return "问";
            }
        }
    },
    methods: {
        getMoreAnswer () {
            this.isLoading = true;
            this.$store
                .dispatch("search/getAnswer", {
                    questionId: this.qData.object.question.id,
                    offset: 5 * (this.maxPage - 1),
                    limit: 5,
                    sortBy: "default"
                })
                .then(json => {
                    if (json.data.length !== 0) {
                        this.answerList.push(...json.data);
                        this.isClose = false;
                        this.currentPage = ++this.maxPage;
                        this.closeSignal = !this.closeSignal;
                    } else {
                        if (this.currentPage === this.maxPage) {
                            this.$message({
                                message: "没有更多回答了",
                                type: "info"
                            });
                        } else {
                            this.closeSignal = !this.closeSignal;
                            this.isClose = false;
                            this.currentPage = this.maxPage;
                        }
                    }
                    this.$store.dispatch("search/emitInitialSignal");
                })
                .then(() => {
                    this.isLoading = false;
                })
                .catch(e =>{
                    this.isLoading = false;
                })
        },

        handlePrev (curr) {
            this.$store.dispatch("search/emitInitialSignal");
            this.currentPage = curr;
        },
        handleNext (curr) {
            this.$store.dispatch("search/emitInitialSignal");
            this.currentPage = curr;
        },
        handleCurrentChange (curr) {
            this.$store.dispatch("search/emitInitialSignal");
            this.currentPage = curr;
        },
        closeMe () {
            this.isClose = true;
            this.currentPage = 0;
        },
        toAnchorI () {
            const p = this.$refs["anchorI"].getBoundingClientRect().y + document.documentElement.scrollTop
            console.log(p)
        }
    },
    components: {
        Answer
    }
};
</script>

<style lang="css" >
.href {
    cursor: pointer;
    color: black;
    text-decoration: none;
}
.href:hover{
    color: #409eff;
}

.href > em{
        color: #f38181;
        font-style: normal;
}

.slight-text {
    color: rgba(#000, 0.6);
}

.normal-text {
    font-weight: bold;
}

.light-text {
    color: rgba(#000, 0.3);
}

img {
    width: 100%;
    max-width: 950px;
}
</style>
