<template>
    <div class="post">
        <router-link to="/" class="back">← 返回首页</router-link>
        <article v-if="post">
            <h1>{{ post.meta.title }}</h1>
            <p class="date">{{ post.meta.date }}</p>
            <div v-html="post.html"></div>
        </article>
        <p v-else>文章不存在</p>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { getPost, type PostMeta } from '../utils/posts'

const route = useRoute()
const post = ref<{ meta: PostMeta, html: string } | null>(null)

onMounted(async () => {
    const slug = route.params.slug as string
    post.value = await getPost(slug)
})
</script>

<style scoped>
.post {
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
}

.back {
    display: inline-block;
    margin-bottom: 20px;
    color: #42b883;
    text-decoration: none;
}

.back:hover {
    text-decoration: underline;
}

.date {
    color: #999;
    font-size: 14px;
    margin-bottom: 20px;
}

article {
    line-height: 1.8;
}
</style>