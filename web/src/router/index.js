import { createRouter, createWebHistory } from 'vue-router'
import { errorRouter, staticRouter } from './modules/static-router'
import initDynamicRouter from './modules/dynamic-router'
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

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [...staticRouter, ...errorRouter]
})

const white = ['/login']

// 通过路由守卫开启/关闭页面进度条
router.beforeEach(async (to, from, next) => {
  NProgress.start()
  const authStore = useAuthStore()
    console.log("to:",to);

  if (getToken()) {
    if (to.path === '/login') {
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
    if (white.includes(to.path)) {
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
