/*
 Navicat Premium Dump SQL

 Source Server         : nas-mysql-local
 Source Server Type    : MySQL
 Source Server Version : 50709 (5.7.9)
 Source Host           : 192.168.1.25:3306
 Source Schema         : rbac

 Target Server Type    : MySQL
 Target Server Version : 50709 (5.7.9)
 File Encoding         : 65001

 Date: 03/11/2025 10:19:47
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for sys_permission
-- ----------------------------
DROP TABLE IF EXISTS `sys_permission`;
CREATE TABLE `sys_permission` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '权限ID',
  `parent_id` bigint(20) DEFAULT '0' COMMENT '父权限ID',
  `name` varchar(50) NOT NULL COMMENT '权限名称',
  `type` tinyint(4) NOT NULL COMMENT '类型(1:菜单,2:按钮)',
  `permission_code` varchar(100) DEFAULT NULL COMMENT '权限标识',
  `path` varchar(255) DEFAULT NULL COMMENT '路由地址',
  `component` varchar(255) DEFAULT NULL COMMENT '组件路径',
  `icon` varchar(100) DEFAULT NULL COMMENT '图标',
  `sort` int(11) DEFAULT '0' COMMENT '排序',
  `status` tinyint(4) DEFAULT '1' COMMENT '状态(0:禁用,1:启用)',
  `create_time` datetime DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `update_time` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COMMENT='权限表';

-- ----------------------------
-- Records of sys_permission
-- ----------------------------
BEGIN;
INSERT INTO `sys_permission` (`id`, `parent_id`, `name`, `type`, `permission_code`, `path`, `component`, `icon`, `sort`, `status`, `create_time`, `update_time`) VALUES (1, 15, '用户管理', 1, 'sys:user:list', '/user', '/src/views/system/user/index.vue', 'User', 0, 1, '2025-01-15 17:02:02', '2025-01-23 18:59:25');
INSERT INTO `sys_permission` (`id`, `parent_id`, `name`, `type`, `permission_code`, `path`, `component`, `icon`, `sort`, `status`, `create_time`, `update_time`) VALUES (2, 1, '新增', 2, 'sys:user:create', '', '', '', 1, 1, '2025-01-15 17:04:57', '2025-01-15 17:04:57');
INSERT INTO `sys_permission` (`id`, `parent_id`, `name`, `type`, `permission_code`, `path`, `component`, `icon`, `sort`, `status`, `create_time`, `update_time`) VALUES (3, 1, '删除', 2, 'sys:user:delete', '', '', '', 2, 1, '2025-01-15 17:05:31', '2025-01-15 17:05:31');
INSERT INTO `sys_permission` (`id`, `parent_id`, `name`, `type`, `permission_code`, `path`, `component`, `icon`, `sort`, `status`, `create_time`, `update_time`) VALUES (4, 15, '角色管理', 1, 'sys:role:list', '/role', '/src/views/system/role/index.vue', 'Connection', 1, 1, '2025-01-15 17:12:58', '2025-01-23 18:59:37');
INSERT INTO `sys_permission` (`id`, `parent_id`, `name`, `type`, `permission_code`, `path`, `component`, `icon`, `sort`, `status`, `create_time`, `update_time`) VALUES (5, 4, '新增', 2, 'sys:role:create', '', '', '', 0, 1, '2025-01-15 17:14:47', '2025-01-15 17:14:47');
INSERT INTO `sys_permission` (`id`, `parent_id`, `name`, `type`, `permission_code`, `path`, `component`, `icon`, `sort`, `status`, `create_time`, `update_time`) VALUES (6, 1, '分配角色', 2, 'sys:user:assignRoles', '', '', '', 4, 1, '2025-01-16 00:59:37', '2025-01-16 01:30:29');
INSERT INTO `sys_permission` (`id`, `parent_id`, `name`, `type`, `permission_code`, `path`, `component`, `icon`, `sort`, `status`, `create_time`, `update_time`) VALUES (7, 1, '更新', 2, 'sys:user:update', '', '', '', 3, 1, '2025-01-16 01:24:41', '2025-01-16 01:30:35');
INSERT INTO `sys_permission` (`id`, `parent_id`, `name`, `type`, `permission_code`, `path`, `component`, `icon`, `sort`, `status`, `create_time`, `update_time`) VALUES (8, 4, '删除', 2, 'sys:role:delete', '', '', '', 1, 1, '2025-01-16 01:25:50', '2025-01-16 01:25:50');
INSERT INTO `sys_permission` (`id`, `parent_id`, `name`, `type`, `permission_code`, `path`, `component`, `icon`, `sort`, `status`, `create_time`, `update_time`) VALUES (9, 4, '更新', 2, 'sys:role:update', '', '', '', 2, 1, '2025-01-16 01:26:32', '2025-01-16 01:26:32');
INSERT INTO `sys_permission` (`id`, `parent_id`, `name`, `type`, `permission_code`, `path`, `component`, `icon`, `sort`, `status`, `create_time`, `update_time`) VALUES (10, 4, '分配权限', 2, 'sys:role:assignPermissions', '', '', '', 3, 1, '2025-01-16 01:27:08', '2025-01-16 01:27:08');
INSERT INTO `sys_permission` (`id`, `parent_id`, `name`, `type`, `permission_code`, `path`, `component`, `icon`, `sort`, `status`, `create_time`, `update_time`) VALUES (11, 15, '权限管理', 1, 'sys:permission:list', '/permission', '/src/views/system/permission/index.vue', 'Unlock', 2, 1, '2025-01-16 01:41:57', '2025-01-23 18:59:49');
INSERT INTO `sys_permission` (`id`, `parent_id`, `name`, `type`, `permission_code`, `path`, `component`, `icon`, `sort`, `status`, `create_time`, `update_time`) VALUES (12, 11, '新增', 2, 'sys:permission:create', '', '', '', 0, 1, '2025-01-16 01:42:34', '2025-01-16 01:42:34');
INSERT INTO `sys_permission` (`id`, `parent_id`, `name`, `type`, `permission_code`, `path`, `component`, `icon`, `sort`, `status`, `create_time`, `update_time`) VALUES (13, 11, '删除', 2, 'sys:permission:delete', '', '', '', 1, 1, '2025-01-16 01:42:54', '2025-01-16 01:42:54');
INSERT INTO `sys_permission` (`id`, `parent_id`, `name`, `type`, `permission_code`, `path`, `component`, `icon`, `sort`, `status`, `create_time`, `update_time`) VALUES (14, 11, '更新', 2, 'sys:permission:update', '', '', '', 2, 1, '2025-01-16 01:43:18', '2025-01-16 01:43:18');
INSERT INTO `sys_permission` (`id`, `parent_id`, `name`, `type`, `permission_code`, `path`, `component`, `icon`, `sort`, `status`, `create_time`, `update_time`) VALUES (15, 0, '系统管理', 1, 'sys:*', '/system', '/src/views/system', 'Setting', 0, 1, '2025-01-16 02:08:25', '2025-01-23 18:58:58');
INSERT INTO `sys_permission` (`id`, `parent_id`, `name`, `type`, `permission_code`, `path`, `component`, `icon`, `sort`, `status`, `create_time`, `update_time`) VALUES (16, 1, '更新秘密', 2, 'sys:user:password', '', '', '', 5, 1, '2025-01-28 01:24:22', '2025-01-28 01:25:26');
INSERT INTO `sys_permission` (`id`, `parent_id`, `name`, `type`, `permission_code`, `path`, `component`, `icon`, `sort`, `status`, `create_time`, `update_time`) VALUES (17, 1, '更新资料', 2, 'sys:user:profile', '', '', '', 6, 1, '2025-01-28 01:25:14', '2025-01-28 01:25:14');
INSERT INTO `sys_permission` (`id`, `parent_id`, `name`, `type`, `permission_code`, `path`, `component`, `icon`, `sort`, `status`, `create_time`, `update_time`) VALUES (18, 0, '业务管理', 1, 'business:*', '/business', '/src/views/business', 'House', 1, 1, '2025-10-23 11:32:23', '2025-10-23 11:34:41');
INSERT INTO `sys_permission` (`id`, `parent_id`, `name`, `type`, `permission_code`, `path`, `component`, `icon`, `sort`, `status`, `create_time`, `update_time`) VALUES (19, 18, '测试', 1, 'business:test:list', '/test', '/src/views/business/test/index.vue', 'Pointer', 0, 1, '2025-10-23 11:59:13', '2025-10-25 09:47:54');
INSERT INTO `sys_permission` (`id`, `parent_id`, `name`, `type`, `permission_code`, `path`, `component`, `icon`, `sort`, `status`, `create_time`, `update_time`) VALUES (20, 19, '新增', 2, 'business:test:create', '', '', '', 0, 1, '2025-10-23 12:00:51', '2025-10-23 12:00:51');
COMMIT;

-- ----------------------------
-- Table structure for sys_role
-- ----------------------------
DROP TABLE IF EXISTS `sys_role`;
CREATE TABLE `sys_role` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '角色ID',
  `role_name` varchar(50) NOT NULL COMMENT '角色名称',
  `role_code` varchar(50) NOT NULL COMMENT '角色编码',
  `description` varchar(255) DEFAULT NULL COMMENT '角色描述',
  `status` tinyint(4) DEFAULT '1' COMMENT '状态(0:禁用,1:启用)',
  `create_time` datetime DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `update_time` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  PRIMARY KEY (`id`),
  UNIQUE KEY `idx_role_code` (`role_code`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COMMENT='角色表';

-- ----------------------------
-- Records of sys_role
-- ----------------------------
BEGIN;
INSERT INTO `sys_role` (`id`, `role_name`, `role_code`, `description`, `status`, `create_time`, `update_time`) VALUES (1, '管理员', 'manager', '系统管理员', 1, '2025-01-14 20:24:58', '2025-01-14 20:24:58');
INSERT INTO `sys_role` (`id`, `role_name`, `role_code`, `description`, `status`, `create_time`, `update_time`) VALUES (2, '普通用户', 'user', '普通用户', 1, '2025-01-15 17:26:14', '2025-01-15 17:26:14');
COMMIT;

-- ----------------------------
-- Table structure for sys_role_permission
-- ----------------------------
DROP TABLE IF EXISTS `sys_role_permission`;
CREATE TABLE `sys_role_permission` (
  `role_id` bigint(20) NOT NULL COMMENT '角色ID',
  `permission_id` bigint(20) NOT NULL COMMENT '权限ID',
  PRIMARY KEY (`role_id`,`permission_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='角色权限关联表';

-- ----------------------------
-- Records of sys_role_permission
-- ----------------------------
BEGIN;
INSERT INTO `sys_role_permission` (`role_id`, `permission_id`) VALUES (1, 1);
INSERT INTO `sys_role_permission` (`role_id`, `permission_id`) VALUES (1, 2);
INSERT INTO `sys_role_permission` (`role_id`, `permission_id`) VALUES (1, 3);
INSERT INTO `sys_role_permission` (`role_id`, `permission_id`) VALUES (1, 4);
INSERT INTO `sys_role_permission` (`role_id`, `permission_id`) VALUES (1, 5);
INSERT INTO `sys_role_permission` (`role_id`, `permission_id`) VALUES (1, 6);
INSERT INTO `sys_role_permission` (`role_id`, `permission_id`) VALUES (1, 7);
INSERT INTO `sys_role_permission` (`role_id`, `permission_id`) VALUES (1, 8);
INSERT INTO `sys_role_permission` (`role_id`, `permission_id`) VALUES (1, 9);
INSERT INTO `sys_role_permission` (`role_id`, `permission_id`) VALUES (1, 10);
INSERT INTO `sys_role_permission` (`role_id`, `permission_id`) VALUES (1, 11);
INSERT INTO `sys_role_permission` (`role_id`, `permission_id`) VALUES (1, 12);
INSERT INTO `sys_role_permission` (`role_id`, `permission_id`) VALUES (1, 13);
INSERT INTO `sys_role_permission` (`role_id`, `permission_id`) VALUES (1, 14);
INSERT INTO `sys_role_permission` (`role_id`, `permission_id`) VALUES (1, 15);
INSERT INTO `sys_role_permission` (`role_id`, `permission_id`) VALUES (1, 16);
INSERT INTO `sys_role_permission` (`role_id`, `permission_id`) VALUES (1, 17);
INSERT INTO `sys_role_permission` (`role_id`, `permission_id`) VALUES (1, 18);
INSERT INTO `sys_role_permission` (`role_id`, `permission_id`) VALUES (1, 19);
INSERT INTO `sys_role_permission` (`role_id`, `permission_id`) VALUES (1, 20);
INSERT INTO `sys_role_permission` (`role_id`, `permission_id`) VALUES (2, 18);
INSERT INTO `sys_role_permission` (`role_id`, `permission_id`) VALUES (2, 19);
INSERT INTO `sys_role_permission` (`role_id`, `permission_id`) VALUES (2, 20);
COMMIT;

-- ----------------------------
-- Table structure for sys_user
-- ----------------------------
DROP TABLE IF EXISTS `sys_user`;
CREATE TABLE `sys_user` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '用户ID',
  `username` varchar(50) NOT NULL COMMENT '用户名',
  `password` varchar(100) NOT NULL COMMENT '密码',
  `nickname` varchar(50) DEFAULT NULL COMMENT '昵称',
  `email` varchar(100) DEFAULT NULL COMMENT '邮箱',
  `phone` varchar(20) DEFAULT NULL COMMENT '手机号',
  `status` tinyint(4) DEFAULT '1' COMMENT '状态(0:禁用,1:启用)',
  `create_time` datetime DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `update_time` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  PRIMARY KEY (`id`),
  UNIQUE KEY `idx_username` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COMMENT='用户表';

-- ----------------------------
-- Records of sys_user
-- ----------------------------
BEGIN;
INSERT INTO `sys_user` (`id`, `username`, `password`, `nickname`, `email`, `phone`, `status`, `create_time`, `update_time`) VALUES (1, 'admin', '4297f44b13955235245b2497399d7a93', '管理员', NULL, NULL, 1, '2025-01-15 21:58:24', '2025-01-25 19:18:32');
INSERT INTO `sys_user` (`id`, `username`, `password`, `nickname`, `email`, `phone`, `status`, `create_time`, `update_time`) VALUES (3, 'test', '4297f44b13955235245b2497399d7a93', '普通用户', '123@qq.com', '', 1, '2025-01-11 01:26:36', '2025-01-28 01:28:33');
INSERT INTO `sys_user` (`id`, `username`, `password`, `nickname`, `email`, `phone`, `status`, `create_time`, `update_time`) VALUES (4, 'user123', '4297f44b13955235245b2497399d7a93', NULL, NULL, NULL, 1, '2025-10-21 18:33:02', '2025-10-21 18:33:02');
COMMIT;

-- ----------------------------
-- Table structure for sys_user_role
-- ----------------------------
DROP TABLE IF EXISTS `sys_user_role`;
CREATE TABLE `sys_user_role` (
  `user_id` bigint(20) NOT NULL COMMENT '用户ID',
  `role_id` bigint(20) NOT NULL COMMENT '角色ID',
  PRIMARY KEY (`user_id`,`role_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='用户角色关联表';

-- ----------------------------
-- Records of sys_user_role
-- ----------------------------
BEGIN;
INSERT INTO `sys_user_role` (`user_id`, `role_id`) VALUES (1, 1);
INSERT INTO `sys_user_role` (`user_id`, `role_id`) VALUES (2, 1);
INSERT INTO `sys_user_role` (`user_id`, `role_id`) VALUES (2, 2);
INSERT INTO `sys_user_role` (`user_id`, `role_id`) VALUES (3, 2);
INSERT INTO `sys_user_role` (`user_id`, `role_id`) VALUES (4, 2);
INSERT INTO `sys_user_role` (`user_id`, `role_id`) VALUES (10, 2);
INSERT INTO `sys_user_role` (`user_id`, `role_id`) VALUES (11, 2);
INSERT INTO `sys_user_role` (`user_id`, `role_id`) VALUES (13, 2);
INSERT INTO `sys_user_role` (`user_id`, `role_id`) VALUES (14, 2);
INSERT INTO `sys_user_role` (`user_id`, `role_id`) VALUES (15, 2);
COMMIT;

SET FOREIGN_KEY_CHECKS = 1;
