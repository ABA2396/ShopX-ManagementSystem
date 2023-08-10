<template>
    <div class="manage">
        <!-- 新增 弹出框 -->
        <el-dialog
            title="新增商品"
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
                <!-- 商品名称 -->
                <el-form-item label="商品名称" prop="name">
                    <el-input
                        v-model="form.name"
                        placeholder="请输入商品名称"
                    ></el-input>
                </el-form-item>
                <!-- 价格 -->
                <el-form-item label="价格" prop="cost">
                    <el-input-number v-model="form.cost" @change="handleChange" :min="0" placeholder="请输入价格"></el-input-number>
                </el-form-item>
                <!-- 数量 -->
                <el-form-item label="数量" prop="num">
                    <el-input-number v-model="form.num" @change="handleChange" :min="0" placeholder="请输入价格"></el-input-number>
                </el-form-item>
            </el-form>

            <span slot="footer" class="dialog-footer">
                <el-button @click="cancel">取 消</el-button>
                <el-button type="primary" @click="submit">确 定</el-button>
            </span>
        </el-dialog>
        <!-- 抬头功能结束 -->
        <div class="manage-header">
            <!-- 新增按钮 -->
            <el-button @click="handleAdd" type="primary">+新增</el-button>
            <!-- form搜索表单 -->
            <el-form :inline="true" :model="searchForm">
                <el-form-item>
                    <el-input placeholder="请输入商品名称" v-model="searchForm.name"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="search">查询</el-button>
                </el-form-item>
            </el-form>
        </div>

        <div class="common-table">
            <!-- 表格数据展示 -->
            <el-table :data="tableData" stripe style="width: 100%">
                <el-table-column prop="name" label="商品名"></el-table-column>
                <el-table-column prop="cost" label="价格"></el-table-column>
                <el-table-column prop="num" label="数量"></el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button size="mini" round type="primary" icon="el-icon-edit" @click="handleEdit(scope.row)"
                        >
                        </el-button
                        >
                        <el-button
                            type="danger"
                            @click="handleDelete(scope.row)"
                            size="mini"
                            icon="el-icon-delete"
                            round
                        >
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
import {getItems,addItem,editItem,delItem} from "../api";

export default {
    data() {
        return {
            //新增弹框默认隐藏
            dialogVisible: false,
            //表单数据（初始数据）
            form: {
                id: "",
                name: "",
                cost: "",
                num: "",
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
                    {required: true, message: "输入商品名", trigger: "blur"},
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
        //计数
        handleChange(value) {
        console.log(value);
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
                    //后续对表单数据的处理
                    if (this.modalType == 0) {
                        //新增操作
                        addItem(this.form).then(() => {
                            this.$message({
                                message: "添加成功",
                                type: "success",
                            });
                            //重新获取数据
                            this.getList();
                        });
                    } else {
                        //修改操作
                        editItem(this.form).then(() => {
                            this.$message({
                                message: "商品修改成功",
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
            this.$confirm("确定要删除该商品吗?", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning",
            })
                .then(() => {
                    //确定删除
                    //调用接口方法删除用户
                    delItem({id: row.id}).then(() => {
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
        //获取商品
        getList() {
            getItems({...this.pageData, ...this.searchForm}).then((res) => {
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
