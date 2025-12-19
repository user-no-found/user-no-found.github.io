<template>
  <div class="about-app">
    <div class="about-header">
      <img class="avatar" src="/avatar.jpg" alt="头像" />
      <h1 class="name">博客作者</h1>
      <p class="bio">一个热爱技术的开发者</p>
    </div>
    <div class="about-content">
      <div class="info-section">
        <h2>关于我</h2>
        <p>欢迎来到我的 Windows 11 风格博客！</p>
        <p>这个博客使用 Vue 3 + TypeScript 构建，模拟了 Windows 11 的桌面体验。</p>
      </div>
      <div class="info-section">
        <h2>技术栈</h2>
        <div class="tech-tags">
          <span class="tag">Vue 3</span>
          <span class="tag">TypeScript</span>
          <span class="tag">Vite</span>
          <span class="tag">Pinia</span>
        </div>
      </div>
      <div class="info-section">
        <h2>联系方式</h2>
        <p>📧 Email: example@example.com</p>
        <p>🐙 GitHub: github.com/example</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
</script>

<style scoped>
.about-app {
  padding: 24px;
  height: 100%;
  overflow-y: auto;
}

.about-header {
  text-align: center;
  margin-bottom: 32px;
}

.avatar {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 16px;
}

.name {
  font-size: 24px;
  color: #fff;
  margin-bottom: 8px;
}

.bio {
  color: rgba(255, 255, 255, 0.6);
  font-size: 14px;
}

.about-content {
  max-width: 400px;
  margin: 0 auto;
}


.info-section {
  margin-bottom: 24px;
}

.info-section h2 {
  font-size: 16px;
  color: #60cdff;
  margin-bottom: 12px;
  padding-bottom: 8px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.info-section p {
  color: rgba(255, 255, 255, 0.8);
  font-size: 14px;
  line-height: 1.6;
  margin: 6px 0;
}

.tech-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.tag {
  padding: 4px 12px;
  background: rgba(96, 205, 255, 0.2);
  color: #60cdff;
  border-radius: 4px;
  font-size: 12px;
}
</style>
