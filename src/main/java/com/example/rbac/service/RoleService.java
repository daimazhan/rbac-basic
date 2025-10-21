package com.example.rbac.service;

import com.example.rbac.dto.RoleQueryDTO;
import com.example.rbac.entity.Role;
import com.example.rbac.vo.RoleListVO;
import com.example.rbac.vo.RoleVO;
import java.util.List;

public interface RoleService {

    RoleListVO selectAll(RoleQueryDTO roleQueryDTO);
    /**
     * 获取角色详情
     */
    RoleVO getRoleById(Long id);

    /**
     * 创建角色
     */
    void createRole(RoleVO roleVO);

    /**
     * 更新角色
     */
    void updateRole(RoleVO roleVO);

    /**
     * 删除角色
     */
    void deleteRole(Long id);

    /**
     * 获取用户角色列表
     */
    List<Role> getRolesByUserId(Long userId);

    /**
     * 分配角色权限
     */
    void assignRolePermissions(Long roleId, List<Long> permissionIds);

    /**
     * 获取橘色下拉列表
     */
    List<Role> getRoleOptions(RoleQueryDTO roleQueryDTO);

} 