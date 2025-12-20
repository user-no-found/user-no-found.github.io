---
title: AI 主动记录的笔记
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

## Vite 静态资源管理

### 两种存放位置

| 目录 | 特点 | 访问方式 |
|------|------|----------|
| `public/` | 原样复制，不处理 | 绝对路径 `/xxx.jpg` |
| `src/assets/` | 会被 Vite 处理（压缩、哈希） | 需要 import 导入 |

### 何时用哪个？

- **`public/`**：背景图、favicon、不需要处理的大图
- **`src/assets/`**：需要在组件中 import、希望自动优化的资源

### 路径写法（重要）

```css
/*❌ 错误：不能用相对路径访问 public */
background-image: url('../public/images/bg.jpg');

/*✅ 正确：public 下的文件直接用 / 开头 */
background-image: url('/images/bg.jpg');
```

---

## Vue 单文件组件（SFC）

### 三段式结构

```vue
<template>
  <!-- HTML 结构 -->
</template>

<script setup lang="ts">
//JavaScript/TypeScript 逻辑
</script>

<style scoped>
/* CSS 样式 */
</style>
```

### CSS 背景图常用属性

| 属性 | 作用 |
|------|------|
| `background-image` | 设置图片路径 |
| `background-size: cover` | 图片铺满容器 |
| `background-position: center` | 图片居中 |
| `background-repeat: no-repeat` | 不重复 |
| `background-attachment: fixed` | 滚动时背景固定 |
| `min-height: 100vh` | 最小高度为视口高度 |

---

## CSS 基础概念

### margin 和 padding（边距）

```
┌─────────────────────────── 浏览器窗口
│  ← margin（外边距）→
│  ┌───────────────────────
│  │ ← padding（内边距）→
│  │ ┌───────────────────
│  │ │ 内容区域
```

- **margin**：元素**外面**的空白
- **padding**：元素**里面**的空白
- 浏览器默认给 `body` 加了 `margin: 8px`，需要手动重置

```css
body {
  margin: 0;
  padding: 0;
}
```

### height vs min-height

| 属性 | 含义 |
|------|------|
| `height: 100vh` | 高度**刚好**是视口高度 |
| `min-height: 100vh` | 高度**至少**是视口高度，内容多可以更高 |

### overflow（溢出处理）

当内容超出容器时的处理方式：

| 值 | 效果 |
|------|------|
| `visible` | 溢出部分照常显示（默认） |
| `hidden` | 溢出部分隐藏 |
| `scroll` | 强制显示滚动条 |
| `auto` | 需要时才显示滚动条 |

---

## Vue 组件化

### 什么是组件？

把 UI 拆成独立、可复用的小块。相同结构不同数据的元素适合做成组件。

### 创建组件

在 `src/components/` 下创建 `.vue` 文件：

```vue
<template>
  <div>{{ title }}</div>
</template>

<script setup lang="ts">
//定义接收的属性
const props = defineProps<{
  title: string
}>()

//定义触发的事件
const emit = defineEmits<{
  click: []
}>()
</script>
```

### 使用组件

```vue
<script setup lang="ts">
//1. 导入组件
import MyComponent from '../components/MyComponent.vue'
</script>

<template>
  <!-- 2. 当标签使用 -->
  <MyComponent :title="'标题'" @click="handleClick" />
</template>
```

### Props 和 Emit

| 概念 | 作用 | 方向 |
|------|------|------|
| Props | 父组件传数据给子组件 | 父 → 子 |
| Emit | 子组件通知父组件 | 子 → 父 |

---

## v-for 循环渲染

```vue
<组件
  v-for="item in list"
  :key="item.id"
  :prop="item.value"
/>
```

| 部分 | 含义 |
|------|------|
| `v-for="item in list"` | 遍历 list，每次 item 代表一个元素 |
| `:key="item.id"` | 唯一标识，Vue 用来追踪元素 |
| `:prop="item.value"` | 传递属性，`:` 是 `v-bind:` 的简写 |

---

## Flex 弹性布局

