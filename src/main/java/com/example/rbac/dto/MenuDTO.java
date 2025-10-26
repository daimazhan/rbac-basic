package com.example.rbac.dto;

import java.util.List;

import com.example.rbac.vo.Meta;

import lombok.Data;

@Data
public class MenuDTO {
    private Long id;
    private Long parentId;

    private String path;
    private String component;
    private String name;
    private Meta meta;
    private List<MenuDTO> children;
}