export default {
    state: {
        //用于控制菜单的折叠和展开
        isCollapse: false, 
        //面包屑数据（数组）
        tabsList: [
            //默认的首页数据
            {
                path: "/",
                name: "home",
                label: "首页",
                icon: "s-home",
                url: "Home/Home",
            },
        ],
    },
    mutations: {
        //修改菜单展开和折叠的方法
        collapseMenu(state){
            state.isCollapse = !state.isCollapse
        },
        //更新面包屑数据
        selectMenu(state,val){
            //判断添加的数据不为首页
            if(val.name != 'home'){
                //判断添加的数据不存在
                const index = state.tabsList.findIndex(item => {
                    return item.name === val.name
                })
                //如果不存在
                if(index === -1){
                    state.tabsList.push(val) 
                }
            }
        },
        //删除指定的面包屑数据
        closeTag(state,val){
            const index = state.tabsList.findIndex(item => {
                return item.name === val.name
            })
            state.tabsList.splice(index,1) //删除元素
        },
    }
}