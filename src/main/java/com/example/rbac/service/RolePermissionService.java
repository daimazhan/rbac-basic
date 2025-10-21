package com.example.rbac.service;

import java.util.List;

public interface RolePermissionService {

    /**
     * 获取指定用户的全部权限
     * @param userId 用户登录ID
     * @param loginType 登录类型，暂时忽略
     * @return 用户的所有权限
     */
    List<String> getPermissionList(Object userId, String loginType);

    /**
     * 获取指定用户的所有角色
     * @param userId 用户登录ID
     * @param loginType 登录类型，暂时忽略
     * @return 用户的所有角色
     */
    List<String> getRoleList(Object userId, String loginType);
}
