// 统一请求路径前缀在utils/http.js中修改
import { getRequest, postRequest, putRequest, deleteRequest } from '@/utils/http';

// 后台接口  /admin/...

// 管理员登录
export const adminLogin = (params) => {
  return postRequest('/login', params)
}