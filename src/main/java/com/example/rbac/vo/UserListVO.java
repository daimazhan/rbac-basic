package com.example.rbac.vo;

import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class UserListVO {
    private List<UserVO> rows;
    private Long total;
}
