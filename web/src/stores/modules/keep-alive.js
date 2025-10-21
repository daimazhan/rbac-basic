import usePersistedState from '@/plugins/use-persisted-state'

const useKeepAliveStore = defineStore('keep-alive', () => {

  /**
   * 请在每一个页面手动设置defineOptions({ name: 'XXXX' })，并且XXXX应与动态路由配置中的name保持一致！
   * 在 3.2.34 或以上的版本中，使用 <script setup> 的单文件组件会自动根据文件名生成对应的 name 选项，无需再手动声明。
   * 为了避免所有页面的name都默认设置成Index，因此请单独设置页面的name，且尽量不要重复，因为路由中的name不允许出现重复。
   */

  // 记录需要缓存的页面的name
  const keepAliveName = ref([])

  const insert = name => {
    !keepAliveName.value.includes(name) && keepAliveName.value.push(name)
  }

  const remove = name => {
    keepAliveName.value = keepAliveName.value.filter(item => item !== name)
  }

  const setKeepAliveName = names => {
    setKeepAliveName.value = names
  }

  return {
    keepAliveName,
    insert,
    remove,
    setKeepAliveName
  }
}, {
  persist: usePersistedState('keep-alive')
})

export default useKeepAliveStore
