import router from '..'
import useAuthStore from '@/stores/modules/auth'
import { notFoundRouter } from './static-router'

// 引入 views 文件夹下所有 vue 文件
const modules = import.meta.glob('@/views/**/*.vue')

const loadView = view => modules['/src/views' + view]

const initDynamicRouter = async () => {
  const authStore = useAuthStore()
  await authStore.getDynamicMenuList()
  
  authStore.getFlatMenuList().forEach(item => {
    item.children && delete item.children
    if (item.component && typeof item.component === 'string') {
      item.component = loadView(item.component)
    }

    if (item.meta.isFull) {
      router.addRoute(item);
    } else {
      router.addRoute("layout", item);
    }
  })

  router.addRoute(notFoundRouter)
}

export default initDynamicRouter
