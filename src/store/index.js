import Vue from 'vue'
import Vuex from 'vuex' //引入vuex
import tab from './tab'

//全局注入vuex
Vue.use(Vuex);

//创建vuex的实例/对象（也就是store）
export default new Vuex.Store({
    modules: {
        tab,
    }
})
