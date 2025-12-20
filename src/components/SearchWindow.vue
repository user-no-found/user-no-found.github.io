<template>
    <div class="search-window" @click.stop>
        <!--搜索输入框 -->
        <input v-model="keyword" type="text" class="search-input" placeholder="搜索文章..." />

        <!-- 搜索结果 -->
        <div class="search-results">
            <div v-for="post in filteredPosts" :key="post.slug" class="result-item" @click="emit('openFile', post)">
                <span class="result-icon">📄</span>
                <span class="result-title">{{ post.title }}</span>
            </div>

            <!-- 无结果提示 -->
            <div v-if="keyword && filteredPosts.length === 0" class="no-result">
                没有找到匹配的文章
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import type { PostMeta } from '../utils/posts'

const props = defineProps<{
    posts: PostMeta[]
}>()

const emit = defineEmits<{
    openFile: [post: PostMeta]
}>()

//搜索关键词
const keyword = ref('')

//过滤后的文章列表
const filteredPosts = computed(() => {
    if (!keyword.value) {
        return props.posts
    }
    const kw = keyword.value.toLowerCase()
    return props.posts.filter(post =>
        post.title.toLowerCase().includes(kw) ||
        post.summary.toLowerCase().includes(kw)
    )
})
</script>

<style scoped>
.search-window {
    position: absolute;
    bottom: 60px;
    left: 50%;
    transform: translateX(-50%);
    width: 300px;
    max-height: 400px;
    background: rgba(255, 255, 255, 0.95);
    border-radius: 12px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
    padding: 15px;
    backdrop-filter: blur(10px);
    display: flex;
    flex-direction: column;
}

.search-input {
    width: 100%;
    padding: 10px;
    font-size: 14px;
    border: 1px solid #ddd;
    border-radius: 4px;
    box-sizing: border-box;
}

.search-input:focus {
    outline: none;
    border-color: #42b883;
}

.search-results {
    flex: 1;
    overflow: auto;
    margin-top: 10px;
    max-height: 300px;
}

.result-item {
    display: flex;
    align-items: center;
    padding: 8px;
    border-radius: 4px;
    cursor: pointer;
}

.result-item:hover {
    background: rgba(0, 0, 0, 0.1);
}

.result-icon {
    font-size: 20px;
    margin-right: 10px;
}

.result-title {
    font-size: 14px;
}

.no-result {
    color: #999;
    text-align: center;
    padding: 20px;
}
</style>
