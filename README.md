# 权限管理系统

一个基于RBAC的权限管理系统基础框架，适用于毕业设计，Java初学者。

## 广告
需要定制开发各种系统、毕业设计的朋友看过来：![dmz](./doc/dmz.jpg)  

[代码站](https://daimazhan.com)

用户：admin 密码：123123

## 技术栈
JDK 17 , node 18
1. springboot 2.5.15
2. mybatis-plus 3.5.3
3. sa-token v1.34.0
4. vue 3.3.4
5. element-plus 2.3.9
6. vite

## 主要功能
1. 登录
2. 用户管理
3. 权限管理
4. 角色管理

## 项目预览
![login](./doc/1.login.png)
![home](./doc/2.home.png)
![user](./doc/3.user.png)
![role](./doc/4.role.png)
![permission](./doc/5.permission.png)
![profile](./doc/6.profile.png)

## 项目结构
db: 数据库脚本  
src：后端目录  
web：前端目录


'401': '认证失败，无法访问系统资源',
'403': '当前操作没有权限',
'404': '访问资源不存在',
'default': '系统未知错误，请反馈给管理员'


### 动态菜单
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