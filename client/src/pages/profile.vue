<template>
    <div>
        <el-row>
            <!-- 1920 1200 992 768 -->
            <el-col :span="24">
                <el-card :body-style="{ padding: '0px'}">
                    <img style="width:100%;height:100%;display:block" src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1533570184765&di=4d0f1022f9dfc63418f8a02450b1e9c8&imgtype=0&src=http%3A%2F%2Fi-7.vcimg.com%2Ftrim%2F7639d68bc605960772ef22522d2ab7d9234531%2Ftrim.jpg" alt="">
                    <div style="text-align:center;position:relative">
                        <span style="font-size:1.2em;line-height:40px">{{$store.state.user.name}}</span>
                        <img @click="github" src="../assets/github.svg" style="cursor:pointer; position:absolute;right:0;top:50%;transform:translateY(-50%);display:inline-block;width:30px">
                    </div>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>

<script>
export default {
    methods: {
        github () {
            window.open("https://www.github.com/TianlunXiong");
        }
    }
};
</script>

<style>
</style>
