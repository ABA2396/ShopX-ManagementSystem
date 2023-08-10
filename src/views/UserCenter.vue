<template>
    <div class="personal-center">
        <div class="information">
            <h3>个人信息修改</h3>
            <!-- 采集用户信息表单 -->
            <el-form :model="user" label-width="80px" ref="user" :rules="rules">
                <el-form-item label="姓名" prop="name">
                    <el-input
                        v-model="user.name"
                        placeholder="请输入姓名" 
                        class="short-input"
                    ></el-input>
                </el-form-item>
                <!-- 年龄 -->
                <el-form-item label="年龄" prop="age">
                    <el-input
                        v-model="user.age"
                        placeholder="请输入年龄"
                        class="short-input"
                    ></el-input>
                </el-form-item>
                <!-- 性别 -->
                <el-form-item label="性别" prop="sex">
                    <!-- select选择器 -->
                    <el-select v-model="user.sex" placeholder="请选择性别" class="short-input">
                        <el-option label="男" :value="1"></el-option>
                        <el-option label="女" :value="0"></el-option>
                    </el-select>
                </el-form-item>
                <!-- 地址 -->
                <el-form-item label="地址" prop="addr">
                    <el-input
                        v-model="user.addr"
                        placeholder="请输入地址"
                        class="short-input"
                    ></el-input>
                </el-form-item>
                <!-- 出生日期 -->
                <el-form-item label="出生日期" prop="birth">
                    <el-date-picker
                        v-model="user.birth"
                        type="date"
                        placeholder="选择日期"
                        value-format="yyyy-MM-dd"
                        style="width: 300px;"
                    >
                    </el-date-picker>
                </el-form-item>
                <!-- <form @submit.prevent="updateInformation">

                    <p>姓名：</p>
                    <el-input v-model="user.name" placeholder="form.name" class="short-input"></el-input>

                    <div>
                        <p>性别：</p>
                        <el-select v-model="user.sex" placeholder="请选择性别">
                            <el-option v-for="user in options" :key="user.value" :label="user.label" :value="user.value" />
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
                    </div> -->
                <el-button type="primary" @click="submit()">确认修改</el-button>
                
            </el-form>
        </div>
    </div>
</template>
  
<script>
import { getInfo, editUser } from "../api";
import Cookie from 'js-cookie'

export default {
    data() {
        return {
            //表单校验规则
            rules: {
                name: [
                    { required: true, message: "请输入姓名", trigger: "blur" },
                    {
                        min: 2,
                        max: 8,
                        message: "长度在 2 到 8 个字符",
                        trigger: "blur",
                    },
                ],
                age: [
                    { required: true, message: "请输入年龄", trigger: "blur" },
                ],
                sex: [
                    { required: true, message: "请选择性别", trigger: "blur" },
                ],
                birth: [
                    {
                        required: true,
                        message: "请选择出生日期",
                        trigger: "blur",
                    },
                ],
                addr: [
                    { required: true, message: "请输入地址", trigger: "blur" },
                ],
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

        getUserInfo() {
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
            this.$refs.user.validate((valid) => {
                if (valid) {
                    //通过表单校验
                    //后续对表单数据的处理
                    //修改操作
                    editUser(this.user)
                    .then((res) => {
                        if (res.code !== 200){
                            this.$message({
                                message: "用户修改失败",
                                type: "failed",
                            });
                            return;
                        }
                        this.$message({
                            message: "用户修改成功",
                            type: "success",
                        });
                        //重新获取数据
                        this.getUserInfo();
                    })
                    .catch((error) => {
                        console.error(error);
                        this.$message({
                            message: "服务器错误",
                            type: "error",
                        });
                    });
                }else{
                    console.log(this.user)
                }

            });
        },
    },
    mounted() {
        //打开页面默认获取数据
        this.getUserInfo();
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