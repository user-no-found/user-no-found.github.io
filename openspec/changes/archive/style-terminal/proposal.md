# 变更提案：切换为终端(Cyberpunk)风格

## 概述
响应用户"终端风格"的需求，将 Icarus 主题切换为 `cyberpunk` 变体，并调整配色以适配"雾凇"背景。

## 需求场景
### 场景 1：暗色终端风
- Given 访客浏览博客
- When 页面加载
- Then 界面应呈现暗色调（Terminal/Cyberpunk 风格），且内容卡片为半透明黑色，以确保在"雾凇"背景下文字清晰可见。

## 技术方案
1. 修改 `_config.icarus.yml`：
   - 将 `variant` 从 `default` 改为 `cyberpunk`。
2. 更新 `source/css/custom.css`：
   - 将卡片背景颜色从 "半透明白" (`rgba(255,255,255,0.85)`) 改为 "半透明黑" (`rgba(0,0,0,0.85)`)。
   - 确保文字颜色适配暗色背景（Cyberpunk 默认已处理，主要是背景层的适配）。
3. 编译生成。

## 影响范围
- 全站视觉风格（从亮色转为暗色）。
