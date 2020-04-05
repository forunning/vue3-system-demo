import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import router from './router'
import './plugins/element.js'

//引入两个文件
import api from './api/api'
import http from './api/http'
//挂载到VUE实例，以便全局使用
Vue.prototype.api = api;
Vue.prototype.http = http;


Vue.config.productionTip = false

new Vue({
    router,
    render: h => h(App)
}).$mount('#app')