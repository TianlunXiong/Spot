<template>
    <div>
        <el-row>
            <!-- 1920 1200 992 768 -->
            <el-col :xl="3" :lg="5" :md="6" :sm="10" :xs="24">
                <el-card :body-style="{ padding: '0px' }">
                    <div>
                        <img style="width:100%;display:block" src="http://element.eleme.io/static/hamburger.50e4091.png" alt="">
                    </div>
                    <div style="text-align:center">
                        <span style="font-size:1.2em;line-height:40px">{{$store.state.user.name}}</span>
                        <el-button icon="el-icon-edit" circle></el-button>
                    </div>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>

<script>
export default {
    methods: {
        editName() {}
    }
};
</script>

<style>
</style>
