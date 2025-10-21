package com.example.rbac.service.impl;

import com.example.rbac.dto.RoleQueryDTO;
import com.example.rbac.entity.Role;
import com.example.rbac.mapper.RoleMapper;
import com.example.rbac.service.RoleService;
import com.example.rbac.vo.RoleListVO;
import com.example.rbac.vo.RoleVO;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import org.springframework.beans.BeanUtils;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class RoleServiceImpl implements RoleService {

    private final JdbcTemplate jdbcTemplate;
    private final RoleMapper roleMapper;

    public RoleServiceImpl(JdbcTemplate jdbcTemplate, RoleMapper roleMapper) {
        this.jdbcTemplate = jdbcTemplate;
        this.roleMapper = roleMapper;
    }

    @Override
    public RoleListVO selectAll(RoleQueryDTO roleQueryDTO) {
        PageHelper.startPage(roleQueryDTO);
        List<Role> roles = roleMapper.selectAll(roleQueryDTO);
        PageInfo<Role> pageInfo = new PageInfo<>(roles);

        return RoleListVO.builder().rows(pageInfo.getList().stream().map(item -> {
            RoleVO roleVO = new RoleVO();
            BeanUtils.copyProperties(item, roleVO);
            return roleVO;
        }).toList()).total(pageInfo.getTotal()).build();
    }

    @Override
    public RoleVO getRoleById(Long id) {
        Role role = roleMapper.selectById(id);
        if (role == null) {
            return null;
        }
        RoleVO roleVO = new RoleVO();
        BeanUtils.copyProperties(role, roleVO);
        // 获取角色权限ID列表
        List<Long> permissionIds = jdbcTemplate.queryForList(
            "SELECT permission_id FROM sys_role_permission WHERE role_id = ?",
            Long.class, id);
        roleVO.setPermissionIds(permissionIds);
        return roleVO;
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public void createRole(RoleVO roleVO) {
        Role role = new Role();
        BeanUtils.copyProperties(roleVO, role);
        roleMapper.insert(role);
        // 保存角色权限关系
        if (roleVO.getPermissionIds() != null && !roleVO.getPermissionIds().isEmpty()) {
            assignRolePermissions(role.getId(), roleVO.getPermissionIds());
        }
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public void updateRole(RoleVO roleVO) {
        Role role = new Role();
        BeanUtils.copyProperties(roleVO, role);
        roleMapper.update(role);
        // 更新角色权限关系
        jdbcTemplate.update("DELETE FROM sys_role_permission WHERE role_id = ?", role.getId());
        if (roleVO.getPermissionIds() != null && !roleVO.getPermissionIds().isEmpty()) {
            assignRolePermissions(role.getId(), roleVO.getPermissionIds());
        }
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public void deleteRole(Long id) {
        // 删除角色权限关系
        jdbcTemplate.update("DELETE FROM sys_role_permission WHERE role_id = ?", id);
        // 删除用户角色关系
        jdbcTemplate.update("DELETE FROM sys_user_role WHERE role_id = ?", id);
        // 删除角色
        roleMapper.delete(id);
    }

    @Override
    public List<Role> getRolesByUserId(Long userId) {
        return roleMapper.selectRolesByUserId(userId);
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public void assignRolePermissions(Long roleId, List<Long> permissionIds) {
        // 先删除原有的角色权限关系
        jdbcTemplate.update("DELETE FROM sys_role_permission WHERE role_id = ?", roleId);
        // 批量插入新的角色权限关系
        String sql = "INSERT INTO sys_role_permission (role_id, permission_id) VALUES (?, ?)";
        for (Long permissionId : permissionIds) {
            jdbcTemplate.update(sql, roleId, permissionId);
        }
    }

    @Override
    public List<Role> getRoleOptions(RoleQueryDTO roleQueryDTO) {
        return roleMapper.selectAll(roleQueryDTO);
    }
}