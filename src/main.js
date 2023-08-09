import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui' //全部引入element-ui（我们使用这种方式）
//import { Button, Row, Link } from 'element-ui' //按需引入element-ui
import 'element-ui/lib/theme-chalk/index.css' //引入element-ui的css
//导入router
import router from './router'
import store from './store' //引入vuex
import Cookie from 'js-cookie'

//将element-ui全局注册到vue中
Vue.use(ElementUI)
//按需引入element-ui，按需注册组件
// Vue.use(Button)
// Vue.use(Row)
// Vue.use(Link)

Vue.config.productionTip = false

//添加全局前置导航守卫
router.beforeEach((to, from, next) => {
    //判断token存不存在
    const token = Cookie.get("token")
    //token不存在,说明当前用户未登录,且当前不再登录页面,应该跳转到登录页
    if (!token && to.name !== 'login') {
        next({name: 'login'})
    } else if (token && to.name === 'login') {
        next({name: 'home'})
    } else {
        next()
    }
})

new Vue({
    router, //将router挂载到vue实例上
    store, //将store挂载到vue实例上
    render: h => h(App),
}).$mount('#app')
