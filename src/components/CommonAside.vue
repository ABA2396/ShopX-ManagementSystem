<template>
    <el-menu
        default-active="1-4-1"
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose"
        :collapse="isCollapse"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b"
    >
        <h3>{{ isCollapse ? '后台' : 'XX后台管理系统' }}</h3>
        <!-- 一级菜单 -->
        <el-menu-item
            v-for="item in noChildren"
            :key="item.name"
            :index="item.name"
            v-on:click="clickMenu(item)">
            <i :class="`el-icon-${item.icon}`"></i>
            <span slot="title">{{ item.label }}</span>
        </el-menu-item>
        <!-- 二级菜单 -->
        <el-submenu v-for="item in hasChildren" :key="item.label" :index="item.label">
            <template slot="title">
                <i :class="`el-icon-${item.icon}`"></i>
                <span slot="title">{{ item.label }}</span>
            </template>
            <el-menu-item-group v-for="subItem in item.children" :key="subItem.path">
                <el-menu-item
                    :index="subItem.path"
                    v-on:click="clickMenu(subItem)"
                >
                    {{ subItem.label }}
                </el-menu-item>
            </el-menu-item-group>
        </el-submenu>
    </el-menu>
</template>

<script>
import Cookie from 'js-cookie'

export default {
    data() {
        return {
            //isCollapse: false,
            //临时的左侧菜单数据
        };
    },
    methods: {
        handleOpen(key, keyPath) {
            console.log(key, keyPath);
        },
        handleClose(key, keyPath) {
            console.log(key, keyPath);
        },
        //点击菜单
        clickMenu(item) {
            this.$router.push(item.path);

            //调用mutations中方法并传入参数更新面包屑数据
            this.$store.commit('selectMenu', item)
        },
    },
    //计算属性
    computed: {
        //没有子菜单
        noChildren() {
            const menu = Cookie.get("menu")
            if (menu) {
                return JSON.parse(menu).filter(item => !item.children);
            } else {
                return this.$store.state.tab.authMenu.filter(item => !item.children);
            }
            //return this.menuData.filter(item => !item.children);
        },
        //有子菜单
        hasChildren() {
            const menu = Cookie.get("menu")
            if (menu) {
                return JSON.parse(menu).filter(item => item.children);
            } else {
                return this.$store.state.tab.authMenu.filter(item => item.children);
            }
            //return this.menuData.filter(item => item.children);
        },
        //获取store中isCollapse的值
        isCollapse() {
            //this.$store表示当前vue实例下的store/vuex
            return this.$store.state.tab.isCollapse
        }
    },
};
</script>

<style lang="less" scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
}

.el-menu {
    height: 100vh;

    h3 {
        color: #fff;
        text-align: center;
        line-height: 48px;
        font-size: 16px;
        font-weight: 400;
    }
}
</style>