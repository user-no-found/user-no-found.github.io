# 变更提案：设置博客头像

## 概述
将博客侧边栏个人资料卡片的头像设置为 "头像.jpg"。

## 需求场景
### 场景 1：侧边栏个人资料
- Given 访客查看博客侧边栏
- When 渲染 Profile 组件时
- Then 头像应显示为 `source/images/头像.jpg`

## 技术方案
1. 修改 `_config.icarus.yml`。
2. 定位到 `widgets` -> `type: profile`。
3. 将 `avatar` 字段的值更新为 `/images/头像.jpg`。
4. 编译生成静态文件。

## 影响范围
- 侧边栏 Profile 小部件。
