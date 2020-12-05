//import Vue from 'vue'
//import Router from 'vue-router'
//import Index from '../components/index/Index'
//import My from '../components/My'

// 导入刚才编写的组件
import { Message } from 'element-ui';
//import Login from '../components/Login.vue'

//import info from '../components/personal_info/info'
//import pwd from '../components/personal_info/pwd'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: 'login'
  },
  {
    path: '/login',
    name: 'Login',
    //component: Login,
    component:resolve=>require(['../components/Login.vue'],resolve),
    meta:{
      title: 'Login/Sign Up',
      auth: false
    }
  },
  {
    path: '/index',
    name: 'Index',
    //component: Index,
    component: resolve=>require(['../components/index/Index'],resolve),
    meta:{
      title: 'PHTRS',
      auth: true
    },
  },
  {
    path: '/my',
    name: 'My',
    //component: My,
    component:resolve=>require(['../components/My'],resolve),
    meta:{
      title: 'User Center',
      auth: true
    },
    children:[
      {path:'/my/info',
        //component:info
        component:resolve=>require(['../components/personal_info/info'],resolve),
      },
      {path:'/my/pwd',
        //component:pwd
        component:resolve=>require(['../components/personal_info/pwd'],resolve),
      }
    ]
  },
]

const router = new VueRouter({
  // mode: 'history',//使用 History 模式 去掉后默认谁hash模式
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, form, next) => {
  let flag = sessionStorage.getItem("user")
  if (to.meta.auth) {
    if(!flag)
    {
      Message({
      showClose: true,
      message: '请先登录',
      type: 'warning'
    });
    next({ path: '/login' });
    }
    else next();
  } 
  else next();
});

export default router