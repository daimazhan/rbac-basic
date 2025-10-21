package com.example.rbac.service;

import com.example.rbac.dto.MenuDTO;
import com.example.rbac.entity.Permission;
import com.example.rbac.vo.PermissionVO;
import java.util.List;

public interface PermissionService {
    /**
     * 获取权限树
     */
    List<PermissionVO> getPermissionTree();

    /**
     * 获取用户菜单
     */
    List<MenuDTO> getMenuTree();

    /**
     * 获取用户权限列表
     */
    List<Permission> getUserPermissions(Long userId);
    
    /**
     * 获取角色权限列表
     */
    List<Permission> getRolePermissions(Long roleId);
    
    /**
     * 创建权限
     */
    void createPermission(Permission permission);
    
    /**
     * 更新权限
     */
    void updatePermission(Permission permission);
    
    /**
     * 删除权限
     */
    void deletePermission(Long id);
} 