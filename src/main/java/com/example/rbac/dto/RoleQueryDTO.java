package com.example.rbac.dto;

import lombok.Data;
import lombok.EqualsAndHashCode;

@EqualsAndHashCode(callSuper = true)
@Data
public class RoleQueryDTO extends BaseQueryDTO {
    private String roleName;
    private String roleCode;
    private Integer status;
}
