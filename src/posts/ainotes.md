---
title: AI 学习笔记
date: 2025-12-19
summary: Vue3 学习过程中的知识点记录
---

# AI 学习笔记

> 本文件由 AI 维护，记录学习过程中的知识点。

---

## Vue Router

### 什么是路由？
路由 = URL 和页面的对应关系。访问不同 URL，显示不同页面。

### 核心概念

| 概念 | 说明 |
|------|------|
| `path` | URL 路径，如 `/` 或 `/post/:slug` |
| `component` | 该路径对应的 Vue 组件 |
| `:slug` | 动态参数，如 `/post/hello` 中 `slug = 'hello'` |
| `router-link` | 跳转链接（不刷新页面） |
| `router-view` | 显示当前路由对应的组件 |

### 懒加载
```typescript
component: () => import('./views/Home.vue')
```
- 普通 import：打包时全部加载
- 懒加载：访问时才加载，首屏更快

---

## Vite

### import.meta.glob
批量导入多个文件：
```typescript
const files = import.meta.glob('./posts/*.md')
```
返回对象，key 是文件路径，value 是加载函数。

---

## Markdown

### Front Matter
文章开头的元信息，用 `---` 包裹：
```markdown
---
title: 标题
date: 2025-12-19
---
```
需要自己写代码解析提取。

---

## TypeScript

### 类型声明
告诉 TypeScript 某种文件的类型：
```typescript
declare module '*.md' { ... }
```
放在 `.d.ts` 文件中。

### 可能为 undefined 的处理

TypeScript 严格模式下，变量可能为 `undefined` 时需要处理：

**问题代码：**
```typescript
const slug = path.split('/').pop()?.replace('.md', '')
//slug 类型是 string | undefined
```

**解决方法：**
```typescript
const fileName = path.split('/').pop()
const slug = fileName ? fileName.replace('.md', '') : ''
//先判断再使用
```

**或者用默认值：**
```typescript
const slug = path.split('/').pop()?.replace('.md', '') || ''
```

---

*持续更新中...*
