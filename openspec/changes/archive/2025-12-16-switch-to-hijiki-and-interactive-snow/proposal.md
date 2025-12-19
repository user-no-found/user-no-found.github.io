# 变更提案：更换黑猫桌宠并增强雪花互动

## 概述
将桌宠更换为资源更稳定的"黑猫 (Hijiki)"，并增强雪花特效的视觉强度，实现雪花与桌宠的物理碰撞互动。

## 需求场景
### 场景 1：桌宠显示
- Given 页面加载
- Then 显示黑猫 (Hijiki) 模型
- And 确保模型不被遮挡

### 场景 2：雪花增强
- Given 雪花飘落
- Then 雪花不透明度增加（更明显）
- And 当雪花落入右下角猫咪区域时，发生碰撞（反弹或滑落）

## 技术方案
### 资源更换
- 下载 Hijiki 模型全套资源到 `source/live2d_models/hijiki/`。
- 确保所有 `.mtn` 动作文件完整。

### 特效升级 (`effects.js`)
- **加重**：将 `opacity` 随机范围从 0.1-0.5 提升到 0.5-0.9。
- **互动**：定义一个 `CollisionBox` (对应 Canvas 右下角)。在 `snow()` 循环中检测雪花坐标，若进入区域则重置或反弹。

### 配置更新
- 修改 `injector.js` 引用 Hijiki 模型。

## 影响范围
- `source/live2d_models/`
- `source/js/effects.js`
- `scripts/injector.js`
