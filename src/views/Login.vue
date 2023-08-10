<template>
    <!-- <h1>我是登录页</h1> -->
    <el-form
        ref="form"
        :inline="true"
        :model="form"
        label-width="70px"
        class="login-container"
        :rules="rules"
    >
        <h3 class="login_title">系统登录</h3>
        <el-form-item label="用户名" prop="username">
            <el-input
                v-model="form.username"
                placeholder="请输入用户名"
            ></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
            <el-input
                v-model="form.password"
                placeholder="请输入密码"
                show-password
            ></el-input>
        </el-form-item>
        <el-form-item>
            <el-button
                type="primary"
                @click="onSubmit"
                style="margin-left: 105px;margin-top: 10px;"
            >登录
            </el-button>
        </el-form-item>
    </el-form>
</template>

<script>
import {login, getInfo} from '../api'
import Cookie from 'js-cookie'

export default {
    data() {
        return {
            //登录表单数据
            form: {
                username: '',
                password: '',
            },
            //表单校验规则
            rules: {
                username: [
                    {required: true, message: "请输入用户名", trigger: "blur"},
                ],
                password: [
                    {required: true, message: "请输入密码", trigger: "blur"},
                ],
            },
        };
    },
    methods: {
        //提交登录
        onSubmit() {
            //确认所有表单项是否都已经通过
            this.$refs.form.validate((valid) => {
                if (valid) {
                    //可以进行登录请求
                    login(this.form).then((res) => {
                        console.log(res)
                        //判断登录结果
                        if (res.code == 200) {
                            //登录成功,继续后续操作
                            //将用户登录的token信息存入cookie中
                            Cookie.set("token", res.data)
                            //发送第二次请求,获取登录用户的信息
                            getInfo({token: Cookie.get("token")}).then((res) => {
                                console.log(res, "getInfo")
                                //调用mutations方法,更新该用户的权限菜单
                                this.$store.commit('checkMenu', res.data.auth)
                            })

                            //跳转到后台首页
                            this.$router.push("/home")
                        } else {
                            //登录失败
                            this.$message.error(res.message);
                        }

                    })
                }
            })
        },
    }
};
</script>

<style lang="less" scoped>
.login-container {
    width: 350px;
    border: 1px solid #eaeaea;
    margin: 180px auto;
    padding: 35px 35px 15px 35px;
    background-color: #fff;
    border-radius: 15px;
    box-shadow: 0 0 25px #cac6c6;
    box-sizing: border-box;

    .login_title {
        text-align: center;
        margin-bottom: 40px;
        color: #505458;
    }

    .el-input {
        width: 198px;
    }
}
</style>