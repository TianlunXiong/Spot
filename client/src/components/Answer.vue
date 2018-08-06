<template>
    <el-card :body-style="{ padding: '12px' }" shadow="never" class="answer-gutter" v-if="aData.type !== 'question'">
        <div slot="header" style="position:relative">
            <img style="height:24px;width:24px;display:inline-block;margin-bottom:-5px" :src="proxy" alt="">
            <span class="normal-text">
                {{aDataFilter.author.name}}
            </span>
            <span class="light-text" v-html="aDataFilter.author.headline">
            </span>

            <el-button :class="!isClose?'el-icon-caret-bottom':'el-icon-caret-left'" style="position:absolute;top:50%;transform:translateY(-50%);right:0px;padding:5px;border:none;background-color:rgba(255,255,255,0.2)" @click="isClose=!isClose">

            </el-button>
        </div>
        <div v-show="isClose" class="slight-text" v-html="aDataFilter.excerpt">

        </div>
        <el-collapse-transition>
            <div v-if="!isClose" v-html="aDataFilter.content">
            </div>
        </el-collapse-transition>
        <div style="text-align:center;">
            <el-button :class="!isClose?'el-icon-caret-top':'el-icon-minus'" style="border:none;padding: 3px 120px;margin-top:10px" @click="isClose=!isClose">

            </el-button>
        </div>
    </el-card>
</template>

<script>
import config from "../config";
export default {
    props: ["aData"],
    data () {
        return {
            isClose: true
        };
    },
    watch: {
        closeSignal () {
            this.isClose = true;
        }
    },
    computed: {
        aDataFilter () {
            return this.aData;
        },
        proxy () {
            return `${config.URL}/api/agent?url=${this.aData.author.avatar_url}`;
        },
        closeSignal () {
            return this.$store.state.search.initialSignal;
        }
    }
};
</script>

<style>
.answer-gutter {
    margin-bottom: 5px;
}
</style>
