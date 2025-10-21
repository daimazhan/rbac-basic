package com.example.rbac.mapper;

import com.example.rbac.dto.RoleQueryDTO;
import com.example.rbac.entity.Role;
import com.example.rbac.entity.UserRole;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface RoleMapper {
    int insert(Role record);

    int delete(Long id);

    int update(Role record);

    Role selectById(Long id);

    List<Role> selectAll(RoleQueryDTO role);

    List<Role> selectRolesByUserId(Long userId);

    List<Long> selectRoleIdsByUserId(Long userId);

    int deleteRoleIdsByUserId(Long userId);

    int insertUserRole(UserRole userRole);
}