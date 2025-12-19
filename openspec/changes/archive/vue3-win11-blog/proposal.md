# 变更提案：Vue3 Windows 11风格博客重建

## 概述
完全删除现有Hexo博客项目，从零开始重建为Vue3 + Windows 11风格的个人博客。

## 需求场景

### 场景1：桌面式博客体验
- Given 用户访问博客网站
- When 页面加载完成
- Then 看到类似Windows 11桌面的界面，有任务栏、开始菜单、窗口化应用

### 场景2：窗口化内容浏览
- Given 用户在Win11风格桌面上
- When 点击桌面图标或任务栏图标
- Then 打开对应的窗口（博客文章、关于页面等）

## 技术方案

### 技术栈
- Vue 3 + Vite
- Vue Router
- Pinia（状态管理）
- CSS3（Win11风格UI）

### 项目结构
```
src/
├── components/
│   ├── desktop/          # Win11桌面组件
│   │   ├── Desktop.vue   # 桌面主体
│   │   ├── Taskbar.vue   # 任务栏
│   │   ├── StartMenu.vue # 开始菜单
│   │   └── Window.vue    # 窗口组件
│   └── apps/             # 应用组件
│       ├── BlogApp.vue   # 博客应用
│       └── AboutApp.vue  # 关于应用
├── stores/               # Pinia状态
├── views/                # 页面视图
├── router/               # 路由配置
└── assets/               # 静态资源
```

### Win11 UI特征
- 居中任务栏
- 圆角窗口（8px）
- 毛玻璃效果（Mica/Acrylic）
- 窗口可拖拽、缩放、最小化、最大化、关闭
- 阴影效果
- Segoe UI字体风格

## 清理范围
删除所有Hexo相关内容：
- node_modules/
- package.json, package-lock.json
- _config.yml, _config.icarus.yml
- source/, public/, scaffolds/, themes/
- db.json
- .deploy_git/
- scripts/

## 保留内容
- .git/ （版本控制）
- openspec/ （规范文档）
- AGENTS.md, CLAUDE.md

## 影响范围
这是完全重建，替换整个项目技术栈。
