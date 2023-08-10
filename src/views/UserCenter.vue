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
                    <el-button type="primary" @click="open1">确认修改</el-button>
                </form>
            </el-form>
        </div>
    </div>
</template>
  
<script>
import { getInfo } from "../api";
import Cookie from 'js-cookie'

export default {
    data() {
        return {
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
                value: 2,
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
        open1() {
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