# 变更提案：桌面风格 UI 布局

## 概述

将博客首页设计成类似 Windows/Mac 的桌面风格界面，包含桌面图标、Dock 栏和可拖拽窗口。

## 需求场景

### 场景 1：查看桌面
- Given 用户访问博客首页
- When 页面加载完成
- Then 显示桌面背景、桌面图标和底部 Dock 栏

### 场景 2：打开文章窗口
- Given 用户在桌面上看到文章图标
- When 点击图标
- Then 打开一个可拖拽的窗口，显示文章内容

### 场景 3：操作窗口
- Given 窗口已打开
- When 用户拖拽窗口标题栏
- Then 窗口跟随移动
- When 用户拖拽窗口边缘
- Then 窗口可缩放大小
- When 用户点击关闭按钮
- Then 窗口关闭

## 技术方案

### 组件结构
```
App.vue
└── Desktop.vue（桌面容器）
    ├── DesktopIcon.vue（桌面图标组件）
    ├── DockBar.vue（底部 Dock 栏）
    └── AppWindow.vue（可拖拽窗口组件）
```

### 核心功能
- **桌面图标**：网格布局，展示已有文章
- **Dock 栏**：固定在底部，可放置常用入口
- **窗口组件**：支持拖拽移动、缩放、关闭

## 影响范围

- 新增组件：DesktopIcon.vue、DockBar.vue、AppWindow.vue
- 修改组件：Home.vue → 重命名为 Desktop.vue
- 修改路由：更新 router/index.ts 中的组件引用
- 不影响现有文章数据
