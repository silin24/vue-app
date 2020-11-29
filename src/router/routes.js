/*
所有路由配置的数组
*/

import MSite from '@/pages/MSite/MSite'
import Search from '@/pages/Search/Search'
import Order from '@/pages/Order/Order'
import Profile from '@/pages/Profile/Profile'
import Login from '@/pages/Login/Login'

export default [
  {
    path: '/msite',
    component: MSite,
    meta:{isShow:true}
  },
  {
    path: '/search',
    component: Search,
    meta:{isShow:true}

  },
  {
    path: '/order',
    component: Order,
    meta:{isShow:true}

  },
  {
    path: '/profile',
    component: Profile,
    meta:{isShow:true}

  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/',
    redirect: '/msite'
  }
]
