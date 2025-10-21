package com.example.rbac.controller;

import cn.dev33.satoken.annotation.SaCheckLogin;
import cn.dev33.satoken.stp.StpUtil;
import com.example.rbac.common.result.Result;
import com.example.rbac.dto.MenuDTO;
import com.example.rbac.dto.UserDTO;
import com.example.rbac.entity.User;
import com.example.rbac.service.PermissionService;
import com.example.rbac.service.UserService;
import com.example.rbac.vo.LoginDTO;
import com.example.rbac.vo.PermissionVO;
import com.example.rbac.vo.UserVO;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/auth")
@Validated
@Slf4j
@AllArgsConstructor
public class AuthController {

    private final UserService userService;
    private final PermissionService permissionService;


    @PostMapping("/login")
    public Result<String> login(@RequestBody @Valid LoginDTO loginDTO) {
        User user = userService.login(loginDTO.getUsername(), loginDTO.getPassword());
        if (user != null) {
            StpUtil.login(user.getId());
            return Result.success(StpUtil.getTokenValue());
        }
        return Result.error("用户名或密码错误");
    }

    @PostMapping("/logout")
    public Result<?> logout() {
        StpUtil.logout();
        return Result.success();
    }

    @SaCheckLogin
    @GetMapping("/info")
    public Result<UserVO> getUserInfo() {
        return Result.success(userService.getCurrentUserInfo());
    }

    @SaCheckLogin
    @GetMapping("/menu")
    public Result<List<MenuDTO>> getMenuTree() {
        return Result.success(permissionService.getMenuTree());
    }

    @PostMapping("/register")
    public Result<?> register(@RequestBody UserDTO userDTO) {
        userService.register(userDTO);
        return Result.success();
    }
} 