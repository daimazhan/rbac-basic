import usePersistedState from '@/plugins/use-persisted-state'

const useAppStore = defineStore('app', () => {
  const state = reactive({
    collapsed: false,
    language: 'zh-CN'
  })

  const collapsedChange = () => {
    state.collapsed = !state.collapsed
  }

  return {
    ...toRefs(state),
    collapsedChange
  }
}, {
  persist: usePersistedState('app')
})

export default useAppStore
