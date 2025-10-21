package com.example.rbac.service;

import com.example.rbac.dto.UserDTO;
import com.example.rbac.dto.UserQueryDTO;
import com.example.rbac.entity.User;
import com.example.rbac.vo.UserListVO;
import com.example.rbac.vo.UserVO;

import java.util.List;

public interface UserService {
    int insert(UserDTO record);

    int delete(Long id);

    int update(User record);

    User selectById(Long id);

    UserListVO selectAll(UserQueryDTO queryDTO);

    /**
     * 用户登录
     */
    User login(String username, String password);

    /**
     * 获取当前登录用户信息
     */
    UserVO getCurrentUserInfo();

    /**
     * 根据用户名查询用户
     */
    User getByUsername(String username);


    void assignUserRoles(Long id, List<Long> roleIds);

    /**
     * 注册用户
     */
    void register(UserDTO userDTO);
}
