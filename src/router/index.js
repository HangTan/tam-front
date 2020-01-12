import Vue from 'vue'
import VueRouter from 'vue-router'

import Login from '../components/Login.vue'
import Home from '../views/layout/Home.vue'

import AdminUserEdit from '../views/userManage/AdminUserEdit.vue'
import AdminUserList from '../views/userManage/AdminUserList.vue'


Vue.use(VueRouter)

const routes = [
  
  { path: '/login', component: Login, meta: { isPublic: true } },

  { 
    path: '/',
    name: 'main', 
    component: Home,
    children: [
      { path: '/admin_users/create', component: AdminUserEdit },
      { path: '/admin_users/edit/:id', component: AdminUserEdit, props: true },
      { path: '/admin_users/list', component: AdminUserList },
    ]
    
  }
]

const router = new VueRouter({
  routes
});

// 客户端的路由限制
// eslint-disable-next-line no-unused-vars
router.beforeEach((to, from, next) => {
  // eslint-disable-next-line no-console
  console.log(to.meta);
  if (!to.meta.isPublic && !localStorage.token) {
    return next('/login');
  }
  next();
});

export default router
