<template>
    <div ref="anchorA">
        <el-card :body-style="{ padding: '12px' }" shadow="never" class="answer-gutter" v-if="aData.type !== 'question'">
            <div slot="header" style="position:relative">
                <img style="height:24px;width:24px;display:inline-block;margin-bottom:-5px" :src="proxy" alt="">
                <span class="normal-text">
                    {{aData.author.name}}
                </span>
                <span class="light-text" v-html="aData.author.headline"></span>
                <el-button :class="!isClose?'el-icon-caret-bottom':'el-icon-caret-left'" style="position:absolute;top:50%;transform:translateY(-50%);right:0px;padding:5px;border:none;background-color:rgba(255,255,255,0.2)" @click="isClose=!isClose"></el-button>
            </div>
            <el-collapse-transition>
                <div v-show="isClose" class="slight-text" v-html="aData.excerpt">

                </div>
            </el-collapse-transition>

            <el-collapse-transition>
                <div v-show="!isClose" v-html="aData.content">
                </div>
            </el-collapse-transition>
            <div style="text-align:center;" ref="anchorC" >
                <el-row>
                    <el-col :span="6" style="text-align:left">
                        <span  style="color:rgba(0,0,0,0.3);font-size:14px;display:inline-block;margin-top:10px;">发表于{{ago}}</span>
                    </el-col>
                    <el-col :span="8">
                        <el-button :class="!isClose?'el-icon-caret-top':'el-icon-minus'" style="border:none;padding: 5px 20px;margin-top:10px" @click="isClose=!isClose" title="点我展开">
                        </el-button>
                    </el-col>
                    <el-col :span="10" style="text-align:right" >
                        <div>
                        <el-button type="text" style="color:gold;border:none;padding:5px 0px;margin-top:10px" icon="el-icon-check">
                            <em>赞成{{aData.voteup_count}}</em>
                        </el-button>
                        <el-button v-if="aData.comment_count !== 0" :loading="commentLoading" style="color:gold;border:none;padding:5px 0px;margin-top:10px" :icon="commentClosed?'':'el-icon-close'" @click="toggleComment">
                            {{ commentClosed? aData.comment_count+"条评论" : "收起评论" }}
                        </el-button>
                        <el-dropdown size="mini" placement="bottom-start" trigger="click" @command="handleCommand" style="margin-left:10px">
                            <el-button type="text">
                                <i class="el-icon-more" style="color:rgba(0,0,0,0.3)"></i>
                            </el-button>
                            <el-dropdown-menu slot="dropdown">
                                <el-dropdown-item command="1">默认排序</el-dropdown-item>
                                <el-dropdown-item command="2">时间排序</el-dropdown-item>
                            </el-dropdown-menu>
                        </el-dropdown>
                        </div>
                    </el-col>
                </el-row>
            </div>
        </el-card>
        <transition name="el-zoom-in-top">
            <div class="comment-style" v-show="!commentClosed" v-loading="commentLoading" >
                <el-row>
                    <el-col :span="24">
                        <div style="padding: 5px" >
                            共 {{aData.comment_count}} 条评论
                        </div >
                        <comment class="comment-item" v-for="(item, index) in comment" :key="index" :cData="item" ></comment>
                        <el-pagination
                            @current-change="currentChange"
                            @next-click="handleNext"
                            @prev-click="handlePrev"
                            :current-page="pagination.currentPage"
                            :page-size="10"
                            layout="prev, pager, next"
                            :total="aData.comment_count"
                            background
                            small>
                        </el-pagination>
                    </el-col>
                </el-row>
            </div>
        </transition>
    </div>
</template>

