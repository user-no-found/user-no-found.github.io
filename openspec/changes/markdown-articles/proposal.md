# 变更提案：Markdown 文章功能

## 概述
实现基于 Markdown 文件的静态文章系统，支持读取和渲染 Markdown 格式的博客文章。

## 需求场景

### 场景 1：查看文章列表
- Given 用户访问博客首页
- When 页面加载完成
- Then 显示所有文章的列表（标题、日期、摘要）

### 场景 2：阅读文章详情
- Given 用户在文章列表页
- When 点击某篇文章
- Then 跳转到文章详情页，显示完整的 Markdown 渲染内容

### 场景 3：创建新文章
- Given 开发者想发布新文章
- When 在指定目录创建 `.md` 文件
- Then 重新构建后文章自动出现在列表中

## 技术方案

### 目录结构
```
src/
├── posts/              # 文章存放目录
│   └── hello-world.md  # 示例文章
├── views/
│   ├── Home.vue        # 首页（文章列表）
│   └── Post.vue        # 文章详情页
├── router/
│   └── index.ts        # 路由配置
└── utils/
    └── markdown.ts     # Markdown 处理工具
```

### 文章格式（Front Matter）
```markdown
---
title: 文章标题
date: 2025-12-19
summary: 文章摘要
---

正文内容...
```

### 依赖库
- `marked` 或 `markdown-it`：Markdown 解析
- `gray-matter`：解析 Front Matter（可选，也可手动解析）

### 路由设计
| 路径 | 组件 | 说明 |
|------|------|------|
| `/` | Home.vue | 文章列表 |
| `/post/:slug` | Post.vue | 文章详情 |

## 影响范围
- 新增 `posts/` 目录
- 新增路由配置
- 新增页面组件
- 需要安装 Markdown 解析依赖
