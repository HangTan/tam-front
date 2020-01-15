import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'


import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import { getRequest, postRequest, putRequest, deleteRequest, importRequest, uploadFileRequest } from '@/utils/http'

// 导入全局样式表
import './assets/css/global.css'




Vue.use(ElementUI);
Vue.config.productionTip = false

// 挂载全局使用的方法
Vue.prototype.getRequest = getRequest;
Vue.prototype.postRequest = postRequest;
Vue.prototype.putRequest = putRequest;
Vue.prototype.deleteRequest = deleteRequest;
Vue.prototype.importRequest = importRequest;
Vue.prototype.uploadFileRequest = uploadFileRequest;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
