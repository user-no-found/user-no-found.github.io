# 变更提案：清理未使用的配置与主题

## 概述
删除不再使用的旧主题文件及相关配置文件，保持项目整洁。

## 需求场景
### 场景 1：项目清理
- Given 博客当前使用 `hexo-theme-icarus` (npm安装)
- When 执行清理操作
- Then 应当删除 `themes/landscape` (默认主题)、`themes/cactus` (未使用的下载主题) 以及 `_config.landscape.yml`。

## 技术方案
1. 删除目录 `themes/landscape`。
2. 删除目录 `themes/cactus`。
3. 删除文件 `_config.landscape.yml`。
4. 验证博客是否仍能正常编译。

## 影响范围
- 仅涉及未使用的文件，不影响当前站点功能。
