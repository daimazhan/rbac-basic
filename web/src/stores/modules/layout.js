import usePersistedState from '@/plugins/use-persisted-state'

const useLayoutStore = defineStore('layout', () => {
  const state = reactive({
    showLogo: true,
    showFooter: true,
    showHeader: true,
    showTagsView: false
  })

  return {
    ...toRefs(state)
  }
}, {
  persist: usePersistedState('layout')
})

export default useLayoutStore