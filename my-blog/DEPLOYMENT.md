# Hexo 博客部署文档

## 1. 配置 LeanCloud Valine 评论系统

1.  **注册/登录 LeanCloud**: 访问 LeanCloud 官网 ([https://leancloud.cn/](https://leancloud.cn/)) 并注册或登录您的账号。
2.  **创建应用**: 在控制台创建一个新的应用。
3.  **获取 App ID 和 App Key**: 进入您创建的应用，点击左侧导航栏的“设置” -> “应用 Keys”，您将看到 `App ID` 和 `App Key`。
4.  **更新 `_config.yml`**: 打开博客根目录下的 `_config.yml` 文件，找到 `Valine Comment System` 部分，将 `YOUR_LEANCLOUD_APP_ID` 和 `YOUR_LEANCLOUD_APP_KEY` 替换为您在 LeanCloud 获取到的对应值。

    ```yaml
    # Valine Comment System
    inject:
      body_end:
        - '<div id="vcomments"></div>'
        - '<script src="//cdn.jsdelivr.net/npm/valine@1.4.14/dist/Valine.min.js"></script>'
        - '<script>'
        - '  new Valine({'
        - '    el: "#vcomments",'
        - '    appId: "您的App ID", // leancloud application app id'
        - '    appKey: "您的App Key", // leancloud application app key'
        - '    pageSize: 10,'
        - '    avatar: "retro",'
        - '    placeholder: "有什么想说的吗？",'
        - '    visitor: true,'
        - '    // other config'
        - '  });'
        - '</script>'
    ```

## 2. 配置 GitHub Pages 和 Gitee Pages 部署

1.  **获取仓库 URL**:
    *   **GitHub Pages**: 获取您的 GitHub Pages 仓库的 HTTPS 或 SSH URL。通常格式为 `https://github.com/yourusername/yourusername.github.io.git` 或 `https://github.com/yourusername/yourreponame.git`。
    *   **Gitee Pages**: 获取您的 Gitee Pages 仓库的 HTTPS 或 SSH URL。通常格式为 `https://gitee.com/yourusername/yourreponame.git`。
2.  **更新 `_config.yml`**: 打开博客根目录下的 `_config.yml` 文件，找到 `Deployment` 部分，将 `<GitHub Pages Repo URL>` 和 `<Gitee Pages Repo URL>` 替换为您对应的仓库 URL。同时确保 `branch` 配置正确 (GitHub Pages 通常是 `master` 或 `main`，Gitee Pages 可能是 `gh-pages` 或其他)。

    ```yaml
    # Deployment
    deploy:
      - type: git
        repository: https://github.com/yourusername/yourusername.github.io.git # 替换为您的 GitHub Pages 仓库 URL
        branch: main # 或 master

      - type: git
        repository: https://gitee.com/yourusername/yourreponame.git # 替换为您的 Gitee Pages 仓库 URL
        branch: gh-pages # Gitee Pages 默认分支，或您配置的其他分支
    ```

## 3. 安装部署器

如果您尚未安装，请在博客项目根目录执行以下命令：

```bash
npm install hexo-deployer-git --save
```

## 4. 部署博客

在您完成上述配置后，每次更新博客内容并准备部署时，请在博客项目根目录执行以下命令：

```bash
hexo clean && hexo generate && hexo deploy
```

这将清除旧的生成文件，重新生成静态文件，并将它们推送到您配置的 GitHub Pages 和 Gitee Pages 仓库。

**注意**: 首次部署到 GitHub Pages 或 Gitee Pages 时，您可能需要手动启用 Pages 服务并在仓库设置中选择对应的分支。

---
**提示**:
*   确保您的 Git 客户端已正确配置，并且拥有向目标仓库推送代码的权限。
*   在 GitHub Pages 和 Gitee Pages 上，确保您博客的 `url` 配置与实际访问地址一致，特别是在使用自定义域名时。
