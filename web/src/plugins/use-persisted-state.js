/**
 * @description pinia持久化参数配置
 * @param {String} key 存储到持久化的 name
 * @param {Array} paths 需要持久化的 state name
 * @return persist
 * */
const usePersistedState = (key, paths) => {
  return {
    key,
    storage: localStorage,
    paths
  }
}

export default usePersistedState