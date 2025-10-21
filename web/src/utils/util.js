/**
 * @description 数字添加千分位分隔符
 * @param {Number} num 要分隔的数字
 * @return number | string
 */
export const addSeparator = num => {
  if (typeof num != 'number') return num
  const str = num + ''
  const reg = /(?!^)(?=(\d{3})+$)/g
  return str.replace(reg, ',')
}

/**
 * @description 扁平化数组对象(主要用来处理路由菜单)
 * @param {Array} menuList 所有菜单列表
 * @return array
 */
export const getFlatArr = menuList => {
  let newMenuList = JSON.parse(JSON.stringify(menuList))
  return newMenuList.reduce((pre, current) => {
    let flatArr = [...pre, current]
    if (current.children) flatArr = [...flatArr, ...getFlatArr(current.children)]
    return flatArr
  }, [])
}

/**
 * @description 使用递归，过滤出需要渲染在左侧菜单的列表（剔除 isHide == true 的菜单）
 * @param {Array} menuList 所有菜单列表
 * @return array
 * */
export const getShowMenuList = menuList => {
  let newMenuList = JSON.parse(JSON.stringify(menuList))
  return newMenuList.filter(item => {
    item.children?.length && (item.children = getShowMenuList(item.children))
    return !item.meta?.isHide
  })
}

/**
 * @description 递归找出所有面包屑存储到 pinia 中
 * @param {Array} menuList 所有菜单列表
 * @param {Object} result 输出的结果
 * @param {Array} parent 父级菜单
 * @returns object
 */
export const getAllBreadcrumbList = (menuList, result = {}, parent = []) => {
  for (const item of menuList) {
    result[item.path] = [...parent, item]
    if (item.children?.length) getAllBreadcrumbList(item.children, result, result[item.path])
  }
  return result
}

/**
 * @description 生成随机数
 * @param {Number} min 最小值
 * @param {Number} max 最大值
 * @return number
 */
export const randomNum = (min, max) => Math.floor(Math.random() * (min - max) + max)
