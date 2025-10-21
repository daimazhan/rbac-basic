package com.example.rbac.mapper;

import com.example.rbac.dto.UserQueryDTO;
import com.example.rbac.entity.User;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface UserMapper {

    int insert(User record);

    int delete(Long id);

    int update(User record);

    User selectById(Long id);

    List<User> selectAll(UserQueryDTO userQueryDTO);

    User selectByUsername(String username);
} 