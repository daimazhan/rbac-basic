import api from '@/utils/request'

export function login(data) {
  return api.post('/auth/login', data)
}

export function logout() {
  return api.post('/auth/logout')
}

export function getUserInfo() {
  return api.get('/auth/info')
}

export function getMenuTree() {
  return api.get('/auth/menu')
}

//注册
export function register(data) {
  return api.post('/auth/register', data)
}

//登录后修改密码
export function changePassword(data) {
  return api.post('/user/password', data)
}

export function updateProfile(data) {
  return api.put('/user/profile',data)
}