<template>

    <el-container>
        <el-main height="800px">
            <el-row>
                <el-col :md="6">&nbsp;</el-col>
                <el-col :md="12" :xs="24">
                     <router-view></router-view>
                </el-col>
                <el-col :md="6">&nbsp;</el-col>
            </el-row>
        </el-main>
    </el-container>

</template>

<script>
export default {
    data () {
        return {
            pathAllowed: [this.$store.state.user.name, "profile", "articles"]
        };
    },
    beforeRouteUpdate (to, from, next) {
        if (this.$store.state.user.isLogin) {
            if (this.pathAllowed.indexOf(to.params.name) !== -1) {
                next();
            } else {
                this.$router.app.$store.commit("OPEN_LOGIN_DIALOG");
                next(false);
            }
        } else {
            this.$router.app.$store.commit("OPEN_LOGIN_DIALOG");
            next("/");
        }
    }
};
</script>

<style scoped>
</style>
