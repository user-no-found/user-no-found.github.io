<template>
  <div class="win11-desktop" @click="closeStartMenu">
    <!-- 桌面图标 -->
    <div class="desktop-icons">
      <button 
        v-for="icon in desktopIcons" 
        :key="icon.id" 
        class="desktop-icon"
        @dblclick="openApp(icon)"
      >
        <span class="icon-image">{{ icon.icon }}</span>
        <span class="icon-label">{{ icon.name }}</span>
      </button>
    </div>

    <!-- 窗口 -->
    <template v-for="win in openWindows" :key="win.id">
      <Window :windowState="win">
        <component :is="getComponent(win.component)" />
      </Window>
    </template>

    <!-- 开始菜单 -->
    <StartMenu :isOpen="startMenuOpen" @close="closeStartMenu" />

    <!-- 任务栏 -->
    <Taskbar @toggleStart="toggleStartMenu" />
  </div>
</template>

<script setup lang="ts">
import { ref, markRaw } from 'vue'
import { useWindowsStore } from '../../stores/windows'
import { storeToRefs } from 'pinia'
import Window from './Window.vue'
import Taskbar from './Taskbar.vue'
import StartMenu from './StartMenu.vue'
import BlogApp from '../apps/BlogApp.vue'
import AboutApp from '../apps/AboutApp.vue'
import SettingsApp from '../apps/SettingsApp.vue'

const store = useWindowsStore()
const { openWindows } = storeToRefs(store)

const startMenuOpen = ref(false)

const desktopIcons = [
  { id: 'blog', name: '博客', icon: '📝', component: 'BlogApp', width: 800, height: 600 },
  { id: 'about', name: '关于我', icon: 'ℹ️', component: 'AboutApp', width: 500, height: 400 }
]

const components: Record<string, any> = {
  BlogApp: markRaw(BlogApp),
  AboutApp: markRaw(AboutApp),
  SettingsApp: markRaw(SettingsApp)
}


function getComponent(name: string) {
  return components[name] || null
}

function openApp(app: typeof desktopIcons[0]) {
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
}

function toggleStartMenu() {
  startMenuOpen.value = !startMenuOpen.value
}

function closeStartMenu() {
  startMenuOpen.value = false
}
</script>

<style scoped>
.win11-desktop {
  width: 100vw;
  height: 100vh;
  background: url('/bg.jpg') center/cover no-repeat fixed;
  position: relative;
  overflow: hidden;
}


.desktop-icons {
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: fit-content;
}

.desktop-icon {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 8px 16px;
  border: none;
  background: transparent;
  border-radius: 4px;
  cursor: pointer;
  gap: 4px;
  width: 80px;
}

.desktop-icon:hover {
  background: rgba(255, 255, 255, 0.1);
}

.icon-image {
  font-size: 40px;
}

.icon-label {
  color: #fff;
  font-size: 12px;
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.8);
}
</style>
