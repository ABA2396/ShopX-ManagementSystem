<template>
    <div class="header-container">
        <!-- header的左侧区域 -->
        <div class="left-content">
            <!-- 图表按钮 -->
            <el-button
                style="margin-right: 20px;"
                @click="handleMenu"
                size="mini"
                icon="el-icon-menu"
            ></el-button>
            <!-- 面包屑：显示当前的页面的路径，快速返回到之前的任意页面 -->
            <!-- <span class="text">首页</span> -->
            <el-breadcrumb separator="/">
                <el-breadcrumb-item
                    v-for="item in tabsList"
                    :key="item.path"
                    :to="{ path: item.path }"
                >
                    {{ item.label }}
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <!-- header的右侧区域 -->
        <div class="right-content">
            <!-- 下拉菜单 -->
            <el-dropdown>
                <span>
                    <img src="../assets/images/tx.jpg" class="user" />
                </span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item>个人中心</el-dropdown-item>
                    <el-dropdown-item>退出</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {};
    },
    methods: {
        //改变左侧菜单折叠与展开
        handleMenu() {
            //调用store对象的commit方法来间接调用store中的mutations的方法
            this.$store.commit("collapseMenu");
        },
    },
    computed: {
        //获取面包屑数
        tabsList() {
            return this.$store.state.tab.tabsList;
        },
    },
};
</script>

<style lang="less" scoped>
.header-container {
    background-color: #333;
    height: 60px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;
    .text {
        color: #fff;
        font-size: 14px;
        margin-left: 10px;
    }
    .right-content {
        .user {
            width: 40px;
            height: 40px;
            border-radius: 50px;
        }
    }
    .left-content {
        display: flex;
        align-items: center;
        /deep/.el-breadcrumb__item {
            .el-breadcrumb__inner {
                font-weight: normal;
                &.is-link {
                    color: #666;
                }
            }
            &:last-child {
                .el-breadcrumb__inner {
                    color: #fff;
                }
            }
        }
    }
}
</style>