<script>
import Comment from "./Comment";
import config from "../config";
export default {
    props: ["aData"],
    data () {
        return {
            isClose: true,
            comment: [],
            commentOrder: "",
            commentClosed: true,
            pagination: {
                currentPage: 0
            },
            commentLoading: false
        };
    },
    watch: {
        closeSignal () {
            this.reset();
        }
    },
    computed: {
        proxy () {
            return `${config.URL}/api/agent?url=${this.aData.author.avatar_url}`;
        },
        closeSignal () {
            return this.$store.state.search.initialSignal;
        },
        ago () {
            const delta = ((Date.now() / 1000 - this.aData.updated_time) / 3600).toFixed(0); // hours
            if (delta < 24) {
                return `${delta}小时前`;
            } else {
                const day = (delta / 24).toFixed(0);
                if (day < 30) {
                    return `${day}天前`;
                } else {
                    return `${new Date(this.aData.updated_time * 1000).toLocaleDateString()}`;
                }
            }
        }
    },
    methods: {
        toggleComment () {
            if (this.pagination.currentPage === 0) {
                this.pagination.currentPage = 1;
                this.getComment().then(() => {
                    this.commentClosed = false;
                }).then(()=>{
                    this.toAnchorC()
                })
            } else {
                this.commentClosed = !this.commentClosed;
                if(!this.commentClosed) {
                    this.$nextTick(()=>{
                        this.toAnchorC()
                    })
                } else {
                    this.$nextTick(()=>{
                        this.toAnchorA()
                    })  
                }
            }
        },
        openComment () {
            if (this.pagination.currentPage === 0) {
                this.pagination.currentPage = 1;
                this.getComment().then(() => {
                    this.commentClosed = false;
                }).then(()=>{
                    this.toAnchorC()
                })
            } else {
                this.commentClosed = false;
                this.$nextTick(()=>{
                    this.toAnchorC()
                })
            }
        },
        toAnchorC () {
            const p = this.$refs["anchorC"].getBoundingClientRect().top + window.pageYOffset
            this.$store.dispatch("scrollTo", {
                v: 115,
                p
            })
        },
        toAnchorA () {
            const p = this.$refs["anchorA"].getBoundingClientRect().top + window.pageYOffset
            this.$store.dispatch("scrollTo", {
                v: 115,
                p
            })
        },
        reset () {
            this.isClose = true;
            this.comment = [];
            this.commentClosed = true;
            Object.assign(this.pagination, {
                currentPage: 0
            });
            this.commentLoading = false;
        },
        getComment () {
            this.commentLoading = true;
            return this.$store.dispatch("search/getComment", {
                answerId: this.aData.id,
                type: this.aData.type,
                offset: 10 * (this.pagination.currentPage - 1),
                limit: 10,
                order: this.commentOrder || (this.commentOrder = "normal")
            }).then(json => {
                this.comment = json.data;
                this.commentLoading = false;
                this.$nextTick(()=>{
                    this.toAnchorC()
                })
            }).catch(e => {
                this.$message({
                    message: "网络或服务器错误",
                    type: "error"
                });
                this.commentLoading = false;
            });
        },
        currentChange (curr) {
            this.pagination.currentPage = curr;
            this.getComment();
        },
        handleNext (curr) {
            this.pagination.currentPage = curr;
            this.getComment();
        },
        handlePrev (curr) {
            this.pagination.currentChange = curr;
            this.getComment();
        },
        handleCommand (curr) {
            if (this.aData.comment_count !== 0) {
                switch (curr) {
                case "1":
                    if (this.commentOrder !== "normal") {
                        this.commentOrder = "normal";
                        this.getComment().then(() => {
                            this.openComment();
                        });
                    }
                    break;
                case "2":
                    if (this.commentOrder !== "reverse") {
                        this.commentOrder = "reverse";
                        this.getComment().then(() => {
                            this.openComment();
                        });
                    }
                    break;
                default:
                    break;
                }
                this.openComment();
            } else {
                this.$message({
                    message: "还没有评论哦",
                    tyep: "info"
                });
            }
        }
    },
    components: {
        Comment
    }
};
</script>

<style>

.comment-style{
    margin: 2px 0px;
}
.comment-item{
    margin: 2px 0px;
}
</style>
