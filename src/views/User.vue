<template>
    <!-- <h1>我是user</h1> -->
    <div class="manage">
        <!-- 新增 弹出框 -->
        <el-dialog
            title="新增用户"
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
                <el-form-item label="姓名" prop="name">
                    <el-input
                        v-model="form.name"
                        placeholder="请输入姓名"
                    ></el-input>
                </el-form-item>
                <!-- 年龄 -->
                <el-form-item label="年龄" prop="age">
                    <el-input
                        v-model="form.age"
                        placeholder="请输入年龄"
                    ></el-input>
                </el-form-item>
                <!-- 性别 -->
                <el-form-item label="性别" prop="sex">
                    <!-- select选择器 -->
                    <el-select v-model="form.sex" placeholder="请选择性别">
                        <el-option label="男" :value="1"></el-option>
                        <el-option label="女" :value="0"></el-option>
                    </el-select>
                </el-form-item>
                <!-- 出生日期 -->
                <el-form-item label="出生日期" prop="birth">
                    <el-date-picker
                        v-model="form.birth"
                        type="date"
                        placeholder="选择日期"
                        value-format="yyyy-MM-dd"
                    >
                    </el-date-picker>
                </el-form-item>
                <!-- 地址 -->
                <el-form-item label="地址" prop="addr">
                    <el-input
                        v-model="form.addr"
                        placeholder="请输入地址"
                    ></el-input>
                </el-form-item>
            </el-form>

            <span slot="footer" class="dialog-footer">
                <el-button @click="cancel">取 消</el-button>
                <el-button type="primary" @click="submit">确 定</el-button>
            </span>
        </el-dialog>

        <div class="manage-header">
            <!-- 新增按钮 -->
            <el-button @click="handleAdd" type="primary">+新增</el-button>
            <!-- form搜索表单 -->
            <el-form :inline="true" :model="searchForm">
                <el-form-item>
                    <el-input placeholder="请输入名称" v-model="searchForm.name"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="search">查询</el-button>
                </el-form-item>
            </el-form>
        </div>

        <div class="common-table">
            <!-- 表格数据展示 -->
            <el-table :data="tableData" stripe style="width: 100%">
                <el-table-column prop="name" label="姓名"></el-table-column>
                <el-table-column prop="sex" label="性别">
                    <template slot-scope="scope">
                        <span>{{ scope.row.sex == 1 ? "男" : "女" }}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="age" label="年龄"></el-table-column>
                <el-table-column
                    prop="birth"
                    label="出生日期"
                ></el-table-column>
                <el-table-column prop="addr" label="地址"></el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button size="mini" @click="handleEdit(scope.row)"
                        >编辑
                        </el-button
                        >
                        <el-button
                            type="danger"
                            @click="handleDelete(scope.row)"
                            size="mini"
                        >删除
                        </el-button
                        >
                    </template>
                </el-table-column>
            </el-table>
            <!-- 分页 -->
            <div class="pager">
                <el-pagination
                    background
                    layout="prev, pager, next"
                    :total="total"
                    @current-change="handlePage"
                >
                </el-pagination>
            </div>
        </div>
    </div>
</template>

<script>
import {getUsers, addUser, editUser, delUser} from "../api";

export default {
    data() {
        return {
            //新增弹框默认隐藏
            dialogVisible: false,
            //表单数据（初始数据）
            form: {
                id: "",
                name: "",
                password: null,
                addr: "",
                sex: "",
                age: "",
                birth: "",
                auth: "",
            },
            //表格数据
            tableData: [],
            //总条数
            total: 0,
            //分页数据
            pageData: {
                pageNo: 1,
                pageSize: 10,
            },
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
        };
    },
    methods: {
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
        },
        //点击编辑按钮
        handleEdit(row) {
            this.dialogVisible = true;
            this.modalType = 1;
            //回显当前行的数据到弹框表单
            this.form = JSON.parse(JSON.stringify(row));
        },
        //点击删除按钮
        handleDelete(row) {
            this.$confirm("确定要删除该用户吗?", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning",
            })
                .then(() => {
                    //确定删除
                    //调用接口方法删除用户
                    delUser({id: row.id}).then(() => {
                        this.$message({
                            type: "success",
                            message: "删除成功!",
                        });
                        //重新获取数据
                        this.getList();
                    });
                })
                .catch(() => {
                    //取消删除
                    this.$message({
                        type: "info",
                        message: "已取消删除",
                    });
                });
        },
        //获取用户列表数据
        getList() {
            getUsers({...this.pageData, ...this.searchForm}).then((res) => {
                //console.log(res);
                this.tableData = res.data.records; //给表格数据赋值
                this.total = res.data.total; //给总条数赋值
            });
        },
        //选择页码的回调函数
        handlePage(val) {
            //console.log(val)
            //修改当前的页码
            this.pageData.pageNo = val;
            //调用getList方法重新发送请求获取最新数据
            this.getList();
        },
        //点击新增按钮
        handleAdd() {
            this.dialogVisible = true;
            this.modalType = 0;
        },
        //搜索
        search() {
            this.pageData.pageNo = 1
            this.getList()
        },
    },
    mounted() {
        //打开页面默认获取数据
        this.getList();
    },
};
</script>

<style lang="less" scoped>
.manage {
    height: 90%;

    .common-table {
        position: relative;
        height: calc(100% - 62px);

        .pager {
            position: absolute;
            bottom: 0;
            right: 20px;
        }
    }

    .manage-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
}
</style>