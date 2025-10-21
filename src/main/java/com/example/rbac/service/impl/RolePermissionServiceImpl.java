package com.example.rbac.service.impl;

import cn.dev33.satoken.stp.StpInterface;
import com.example.rbac.entity.Permission;
import com.example.rbac.entity.Role;
import com.example.rbac.mapper.PermissionMapper;
import com.example.rbac.mapper.RoleMapper;
import com.example.rbac.mapper.UserMapper;
import com.example.rbac.service.RolePermissionService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class RolePermissionServiceImpl implements RolePermissionService, StpInterface {
    private final PermissionMapper permissionMapper;
    private final RoleMapper roleMapper;

    @Override
    public List<String> getPermissionList(Object loginId, String loginType) {
        if (loginId == null) {
            throw new RuntimeException("用户没有登录");
        }
        List<Permission> permissions = permissionMapper.selectPermissionsByUserId(Long.valueOf((String) loginId));
        return permissions.stream().map(Permission::getPermissionCode).toList();
    }

    @Override
    public List<String> getRoleList(Object loginId, String loginType) {
        if (loginId == null) {
            throw new RuntimeException("用户没有登录");
        }
        List<Role> roles = roleMapper.selectRolesByUserId(Long.valueOf((String) loginId));
        return roles.stream().map(Role::getRoleCode).toList();
    }
}
