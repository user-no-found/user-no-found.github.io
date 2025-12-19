# 变更提案：博客现代化重构与更名

## 概述
将现有 Hexo 博客的主题从默认的 'landscape' 替换为现代化的 'icarus' 主题，并将博客名称修改为 "My Tech Blog"（暂定），以提升视觉效果和用户体验。

## 需求场景
### 场景 1：访问首页
- Given 访客访问博客首页
- When 页面加载完成
- Then 访客应看到现代化的三栏布局（Icarus 风格），且站点名称显示为 "My Tech Blog"

## 技术方案
1. 安装 `hexo-theme-icarus` 主题。
   - 注意：Icarus (v5+) 通常需要 `hexo-renderer-inferno`。
   - 使用 npm 安装依赖。
2. 修改根目录 `_config.yml`：
   - 更新 `title` 为 `My Tech Blog`。
   - 更新 `theme` 为 `icarus`。
3. 编译生成静态文件。

## 影响范围
- 现有 `themes/landscape` 配置将被停用。
- 页面布局和样式将发生重大变化。
