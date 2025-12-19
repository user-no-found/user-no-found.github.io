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
import { ref, onMounted } from 'vue'
import { getPosts, type PostMeta } from '../utils/posts'

const posts = ref<PostMeta[]>([])

onMounted(async () => {
    posts.value = await getPosts()
})
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