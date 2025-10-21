package com.example.rbac.controller;

import cn.dev33.satoken.annotation.SaCheckPermission;
import com.example.rbac.common.result.Result;
import com.example.rbac.entity.Permission;
import com.example.rbac.service.PermissionService;
import com.example.rbac.vo.PermissionVO;
import lombok.AllArgsConstructor;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("/permission")
public class PermissionController {

    private final PermissionService permissionService;

    @GetMapping("/tree")
    @SaCheckPermission(value = {"sys:permission:list"}, orRole = {"manager"})
    public Result<List<PermissionVO>> getPermissionTree() {
        return Result.success(permissionService.getPermissionTree());
    }

    @GetMapping("/user/{userId}")
    @SaCheckPermission(value = {"sys:permission:list"}, orRole = {"manager"})
    public Result<List<Permission>> getUserPermissions(@PathVariable Long userId) {
        return Result.success(permissionService.getUserPermissions(userId));
    }

    @GetMapping("/role/{roleId}")
    @SaCheckPermission(value = {"sys:permission:list"}, orRole = {"manager"})
    public Result<List<Permission>> getRolePermissions(@PathVariable Long roleId) {
        return Result.success(permissionService.getRolePermissions(roleId));
    }

    @PostMapping
    @SaCheckPermission(value = {"sys:permission:create"})
    public Result<?> createPermission(@RequestBody @Validated Permission permission) {
        permissionService.createPermission(permission);
        return Result.success();
    }

    @PutMapping
    @SaCheckPermission(value = {"sys:permission:update"})
    public Result<?> updatePermission(@RequestBody @Validated Permission permission) {
        permissionService.updatePermission(permission);
        return Result.success();
    }

    @DeleteMapping("/{id}")
    @SaCheckPermission(value = {"sys:permission:delete"})
    public Result<?> deletePermission(@PathVariable Long id) {
        permissionService.deletePermission(id);
        return Result.success();
    }
} 