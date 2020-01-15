import axios from 'axios'
import Vue from 'vue'
import router from '@/router/index'

// 统一请求路径前缀
const base = 'http://127.0.0.1:7001/admin'


// 给请求头加信息，字段为 Authorization，用axios的拦截器实现
axios.interceptors.request.use(config => {
  if (localStorage.token) {
    config.headers.Authorization = 'Bearer ' + localStorage.token;
  }
  return config;
}, err => {
  return Promise.reject(err);
});

axios.interceptors.response.use(res => {
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

export const getRequest = (url, params) => {
  // let accessToken = getStore('accessToken');
  return axios({
      method: 'get',
      url: `${base}${url}`,
      params: params
  });
};

export const postRequest = (url, params) => {
  return axios({
      method: 'post',
      url: `${base}${url}`,
      data: params,
      transformRequest: [function (data) {
          let ret = '';
          for (let it in data) {
              ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&';
          }
          return ret;
      }],
      headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
      }
  });
};

export const putRequest = (url, params) => {
  let accessToken = getStore("accessToken");
  return axios({
      method: 'put',
      url: `${base}${url}`,
      data: params,
      transformRequest: [function (data) {
          let ret = '';
          for (let it in data) {
              ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&';
          }
          return ret;
      }],
      headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
      }
  });
};

export const deleteRequest = (url, params) => {
  let accessToken = getStore('accessToken');
  return axios({
      method: 'delete',
      url: `${base}${url}`,
      params: params,
  });
};

export const importRequest = (url, params) => {
  let accessToken = getStore('accessToken');
  return axios({
      method: 'post',
      url: `${base}${url}`,
      data: params,
  });
};

export const uploadFileRequest = (url, params) => {
  let accessToken = getStore('accessToken');
  return axios({
      method: 'post',
      url: `${base}${url}`,
      params: params,
  });
};

/**
* 无需token验证的请求 避免旧token过期导致请求失败
* @param {*} url 
* @param {*} params 
*/
export const getRequestWithNoToken = (url, params) => {
  return axios({
      method: 'get',
      url: `${base}${url}`,
      params: params
  });
};