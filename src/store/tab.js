import Cookie from 'js-cookie'

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
        //左侧所有菜单数据
        menuData: [
            {
                path: "/",
                name: "home",
                label: "首页",
                icon: "s-home",
                url: "Home/Home",
                auth: 1
            },
            {
                path: "/mall",
                name: "mall",
                label: "商品管理",
                icon: "video-play",
                url: "MallManage/MallManage",
                auth: 1
            },
            {
                path: "/user",
                name: "user",
                label: "用户管理",
                icon: "user",
                url: "UserManage/UserManage",
                auth: 2
            },
            {
                label: "其他",
                icon: "location",
                children: [
                    {
                        path: "/page1",
                        name: "page1",
                        label: "页面1",
                        icon: "setting",
                        url: "Other/PageOne",
                        auth: 2
                    },
                    {
                        path: "/page2",
                        name: "page2",
                        label: "页面2",
                        icon: "setting",
                        url: "Other/PageTwo",
                        auth: 2
                    },
                ],
                auth: 2
            },
        ],
        //权限菜单
        authMenu: []
    },
    mutations: {
        //修改菜单展开和折叠的方法
        collapseMenu(state) {
            state.isCollapse = !state.isCollapse
        },
        //更新面包屑数据
        selectMenu(state, val) {
            //判断添加的数据不为首页
            if (val.name !== 'home') {
                //判断添加的数据不存在
                const index = state.tabsList.findIndex(item => {
                    return item.name === val.name
                })
                //如果不存在
                if (index === -1) {
                    state.tabsList.push(val)
                }
            }
        },
        //删除指定的面包屑数据
        closeTag(state, val) {
            const index = state.tabsList.findIndex(item => {
                return item.name === val.name
            })
            state.tabsList.splice(index, 1) //删除元素
        },
        //权限判断
        checkMenu(state, val) {
            //console.log(val,"用户的权限")
            if (val == 1) {
                state.authMenu = state.menuData
            } else {
                state.authMenu = state.menuData.filter((item) => {
                    return item.auth == 1
                })
            }
            //页面刷新,会导致vuex中的数据初始化
            //所以呢,我们将当前登录的用户的权限菜单数据放到cookie中
            Cookie.set("menu", JSON.stringify(state.authMenu))
        }
    }
}