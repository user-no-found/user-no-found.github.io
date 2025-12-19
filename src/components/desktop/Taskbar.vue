<template>
  <div class="win11-taskbar">
    <div class="taskbar-left">
      <button class="taskbar-btn start-btn" @click="$emit('toggleStart')">
        <span class="start-icon">⊞</span>
      </button>
    </div>
    <div class="taskbar-center">
      <button 
        v-for="win in windows" 
        :key="win.id"
        class="taskbar-app"
        :class="{ active: win.id === activeWindowId, minimized: win.isMinimized }"
        @click="handleAppClick(win.id)"
      >
        <span class="app-icon">{{ win.icon }}</span>
      </button>
    </div>
    <div class="taskbar-right">
      <span class="system-tray">{{ currentTime }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useWindowsStore } from '../../stores/windows'
import { storeToRefs } from 'pinia'

defineEmits(['toggleStart'])

const store = useWindowsStore()
const { windows, activeWindowId } = storeToRefs(store)

const currentTime = ref('')
let timer: number | null = null

function updateTime() {
  const now = new Date()
  currentTime.value = now.toLocaleTimeString('zh-CN', { 
    hour: '2-digit', 
    minute: '2-digit' 
  })
}

function handleAppClick(id: string) {
  store.focusWindow(id)
}

onMounted(() => {
  updateTime()
  timer = window.setInterval(updateTime, 1000)
})

onUnmounted(() => {
  if (timer) clearInterval(timer)
})
</script>

<style scoped>
.win11-taskbar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 48px;
  background: rgba(32, 32, 32, 0.85);
  backdrop-filter: blur(20px);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 12px;
  z-index: 9999;
}

.taskbar-left, .taskbar-right {
  width: 100px;
}

.taskbar-center {
  display: flex;
  gap: 4px;
  justify-content: center;
}

.taskbar-btn, .taskbar-app {
  height: 40px;
  min-width: 44px;
  border: none;
  background: transparent;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
}


.taskbar-btn:hover, .taskbar-app:hover {
  background: rgba(255, 255, 255, 0.1);
}

.taskbar-app.active {
  background: rgba(255, 255, 255, 0.15);
}

.taskbar-app.active::after {
  content: '';
  position: absolute;
  bottom: 4px;
  width: 20px;
  height: 3px;
  background: #60cdff;
  border-radius: 2px;
}

.taskbar-app {
  position: relative;
}

.start-icon {
  font-size: 20px;
}

.app-icon {
  font-size: 18px;
}

.system-tray {
  color: #fff;
  font-size: 12px;
  text-align: right;
}
</style>
