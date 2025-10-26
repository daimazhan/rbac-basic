import { createRouter, createWebHistory } from 'vue-router'
import NProgress from '@/plugins/use-nprogress'
import useAuthStore from '@/stores/modules/auth'
import { getToken } from '@/utils/cookie'

/**
 * @description 动态路由参数配置简介
 * @param path ==> 菜单路径
 * @param name ==> 菜单别名
 * @param redirect ==> 重定向地址
 * @param component ==> 视图文件路径
 * @param meta ==> 菜单信息
 * @param meta.icon ==> 菜单图标
 * @param meta.title ==> 菜单标题
 * @param meta.activeMenu ==> 当前路由为详情页时，需要高亮的菜单(当访问的菜单isHide为true时，指定高亮某个菜单)
 * @param meta.isLink ==> 是否外链(外链，点击后打开新页签)
 * @param meta.isHide ==> 是否隐藏(开启隐藏后将不会出现在菜单栏，但该页面仍可继续访问)
 * @param meta.isFull ==> 是否全屏(示例：数据大屏页面)
 * @param meta.isAffix ==> 当前页签是否固定（固定时无法关闭）
 * @param meta.isKeepAlive ==> 当前组件是否缓存
 * */

// 引入 views 文件夹下所有 vue 文件
const modules = import.meta.glob('@/views/**/*.vue')

// 这行代码的意思是：根据传入的 view 路径（如 "/home/index.vue"），
// 从 modules 对象中获取对应的 Vue 组件对象，实现路由组件的动态加载。
// modules 是通过 import.meta.glob 导入的一个对象，key 为文件路径，value 为异步组件加载函数。
// 例如：loadView('/home/index.vue') 实际等价于 modules['/src/views/home/index.vue']
const loadView = view => modules[view]

// 静态路由配置
const staticRouter = [
  {
    path: '/',
    name: 'layout',
    component: () => import('@/layout/index.vue'),
    redirect: '/home',
    children: [
      {
        path: '/home',
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

// 错误路由配置
const errorRouter = [
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
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    redirect: { path: '/404' }
  }
]


// 创建路由实例
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [...staticRouter, ...errorRouter]
})

// 动态路由初始化函数
const initDynamicRouter = async () => {
  const authStore = useAuthStore()
  await authStore.getDynamicMenuList()
  
  authStore.getFlatMenuList().forEach(item => {
    item.children && delete item.children
    console.log(`item: ${item.component}`)
    if (item.component && typeof item.component === 'string') {
      item.component = loadView(item.component)
      console.log(`item: ${item.name} ${item.component}`)
    }

    if (item.meta.isFull) {
      router.addRoute(item);
    } else {
      router.addRoute("layout", item);
    }
  })
}

const whiteList = ['/login']

// 通过路由守卫开启/关闭页面进度条
router.beforeEach(async (to, from, next) => {
  NProgress.start()
  const authStore = useAuthStore()
  console.log("to:", to);

  if (getToken()) {
    if (whiteList.includes(to.path)) {
      next({ path: '/' })
      NProgress.done()
    } else {
      if (authStore.dynamicMenuList.length === 0) {
        await initDynamicRouter()
        next({ ...to, replace: true })
      } else {
        next()
      }
    }
  } else {
    if (whiteList.includes(to.path)) {
      next()
    } else {
      next(`/login?redirect=${to.fullPath}`)
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  NProgress.done()
})

router.onError(() => {
  NProgress.done()
})

export default router