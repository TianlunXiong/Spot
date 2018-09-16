<template>
    <div>
        <el-row>
            <el-col :md="4">
            <span>&nbsp;</span>
            </el-col>
            <el-col :span="24" :md="16">
                <el-input v-model="title" placeholder="自此输入标题" @change="autoSaveTitle($event)" clearable style="margin-bottom:20px"></el-input>
            </el-col>
            <el-col :md="4">
            <span>&nbsp;</span>
            </el-col>
        </el-row>

        <el-row>
            <el-col :md="4">
            <span>&nbsp;</span>
            </el-col>
            <el-col :span="24" :md="16">
                <quill-editor v-loading="uploading" v-model="content" ref="Editor" @change="autoSaveContent($event)" :options="editorOption"></quill-editor>
                <div v-show="false">
                    <form>
                        <input type="file" id="uploader">
                        <input type="reset" id="reseter">
                    </form>
                </div>
            </el-col>
            <el-col :md="4">
                <span>&nbsp;</span>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="24">
                <div class="submit-bar">
                    <el-button type="primary" @click="handleUpdate">{{operation}}</el-button>
                    <el-button type="danger" @click="handleCancel" v-show="showCancelButton()">
                        取消修改
                    </el-button><br><br>
                    <span style="color:rgba(0,0,0,0.5)">已 {{textLength}} 字</span>
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import config from "../config/";
import postData from "../util/postData";

const tools = [
    [{"header": [1, 2, 3, 4, 5, 6, false]}],
    ["bold", "italic", "underline", "strike"],
    ["blockquote", "code-block"],
    [{ "color": [] }, { "background": [] }],
    [{ "align": [] }],
    [{ "font": [] }],
    ["clean"],
    ["link", "image"]];

export default {
    data () {
        const self = this;
        return {
            title: "",
            content: "",
            uploading: false,
            editorOption: {
                placeholder: "自此输入内容",
                modules: {
                    toolbar: {
                        container: tools,
                        handlers: {
                            "image": function (value) {
                                if (self.$store.state.user.isLogin) {
                                    const fileInput = document.getElementById("uploader");
                                    if (value) {
                                        fileInput.click();
                                    } else {
                                        this.quill.format("image", false);
                                    }
                                } else {
                                    self.$message({
                                        message: "登陆后才能加入图片噢",
                                        type: "info"
                                    });
                                }
                            }
                        }
                    }
                }
            },
            text: "",
            offset: 0,
            temp: 0
        };
    },
    created () {
        this.title = this.$store.state.editor.articleBuffer.title;
        this.content = this.$store.state.editor.articleBuffer.content;
    },
    mounted () {
        const fileInput = document.getElementById("uploader");
        const reseter = document.getElementById("reseter");
        fileInput.onchange = e => {
            const file = fileInput.files[0];
            this.uploading = true;
            postData(`${config.URL}/upload`, file, {
                "Content-Type": file.type
            }).then(r => {
                this.uploading = false;
                if (r.success) {
                    let quill = this.$refs.Editor.quill;
                    quill.focus();
                    const length = quill.getSelection().index;
                    quill.insertEmbed(length, "image", `${config.URL}/${r.state.path}`);
                    quill.setSelection(length + 1);
                    reseter.click();
                } else {
                    switch (r.state.reason) {
                    case "invalid":
                        this.$message({
                            message: "请重新登陆",
                            type: "info"
                        });
                        break;
                    case "noLogin":
                        this.$message({
                            message: "请登陆",
                            type: "info"
                        });
                        break;
                    }
                }
            }).catch(e => {
                this.$message({
                    message: "网络或服务器错误",
                    type: "error"
                });
                this.uploading = false;
                reseter.click();
            });
        };
    },
    computed: {
        textLength () {
            return this.text.length - this.offset;
        },
        operation () {
            switch (this.$store.state.user.operation.article) {
            case "new":
                return "发布新随笔";
            case "revise":
                return "提交修改";
            }
        }
    },
    methods: {
        autoSaveContent ({ quill, html, text }) {
            this.text = text;
            this.offset = 1;
            this.$store.dispatch("editor/saveArticleBuffer", {
                content: html
            });
        },
        autoSaveTitle (e) {
            this.title = e;
            this.$store.dispatch("editor/saveArticleBuffer", {
                title: e
            });
        },
        handleUpdate () {
            if (this.$store.state.user.isLogin) {
                this.$message({
                    message: "正在上传",
                    type: "info",
                    center: true
                });
                switch (this.$store.state.user.operation.article) {
                case "new":
                    this.post();
                    break;
                case "revise":
                    this.update();
                    break;
                }
            } else {
                this.$message({
                    message: "请登陆后再发布",
                    type: "warning",
                    center: true,
                    duration: 1000
                });
            }
        },
        post () {
            this.$store
                .dispatch("user/posj", {
                    username: this.$store.state.user.name,
                    type: "articles",
                    articles: {
                        title: this.title,
                        content: this.content
                    }
                })
                .then(r => {
                    if (r.state.success) {
                        this.$message({
                            message: "发布成功",
                            type: "success",
                            center: true
                        })
                        this.handleCancel()
                        this.$router.replace({ path: "/" })
                    } else {
                        this.$message({
                            message: "发布失败",
                            type: "error",
                            center: true
                        })
                    }
                })
                .catch(e => {
                    this.$message({
                        message: "网络或服务器错误",
                        type: "error"
                    });
                });
        },
        update () {
            this.$store
                .dispatch("user/update", {
                    username: this.$store.state.user.name,
                    type: 'articles',
                    articles: {
                        id: this.$store.state.user.operation.id,
                        title: this.title,
                        content: this.content
                    }
                })
                .then(r => {
                    if (r.state.success) {
                        this.$message({
                            message: "修改成功",
                            type: "success",
                            center: true
                        });
                        this.handleCancel();
                    } else {
                        this.$message({
                            message: "修改失败",
                            type: "error",
                            center: true
                        });
                    }
                })
                .catch(e => {
                    this.$message({
                        message: "网络或服务器错误",
                        type: "error"
                    });
                });
        },
        showCancelButton () {
            switch (this.$store.state.user.operation.article) {
            case "new":
                return false;
            case "revise":
                return true;
            }
        },
        handleCancel () {
            this.$store
                .dispatch("user/userOS", {
                    article: "new",
                    id: ""
                })
                .then(() => {
                });
            this.title = "";
            this.content = "";
            this.$store.dispatch("editor/resetArticleBuffer").then(() => {
                this.$router.go(-1);
            });
        }
    }
};
</script>

<style>
.submit-bar {
    margin-top: 15px;
    text-align: center;
}
.alert-bar {
    text-align: right;
}

.ql-container{
    min-height:300px;
}
</style>
