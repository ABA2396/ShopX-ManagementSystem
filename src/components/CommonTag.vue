<template>
    <div class="tags">
        <el-tag 
            @click="changeMenu(item)"
            v-for="(item,index) in tabsList" 
            :key="item.path" 
            :closable="item.name !== 'home'"
            :effect="$route.name === item.name ? 'dark' : 'plain'"
            @close="handleClose(item,index)"
        >
            {{ item.label }}
        </el-tag>
    </div>
</template>

<script>
export default {
    data() {
        return {};
    },
    methods: {
        //点击tag跳转的功能
        changeMenu(item){
            this.$router.push({ name: item.name })
        },
        handleClose(item,index){
            //调用vuex中的mutations方法
            this.$store.commit('closeTag',item)
            //获取面包屑数据的长度
            const length = this.$store.state.tab.tabsList.length
            //删除之后的跳转逻辑
            //表示删除的不是当前的页面，什么都不做
            if(item.name !== this.$route.name){
                return
            }
            //表示删除的是最后一项，tag显示向左移动
            if(index === length){
                this.$router.push({
                    name: this.$store.state.tab.tabsList[index - 1].name
                })
            }else{
                //表示删除的是中间位置的一项tag向右移动
                this.$router.push({
                    name: this.$store.state.tab.tabsList[index].name
                })
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
    .tags{
        padding: 20px;
        .el-tag{
            margin-right: 15px;
            cursor: pointer;
        }
    }
</style>