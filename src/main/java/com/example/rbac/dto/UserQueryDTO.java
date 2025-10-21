package com.example.rbac.dto;

import lombok.Data;
import lombok.EqualsAndHashCode;

/**
 * 用户查询对象
 */
@Data
@EqualsAndHashCode(callSuper = true)
public class UserQueryDTO extends BaseQueryDTO {
    private String username;
    private String phone;
    private Integer status;
}
