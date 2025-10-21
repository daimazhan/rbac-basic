package com.example.rbac.dto;

import lombok.Data;

@Data
public class ProfileDTO {
    private String username;
    private String password;
    private String currentPassword;
    private String nickname;
    private String email;
    private String phone;
    private Integer status;
}
