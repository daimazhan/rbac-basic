package com.example.rbac.controller;


import cn.dev33.satoken.annotation.SaCheckLogin;
import cn.dev33.satoken.annotation.SaCheckPermission;
import cn.dev33.satoken.stp.StpUtil;
import com.example.rbac.common.result.Result;
import com.example.rbac.dto.ProfileDTO;
import com.example.rbac.dto.UserDTO;
import com.example.rbac.dto.UserQueryDTO;
import com.example.rbac.entity.User;
import com.example.rbac.service.UserService;
import com.example.rbac.vo.UserVO;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.BeanUtils;
import org.springframework.util.DigestUtils;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/user")
@Validated
@Slf4j
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/list")
    @SaCheckPermission(value = {"sys:user:list"}, orRole = {"manager"})
    public Result<?> list(UserQueryDTO userQueryDTO) {
        return Result.success(userService.selectAll(userQueryDTO));
    }

    @PostMapping("")
    @SaCheckPermission(value = {"sys:user:create"})
    public Result<?> create(@RequestBody UserDTO userDTO) {
        userService.insert(userDTO);
        return Result.success();
    }

    @DeleteMapping("/{id}")
    @SaCheckPermission("sys:user:delete")
    public Result<?> delete(@PathVariable Long id) {
        List<String> permissionList = StpUtil.getPermissionList();
        System.out.println("permissionList = " + permissionList);
        return Result.success(userService.delete(id));
    }

    @PostMapping("/{id}/roles")
    @SaCheckPermission(value = {"sys:user:assignRoles"})
    public Result<?> assignRoles(@PathVariable Long id, @RequestBody List<Long> roleIds) {
        userService.assignUserRoles(id, roleIds);
        return Result.success();
    }

    @PutMapping("/update")
    @SaCheckPermission(value = {"sys:user:update"})
    public Result<String> update(@RequestBody UserDTO userDTO) {
        User user = userService.getByUsername(userDTO.getUsername());
        if (user == null) {
            throw new RuntimeException("用户不存在");
        }
        User user1 = new User();
        BeanUtils.copyProperties(userDTO, user1);
        user1.setId(user.getId());
        int update = userService.update(user1);
        if (update == 1) {
            return Result.success();
        }
        return Result.error("更新失败！");
    }

    @PutMapping("/profile")
    @SaCheckPermission(value = {"sys:user:profile"})
    public Result<String> profile(@RequestBody UserDTO userDTO) {
        User user = userService.selectById(StpUtil.getLoginIdAsLong());
        if (user.getNickname().equals(userDTO.getNickname())) {
            return Result.success("操作成功");
        }
        user.setNickname(userDTO.getNickname());
        int update = userService.update(user);
        if (update == 1) {
            return Result.success();
        }
        return Result.error("更新失败！");
    }

    @PostMapping("/password")
    @SaCheckPermission(value = {"sys:user:password"})
    public Result<String> password(@RequestBody ProfileDTO profile) {
        User user = userService.selectById(StpUtil.getLoginIdAsLong());
        if (!user.getPassword().equals(DigestUtils.md5DigestAsHex(profile.getCurrentPassword().getBytes()))) {
            return Result.error("原始密码错误");
        }
        user.setPassword(DigestUtils.md5DigestAsHex(profile.getPassword().getBytes()));
        int update = userService.update(user);
        if (update == 1) {
            return Result.success();
        }
        return Result.error("更新失败！");
    }

    @SaCheckLogin
    @GetMapping("/info")
    public Result<UserVO> getUserInfo() {
        return Result.success(userService.getCurrentUserInfo());
    }
}
