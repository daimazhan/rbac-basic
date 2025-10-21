package com.example.rbac.controller;

import cn.dev33.satoken.annotation.SaCheckPermission;
import com.example.rbac.common.result.Result;
import com.example.rbac.dto.RoleQueryDTO;
import com.example.rbac.entity.Permission;
import com.example.rbac.service.PermissionService;
import com.example.rbac.service.RoleService;
import com.example.rbac.vo.RoleVO;
import lombok.AllArgsConstructor;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("/role")
public class RoleController {

    private final RoleService roleService;
    private final PermissionService permissionService;

    @GetMapping("/list")
    @SaCheckPermission(value = {"sys:role:list"})
    public Result<?> list(RoleQueryDTO roleQueryDTO) {
        return Result.success(roleService.selectAll(roleQueryDTO));
    }

    @GetMapping("/options")
    @SaCheckPermission(value = {"sys:role:list"})
    public Result<?> options(RoleQueryDTO roleQueryDTO) {
        return Result.success(roleService.getRoleOptions(roleQueryDTO));
    }

    @GetMapping("/{id}")
    @SaCheckPermission(value = {"sys:role:query"})
    public Result<RoleVO> getRole(@PathVariable Long id) {
        return Result.success(roleService.getRoleById(id));
    }

    @PostMapping
    @SaCheckPermission(value = {"sys:role:create"})
    public Result<?> createRole(@RequestBody @Validated RoleVO roleVO) {
        roleService.createRole(roleVO);
        return Result.success();
    }

    @PutMapping
    @SaCheckPermission(value = {"sys:role:update"})
    public Result<?> updateRole(@RequestBody @Validated RoleVO roleVO) {
        roleService.updateRole(roleVO);
        return Result.success();
    }

    @DeleteMapping("/{id}")
    @SaCheckPermission(value = {"sys:role:delete"})
    public Result<?> deleteRole(@PathVariable Long id) {
        roleService.deleteRole(id);
        return Result.success();
    }

    @GetMapping("/{roleId}/permissions")
    @SaCheckPermission(value = {"sys:role:list"})
    public Result<?> getRolePermissions(@PathVariable Long roleId) {
        List<Permission> rolePermissions = permissionService.getRolePermissions(roleId);
        return Result.success(rolePermissions);
    }

    /**
     * 分配权限
     * @param roleId 角色ID
     * @param permissionIds 权限ID列表
     * @return 操作结果
     */
    @PostMapping("/{roleId}/permissions")
    @SaCheckPermission(value = {"sys:role:assignPermissions"}, orRole = "manager")
    public Result<?> assignPermissions(@PathVariable Long roleId, @RequestBody List<Long> permissionIds) {
        roleService.assignRolePermissions(roleId, permissionIds);
        return Result.success();
    }
} 