# 变更提案：修复视觉问题

## 概述
修复小白猫桌宠不显示的问题，并优化雪花特效使其更自然。

## 需求场景
### 场景 1：桌宠显示
- Given 用户访问页面
- When 页面加载
- Then 必须显示小白猫模型（Tororo）
- And 不显示任何对话框或工具栏

### 场景 2：雪花特效
- Given 雪花飘落
- When 观察雪花
- Then 雪花应有半透明渐变效果，且摆动自然（模拟风力）

## 技术方案
### 桌宠修复
- 放弃纯 CDN 加载（不稳定）。
- 将 Tororo 模型资源下载到本地 `source/live2d_models/tororo/`。
- 修改 `injector.js` 使用本地路径加载。

### 雪花优化
- 优化 `source/js/effects.js`，使用 `createRadialGradient` 绘制雪花。
- 调整运动算法。

## 影响范围
- 新增 `source/live2d_models/`
- 修改 `source/js/effects.js`
- 修改 `scripts/injector.js`
