<template>
  <Transition name="start-menu">
    <div v-if="isOpen" class="win11-start-menu">
      <div class="start-header">
        <input type="text" class="search-box" placeholder="搜索应用、设置、文档">
      </div>
      <div class="start-content">
        <div class="section-title">已固定</div>
        <div class="pinned-apps">
          <button 
            v-for="app in apps" 
            :key="app.id" 
            class="app-item"
            @click="openApp(app)"
          >
            <span class="app-icon">{{ app.icon }}</span>
            <span class="app-name">{{ app.name }}</span>
          </button>
        </div>
      </div>
      <div class="start-footer">
        <div class="user-info">
          <span class="user-avatar">👤</span>
          <span class="user-name">访客</span>
        </div>
        <button class="power-btn">⏻</button>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { useWindowsStore } from '../../stores/windows'

defineProps<{
  isOpen: boolean
}>()

const emit = defineEmits(['close'])
const store = useWindowsStore()

const apps = [
  { id: 'blog', name: '博客', icon: '📝', component: 'BlogApp', width: 800, height: 600 },
  { id: 'about', name: '关于', icon: 'ℹ️', component: 'AboutApp', width: 500, height: 400 },
  { id: 'settings', name: '设置', icon: '⚙️', component: 'SettingsApp', width: 600, height: 500 }
]

function openApp(app: typeof apps[0]) {
  store.openWindow({
    id: app.id,
    title: app.name,
    icon: app.icon,
    component: app.component,
    x: 100 + Math.random() * 100,
    y: 50 + Math.random() * 50,
    width: app.width,
    height: app.height
  })
  emit('close')
}
</script>

<style scoped>
.win11-start-menu {
  position: fixed;
  bottom: 60px;
  left: 50%;
  transform: translateX(-50%);
  width: 600px;
  height: 500px;
  background: rgba(32, 32, 32, 0.9);
  backdrop-filter: blur(30px);
  border-radius: 8px;
  box-shadow: 0 16px 48px rgba(0, 0, 0, 0.5);
  border: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  flex-direction: column;
  z-index: 10000;
}

.start-header {
  padding: 20px 24px 12px;
}

.search-box {
  width: 100%;
  height: 32px;
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 4px;
  padding: 0 12px;
  color: #fff;
  font-size: 14px;
}


.search-box::placeholder {
  color: rgba(255, 255, 255, 0.5);
}

.start-content {
  flex: 1;
  padding: 12px 24px;
  overflow: auto;
}

.section-title {
  color: #fff;
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 12px;
}

.pinned-apps {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 8px;
}

.app-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 12px 8px;
  border: none;
  background: transparent;
  border-radius: 4px;
  cursor: pointer;
  gap: 6px;
}


.app-item:hover {
  background: rgba(255, 255, 255, 0.1);
}

.app-icon {
  font-size: 28px;
}

.app-name {
  color: #fff;
  font-size: 12px;
}

.start-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 24px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.user-info {
  display: flex;
  align-items: center;
  gap: 12px;
}

.user-avatar {
  font-size: 24px;
}

.user-name {
  color: #fff;
  font-size: 14px;
}


.power-btn {
  width: 36px;
  height: 36px;
  border: none;
  background: transparent;
  border-radius: 4px;
  cursor: pointer;
  color: #fff;
  font-size: 16px;
}

.power-btn:hover {
  background: rgba(255, 255, 255, 0.1);
}

/* 动画 */
.start-menu-enter-active,
.start-menu-leave-active {
  transition: all 0.2s ease;
}

.start-menu-enter-from,
.start-menu-leave-to {
  opacity: 0;
  transform: translateX(-50%) translateY(20px);
}
</style>
