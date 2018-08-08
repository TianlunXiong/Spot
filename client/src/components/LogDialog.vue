<template>
    <el-dialog :visible ="$store.state.loginDialogVisble"  :fullscreen="full" :width="width"  @close="handlerClose" center>
        <div slot="title">
            <el-badge :value="'点击我快速体验'">
                <el-button type="text" style="font-size:2em;color:gold;border:none;font-style:italic" @click="testLogin" :loading="disableButton" :disabled="disableButton">Spot</el-button>
            </el-badge>
        </div>
        <el-tabs v-model="activeDialog" :stretch="true">
            <el-tab-pane label="登 陆" name="login">
                <el-form :model="ruledForm.login" :rules="rules.login" status-icon ref="logForm" label-width="90px" :label-position="'left'">
                    <el-form-item label="电子邮箱" prop="email">
                        <el-input v-model="ruledForm.login.email"></el-input>
                    </el-form-item>
                    <el-form-item label="密码" prop="password">
                        <el-input v-model="ruledForm.login.password" type="password"></el-input>
                    </el-form-item>
                </el-form>
            </el-tab-pane>
            <el-tab-pane label="注 册" name="register">
                <el-form :model="ruledForm.register" :rules="rules.register" status-icon ref="regForm" label-width="90px" :label-position="'left'">
                    <el-form-item label="电子邮箱" prop="email">
                        <el-input v-model="ruledForm.register.email" placeholder="e-mail is here">
                        </el-input>
                    </el-form-item>
                    <el-form-item label="用户名" prop="username">
                        <el-input v-model="ruledForm.register.username" placeholder="Hey Jude...">
                        </el-input>
                    </el-form-item>
                    <el-form-item label="密码" prop="password">
                        <el-input v-model="ruledForm.register.password" placeholder="password is here" type="password"></el-input>
                    </el-form-item>
                    <el-form-item label="确认密码" prop="passwordC">
                        <el-input v-model="ruledForm.register.passwordC" placeholder="and again" type="password"></el-input>
                    </el-form-item>
                </el-form>
            </el-tab-pane>
        </el-tabs>
        <span slot="footer">
            <el-button @click="resetForm">重 置</el-button>
            <el-button type="primary" @click="submitForm" :loading="disableButton" :disabled="disableButton">提 交</el-button>
        </span>
    </el-dialog>
</template>

