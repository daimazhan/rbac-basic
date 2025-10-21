package com.example.rbac.vo;


import lombok.Builder;
import lombok.Data;


@Data
@Builder
public class Meta {
    private String icon;
    private String title;
    @Builder.Default
    private Boolean isFull = false;
    @Builder.Default
    private Boolean isAffix = true;
    @Builder.Default
    private Boolean isKeepAlive = true;
}
