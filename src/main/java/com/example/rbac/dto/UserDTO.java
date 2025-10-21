package com.example.rbac.dto;

import lombok.Data;

/**
 * 用户数据对象
 */
@Data
public class UserDTO {
    private String username;
    private String password;
    private String nickname;
    private String email;
    private String phone;
    private Integer status;
}
