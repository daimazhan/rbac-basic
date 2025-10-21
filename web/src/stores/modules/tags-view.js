import useAuthStore from './auth'
import useKeepAliveStore from './keep-alive'
import { HOME_URL } from '@/router/modules/static-router'
import usePersistedState from '@/plugins/use-persisted-state'

const useTagsViewStore = defineStore('tags-view', () => {
  const keepAliveStore = useKeepAliveStore()
  const router = useRouter()

  const state = reactive({
    tagsViewList: []
  })

  const insert = tag => {
    if (state.tagsViewList.every(item => item.path !== tag.path)) {
      state.tagsViewList.push(tag)
      // 此处将需要缓存的组件的name存入到pinia
      tag.keepAlive && keepAliveStore.insert(tag.name)
    }
  }

  // 关闭地址为path的页签
  const remove = (path, isCurrent) => {
    const tagsViewList = state.tagsViewList
    if (isCurrent) {
      tagsViewList.forEach((item, index) => {
        if (item.path !== path) return
        const next = tagsViewList[index + 1] || tagsViewList[index - 1]
        if (!next) return
        router.push(next.path)
      })
    }
    state.tagsViewList = tagsViewList.filter(item => item.path !== path)
  }

  // 传入当前页面地址，关闭其他isAffix为false的页签
  const clearOther = active => {
    const tagsViewList = state.tagsViewList
    state.tagsViewList = tagsViewList.filter(item => item.path === active || !item.close)
  }

  // 关闭当前页面页签的左侧全部页签
  // 首页页签默认为固定状态不可删除，且当index为1时，左侧只有首页页签，因此不执行删除操作
  const clearLeft = (active) => {
    if (active === HOME_URL) return
    const index = state.tagsViewList.findIndex(item => item.path === active)
    if (index > 1) {
      state.tagsViewList.splice(1, index - 1)
    }
  }

  // 关闭当前页面页签的右侧全部页签，如果当前页面的页签属于最后一个，则不进行操作
  const clearRight = (active) => {
    if (active === HOME_URL) return clearOther(active)
    const index = state.tagsViewList.findIndex(item => item.path === active)
    if (index === state.tagsViewList.length - 1) return
    if (index > 0) {
      state.tagsViewList.splice(index + 1)
    }
  }

  // 关闭所有，这里获取当前页面path，如果是首页，就不需要额外进行路由跳转
  const clear = (active) => {
    if (active === HOME_URL) return clearOther(active)
    state.tagsViewList.length = 0
    router.push(HOME_URL)
  }

  const refresh = () => {}

  const init = () => {
    const authStore = useAuthStore()
    authStore.getFlatMenuList().forEach(item => {
      if (item.meta.isAffix && !item.meta.isHide && !item.meta.isFull) {
        const tabsParams = {
          icon: item.meta.icon,
          title: item.meta.title,
          path: item.path,
          name: item.name,
          close: !item.meta.isAffix,
          keepAlive: item.meta.isKeepAlive
        }
        insert(tabsParams)
      }
    })
  }

  init()

  return {
    ...toRefs(state),
    insert,
    remove,
    clear,
    clearOther,
    clearLeft,
    clearRight,
    refresh
  }
}, {
  persist: usePersistedState('tags-view')
})

export default useTagsViewStore
