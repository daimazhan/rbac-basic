package com.example.rbac.mapper;

import com.example.rbac.entity.Permission;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

import java.util.List;

@Mapper
public interface PermissionMapper {
    int insert(Permission record);

    int delete(Long id);

    int update(Permission record);

    Permission selectById(Long id);

    List<Permission> selectAll(Permission permission);

    @Select("""
                    SELECT p.* FROM sys_permission p
                    LEFT JOIN sys_role_permission rp ON p.id = rp.permission_id
                    WHERE rp.role_id = #{roleId}
            """)
    List<Permission> selectPermissionsByRoleId(Long roleId);


    @Select("""
                    SELECT DISTINCT p.* FROM sys_permission p
                    LEFT JOIN sys_role_permission rp ON p.id = rp.permission_id
                    LEFT JOIN sys_user_role ur ON rp.role_id = ur.role_id
                    WHERE ur.user_id = #{userId} AND p.type = 1
            """)
    List<Permission> selectPermissionsByUserId(Long userId);

    @Select("""
            delete from sys_permission where parent_id = #{id}
            """)
    Integer deleteByParentId(Long id);
} 