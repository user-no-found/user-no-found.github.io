//窗口状态管理
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export interface WindowState {
  id: string
  title: string
  icon: string
  component: string
  isMinimized: boolean
  isMaximized: boolean
  zIndex: number
  x: number
  y: number
  width: number
  height: number
}

export const useWindowsStore = defineStore('windows', () => {
  const windows = ref<WindowState[]>([])
  const activeWindowId = ref<string | null>(null)
  let maxZIndex = 100

  const openWindows = computed(() => windows.value.filter(w => !w.isMinimized))
  const minimizedWindows = computed(() => windows.value.filter(w => w.isMinimized))

  function openWindow(config: Omit<WindowState, 'zIndex' | 'isMinimized' | 'isMaximized'>) {
    //检查窗口是否已存在
    const existing = windows.value.find(w => w.id === config.id)
    if (existing) {
      focusWindow(config.id)
      if (existing.isMinimized) {
        existing.isMinimized = false
      }
      return
    }

    maxZIndex++
    windows.value.push({
      ...config,
      isMinimized: false,
      isMaximized: false,
      zIndex: maxZIndex
    })
    activeWindowId.value = config.id
  }

  function closeWindow(id: string) {
    const index = windows.value.findIndex(w => w.id === id)
    if (index !== -1) {
      windows.value.splice(index, 1)
      if (activeWindowId.value === id) {
        const lastWindow = windows.value[windows.value.length - 1]
        activeWindowId.value = lastWindow ? lastWindow.id : null
      }
    }
  }


  function minimizeWindow(id: string) {
    const win = windows.value.find(w => w.id === id)
    if (win) {
      win.isMinimized = true
      if (activeWindowId.value === id) {
        const visible = windows.value.filter(w => !w.isMinimized)
        const lastVisible = visible[visible.length - 1]
        activeWindowId.value = lastVisible ? lastVisible.id : null
      }
    }
  }

  function maximizeWindow(id: string) {
    const win = windows.value.find(w => w.id === id)
    if (win) {
      win.isMaximized = !win.isMaximized
    }
  }

  function focusWindow(id: string) {
    const win = windows.value.find(w => w.id === id)
    if (win) {
      maxZIndex++
      win.zIndex = maxZIndex
      activeWindowId.value = id
      if (win.isMinimized) {
        win.isMinimized = false
      }
    }
  }


  function updateWindowPosition(id: string, x: number, y: number) {
    const win = windows.value.find(w => w.id === id)
    if (win) {
      win.x = x
      win.y = y
    }
  }

  function updateWindowSize(id: string, width: number, height: number) {
    const win = windows.value.find(w => w.id === id)
    if (win) {
      win.width = width
      win.height = height
    }
  }

  return {
    windows,
    activeWindowId,
    openWindows,
    minimizedWindows,
    openWindow,
    closeWindow,
    minimizeWindow,
    maximizeWindow,
    focusWindow,
    updateWindowPosition,
    updateWindowSize
  }
})
