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
            <el-dropdown @command="handleClick">
                <span>
                    <img src="../assets/images/tx.jpg" class="user" alt="用户头像"/>
                </span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item command="grzx">个人中心</el-dropdown-item>
                    <el-dropdown-item command="logout">退出</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </div>
    </div>
</template>

<script>
import Cookie from 'js-cookie'

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
        //点击下拉菜单某一项功能
        handleClick(command) {
            if (command === 'logout') {
                //表示退出
                //清除Cookie中的token信息
                Cookie.remove("token")
                //清除Cookie中的menu信息
                Cookie.remove("menu")
                //清除tags
                this.$store.commit("clearTags")
                //跳转到登录页面
                this.$router.push("/login")
            }
            if (command == 'grzx') {
                //表示进入个人中心
                //跳转到个人中心页面
                this.$router.push("/usercenter")
            }
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

        /deep/ .el-breadcrumb__item {
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