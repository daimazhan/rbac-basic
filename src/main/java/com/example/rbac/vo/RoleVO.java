package com.example.rbac.vo;

import lombok.Data;
import java.util.List;

@Data
public class RoleVO {
    private Long id;
    private String roleName;
    private String roleCode;
    private String description;
    private Integer status;
    private List<Long> permissionIds;
} 