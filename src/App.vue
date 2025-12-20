<template>
  <div class="app-container">
    <router-view />
  </div>
</template>

<script setup lang="ts">
//暂无逻辑
</script>

<style>
/* 全局样式（可选） */

/* 重置 body 默认边距 */
body {
  margin: 0;
  padding: 0;
}

.app-container {
  background-image: url('/image/background.jpg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  height: 100vh;/* 刚好视口高度 */
  overflow: hidden;     /* 超出部分隐藏 */
}
</style>