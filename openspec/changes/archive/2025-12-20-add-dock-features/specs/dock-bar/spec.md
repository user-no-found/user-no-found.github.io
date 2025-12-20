## ADDED Requirements

### Requirement: 已打开窗口标签
系统 SHALL 在 Dock 栏显示已打开窗口的标签。

#### Scenario: 显示窗口标签
- **WHEN** 用户打开文章窗口
- **THEN** Dock 栏显示对应的小标签

#### Scenario: 点击标签切换窗口
- **WHEN** 用户点击 Dock 栏的窗口标签
- **THEN** 对应窗口置顶显示

### Requirement: 文件管理器
系统 SHALL 提供文件管理器功能列出所有文章。

#### Scenario: 打开文件管理器
- **WHEN** 用户点击 Dock 栏的文件图标
- **THEN** 打开文件管理器窗口

#### Scenario: 查看文章列表
- **WHEN** 文件管理器打开
- **THEN** 显示所有文章的图标和标题

#### Scenario: 打开文章
- **WHEN** 用户双击文章图标
- **THEN** 打开对应的文章窗口

### Requirement: 搜索功能
系统 SHALL 提供文章搜索功能。

#### Scenario: 打开搜索
- **WHEN** 用户点击 Dock 栏的搜索图标
- **THEN** 打开搜索窗口

#### Scenario: 搜索文章
- **WHEN** 用户输入搜索关键词
- **THEN** 实时显示匹配的文章列表

#### Scenario: 打开搜索结果
- **WHEN** 用户点击搜索结果
- **THEN** 打开对应的文章窗口

### Requirement: 开始菜单
系统 SHALL 提供开始菜单显示用户信息和功能入口。

#### Scenario: 打开开始菜单
- **WHEN** 用户点击 Dock 栏的开始图标
- **THEN** 弹出开始菜单

#### Scenario: 查看用户信息
- **WHEN** 开始菜单打开
- **THEN** 显示用户头像
- **WHEN** 用户点击头像
- **THEN** 显示用户详细信息

#### Scenario: 关闭开始菜单
- **WHEN** 用户点击菜单外部区域
- **THEN** 开始菜单关闭
