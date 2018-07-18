<template>
    <div>
        <el-table :data="tableData" style="width: 100%" v-loading="!$store.state.user.articleFinished">
            <el-table-column prop="title" label="标题" width="180">
            </el-table-column>
            <el-table-column prop="timeStamp" label="时间" width="180">
            </el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button @click="handleEdit(scope.$index,scope.row)">
                        编辑
                    </el-button>
                    <el-button type="danger" @click="handleDelete(scope.$index,scope.row)">
                        删除
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
export default {
    data() {
        return {
            visible2: false
        };
    },
    computed: {
        tableData() {
            return this.$store.state.user.articles;
        }
    },
    created() {
        this.$store.dispatch("user/updateArticleState", false).then(() => {
            this.$store.dispatch("user/getArticle").then(() => {
                console.log("user/getArticle finished");
                setTimeout(() => {
                    this.$store.dispatch("user/updateArticleState", true);
                }, 350);
            });
        });
    },
    methods: {
        updateArticle() {
            this.$store.dispatch("user/updateArticleState", false).then(() => {
                this.$store.dispatch("user/getArticle").then(() => {
                    console.log("user/getArticle finished");
                    setTimeout(() => {
                        this.$store.dispatch("user/updateArticleState", true);
                    }, 350);
                });
            });
        },
        handleEdit(index, row) {
            this.$store.dispatch("editor/saveArticleBuffer", {
                title: row.title,
                content: row.content
            });
            this.$store
                .dispatch("user/userOS", {
                    article: "revise",
                    id: row.id
                })
                .then(() => {
                    this.$router.push({ path: "/creator" });
                });
        },
        handleDelete(index, row) {
            this.$confirm("确定删除此随笔？", "提示", {
                confirtmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
            })
                .then(() => {
                    this.$store
                        .dispatch("user/delete", {
                            username: this.$store.state.user.name,
                            article: {
                                title: row.title,
                                id: row.id
                            }
                        })
                        .then(json => {
                            if (json.state.success) {
                                this.$message({
                                    message: "删除成功",
                                    type: "success"
                                });
                                this.updateArticle();
                            } else {
                                this.$message({
                                    message: "删除失败",
                                    type: "error"
                                });
                            }
                        });
                })
                .catch(() => {});
        }
    }
};
</script>

<style>
</style>
