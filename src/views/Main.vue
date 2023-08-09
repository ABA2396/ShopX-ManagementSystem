<template>
    <div>
        <!-- 后台页面整体布局container -->
        <el-container>
            <!-- 左侧边栏 -->
            <el-aside width="auto">
                <!-- 在该位置放置子组件：CommonAside，使用默认标签名 -->
                <common-aside/>
            </el-aside>
            <!-- 右侧 -->
            <el-container>
                <!-- 右侧上 头部 -->
                <el-header>
                    <common-header/>
                </el-header>

                <!-- 显示tag标签组件 -->
                <common-tag/>

                <!-- 右侧下 内容 -->
                <el-main>
                    <!-- 子路由出口 -->
                    <router-view></router-view>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<script>
//引入CommonAside组件
import CommonAside from '../components/CommonAside.vue'
//引入CommonHeader组件
import CommonHeader from '../components/CommonHeader.vue'
//引入CommonTag组件
import CommonTag from '../components/CommonTag.vue'

export default {
    data() {
        return {};
    },
    //注册子组件
    components: {
        //注册CommonAside组件到Main父组件中
        CommonAside,
        //注册CommonHeader组件到Main父组件中
        CommonHeader,
        //注册CommonTag组件到Main父组件中
        CommonTag,
    }
};
</script>

<style scoped>
.el-header {
    padding: 0;
}
</style>