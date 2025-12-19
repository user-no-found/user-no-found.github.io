<template>
  <div class="blog-app">
    <div class="blog-sidebar">
      <h2 class="sidebar-title">文章列表</h2>
      <div class="post-list">
        <button 
          v-for="post in posts" 
          :key="post.id"
          class="post-item"
          :class="{ active: selectedPost?.id === post.id }"
          @click="selectPost(post)"
        >
          <span class="post-title">{{ post.title }}</span>
          <span class="post-date">{{ post.date }}</span>
        </button>
      </div>
    </div>
    <div class="blog-content">
      <template v-if="selectedPost">
        <h1 class="content-title">{{ selectedPost.title }}</h1>
        <div class="content-meta">
          <span>📅 {{ selectedPost.date }}</span>
        </div>
        <div class="content-body" v-html="selectedPost.content"></div>
      </template>
      <div v-else class="content-empty">
        <p>👈 选择一篇文章开始阅读</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

interface Post {
  id: number
  title: string
  date: string
  content: string
}

const posts = ref<Post[]>([
  {
    id: 1,
    title: '欢迎来到我的博客',
    date: '2024-01-01',
    content: `
      <p>这是一个使用 Vue 3 构建的 Windows 11 风格博客。</p>
      <p>你可以在这里发布和阅读文章，体验现代化的桌面风格界面。</p>
      <h2>主要特性</h2>
      <ul>
        <li>Windows 11 风格的窗口系统</li>
        <li>可拖拽、缩放的窗口</li>
        <li>毛玻璃效果（Acrylic）</li>
        <li>开始菜单和任务栏</li>
      </ul>
    `
  },
  {
    id: 2,
    title: '如何使用这个博客',
    date: '2024-01-02',
    content: `
      <p>这个博客模仿了 Windows 11 的桌面体验。</p>
      <h2>基本操作</h2>
      <ul>
        <li>双击桌面图标打开应用</li>
        <li>拖动窗口标题栏移动窗口</li>
        <li>点击最大化按钮全屏显示</li>
        <li>点击任务栏图标切换窗口</li>
      </ul>
    `
  }
])


const selectedPost = ref<Post | null>(null)

function selectPost(post: Post) {
  selectedPost.value = post
}
</script>

<style scoped>
.blog-app {
  display: flex;
  height: 100%;
}

.blog-sidebar {
  width: 250px;
  background: rgba(0, 0, 0, 0.2);
  border-right: 1px solid rgba(255, 255, 255, 0.1);
  padding: 16px;
  overflow-y: auto;
}

.sidebar-title {
  font-size: 16px;
  margin-bottom: 16px;
  color: #fff;
}

.post-list {
  display: flex;
  flex-direction: column;
  gap: 4px;
}


.post-item {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 10px 12px;
  border: none;
  background: transparent;
  border-radius: 4px;
  cursor: pointer;
  text-align: left;
}

.post-item:hover {
  background: rgba(255, 255, 255, 0.1);
}

.post-item.active {
  background: rgba(96, 205, 255, 0.2);
}

.post-title {
  color: #fff;
  font-size: 14px;
}

.post-date {
  color: rgba(255, 255, 255, 0.5);
  font-size: 12px;
  margin-top: 4px;
}

.blog-content {
  flex: 1;
  padding: 24px;
  overflow-y: auto;
}


.content-title {
  font-size: 24px;
  color: #fff;
  margin-bottom: 12px;
}

.content-meta {
  color: rgba(255, 255, 255, 0.5);
  font-size: 14px;
  margin-bottom: 24px;
}

.content-body {
  color: rgba(255, 255, 255, 0.9);
  line-height: 1.7;
}

.content-body :deep(h2) {
  font-size: 18px;
  margin: 20px 0 12px;
  color: #60cdff;
}

.content-body :deep(ul) {
  padding-left: 20px;
  margin: 12px 0;
}

.content-body :deep(li) {
  margin: 6px 0;
}

.content-empty {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  color: rgba(255, 255, 255, 0.5);
  font-size: 16px;
}
</style>
