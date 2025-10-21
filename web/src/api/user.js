import api from '@/utils/request'

export function getUserList(params) {
  return api.get('/user/list', params)
}

export function createUser(data) {
  return api.post('/user', data)
}

export function updateUser(data) {
  return api.put('/user/update',data)
}

export function deleteUser(id) {
  return api.delete(`/user/${id}`)
}

export function assignUserRoles(userId, roleIds) {
  return api.post(`/user/${userId}/roles`, roleIds
  )
}