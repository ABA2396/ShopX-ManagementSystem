<template>
    <!-- <h1>我是登录页</h1> -->
    <div class="manage">
        <el-dialog
            title="注册用户"
            :visible.sync="dialogVisible"
            width="40%"
            :before-close="handleClose"
        >
            <!-- <span>这是一段信息</span> -->
            <!-- 采集用户信息表单 -->
            <el-form
                :inline="true"
                :model="form"
                class="demo-form-inline"
                label-width="80px"
                ref="form"
                :rules="rules"
            >
                <!-- 姓名 -->
                <el-form-item label="姓名" prop="username">
                    <el-input
                        v-model="form.username"
                        placeholder="请输入姓名"
                    />
                </el-form-item>
                <!-- 年龄 -->
                <el-form-item label="密码" prop="password">
                    <el-input
                        v-model="form.password"
                        placeholder="请输入密码"
                    />
                </el-form-item>
            </el-form>

            <span slot="footer" class="dialog-footer">
                    <el-button @click="cancel">取 消</el-button>
                    <el-button type="primary" @click="submit">确 定</el-button>
            </span>
        </el-dialog>
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
            <el-form-item style="margin-left: 70px;margin-top: 10px;">
                <el-button type="primary" @click="handleAdd">注册</el-button>
                <el-button type="primary" @click="onSubmit">登录</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import {login, getInfo, addUser} from '@/api'
import Cookie from 'js-cookie'

export default {
    data() {
        return {
            dialogVisible: false,
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
        handleAdd() {
            this.dialogVisible = true;
        },
        //关闭弹框
        handleClose() {
            //关闭弹框前,清空弹框数据
            this.$refs.form.resetFields();
            this.form = this.$options.data().form;//让表单赋予定义时的初始值
            //关闭弹框
            this.dialogVisible = false;
        },
        //点击取消按钮
        cancel() {
            this.handleClose();
        },
        //提交表单
        submit() {
            //使用form的validate方法,确认所有的表单项是否都通过
            this.$refs.form.validate((valid) => {
                if (valid) {
                    //通过表单校验
                    //新增操作
                    addUser({name: this.form.username, password: this.form.password}).then(() => {
                        this.$message({
                            message: "用户注册成功",
                            type: "success",
                        });

                    });

                    //新增后清空弹框内容并关闭弹框
                    this.handleClose();
                }
            });
        },
        //提交登录
        onSubmit() {
            //确认所有表单项是否都已经通过
            this.$refs.form.validate((valid) => {
                if (valid) {
                    //可以进行登录请求
                    login(this.form).then((res) => {
                        console.log(res)
                        console.log(res.code)
                        //判断登录结果
                        if (res.code === 200) {
                            //登录成功,继续后续操作
                            //将用户登录的token信息存入cookie中
                            Cookie.set("token", res.data)
                            //发送第二次请求,获取登录用户的信息
                            getInfo({token: Cookie.get("token")}).then((res) => {
                                console.log(res, "getInfo")
                                //调用mutations方法,更新该用户的权限菜单
                                this.$store.commit('checkMenu', res.data.auth)
                            })
                            this.form.password = '';
                            this.form.username = '';
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