<template>
  <div class="win11-window" 
       :class="{ maximized: windowState.isMaximized, active: isActive }"
       :style="windowStyle"
       @mousedown="handleFocus">
    <!-- 标题栏 -->
    <div class="window-titlebar" @mousedown="startDrag">
      <div class="titlebar-left">
        <span class="window-icon">{{ windowState.icon }}</span>
        <span class="window-title">{{ windowState.title }}</span>
      </div>
      <div class="titlebar-controls">
        <button class="control-btn minimize" @click.stop="handleMinimize">
          <span>─</span>
        </button>
        <button class="control-btn maximize" @click.stop="handleMaximize">
          <span>{{ windowState.isMaximized ? '❐' : '□' }}</span>
        </button>
        <button class="control-btn close" @click.stop="handleClose">
          <span>✕</span>
        </button>
      </div>
    </div>
    <!-- 窗口内容 -->
    <div class="window-content">
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useWindowsStore, type WindowState } from '../../stores/windows'

const props = defineProps<{
  windowState: WindowState
}>()

const store = useWindowsStore()
const isActive = computed(() => store.activeWindowId === props.windowState.id)

const windowStyle = computed(() => {
  if (props.windowState.isMaximized) {
    return { zIndex: props.windowState.zIndex }
  }
  return {
    left: `${props.windowState.x}px`,
    top: `${props.windowState.y}px`,
    width: `${props.windowState.width}px`,
    height: `${props.windowState.height}px`,
    zIndex: props.windowState.zIndex
  }
})

//拖拽逻辑
const isDragging = ref(false)
const dragOffset = ref({ x: 0, y: 0 })


function startDrag(e: MouseEvent) {
  if (props.windowState.isMaximized) return
  isDragging.value = true
  dragOffset.value = {
    x: e.clientX - props.windowState.x,
    y: e.clientY - props.windowState.y
  }
  document.addEventListener('mousemove', onDrag)
  document.addEventListener('mouseup', stopDrag)
}

function onDrag(e: MouseEvent) {
  if (!isDragging.value) return
  store.updateWindowPosition(
    props.windowState.id,
    e.clientX - dragOffset.value.x,
    e.clientY - dragOffset.value.y
  )
}

function stopDrag() {
  isDragging.value = false
  document.removeEventListener('mousemove', onDrag)
  document.removeEventListener('mouseup', stopDrag)
}

function handleFocus() {
  store.focusWindow(props.windowState.id)
}


function handleMinimize() {
  store.minimizeWindow(props.windowState.id)
}

function handleMaximize() {
  store.maximizeWindow(props.windowState.id)
}

function handleClose() {
  store.closeWindow(props.windowState.id)
}
</script>

<style scoped>
.win11-window {
  position: absolute;
  background: rgba(32, 32, 32, 0.85);
  backdrop-filter: blur(20px);
  border-radius: 8px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
  border: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  min-width: 300px;
  min-height: 200px;
}


.win11-window.maximized {
  left: 0 !important;
  top: 0 !important;
  width: 100% !important;
  height: calc(100% - 48px) !important;
  border-radius: 0;
}

.win11-window.active {
  border-color: rgba(255, 255, 255, 0.15);
}

.window-titlebar {
  height: 32px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 8px;
  background: rgba(0, 0, 0, 0.2);
  cursor: default;
  user-select: none;
}

.titlebar-left {
  display: flex;
  align-items: center;
  gap: 8px;
}

.window-icon {
  font-size: 14px;
}


.window-title {
  font-size: 12px;
  color: #fff;
}

.titlebar-controls {
  display: flex;
}

.control-btn {
  width: 46px;
  height: 32px;
  border: none;
  background: transparent;
  color: #fff;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 10px;
}

.control-btn:hover {
  background: rgba(255, 255, 255, 0.1);
}

.control-btn.close:hover {
  background: #e81123;
}

.window-content {
  flex: 1;
  overflow: auto;
  color: #fff;
}
</style>
