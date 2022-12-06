import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import ExploreView from '@/views/ExploreView.vue'
import UserVIew from '@/views/UserVIew.vue'
import DetailsView from '@/views/Home/DetailsView.vue'
import NavTime from '@/views/Home/NavTime.vue'
import MyUser from '@/views/User/MyUser.vue'
import UserLogin from '@/views/User/UserLogin.vue'
import ThisUser from '@/views/User/ThisUser.vue'
import SetUpView from '@/views/User/SetUpView.vue'




const router = createRouter({
  
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'homee',
      component: HomeView,
      meta: {
        show: true,
        keepAlive:true
      }
    },
    {
      path: '/home',
      name: 'home',
      component: HomeView,
      meta: {
        show: true,
        keepAlive:true
      }
    },
    
    {
      path: '/explore',
      name: 'explore',
      component: ExploreView,
      meta: {
        show: true,
        keepAlive:false
      }
    },
    {
      path: '/user',
      name: 'user',
      component: UserVIew,
      meta: {
        show: true,
        keepAlive:true
      }
    },
    {
      path: '/details',
      name: 'details',
      component: DetailsView,
      meta: {
        show: false,
        keepAlive:false
      }
    },
    {
      path: '/navtime',
      name: 'navtime',
      component: NavTime,
      meta: {
        show: false,
        keepAlive:false
      }
    },
    {
      path: '/navtime',
      name: 'navtime',
      component: NavTime,
      meta: {
        show: false,
        keepAlive:false
      }
    },
    {
      path: '/myuser',
      name: 'myuser',
      component: MyUser,
      meta: {
        show: false,
        keepAlive:false
      }
    },
    {
      path: '/userlogin',
      name: 'userlogin',
      component: UserLogin,
      meta: {
        show: false,
        keepAlive:false
      }
    },
    {
      path: '/thisuser',
      name: 'thisuser',
      component: ThisUser,
      meta: {
        show: false,
        keepAlive:false
      }
    },
    {
      path: '/setups',
      name: 'setups',
      component: SetUpView,
      meta: {
        show: false,
        keepAlive:false
      }
    },
  ]
})
export default router
