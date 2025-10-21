import api from '@/utils/request'

export function getRoleList(params) {
  return api.get('/role/list',
    params
  )
}

export function getRoleOptions() {
  return api.get('/role/options'
  )
}

export function createRole(data) {
  return api.post('/role', data)
}

export function updateRole(data) {
  return api.put('/role', data)
}

export function deleteRole(id) {
  return api.delete(`/role/${id}`)
}

export function getRolePermissions(roleId) {
  return api.get(`/role/${roleId}/permissions`)
}

export function assignRolePermissions(roleId, permissionIds) {
  return api.post(`/role/${roleId}/permissions`, permissionIds)
} 