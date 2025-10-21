const toString = Object.prototype.toString

/**
 * @description 是否是字符串
 */
export const isString = data => toString.call(data) === '[object String]'

/**
 * @description 是否是数字
 */
export const isNumber = data => toString.call(data) === '[object Number]'

/**
 * @description 是否是布尔
 */
export const isBoolean = data => toString.call(data) === '[object Boolean]'

/**
 * @description 是否是数组
 */
export const isArray = data => toString.call(data) === '[object Array]'

/**
 * @description 是否是null
 */
export const isNull = data => toString.call(data) === '[object Null]'

/**
 * @description 是否是Undefined
 */
export const isUndefined = data => toString.call(data) === '[object Undefined]'

/**
 * @description 是否是对象
 */
export const isObject = data => toString.call(data) === '[object Object]'

/**
 * @description 是否是Symbol
 */
export const isSymbol = data => toString.call(data) === '[object Symbol]'

/**
 * @description 是否是函数
 */
export const isFunction = data => toString.call(data) === '[object Function]'

/**
 * @description 是否是浏览器
 */
export const isWindow = window => typeof window !== 'undefined' && toString.call(window) === '[object Window]'

/** ----------------------------------------------------- 无情的分割线 --------------------------------------------------------------------------- */

/**
 * @description 校验手机号
 */
export const isPhone = phone => {
  const reg = /^[1][3,4,5,6,7,8,9][0-9]{9}$/
  return reg.test(phone)
}

/**
 * @description 校验二代身份证号
 */
export const isIDNumber = ID => {
  const reg = /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/
  return reg.test(ID)
}

/**
 * @description 校验 YYYY-MM-DD 格式日期
 */
export const isDate = date => {
  const reg = /^\d{4}(\-)\d{1,2}\1\d{1,2}$/
  return reg.test(date)
}

/**
 * @description 校验 YYYY-MM-DD hh:mm:ss 格式日期时间
 */
export const isDatetime = datetime => {
  const reg = /^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2}) (\d{1,2}):(\d{1,2}):(\d{1,2})$/
  return reg.test(datetime)
}
