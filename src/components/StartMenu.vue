<template>
    <div class="start-menu" @click.stop>
        <!-- 用户信息区-->
        <div class="user-section" @click="openProfile">
            <img class="avatar" src="/image/avatar.jpg" alt="头像" />
            <span class="username">user-no-found</span>
        </div>

        <!-- 分隔线 -->
        <div class="menu-divider"></div>

        <!-- 功能入口 -->
        <div class="menu-item" @click="emit('openFileManager')">
            <span class="menu-icon">📁</span>
            <span class="menu-text">文件</span>
        </div>
        <div class="menu-item" @click="emit('openSearch')">
            <span class="menu-icon">🔍</span>
            <span class="menu-text">搜索</span>
        </div>
    </div>
</template>

<script setup lang="ts">
//GitHub 主页 URL
const GITHUB_URL = 'https://github.com/user-no-found'

const emit = defineEmits<{
    openFileManager: []
    openSearch: []
    openProfile: [url: string]
    close: []
}>()

//点击头像打开主页
const openProfile = () => {
    emit('openProfile', GITHUB_URL)
}
</script>

<style scoped>
.start-menu {
    position: absolute;
    bottom: 60px;
    left: 0;
    width: 280px;
    background: rgba(255, 255, 255, 0.95);
    border-radius: 12px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
    padding: 15px;
    backdrop-filter: blur(10px);
}

.user-section {
    display: flex;
    align-items: center;
    padding: 10px;
    border-radius: 8px;
    cursor: pointer;
}

.user-section:hover {
    background: rgba(0, 0, 0, 0.05);
}

.avatar {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    object-fit: cover;
}

.username {
    margin-left: 15px;
    font-size: 16px;
    font-weight: bold;
}

.menu-divider {
    height: 1px;
    background: #eee;
    margin: 15px 0;
}

.menu-item {
    display: flex;
    align-items: center;
    padding: 10px;
    border-radius: 8px;
    cursor: pointer;
}

.menu-item:hover {
    background: rgba(0, 0, 0, 0.05);
}

.menu-icon {
    font-size: 20px;
}

.menu-text {
    margin-left: 10px;
    font-size: 14px;
}
</style>
