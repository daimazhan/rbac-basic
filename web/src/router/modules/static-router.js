export const HOME_URL = '/home'

export const staticRouter = [
  {
    path: '/',
    name: 'layout',
    component: () => import('@/layout/index.vue'),
    redirect: HOME_URL,
    children: [
      {
        path: HOME_URL,
        name: 'Home',
        component: () => import('@/views/home/index.vue'),
        meta: { title: '首页' }
      },
      {
        path: '/profile',
        name: 'profile',
        component: () => import('@/views/profile/index.vue'),
        hidden: true,
        meta: { title: '个人中心' }
      },
      {
        path: '/user',
        name: 'userManage',
        component: () => import('@/views/system/user/index.vue'),
        meta: { title: '用户管理' }
      },
      {
        path: '/role',
        name: 'roleManage',
        component: () => import('@/views/system/role/index.vue'),
        meta: { title: '角色管理' }
      },
      {
        path: '/permission',
        name: 'permissionManage',
        component: () => import('@/views/system/permission/index.vue'),
        meta: { title: '权限管理' }
      }
    ]
  },
  {
    path: '/login',
    name: 'PageLogin',
    component: () => import('@/views/login/index.vue'),
    meta: { title: '登录' }
  }
]

export const errorRouter = [
  {
    path: '/403',
    name: '403',
    component: () => import('@/views/error/403/index.vue'),
    meta: { title: 'Page403' }
  },
  {
    path: '/404',
    name: '404',
    component: () => import('@/views/error/404/index.vue'),
    meta: { title: 'Page404' }
  }
]

export const notFoundRouter = {
  path: '/:pathMatch(.*)*',
  name: 'NotFound',
  redirect: { path: '/404' }
}
