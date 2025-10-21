package com.example.rbac.service.impl;

import cn.dev33.satoken.stp.StpUtil;

import com.example.rbac.dto.MenuDTO;
import com.example.rbac.entity.Permission;
import com.example.rbac.mapper.PermissionMapper;
import com.example.rbac.service.PermissionService;
import com.example.rbac.vo.Meta;
import com.example.rbac.vo.PermissionVO;
import org.springframework.beans.BeanUtils;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class PermissionServiceImpl implements PermissionService {

    private final JdbcTemplate jdbcTemplate;
    private final PermissionMapper permissionMapper;

    public PermissionServiceImpl(JdbcTemplate jdbcTemplate, PermissionMapper permissionMapper) {
        this.jdbcTemplate = jdbcTemplate;
        this.permissionMapper = permissionMapper;
    }


    @Override
    public List<PermissionVO> getPermissionTree() {
        // 获取所有权限
        Permission p = new Permission();
        List<Permission> permissions = permissionMapper.selectAll(p);

        // 转换为VO
        List<PermissionVO> permissionVOs = permissions.stream().map(permission -> {
            PermissionVO vo = new PermissionVO();
            BeanUtils.copyProperties(permission, vo);
            return vo;
        }).toList();

        // 构建树形结构
        Map<Long, List<PermissionVO>> parentMap = permissionVOs.stream()
                .collect(Collectors.groupingBy(PermissionVO::getParentId));

        permissionVOs.forEach(vo -> vo.setChildren(parentMap.get(vo.getId())));

        return permissionVOs.stream()
                .filter(vo -> vo.getParentId() == 0)
                .collect(Collectors.toList());
    }

    @Override
    public List<MenuDTO> getMenuTree() {
        // 获取所有权限
        List<Permission> permissions = permissionMapper.selectPermissionsByUserId(StpUtil.getLoginIdAsLong());

        // 转换为VO
        List<MenuDTO> menuList = permissions.stream().map(permission -> {
            MenuDTO vo = new MenuDTO();
            BeanUtils.copyProperties(permission, vo);
            vo.setMeta(Meta.builder().icon(permission.getIcon()).title(permission.getName()).build());

            return vo;
        }).toList();

        // 构建树形结构
        Map<Long, List<MenuDTO>> parentMap = menuList.stream().collect(Collectors.groupingBy(MenuDTO::getParentId));

        menuList.forEach(vo -> vo.setChildren(parentMap.get(vo.getId())));

        return menuList.stream().filter(vo -> vo.getParentId() == 0).toList();
    }

    @Override
    public List<Permission> getUserPermissions(Long userId) {
        return permissionMapper.selectPermissionsByUserId(userId);
    }

    @Override
    public List<Permission> getRolePermissions(Long roleId) {
        return permissionMapper.selectPermissionsByRoleId(roleId);
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public void createPermission(Permission permission) {
        permissionMapper.insert(permission);
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public void updatePermission(Permission permission) {
        permissionMapper.update(permission);
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public void deletePermission(Long id) {
        // 删除子权限
        permissionMapper.deleteByParentId(id);
        // 删除当前权限
        permissionMapper.delete(id);
        // 删除角色权限关系
        jdbcTemplate.update("DELETE FROM sys_role_permission WHERE permission_id = ?", id);
    }
} 