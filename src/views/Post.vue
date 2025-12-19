<template>
    <div class="post">
        <router-link to="/" class="back">← 返回首页</router-link>
        <article v-html="content"></article>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { marked } from 'marked'

const route = useRoute()
const content = ref('')

onMounted(async () => {
    //const slug = route.params.slug as string

    //临时硬编码，阶段4会改为动态加载md文件
    const markdown = `
  # 我的第一篇文章

  欢迎来到我的博客！

  这是使用 Vue3 + TypeScript 搭建的个人博客。

  ## 为什么写博客？

  - 记录学习过程
  - 分享技术心得
  - 积累个人作品

  感谢阅读！`

    content.value = await marked(markdown)
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

article {
    line-height: 1.8;
}
</style>