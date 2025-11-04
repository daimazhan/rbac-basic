import axios from 'axios'
import { getToken, removeToken } from './cookie'
import {ElMessage} from "element-plus";
axios.defaults.headers['Content-Type'] = 'application/json;charset=utf-8'
const request = axios.create({
  // baseURL: import.meta.env.VITE_APP_BASE_API,
  timeout: 10000
})
// 请求拦截器
request.interceptors.request.use(
  config => {
    // 是否需要设置 token
    const isToken = (config.headers || {}).isToken === false
    // 设置 Authorization token
    if (getToken() && !isToken) {
      config.headers['Authorization'] = getToken()
    }
    // get请求映射params参数
    // get请求映射params参数
    if (config.method === 'get' && config.params) {
      // 使用 URLSearchParams 来将对象转换成查询字符串
      const paramsString = new URLSearchParams(config.params).toString()
      // 根据url是否已包含查询参数来决定是使用 '?' 还是 '&'
      let url = config.url + (config.url.includes('?') ? '&' : '?') + paramsString
      // 清空 params，避免冗余传递
      config.params = {}
      config.url = url
    }
    return config
  },
  error => {
    // 错误处理
    console.error(error)
    return Promise.reject(error)
  }
)

// 处理登录过期逻辑的辅助函数
const handleLoginExpired = (message) => {
  if (message && message.includes('未登录或token已过期')) {
    removeToken()
    // 清除本地存储
    localStorage.removeItem('keep-alive')
    localStorage.removeItem('tags-view')
    localStorage.removeItem('user')
    localStorage.removeItem('layout')
    localStorage.removeItem('app')
    ElMessage.error(message || '未登录或token已过期')
    // 使用 window.location 跳转，确保完全重新加载
    window.location.href = '/login'
  }
}

// 响应拦截器
request.interceptors.response.use(
  res => {
      // console.log(res)
      if (res.status === 200) {
          // 检查响应数据中的 message
          if (res.data && res.data.message) {
              handleLoginExpired(res.data.message)
          }
          return res
      }else {
          console.error(res)
          ElMessage.error('网络请求错误')
      }
  },
  error => {
    // 处理响应错误
    console.error('请求失败：', error)
    // 检查错误响应中的 message
    if (error.response && error.response.data && error.response.data.message) {
        handleLoginExpired(error.response.data.message)
    }
    return Promise.reject(error)
  }
)
const api = {
  get(url, data) {
    const baseURL = import.meta.env.VITE_APP_BASE_API
    const fullURL = baseURL ? `${baseURL}${url}` : url

    return request
      .get(fullURL + '?', { params: data, withCredentials: true }, { withCredentials: true })
      .then(res => {
          const { code, data, message } = res.data
          if (code === 200) {
              return data
          }
          if (code === 401) {
              ElMessage.error(message)
              handleLoginExpired(message)
          }
          if (code === 404) {
              // todo 转到404页面
              ElMessage.error(message)
          }
          if (code === 500) {
              ElMessage.error(message)
              handleLoginExpired(message)
          }
      }) // 返回数据
      .catch(err => {
        console.error('Request failed:', err)
        return Promise.reject(err) // 返回错误，供外部处理
      })
  },
  delete(url, data) {
    const baseURL = import.meta.env.VITE_APP_BASE_API
    const fullURL = baseURL ? `${baseURL}${url}` : url

    return request
      .delete(fullURL + '?', { params: data, withCredentials: true }, { withCredentials: true })
      .then(res => {
          const { code, data, message } = res.data
          if (code === 200) {
              return data
          }
          if (code === 401) {
              ElMessage.error(message)
              handleLoginExpired(message)
          }
          if (code === 404) {
              // todo 转到404页面
              ElMessage.error(message)
          }
          if (code === 500) {
              ElMessage.error(message)
              handleLoginExpired(message)
          }
      }) // 返回数据
      .catch(err => {
        console.error('Request failed:', err)
        return Promise.reject(err) // 返回错误，供外部处理
      })
  },
  post(url, params) {
    const baseURL = import.meta.env.VITE_APP_BASE_API // 从环境变量获取基础 URL
    const fullURL = baseURL ? `${baseURL}${url}` : url // 拼接完整的 URL

    return request
      .post(fullURL, params)
      .then(res => {
          const { code, data, message } = res.data
          if (code === 200) {
              return data
          }
          if (code === 401) {
              ElMessage.error(message)
              handleLoginExpired(message)
          }
          if (code === 404) {
              // todo 转到404页面
              ElMessage.error(message)
          }
          if (code === 500) {
              ElMessage.error(message)
              handleLoginExpired(message)
          }
      }) // 直接返回响应数据
      .catch(err => {
        console.error('Error in post:', err)
        return Promise.reject(err) // 传递错误给调用方
      })
  },
  put(url, params) {
    const baseURL = import.meta.env.VITE_APP_BASE_API // 从环境变量获取基础 URL
    const fullURL = baseURL ? `${baseURL}${url}` : url // 拼接完整的 URL

    return request
      .put(fullURL, params)
      .then(res => {
          const { code, data, message } = res.data
          if (code === 200) {
              return data
          }
          if (code === 401) {
              ElMessage.error(message)
              handleLoginExpired(message)
          }
          if (code === 404) {
              // todo 转到404页面
              ElMessage.error(message)
          }
          if (code === 500) {
              ElMessage.error(message)
              handleLoginExpired(message)
          }
      }) // 直接返回响应数据
      .catch(err => {
        console.error('Error in post:', err)
        return Promise.reject(err) // 传递错误给调用方
      })
  }
}
export default api
