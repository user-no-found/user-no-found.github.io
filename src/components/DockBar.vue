<template>
    <div class="dock">
        <!-- 开始按钮 -->
        <div class="dock-item" @click.stop="toggleStartMenu">
            <span class="dock-icon">🏠</span>
            <span class="dock-title">开始</span>
            <StartMenu
                v-if="isStartMenuOpen"
                @open-file-manager="emit('openFileManager'); closeAll()"
                @open-search="openSearchFromStart"
                @open-profile="handleOpenProfile"
                @close="closeAll"
            />
        </div>

        <!-- 搜索按钮 -->
        <div class="dock-item" @click.stop="toggleSearch">
            <span class="dock-icon">🔍</span>
            <span class="dock-title">搜索</span>
            <SearchWindow
                v-if="isSearchOpen"
                :posts="posts"
                @open-file="handleOpenFile"
            />
        </div>

        <!-- 文件按钮 -->
        <div class="dock-item" @click="closeAll(); emit('openFileManager')">
            <span class="dock-icon">📁</span>
            <span class="dock-title">文件</span>
        </div>

        <!-- 分隔线 -->
        <div v-if="openWindows.length > 0" class="divider"></div>

        <!-- 已打开的窗口标签 -->
        <div
            v-for="win in openWindows"
            :key="win.post.slug"
            class="dock-item window-tag"
            @click="closeAll(); emit('selectWindow', win.post.slug)"
        >
            <span class="dock-icon">📄</span>
            <span class="dock-title">{{ win.post.title }}</span>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import type { PostMeta } from '../utils/posts'
import StartMenu from './StartMenu.vue'
import SearchWindow from './SearchWindow.vue'

interface OpenWindow {
    post: PostMeta
    zIndex: number
}

const props = defineProps<{
    openWindows: OpenWindow[]
    posts: PostMeta[]
}>()

const emit = defineEmits<{
    selectWindow: [slug: string]
    openFileManager: []
    openFile: [post: PostMeta]
    openProfile: [url: string]
}>()

//开始菜单状态
const isStartMenuOpen = ref(false)

//搜索状态
const isSearchOpen = ref(false)

//关闭所有弹出菜单
const closeAll = () => {
    isStartMenuOpen.value = false
    isSearchOpen.value = false
}

const toggleStartMenu = () => {
    isSearchOpen.value = false
    isStartMenuOpen.value = !isStartMenuOpen.value
}

const toggleSearch = () => {
    isStartMenuOpen.value = false
    isSearchOpen.value = !isSearchOpen.value
}

//从开始菜单打开搜索
const openSearchFromStart = () => {
    isStartMenuOpen.value = false
    isSearchOpen.value = true
}

//打开文件
const handleOpenFile = (post: PostMeta) => {
    closeAll()
    emit('openFile', post)
}

//打开个人主页
const handleOpenProfile = (url: string) => {
    closeAll()
    emit('openProfile', url)
}

//全局点击监听，点击外部时关闭菜单
const handleGlobalClick = () => {
    closeAll()
}

onMounted(() => {
    document.addEventListener('click', handleGlobalClick)
})

onUnmounted(() => {
    document.removeEventListener('click', handleGlobalClick)
})
</script>

<style scoped>
/* Dock 栏样式 */
.dock {
    position: fixed;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
    background: rgba(255, 255, 255, 0.2);
    backdrop-filter: blur(10px);
    border-radius: 16px;
    padding: 10px 20px;
    display: flex;
    gap: 15px;
}

.dock-item {
    position: relative;
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

.divider {
    width: 1px;
    background: rgba(255, 255, 255, 0.3);
    margin: 0 5px;
}

</style>
