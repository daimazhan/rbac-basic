package com.example.rbac.vo;

import lombok.Data;
import java.util.List;

@Data
public class UserVO {
    private Long id;
    private String username;
    private String nickname;
    private String email;
    private String phone;
    private Integer status;
    private List<Long> roleIds;
    private List<String> roles;
    private List<String> permissions;
} 