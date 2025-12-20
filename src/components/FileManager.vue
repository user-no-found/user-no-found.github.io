<template>
    <div class="file-manager">
        <div v-for="post in posts" :key="post.slug" class="file-item" @dblclick="emit('openFile', post)">
            <span class="file-icon">📄</span>
            <span class="file-name">{{ post.title }}</span>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { PostMeta } from '../utils/posts'

const props = defineProps<{
    posts: PostMeta[]
}>()

const emit = defineEmits<{
    openFile: [post: PostMeta]
}>()
</script>

<style scoped>
.file-manager {
    display: flex;
    flex-wrap: wrap;
    gap: 15px;
    padding: 10px;
}

.file-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 80px;
    padding: 10px;
    border-radius: 8px;
    cursor: pointer;
}

.file-item:hover {
    background: rgba(0, 0, 0, 0.1);
}

.file-icon {
    font-size: 36px;
}

.file-name {
    font-size: 12px;
    text-align: center;
    margin-top: 5px;
    word-break: break-word;
}

</style>