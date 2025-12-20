<template>
    <div class="desktop" @click="closeMenus">
        <DesktopIcon v-for="post in posts" :key="post.slug" :icon="'📄'" :title="post.title"
            @click="openWindow(post)" />

        <DockBar :open-windows="openWindows" :posts="posts" @select-window="toggleMinimize"
            @open-file-manager="openFileManager" @open-file="openWindow" @open-profile="openProfileWindow" />

        <!-- 文章窗口（多个） -->
        <AppWindow v-for="win in openWindows" v-show="!win.isMinimized" :key="win.post.slug" :title="win.post.title"
            :z-index="win.zIndex" @close="closeWindow(win.post.slug)" @mousedown="bringToFront(win.post.slug)">
            <div v-html="win.html"></div>
        </AppWindow>

        <!-- 文件管理器窗口 -->
        <AppWindow v-if="isFileManagerOpen" v-show="!isFileManagerMinimized" title="文件管理器" :z-index="fileManagerZIndex"
            @close="closeFileManager" @mousedown="bringFileManagerToFront">
            <FileManager :posts="posts" @open-file="openWindow" />
        </AppWindow>

        <!-- 个人主页窗口 -->
        <AppWindow v-if="isProfileOpen" v-show="!isProfileMinimized" title="个人主页" :z-index="profileZIndex"
            @close="closeProfileWindow" @mousedown="bringProfileToFront">
            <div class="profile-card">
                <img class="profile-avatar" src="/image/avatar.jpg" alt="头像" />
                <h2 class="profile-name">user-no-found</h2>
                <p class="profile-bio">Vue3 学习中...</p>
                <div class="profile-links">
                    <a :href="profileUrl" target="_blank" class="profile-link github">
                        <span class="link-icon">🐙</span>
                        <span>GitHub</span>
                    </a>
                </div>
            </div>
        </AppWindow>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import DesktopIcon from '../components/DesktopIcon.vue'
import DockBar from '../components/DockBar.vue'
import AppWindow from '../components/AppWindow.vue'
import { getPosts, getPost, type PostMeta } from '../utils/posts'
import FileManager from '../components/FileManager.vue'

const posts = ref<PostMeta[]>([])

//关闭所有弹出菜单（点击桌面空白处）
const closeMenus = () => {
    //菜单由DockBar内部管理，这里不需要处理
}

//文件管理器状态
const fileManagerZIndex = ref(0)
const isFileManagerOpen = ref(false)
const isFileManagerMinimized = ref(false)

//个人主页窗口状态
const profileZIndex = ref(0)
const isProfileOpen = ref(false)
const isProfileMinimized = ref(false)
const profileUrl = ref('')

//打开文件管理器
const openFileManager = () => {
    if (isFileManagerOpen.value) {
        toggleFileManagerMinimize()
        return
    }
    isFileManagerOpen.value = true
    isFileManagerMinimized.value = false
    topZIndex++
    fileManagerZIndex.value = topZIndex
}

//切换文件管理器最小化
const toggleFileManagerMinimize = () => {
    if (isFileManagerMinimized.value) {
        isFileManagerMinimized.value = false
        topZIndex++
        fileManagerZIndex.value = topZIndex
    } else {
        isFileManagerMinimized.value = true
    }
}

//文件管理器置顶
const bringFileManagerToFront = () => {
    topZIndex++
    fileManagerZIndex.value = topZIndex
}

//关闭文件管理器
const closeFileManager = () => {
    isFileManagerOpen.value = false
    isFileManagerMinimized.value = false
}

//打开个人主页窗口
const openProfileWindow = (url: string) => {
    profileUrl.value = url
    if (isProfileOpen.value) {
        isProfileMinimized.value = false
        topZIndex++
        profileZIndex.value = topZIndex
        return
    }
    isProfileOpen.value = true
    isProfileMinimized.value = false
    topZIndex++
    profileZIndex.value = topZIndex
}

//个人主页窗口置顶
const bringProfileToFront = () => {
    topZIndex++
    profileZIndex.value = topZIndex
}

//关闭个人主页窗口
const closeProfileWindow = () => {
    isProfileOpen.value = false
    isProfileMinimized.value = false
}

//已打开的窗口列表
interface OpenWindow {
    post: PostMeta
    html: string
    zIndex: number
    isMinimized: boolean
}
const openWindows = ref<OpenWindow[]>([])
let topZIndex = 100

//打开文章窗口
const openWindow = async (post: PostMeta) => {
    const existingWin = openWindows.value.find(w => w.post.slug === post.slug)
    if (existingWin) {
        existingWin.isMinimized = false
        bringToFront(post.slug)
        return
    }

    const result = await getPost(post.slug)
    if (result) {
        topZIndex++
        openWindows.value.push({
            post,
            html: result.html,
            zIndex: topZIndex,
            isMinimized: false
        })
    }
}

//切换窗口最小化状态
const toggleMinimize = (slug: string) => {
    const win = openWindows.value.find(w => w.post.slug === slug)
    if (win) {
        if (win.isMinimized) {
            win.isMinimized = false
            bringToFront(slug)
        } else {
            win.isMinimized = true
        }
    }
}

//置顶窗口
const bringToFront = (slug: string) => {
    const win = openWindows.value.find(w => w.post.slug === slug)
    if (win) {
        topZIndex++
        win.zIndex = topZIndex
    }
}

//关闭窗口
const closeWindow = (slug: string) => {
    openWindows.value = openWindows.value.filter(w => w.post.slug !== slug)
}

onMounted(async () => {
    posts.value = await getPosts()
})
</script>

<style scoped>
.desktop {
    position: relative;
    width: 100%;
    height: 100%;
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    padding: 20px;
    align-content: flex-start;
    overflow: hidden;
    box-sizing: border-box;
}

.profile-card {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 30px;
    text-align: center;
}

.profile-avatar {
    width: 120px;
    height: 120px;
    border-radius: 50%;
    object-fit: cover;
    border: 4px solid #e0e0e0;
}

.profile-name {
    margin: 20px 0 10px;
    font-size: 24px;
    color: #333;
}

.profile-bio {
    color: #666;
    font-size: 14px;
    margin-bottom: 25px;
}

.profile-links {
    display: flex;
    gap: 15px;
}

.profile-link {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 10px 20px;
    border-radius: 8px;
    text-decoration: none;
    color: white;
    font-size: 14px;
    transition: opacity 0.2s;
}

.profile-link:hover {
    opacity: 0.9;
}

.profile-link.github {
    background: #24292e;
}

.link-icon {
    font-size: 18px;
}
</style>
