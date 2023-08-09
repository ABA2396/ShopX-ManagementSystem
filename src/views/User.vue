<template>
    <!-- <h1>我是user</h1> -->
    <div class="manage">

        <!-- 新增 弹出框 -->
        <el-dialog
            title="新增用户"
            :visible.sync="dialogVisible"
            width="30%"
        >
            <span>这是一段信息</span>
            <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
        </span>
        </el-dialog>

        <div class="manage-header">
            <!-- 新增按钮 -->
            <el-button @click="handleAdd" type="primary">+新增</el-button>
            <!-- form搜索表单 -->
        </div>

        <div class="common-table">
            <!-- 表格数据展示 -->
            <el-table
                :data="tableData"
                stripe
                style="width: 100%">
                <el-table-column prop="name" label="姓名"></el-table-column>
                <el-table-column prop="sex" label="性别"></el-table-column>
                <el-table-column prop="age" label="年龄"></el-table-column>
                <el-table-column prop="birth" label="出生日期"></el-table-column>
                <el-table-column prop="addr" label="地址"></el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button size="mini">编辑</el-button>
                        <el-button type="danger" size="mini">删除</el-button>
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
import {getUsers} from "../api";

export default {
    data() {
        return {
            //新增弹框默认隐藏
            dialogVisible: false,
            //表格数据
            tableData: [],
            //总条数
            total: 0,
            //分页数据
            pageData: {
                pageNo: 1,
                pageSize: 10,
            },
        };
    },
    methods: {
        //获取用户列表数据
        getList() {
            getUsers(this.pageData).then((res) => {
                //console.log(res);
                this.tableData = res.data.records; //给表格数据赋值
                this.total = res.data.total; //给总条数赋值
            });
        },
        //选择页码的回调函数
        handlePage(val) {
            //console.log(val)
            //修改当前的页码
            this.pageData.pageNo = val
            //调用getList方法重新发送请求获取最新数据
            this.getList()
        },
        //点击新增按钮
        handleAdd() {
            this.dialogVisible = true
        },
    },
    mounted() {
        //打开页面默认获取数据
        this.getList()
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
}
</style>