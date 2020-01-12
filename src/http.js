import axios from 'axios'
import Vue from 'vue'
import router from './router/index'

const http = axios.create({
  // baseURL: process.env.VUE_APP_API_URL || '/admin/api'
  baseURL: 'http://127.0.0.1:7001/admin/'
});

// 给请求头加信息，字段为 Authorization，用axios的拦截器实现
http.interceptors.request.use(config => {
  if (localStorage.token) {
    config.headers.Authorization = 'Bearer ' + localStorage.token;
  }
  return config;
}, err => {
  return Promise.reject(err);
});

http.interceptors.response.use(res => {
  return res;
}, err => {
  if (err.response.data.message) {
    Vue.prototype.$message({
      type: 'error',
      message: err.response.data.message
    })

    if (err.response.status === 401) {
      router.push('/login');
    }
  }
  return Promise.reject(err);
});

export default http