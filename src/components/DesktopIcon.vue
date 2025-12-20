<template>
    <div class="desktop-icon" @click="emit('click')">
        <span class="icon">{{ icon }}</span>
        <span class="title">{{ title }}</span>
    </div>
</template>

<script setup lang="ts">
//定义 props：icon（图片路径）、title（标题）
interface Props {
    icon: string
    title: string
}

const props = defineProps<Props>()

//定义 emit：click 事件
const emit = defineEmits<{
    click: []
}>()
</script>

<style scoped>
/* 图标样式 */
.desktop-icon {
    display: flex;
    flex-direction: column;
    /* 垂直排列 */
    align-items: center;
    /* 水平居中 */
    width: 80px;
    cursor: pointer;
    /* 鼠标变手型 */
}

.icon {
    font-size: 40px;
    /* emoji 大小 */
}

.title {
    font-size: 12px;
    color: white;
    /* 白色文字配合桌面背景 */
    text-align: center;
    margin-top: 5px;
}

</style>