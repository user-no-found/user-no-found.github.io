<template>
    <div class="home">
        <h1>我的博客</h1>
        <ul class="post-list">
            <li v-for="post in posts" :key="post.slug">
                <router-link :to="`/post/${post.slug}`">
                    <h2>{{ post.title }}</h2>
                    <p class="date">{{ post.date }}</p>
                    <p class="summary">{{ post.summary }}</p>
                </router-link>
            </li>
        </ul>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

//临时硬编码数据，阶段4会改为动态获取
const posts = ref([
    {
        slug: 'hello-world',
        title: '我的第一篇文章',
        date: '2025-12-19',
        summary: '这是我的个人博客的第一篇文章，记录我学习 Vue3 的旅程。'
    }
])
</script>

<style scoped>
.home {
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
}

.post-list {
    list-style: none;
    padding: 0;
}

.post-list li {
    margin-bottom: 30px;
    padding-bottom: 20px;
    border-bottom: 1px solid #eee;
}

.post-list a {
    text-decoration: none;
    color: inherit;
}

.post-list h2 {
    margin: 0 0 10px;
    color: #333;
}

.post-list h2:hover {
    color: #42b883;
}

.date {
    color: #999;
    font-size: 14px;
}

.summary {
    color: #666;
}
</style>