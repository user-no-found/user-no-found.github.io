# 变更提案：Dock 栏功能完善

## Why

Dock 栏目前只有静态图标，缺乏实际功能。需要添加文件管理、搜索、开始菜单和窗口切换功能，提升用户体验。

## What Changes

- 📁 文件：点击打开文件管理器窗口，列出所有文章
- 🔍 搜索：点击打开搜索窗口，可搜索文章
- 🏠 开始：点击打开开始菜单，显示用户头像/信息和功能入口
- 已打开窗口在 Dock 栏显示小标签，点击可切换到对应窗口

## Impact

- 修改组件：DockBar.vue、Desktop.vue
- 新增组件：FileManager.vue、SearchWindow.vue、StartMenu.vue
- 需要在 Desktop.vue 中管理更多窗口状态
