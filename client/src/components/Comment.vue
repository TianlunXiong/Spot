<template>
    <el-card :body-style="{ padding: '0px' }">
        <!-- card body -->
        <div style="margin:10px">
            <div>
                <img style="height:24px;width:24px;margin-bottom:-6px" :src="proxy" alt="">
                <span>{{cData.author.member.name}}</span>
                <span style="color:rgba(0,0,0,0.3);float:right;padding:2px 4px">{{ago}}</span>
            </div>
        </div>
        <div v-html="cData.content" style="padding:0 10px">

        </div>
        <div style="padding: 0 10px;margin: 5px 0px;color:rgba(0,0,0,0.3)">
            <i class="el-icon-check" style="color:gold"></i> {{cData.vote_count||""}}
        </div>
    </el-card>
</template>

<script>
import config from "../config";
export default {
    props: [
        "cData"
    ],
    computed: {
        proxy () {
            return `${config.URL}/api/agent?url=${this.cData.author.member.avatar_url_template.replace(/\{size\}/, "s")}`;
        },
        ago () {
            const delta = ((Date.now() / 1000 - this.cData.created_time) / 3600).toFixed(0); // hours
            if (delta < 24) {
                return `${delta}小时前`;
            } else {
                const day = (delta / 24).toFixed(0);
                if (day < 31) {
                    return `${day}天前`;
                } else if (day > 31 && day < 365) {
                    return `${(day / 30).toFixed(0)}个月前`;
                } else {
                    return `${(day / 365).toFixed(0)}年前`;
                }
            }
        }
    }
};
</script>

<style>

</style>
