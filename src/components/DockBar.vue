<template>
    <div class="dock">
        <div class="dock-item">
            <span class="dock-icon">📁</span>
            <span class="dock-title">文件</span>
        </div>
        <div class="dock-item">
            <span class="dock-icon">⚙️</span>
            <span class="dock-title">设置</span>
        </div>
        <div class="dock-item">
            <span class="dock-icon">🔍</span>
            <span class="dock-title">搜索</span>
        </div>
        <div class="dock-item">
            <span class="dock-icon">🏠</span>
            <span class="dock-title">首页</span>
        </div>
    </div>
</template>

<script setup lang="ts">

</script>

<style scoped>
/* Dock 栏样式 */
.dock {
    position: fixed;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
    background: rgba(255, 255, 255, 0.2);
    /* 半透明背景 */
    backdrop-filter: blur(10px);
    /* 毛玻璃效果 */
    border-radius: 16px;
    padding: 10px 20px;
    display: flex;
    gap: 15px;
}

.dock-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    cursor: pointer;
}

.dock-icon {
    font-size: 32px;
}

.dock-title {
    font-size: 10px;
    color: white;
    margin-top: 3px;
}
</style>