import api from '@/utils/request'

export function getPermissionTree() {
  return api.get('/permission/tree')
}

export function createPermission(data) {
  return api.post('/permission', data)
}

export function updatePermission(data) {
  return api.put(`/permission/`, data)
}

export function deletePermission(id) {
  return api.delete(`/permission/${id}`)
} 