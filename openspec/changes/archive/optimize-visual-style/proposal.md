# 变更提案：优化视觉风格（小白猫+飘雪）

## 概述
根据用户反馈，当前视觉效果与雪景/简约主题不符。本提案将把 Live2D 桌宠更换为简约的"小白猫"（Tororo），并将粒子特效改为与背景呼应的"飘雪"效果，移除多余的 UI 元素。

## 需求场景
### 场景 1：浏览博客
- Given 用户打开博客
- When 页面加载完成
- Then 右下角/左下角显示一只小白猫（无对话框干扰）
- And 屏幕上有白色半透明雪花缓缓飘落

## 技术方案
### Live2D 调整
- 移除 `stevenjoezhang/live2d-widget`（其包含复杂的 UI 和默认人形模型）。
- 引入核心库 `live2d.min.js`。
- 直接加载 `live2d-widget-model-tororo` 模型。

### 特效调整
- 重写 `source/js/effects.js` 为飘雪逻辑（Canvas 实现）。
- 雪花为白色圆点，随机大小、透明度、下落速度。

## 影响范围
- `scripts/injector.js`: 修改注入逻辑。
- `source/js/effects.js`: 重写代码。
