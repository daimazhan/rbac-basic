package com.example.rbac.service.impl;

import cn.dev33.satoken.stp.StpUtil;
import com.example.rbac.dto.UserDTO;
import com.example.rbac.dto.UserQueryDTO;
import com.example.rbac.entity.Permission;
import com.example.rbac.entity.Role;
import com.example.rbac.entity.User;
import com.example.rbac.entity.UserRole;
import com.example.rbac.mapper.PermissionMapper;
import com.example.rbac.mapper.RoleMapper;
import com.example.rbac.mapper.UserMapper;
import com.example.rbac.service.UserService;
import com.example.rbac.vo.UserListVO;
import com.example.rbac.vo.UserVO;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import lombok.AllArgsConstructor;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.DigestUtils;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class UserServiceImpl implements UserService {
    private final UserMapper userMapper;
    private final RoleMapper roleMapper;
    private final PermissionMapper permissionMapper;

    @Override
    public int insert(UserDTO record) {
        User user = new User();
        BeanUtils.copyProperties(record, user);
        user.setPassword(DigestUtils.md5DigestAsHex(record.getPassword().getBytes()));
        return userMapper.insert(user);
    }

    @Override
    public int delete(Long id) {
        return userMapper.delete(id);
    }

    @Override
    public int update(User record) {
        return userMapper.update(record);
    }

    @Override
    public User selectById(Long id) {
        return userMapper.selectById(id);
    }

    @Override
    public UserListVO selectAll(UserQueryDTO userQueryDTO) {
        PageHelper.startPage(userQueryDTO);
        List<User> list = userMapper.selectAll(userQueryDTO);
        PageInfo<User> pageInfo = new PageInfo<>(list);
        return UserListVO.builder().rows(
                pageInfo.getList().stream().map(user -> {
                    UserVO userVO = new UserVO();
                    BeanUtils.copyProperties(user, userVO);
                    List<Long> ids = roleMapper.selectRoleIdsByUserId(user.getId());
                    userVO.setRoleIds(ids);
                    return userVO;
                }).toList()).total(pageInfo.getTotal()).build();
    }

    @Override
    public User login(String username, String password) {
        // 查询用户
        User user = getByUsername(username);
        if (user == null) {
            return null;
        }

        // 密码校验（使用MD5加密）
        String encryptedPassword = DigestUtils.md5DigestAsHex(password.getBytes());
        if (!user.getPassword().equals(encryptedPassword)) {
            return null;
        }

        return user;
    }

    @Override
    public UserVO getCurrentUserInfo() {
        // 获取当前登录用户ID
        Long userId = StpUtil.getLoginIdAsLong();
        User user = userMapper.selectById(userId);

        UserVO userVO = new UserVO();
        BeanUtils.copyProperties(user, userVO);

        // 获取用户角色和权限列表
        List<Role> roles = roleMapper.selectRolesByUserId(userId);
        userVO.setRoles(roles.stream().map(Role::getRoleCode).collect(Collectors.toList()));
        List<Permission> permissions = permissionMapper.selectPermissionsByUserId(userId);
        userVO.setPermissions(permissions.stream().map(Permission::getPermissionCode).collect(Collectors.toList()));

        return userVO;
    }

    @Override
    public User getByUsername(String username) {
        return userMapper.selectByUsername(username);
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public void assignUserRoles(Long id, List<Long> roleIds) {
//        StpUtil.log
        roleMapper.deleteRoleIdsByUserId(id);
        roleIds.forEach(roleId -> {
            UserRole role = new UserRole();
            role.setRoleId(roleId);
            role.setUserId(id);
            roleMapper.insertUserRole(role);
        });
    }

    @Override
    public void register(UserDTO userDTO) {
        User u = getByUsername(userDTO.getUsername());
        if (u != null) {
            throw new RuntimeException("用户名已存在");
        }
        User user = new User();
        BeanUtils.copyProperties(userDTO, user);
        user.setPassword(DigestUtils.md5DigestAsHex(userDTO.getPassword().getBytes()));
        userMapper.insert(user);
        // 注册用户时，默认分配用户角色
        assignUserRoles(user.getId(), Arrays.asList(2L));
    }
} 