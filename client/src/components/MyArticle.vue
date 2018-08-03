<template>
    <el-row style="margin-bottom: 5px">
        <el-col :span="24" class="shadow">
            <el-card :body-style="{ padding: '20px' }" shadow="hover" class="ql-snow">
                <div slot="header">
                    <span style="font-size:24px;font-weight:700">{{post.title}}</span>
                    <el-button :class="{'el-icon-arrow-left' : isWrapped, 'el-icon-arrow-down':!isWrapped}" style="float:right;padding:5px 20px;border:none" @click="readMe">
                    </el-button>
                </div>
                <div v-html="post.content" class="ql-editor quill-editor ql-containers  ft-body" style="min-height:200px;word-break:break-all" :class="{contentWrapped: isWrapped}">
                </div>
            </el-card>
        </el-col>
    </el-row>
</template>

<script>
export default {
    props: ["post", "number"],
    data () {
        return {
            isUserCollection: false,
            isCommentsShow: false,
            isWrapped: true
        };
    },
    computed: {
        starIcon () {
            return this.isUserCollection
                ? "el-icon-star-on"
                : "el-icon-star-off";
        }
    },
    methods: {
        readMe () {
            this.isWrapped = !this.isWrapped;
        }
    }
};
</script>

<style scoped>

.ft-title {
    font-size: 1.8em;
}

.ft-body {
    font-size: 1.4em;
    overflow: hidden;
}
div img {
    height: 40px;
    width: 40px;
    border-radius: 20px;
}

.contentWrapped {
    max-height: 200px;
    overflow: hidden;
}

</style>
