# 变更提案：添加自定义背景图片

## 概述
将博客背景设置为 "雾凇.jpg"，以解决用户反馈的视觉美观问题。

## 需求场景
### 场景 1：全站背景
- Given 访客浏览博客的任意页面
- When 页面渲染时
- Then 背景应显示为 "雾凇.jpg"，且固定不随滚动条移动 (fixed coverage)。

## 技术方案
1. 创建 `source/css/custom.css`，定义 `body` 的背景样式。
   - 图片路径：`/images/雾凇.jpg`
   - 样式：`background-size: cover; background-attachment: fixed;`
2. 创建 `scripts/injector.js`，利用 Hexo Injector API 将 custom.css 自动插入到页面 `<head>` 中。
   - 这种方式兼容性好，无需修改主题源码 (node_modules)。

## 影响范围
- 全站所有页面的背景。