```css
.container {
  display: flex;          /* 启用弹性布局 */
  flex-wrap: wrap;        /* 允许换行 */
  gap: 20px;              /* 元素间距 */
  align-content: flex-start; /* 从顶部排列 */
}
```

| 属性 | 作用 |
|------|------|
| `display: flex` | 容器变成弹性盒子 |
| `flex-direction` | 排列方向（row横/column竖） |
| `flex-wrap` | 是否换行 |
| `gap` | 元素间距 |
| `align-items` | 交叉轴对齐 |
| `justify-content` | 主轴对齐 |

---

## CSS 定位（position）

### 定位类型

| 值 | 含义 |
|------|------|
| `static` | 默认，正常文档流 |
| `relative` | 相对自身原位置偏移 |
| `absolute` | 相对最近定位祖先偏移 |
| `fixed` | 相对视口固定，不随滚动 |
| `sticky` | 滚动到阈值时固定 |

### 固定定位居中技巧

```css
.center-fixed {
  position: fixed;
  left: 50%;                    /* 左边距50% */
  transform: translateX(-50%);  /* 左移自身宽度一半 */
}
```

原理：`left: 50%` 让元素左边缘在中间，`translateX(-50%)` 再左移自身宽度的一半，实现真正居中。

---

## CSS 特效

### 半透明背景

```css
background: rgba(255, 255, 255, 0.2);
```

`rgba` 的第四个参数是透明度，0 完全透明，1 完全不透明。

### 毛玻璃效果

```css
backdrop-filter: blur(10px);
```

让元素背后的内容模糊，配合半透明背景使用。

### 圆角

```css
border-radius: 16px;
```

值越大越圆，`50%` 变成圆形。

---

## JavaScript 箭头函数

### 语法对比

```typescript
//传统写法
function add(a, b) {
  return a + b
}

//箭头函数写法
const add = (a, b) => {
  return a + b
}

//单行可省略 return
const add = (a, b) => a + b
```

### 结构解析

```typescript
const 函数名 = (参数: 类型) => {
  //函数体
}
```

---

## Vue 动态样式绑定

### :style 绑定对象

```vue
<div :style="{ left: x + 'px', top: y + 'px' }">
```

等价于：
```html
<div style="left: 100px; top: 200px;">
```

`:style` 是 `v-bind:style` 的简写，值是 JavaScript 对象。

---

## 鼠标事件与拖拽

### 三个核心事件

| 事件 | 时机 |
|------|------|
| `mousedown` | 按下鼠标 |
| `mousemove` | 移动鼠标 |
| `mouseup` | 松开鼠标 |

### 拖拽实现思路

1. `mousedown`：记录起始位置，添加监听
2. `mousemove`：计算偏移，更新位置
3. `mouseup`：移除监听

```typescript
const startDrag = (e: MouseEvent) => {
  document.addEventListener('mousemove', onDrag)
  document.addEventListener('mouseup', stopDrag)
}

const stopDrag = () => {
  document.removeEventListener('mousemove', onDrag)
  document.removeEventListener('mouseup', stopDrag)
}
```

---

## Vue 条件渲染

### v-if

```vue
<div v-if="isVisible">只在条件为真时渲染</div>
```

`v-if` 为 false 时，元素完全不存在于 DOM 中。

### v-html

```vue
<div v-html="htmlString"></div>
```

渲染 HTML 字符串。普通 `{{ }}` 会转义 HTML 标签。

---

## slot 插槽

允许父组件向子组件传递内容：

**子组件：**
```vue
<div class="window">
  <slot></slot>  <!-- 占位符 -->
</div>
```

**父组件使用：**
```vue
<AppWindow>
  <p>这里的内容会替换 slot</p>
</AppWindow>
```

---

## z-index 层级

控制元素的堆叠顺序：

```css
.window {
  position: absolute;
  z-index: 100;  /* 值越大越靠上 */
}
```

注意：`z-index` 只对定位元素（position 不为 static）生效。

---

*持续更新中...*
