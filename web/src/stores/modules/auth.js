import DynamicRouter from '@/assets/json/dynamic-router.json'
import { getFlatArr, getShowMenuList, getAllBreadcrumbList } from '@/utils/util'
import { getMenuTree } from "@/api/auth";


const useAuthStore = defineStore('auth', () => {
  const state = reactive({
    dynamicMenuList: []
  })

  // 服务器菜单列表
  const getTreeMenuList = () => state.dynamicMenuList

  // 过滤掉hidden的菜单列表
  const getFilterMenuList = () => getShowMenuList(state.dynamicMenuList)

  // 扁平后的菜单列表，用于添加动态路由
  const getFlatMenuList = () => getFlatArr(state.dynamicMenuList)

  // 从菜单列表获取面包屑列表，用于渲染面包屑组件
  const getBreadcrumbList = () => getAllBreadcrumbList(state.dynamicMenuList)

  // 从后端获取动态菜单
  const getDynamicMenuList = async () => {
    const tree  = await getMenuTree();
    // console.log(`tree: ${JSON.stringify(tree)}`)
    let staticMenu = [
      {
        path: '/home',
        name: 'PageHome',
        component: '/home/index.vue',
        meta: {
          icon: 'HomeFilled',
          title: '主页',
          isFull: false,
          isAffix: true,
          isKeepAlive: true
        }
      },
      {
        path: '/profile',
        name: 'profile',
        component: '/profile/index.vue',
        hidden: true,
        meta: {
          icon: 'User',
          title: '个人中心',
          isFull: false,
          isAffix: true,
          isKeepAlive: true
        }
      }
    ]
    state.dynamicMenuList = staticMenu.concat(tree)
  }
  return {
    ...toRefs(state),
    getTreeMenuList,
    getFilterMenuList,
    getFlatMenuList,
    getDynamicMenuList,
    getBreadcrumbList
  }
})

export default useAuthStore
