<template>

    <el-container>
        <el-main height="800px">
            <!-- Main content -->
            <router-view></router-view>
        </el-main>
    </el-container>

</template>

<script>
export default {
    data() {
        return {
            pathAllowed: [this.$store.state.user.name, "profile", "articles"]
        };
    },
    methods: {},
    beforeRouteEnter(to, from, next) {
        next();
    },
    beforeRouteUpdate(to, from, next) {
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

<style lang="scss" scoped>
</style>

