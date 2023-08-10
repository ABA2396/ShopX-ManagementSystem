<template>
    <div class="personal-center">
        <div class="information">
            <h3>个人信息修改</h3>
            <!-- 采集用户信息表单 -->
            <el-form :inline="true" :model="form" label-width="80px" ref="form" :rules="rules">
                <form @submit.prevent="updateInformation">

                    <p>姓名：</p>
                    <el-input v-model="user.name" placeholder="form.name" class="short-input"></el-input>

                    <div>
                        <p>性别：</p>
                        <el-select v-model="user.sex" placeholder="请选择性别" >
                            <el-option v-for="user in options" :key="user.value" :label="user.label" :value="user.value"/>
                        </el-select>
                    </div>

                    <p>年龄：</p>
                    <el-input v-model="user.age" placeholder="age" class="short-input"></el-input>

                    <p>地址：</p>
                    <el-input v-model="user.addr" placeholder="addr" class="short-input"></el-input>

                    <p>出生日期：</p>
                    <div class="block">
                        <el-date-picker v-model="user.birth" type="date" placeholder="选择日期" style="margin-bottom: 20px;">
                        </el-date-picker>
                    </div>
                    <el-button type="primary" @click="submit">确认修改</el-button>
                </form>
            </el-form>
        </div>
    </div>
</template>
  
<script>
import { getInfo, addUser } from "../api";
import Cookie from 'js-cookie'

export default {
    data() {
        return {
            //表单校验规则
            rules: {
                name: [
                    {required: true, message: "请输入姓名", trigger: "blur"},
                    {
                        min: 2,
                        max: 4,
                        message: "长度在 2 到 4 个字符",
                        trigger: "blur",
                    },
                ],
                age: [
                    {required: true, message: "请输入年龄", trigger: "blur"},
                ],
                sex: [
                    {required: true, message: "请选择性别", trigger: "blur"},
                ],
                birth: [
                    {
                        required: true,
                        message: "请选择出生日期",
                        trigger: "blur",
                    },
                ],
                addr: [
                    {required: true, message: "请输入地址", trigger: "blur"},
                ],
            },
            //0表示新增的弹框,1表示修改的弹框
            modalType: 0,
            //搜索表单
            searchForm: {
                //搜索关键字
                name: null,
            },
            //表单数据（初始数据）
            user: {
                id: "",
                name: "",
                password: null,
                addr: "",
                sex: "",
                age: "",
                birth: "",
                auth: "",
            },
            options: [{
                value: 1,
                label: '男'
            }, {
                value: 0,
                label: '女'
            }],
        };
    },
    methods: {
        handleEdit(row) {
            this.dialogVisible = true;
            this.modalType = 1;
            //回显当前行的数据到弹框表单
            this.form = JSON.parse(JSON.stringify(row));
        },

        updateInformation() {
            axios.put('/edit', this.user)
                .then(response => {
                    console.log('Updated information:', this.user);
                    // 可以根据后端返回的结果进行处理
                })
                .catch(error => {
                    console.error(error);
                    // 可以进行错误处理
                });
        },

        getList() {
            console.log(Cookie.get("token"));
            getInfo({ token: Cookie.get("token") })
                .then((res) => {
                    console.log(res, "res");
                    this.user = JSON.parse(JSON.stringify(res.data)) //给表格数据赋值
                    console.log(this.user, "user")
                    //给总条数赋值
                })
                .catch(error => {
                    console.error(error);
                    // 可以进行错误处理
                });
        },
        submit() {
            this.$refs.form.validate((valid) => {
                if (valid) {
                    //通过表单校验
                    //后续对表单数据的处理
                    if (this.modalType == 0) {
                        //新增操作
                        addUser(this.form).then(() => {
                            this.$message({
                                message: "用户添加成功",
                                type: "success",
                            });
                            //重新获取数据
                            this.getList();
                        });
                    } else {
                        //修改操作
                        editUser(this.form).then(() => {
                            this.$message({
                                message: "用户修改成功",
                                type: "success",
                            });
                            //重新获取数据
                            this.getList();
                        });
                    }

                    //新增/修改后清空弹框内容并关闭弹框
                    this.handleClose();
                }
            });
            this.$message('修改成功');
        },
    },
    mounted() {
        //打开页面默认获取数据
        this.getList();
    },
}
</script>
  
<style>
form {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
}

label {
    margin-bottom: 5px;
}

.short-input {
    margin-bottom: 5px;
    width: 300px;
}
</style>