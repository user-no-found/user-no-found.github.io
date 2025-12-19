<template>
  <div class="settings-app">
    <div class="settings-sidebar">
      <button 
        v-for="section in sections" 
        :key="section.id"
        class="settings-item"
        :class="{ active: activeSection === section.id }"
        @click="activeSection = section.id"
      >
        <span class="item-icon">{{ section.icon }}</span>
        <span class="item-label">{{ section.label }}</span>
      </button>
    </div>
    <div class="settings-content">
      <h1 class="section-title">{{ currentSection?.label }}</h1>
      <div class="settings-panel">
        <p class="placeholder">设置面板内容区域</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

const sections = [
  { id: 'system', icon: '💻', label: '系统' },
  { id: 'display', icon: '🖥️', label: '显示' },
  { id: 'personalize', icon: '🎨', label: '个性化' },
  { id: 'about', icon: 'ℹ️', label: '关于' }
]

const activeSection = ref('system')
const currentSection = computed(() => sections.find(s => s.id === activeSection.value))
</script>

<style scoped>
.settings-app {
  display: flex;
  height: 100%;
}

.settings-sidebar {
  width: 200px;
  background: rgba(0, 0, 0, 0.2);
  padding: 16px 8px;
}

.settings-item {
  display: flex;
  align-items: center;
  gap: 12px;
  width: 100%;
  padding: 10px 12px;
  border: none;
  background: transparent;
  border-radius: 4px;
  cursor: pointer;
  color: #fff;
  font-size: 14px;
  text-align: left;
}

.settings-item:hover {
  background: rgba(255, 255, 255, 0.1);
}

.settings-item.active {
  background: rgba(96, 205, 255, 0.2);
}


.item-icon {
  font-size: 18px;
}

.settings-content {
  flex: 1;
  padding: 24px;
}

.section-title {
  font-size: 28px;
  color: #fff;
  margin-bottom: 24px;
}

.settings-panel {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 8px;
  padding: 20px;
}

.placeholder {
  color: rgba(255, 255, 255, 0.5);
}
</style>
