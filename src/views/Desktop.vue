<template>
    <div class="desktop">
        <DesktopIcon v-for="post in posts" :key="post.slug" :icon="'📄'" :title="post.title"
            @click="openWindow(post)" />
        <DockBar />

        <!-- 文章窗口（多个） -->
        <AppWindow v-for="win in openWindows" :key="win.post.slug" :title="win.post.title" :z-index="win.zIndex"
            @close="closeWindow(win.post.slug)" @mousedown="bringToFront(win.post.slug)">
            <div v-html="win.html"></div>
        </AppWindow>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import DesktopIcon from '../components/DesktopIcon.vue'
import DockBar from '../components/DockBar.vue'
import AppWindow from '../components/AppWindow.vue'
import { getPosts, getPost, type PostMeta } from '../utils/posts'

const posts = ref<PostMeta[]>([])

//已打开的窗口列表
interface OpenWindow {
    post: PostMeta
    html: string
    zIndex: number  //添加层级
}
const openWindows = ref<OpenWindow[]>([])
let topZIndex = 100  //当前最高层级

//打开文章窗口
const openWindow = async (post: PostMeta) => {
    if (openWindows.value.some(w => w.post.slug === post.slug)) {
        return
    }
    const result = await getPost(post.slug)
    if (result) {
        topZIndex++
        openWindows.value.push({
            post,
            html: result.html,
            zIndex: topZIndex
        })
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
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    padding: 20px;
    align-content: flex-start;
}
</style>