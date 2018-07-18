<template>
    <el-card :body-style="{ padding: '12px' }" shadow="never" class="answer-gutter" v-if="aData.type !== 'question'">
        <div slot="header" style="">
            <img style="height:24px;width:24px;display:inline-block;margin-bottom:-5px" :src="proxy(aDataFilter.author.avatar_url)" alt="">
            <span class="normal-text">
                {{aDataFilter.author.name}}
            </span>
            <span class="light-text">
                {{aDataFilter.author.headline}}
            </span>

            <el-button :class="!isClose?'el-icon-arrow-down':'el-icon-arrow-left'" style="float:right;padding:3px;border:none" @click="isClose=!isClose">

            </el-button>
        </div>
        <div v-show="isClose" class="slight-text" v-html="aDataFilter.excerpt">

        </div>
        <el-collapse-transition>
            <div v-if="!isClose" v-html="aDataFilter.content">
            </div>
        </el-collapse-transition>
        <div style="text-align:center">
            <el-button :class="!isClose?'el-icon-arrow-up':'el-icon-arrow-down'" style="border:none;padding: 3px 30px" @click="isClose=!isClose">

            </el-button>
        </div>
    </el-card>
</template>

<script>
import config from '../config'
export default {
    props: ["aData"],
    data() {
        return {
            isClose: true
        };
    },
    computed: {
        aDataFilter(){
                return this.aData;
        }
    },
    methods: {
        proxy(url) {
            return `${config.URL}/api/agent?url=${url}`;
        }
    }
};
</script>

<style>
    .answer-gutter{
        margin-bottom: 5px;
    }
</style>
