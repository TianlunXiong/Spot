<template>
    <el-row style="margin-bottom: 5px">
        <el-col :span="24" class="shadow">
            <el-card :body-style="{ padding: '20px' }" shadow="hover" class="ql-snow">
                <div slot="header" style="position:relative">
                    <span style="font-size:24px;font-weight:700">{{post.title}}</span>
                    <el-button :class="{'el-icon-arrow-left' : isWrapped, 'el-icon-arrow-down':!isWrapped}" style="position:absolute;transform:translateY(-50%);top:50%;right:0;padding:5px;border:none" @click="ShowAll">
                    </el-button>
                </div>
                <div v-html="post.content" class="ql-editor quill-editor ql-containers constrain" :class="{ 'uncover' : !isWrapped }" style="transition: max-height 0.5s ease">
                </div>
                            <div style="text-align:center;">
            <el-button :class="!isWrapped?'el-icon-caret-top':'el-icon-minus'" style="border:none;padding: 3px 120px;margin-top:10px" @click="ShowAll">
            </el-button>
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
            isWrapped: true
        };
    },
    methods: {
        ShowAll () {
            this.isWrapped = !this.isWrapped;
        }
    }
};
</script>

<style scoped>

.ft-title {
    font-size: 1.8em;
}

.constrain{
    max-height: 200px;
    overflow: hidden;
}

.uncover{
    max-height: 5000px;
}

</style>