<script>
export default {
    data () {
        var emailValidatorLog = (rule, value, callback) => {
            if (
                !new RegExp(/^[0-9A-Za-z]+@[0-9a-zA-Z]{1,10}\.com$/).test(value)
            ) {
                return callback(new Error("请输入正确的电子邮箱"));
            }
            callback();
        };
        var emailValidatorReg = (rule, value, callback) => {
            if (
                !new RegExp(/^[0-9A-Za-z]+@[0-9a-zA-Z]{1,10}\.com$/).test(value)
            ) {
                return callback(new Error("请输入正确的电子邮箱"));
            }
            this.$store
                .dispatch("user/query", {
                    email: value
                })
                .then(json => {
                    if (json.state.email.occupied) {
                        callback(new Error("此邮箱已注册"));
                    } else {
                        callback();
                    }
                });
        };

        var nameValidator = (rule, value, callback) => {
            if (!new RegExp(/^([A-Za-z\u4e00-\u9fa5])[0-9A-Za-z\-_\u4e00-\u9fa5]{0,15}$/).test(value)) {
                return callback(
                    new Error(
                        "字母开头且仅能包含字母,下划线与数字，不超过16个字符"
                    )
                );
            }
            this.$store
                .dispatch("user/query", {
                    username: value
                })
                .then(json => {
                    if (json.state.username.occupied) {
                        callback(new Error("此昵称已占用"));
                    } else {
                        callback();
                    }
                });
        };

        var passwordValidatlor = (rule, value, callback) => {
            if (value.length < 8) {
                return callback(new Error("密码长度必须大于或等于8位"));
            } else {
                if (this.ruledForm.register.passwordC !== "") {
                    this.$refs.regForm.validateField("passwordC");
                }
                callback();
            }
        };

        var passwordCValidator = (rule, value, callback) => {
            if (value.length === 0) {
                return callback(new Error("请再次输入密码"));
            } else if (value !== this.ruledForm.register.password) {
                return callback(new Error("两次输入的密码不一致"));
            } else {
                callback();
            }
        };

        return {
            rules: {
                login: {
                    email: [
                        {
                            validator: emailValidatorLog,
                            trigger: "blur"
                        }
                    ]
                },
                register: {
                    email: [
                        {
                            validator: emailValidatorReg,
                            trigger: "blur"
                        }
                    ],
                    username: [
                        {
                            validator: nameValidator,
                            trigger: "blur"
                        }
                    ],
                    password: [
                        {
                            validator: passwordValidatlor,
                            trigger: "blur"
                        }
                    ],
                    passwordC: [
                        {
                            validator: passwordCValidator,
                            trigger: "blur"
                        }
                    ]
                }
            },
            ruledForm: {
                login: {
                    email: "",
                    password: ""
                },
                register: {
                    email: "",
                    username: "",
                    password: "",
                    passwordC: ""
                }
            },
            activeDialog: "login",
            disableButton: false
        };
    },
    computed: {
        full () {
            return (window.innerWidth <= 768) === true;
        },
        width () {
            return (window.innerWidth <= 768) ? "100%" : "30%";
        }
    },
    methods: {
        handlerClose () {
            this.$store.dispatch("loginDialog", "close");
        },
        testLogin () {
            new Promise((resolve, reject) => {
                this.ruledForm.login.email = "testuser@spot.com";
                this.ruledForm.login.password = 123123123;
                this.activeDialog = "login";
                resolve();
            }).then(() => {
                this.submitForm();
            });
        },
        resetForm () {
            switch (this.activeDialog) {
            case "login":
                this.$refs["logForm"].resetFields();
                break;
            case "register":
                this.$refs["regForm"].resetFields();
                break;
            default:
                break;
            }
        },
        submitForm () {
            switch (this.activeDialog) {
            case "login":
                this.$refs["logForm"].validate(valid => {
                    if (valid) {
                        this.disableButton = true;
                        this.$store
                            .dispatch("user/login", {
                                "e-mail": this.ruledForm.login.email,
                                password: this.ruledForm.login.password
                            })
                            .then(json => {
                                if (json.state.success) {
                                    this.$message({
                                        message: "登陆成功",
                                        type: "success"
                                    });
                                    this.$store.dispatch(
                                        "loginDialog",
                                        "close"
                                    );
                                    this.resetForm();
                                    this.$store.dispatch(
                                        "user/userUpdate",
                                        json.state.user
                                    );
                                    this.$store
                                        .dispatch("user/getArticle")
                                        .then(() => {
                                            setTimeout(() => {
                                                this.$store.dispatch(
                                                    "user/updateArticleState",
                                                    true
                                                );
                                            }, 350);
                                        });
                                } else {
                                    this.$message({
                                        message: "邮箱或密码错误",
                                        type: "error",
                                        duration: 2000
                                    });
                                }
                            })
                            .then(() => {
                                this.disableButton = false;
                            });
                    } else {
                        return false;
                    }
                });
                break;
            case "register":
                this.$refs["regForm"].validate(valid => {
                    if (valid) {
                        this.disableButton = true;
                        this.$store
                            .dispatch("user/register", {
                                "e-mail": this.ruledForm.register.email,
                                username: this.ruledForm.register.username,
                                password: this.ruledForm.register.password
                            })
                            .then(json => {
                                if (json.state.success) {
                                    this.$store.dispatch(
                                        "loginDialog",
                                        "close"
                                    );
                                    this.$message({
                                        message:
                                            "注册成功! 即将为您自动登陆",
                                        type: "success",
                                        duration: 2000
                                    });
                                    setTimeout(() => {
                                        this.$store
                                            .dispatch("user/login", {
                                                "e-mail": this.ruledForm
                                                    .register.email,
                                                password: this.ruledForm
                                                    .register.password
                                            })
                                            .then(json => {
                                                if (json.state.success) {
                                                    this.$message({
                                                        message: "登陆成功",
                                                        type: "success"
                                                    });
                                                    this.$store.dispatch(
                                                        "loginDialog",
                                                        "close"
                                                    );
                                                    this.resetForm();
                                                    this.$store.dispatch(
                                                        "user/userUpdate",
                                                        json.state.user
                                                    );
                                                    this.$store
                                                        .dispatch(
                                                            "getArticle"
                                                        )
                                                        .then(() => {
                                                            setTimeout(
                                                                () => {
                                                                    this.$store.dispatch(
                                                                        "user/updateArticleState",
                                                                        true
                                                                    );
                                                                },
                                                                350
                                                            );
                                                        });
                                                } else {
                                                    this.$message({
                                                        message:
                                                            "自动登陆失败 请手动登陆",
                                                        type: "error",
                                                        duration: 2000
                                                    });
                                                }
                                            });
                                    }, 500);
                                } else {
                                    this.$message({
                                        message: "注册失败",
                                        type: "error",
                                        duration: 2000
                                    });
                                }
                            })
                            .then(() => {
                                this.disableButton = false;
                            });
                    } else {
                        return false;
                    }
                });
                break;
            }
        }
    }
};
</script>

<style>
.el-form-item{
    margin-bottom: 35px;
}
</style>
