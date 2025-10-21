# 权限管理系统

一个基于RBAC的权限管理系统基础框架。

## 技术栈
JDK 17
1. springboot 2.5.15
2. mybatis-plus 3.5.3
3. sa-token v1.34.0
4. vue 3.3.4
5. element-plus 2.3.9
6. vite

## 主要功能
1. 注册登录
2. 用户管理
3. 权限管理
4. 角色管理

## 项目结构
db: 数据库脚本  
src：后端目录  
web：前端目录

## 错误码

* '401': '认证失败，无法访问系统资源',
* '403': '当前操作没有权限',
* '404': '访问资源不存在',
* 'default': '系统未知错误，请反馈给管理员'


## 动态菜单
以下是菜单的数据基本结构：
```json

      {
        path: '/system',
        name: 'system',
        meta: {
          icon: 'Setting',
          title: '系统管理',
          isFull: false,
          isAffix: true,
          isKeepAlive: true
        },
        children: [
          {
            path: '/user',
            name: 'userManage',
            component: '/system/user/index.vue',
            meta: {
              icon: 'User',
              title: '用户管理',
              isFull: false,
              isAffix: true,
              isKeepAlive: true
            }
          },
          {
            path: '/role',
            name: 'roleManage',
            component: '/system/role/index.vue',
            meta: {
              icon: 'Connection',
              title: '角色管理',
              isFull: false,
              isAffix: true,
              isKeepAlive: true
            }
          },
          {
            path: '/permission',
            name: 'permissionManage',
            component: '/system/permission/index.vue',
            meta: {
              icon: 'Unlock',
              title: '权限管理',
              isFull: false,
              isAffix: true,
              isKeepAlive: true
            }
          }
        ]
      }
      ```