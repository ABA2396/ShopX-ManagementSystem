import Vue from 'vue'
//导入路由插件
import VueRouter from 'vue-router'
//导入我们的组件
import Home from '../views/Home.vue'
import User from '../views/User.vue'
import Main from '../views/Main.vue'
import Mall from '../views/Mall.vue'
import PageOne from '../views/PageOne.vue'
import PageTwo from '../views/PageTwo.vue'

//安装路由
Vue.use(VueRouter);

//1、创建路由组件 - 在views中实现了
//2、将路由与组件进行映射
// const routes = [
//     {path: '/home', component: Home},
//     {path: '/user', component: User}
// ]
//嵌套路由
const routes = [
    //主路由
    {
        path: '/',
        component: Main,
        redirect: '/home', //重定向 当请求路径是/时，直接重定向到home
        //子路由
        children: [
            { path: 'home',name: 'home', component: Home }, //首页
            { path: 'user',name: 'user', component: User }, //用户管理
            { path: 'mall',name: 'mall', component: Mall }, //商品管理
            { path: 'page1',name: 'page1', component: PageOne }, //其他-页面1
            { path: 'page2',name: 'page2', component: PageTwo }, //其他-页面2
        ]
    },
]

const originalPush = VueRouter.prototype.push

VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}

//3、创建router实例/对象
const router = new VueRouter({
    routes
})

router.beforeEach((to, from, next) => {
    return next()
})

//4、对外暴露router实例
export default router