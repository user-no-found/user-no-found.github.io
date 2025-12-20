<template>
    <div class="app-window" :style="{ left: x + 'px', top: y + 'px', 
        width: width + 'px', height: height + 'px', zIndex: zIndex }">
        <div class="title-bar" @mousedown="startDrag">
            <span class="title">{{ title }}</span>
            <div class="window-controls">
                <button v-if="externalUrl" class="control-btn open-btn" @click="openExternal" title="在浏览器中打开">↗</button>
                <button class="control-btn close-btn" @click="emit('close')" title="关闭">×</button>
            </div>
        </div>
        <div class="content">
            <slot></slot>
        </div>
        <!-- 缩放手柄 -->
        <div class="resize-handle" @mousedown="startResize"></div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const emit = defineEmits<{
    close: []
}>()

const props = defineProps<{
    title: string
    zIndex?: number
    externalUrl?: string
}>()

//在浏览器中打开外部链接
const openExternal = () => {
    if (props.externalUrl) {
        window.open(props.externalUrl, '_blank')
    }
}

//窗口位置
const x = ref(100)
const y = ref(100)

//拖拽状态
const isDragging = ref(false)
const dragStartX = ref(0)
const dragStartY = ref(0)

//开始拖拽
const startDrag = (e: MouseEvent) => {
    isDragging.value = true
    document.body.style.userSelect = 'none'
    dragStartX.value = e.clientX - x.value
    dragStartY.value = e.clientY - y.value
    document.addEventListener('mousemove', onDrag)
    document.addEventListener('mouseup', stopDrag)
}

//拖拽中
const onDrag = (e: MouseEvent) => {
    if (!isDragging.value) return
    x.value = e.clientX - dragStartX.value
    y.value = e.clientY - dragStartY.value
}

//结束拖拽
const stopDrag = () => {
    isDragging.value = false
    document.body.style.userSelect = ''
    document.removeEventListener('mousemove', onDrag)
    document.removeEventListener('mouseup', stopDrag)
}

//窗口尺寸
const width = ref(800)
const height = ref(600)

//缩放状态
const isResizing = ref(false)

//开始缩放
const startResize = (e: MouseEvent) => {
    isResizing.value = true
    document.body.style.userSelect = 'none'
    document.addEventListener('mousemove', onResize)
    document.addEventListener('mouseup', stopResize)
    e.stopPropagation()
}

//缩放中
const onResize = (e: MouseEvent) => {
    if (!isResizing.value) return
    width.value = e.clientX - x.value
    height.value = e.clientY - y.value
}

//结束缩放
const stopResize = () => {
    isResizing.value = false
    document.body.style.userSelect = ''
    document.removeEventListener('mousemove', onResize)
    document.removeEventListener('mouseup', stopResize)
}
</script>

<style scoped>
.app-window {
    position: absolute;
    width: 800px;
    height: 600px;
    background: rgba(255, 255, 255, 0.95);
    border-radius: 8px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
    overflow: hidden;
    display: flex;
    flex-direction: column;
}

.title-bar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 8px 12px;
    background: #e0e0e0;
    cursor: move;
    user-select: none;
}

.title {
    font-size: 14px;
    font-weight: bold;
}

.window-controls {
    display: flex;
    gap: 8px;
}

.control-btn {
    width: 20px;
    height: 20px;
    border: none;
    border-radius: 50%;
    color: white;
    cursor: pointer;
    font-size: 14px;
    line-height: 1;
}

.open-btn {
    background: #34c759;
}

.open-btn:hover {
    background: #2db84d;
}

.close-btn {
    background: #ff5f57;
}

.close-btn:hover {
    background: #ff3b30;
}

.content {
    padding: 15px;
    overflow: auto;
    flex: 1;
}

.resize-handle {
    position: absolute;
    right: 0;
    bottom: 0;
    width: 15px;
    height: 15px;
    cursor: nwse-resize;
    background: linear-gradient(135deg, transparent 50%, #999 50%);
}

</style>
