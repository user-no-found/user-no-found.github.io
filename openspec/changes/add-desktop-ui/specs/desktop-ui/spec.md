## ADDED Requirements

### Requirement: 桌面布局
系统 SHALL 提供类似操作系统桌面的布局界面。

#### Scenario: 桌面加载
- **WHEN** 用户访问首页
- **THEN** 显示全屏背景图
- **THEN** 显示桌面图标区域
- **THEN** 显示底部 Dock 栏

### Requirement: 桌面图标
系统 SHALL 提供可点击的桌面图标组件。

#### Scenario: 图标显示
- **WHEN** 桌面加载完成
- **THEN** 以网格布局显示文章图标
- **THEN** 每个图标显示图标图片和标题

#### Scenario: 图标点击
- **WHEN** 用户点击桌面图标
- **THEN** 打开对应的窗口

### Requirement: Dock 栏
系统 SHALL 提供固定在底部的 Dock 栏。

#### Scenario: Dock 栏显示
- **WHEN** 桌面加载完成
- **THEN** Dock 栏固定显示在屏幕底部
- **THEN** Dock 栏显示常用入口图标

### Requirement: 窗口组件
系统 SHALL 提供可交互的窗口组件。

#### Scenario: 窗口打开
- **WHEN** 用户点击图标
- **THEN** 窗口在桌面居中显示
- **THEN** 窗口包含标题栏和内容区域

#### Scenario: 窗口拖拽
- **WHEN** 用户拖拽窗口标题栏
- **THEN** 窗口跟随鼠标移动

#### Scenario: 窗口缩放
- **WHEN** 用户拖拽窗口边缘或角落
- **THEN** 窗口大小随之改变

#### Scenario: 窗口关闭
- **WHEN** 用户点击窗口关闭按钮
- **THEN** 窗口关闭并从桌面移除
