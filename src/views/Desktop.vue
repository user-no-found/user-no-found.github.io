<template>
    <div class="desktop">
        <DesktopIcon v-for="post in posts" :key="post.slug" :icon="'📄'" :title="post.title" />
        <DockBar />
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { getPosts, type PostMeta } from '../utils/posts'
import DesktopIcon from '../components/DesktopIcon.vue'
import DockBar from '../components/DockBar.vue'

const posts = ref<PostMeta[]>([])

onMounted(async () => {
    posts.value = await getPosts()
})
</script>

<style scoped>
.desktop {
    display: flex;
    /* 弹性布局 */
    flex-wrap: wrap;
    /* 允许换行 */
    gap: 20px;
    /* 图标间距 */
    padding: 20px;
    /* 内边距 */
    align-content: flex-start;
    /* 从顶部开始排列 */
}
</style>