package com.example.rbac.vo;

import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class RoleListVO {
    private List<RoleVO> rows;
    private Long total;
}
