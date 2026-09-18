# 青空归处：心火长明

> 小说《青空归处：心火长明》，别名《我们猫娘就是可以为所欲为》。
> 本仓库同时包含**小说正文 / 插图**与配套的**网页阅读器（代码）**，二者采用不同的许可协议。

本仓库是一个 PWA（渐进式网页应用）形态的小说阅读站，正文位于 `心火长明/` 目录，阅读器由 `index.html`、`sw.js` 等文件构成。

---

## 📜 许可协议（双许可 / Dual License）

本仓库对不同类型的内容采用**不同的开源许可协议**：

| 内容类型 | 涉及文件 | 许可协议 |
| --- | --- | --- |
| **代码 / 脚本 / 配置** | `index.html`、`sw.js`、`manifest.webmanifest`、`merge_chapters.py`、`update.sh`、`update.bat`、`.github/workflows/`、`icons/`、`AGENTS.md` 及各类 `*.py` / `*.js` / `*.json` 等 | **MIT**（见 [`LICENSE`](./LICENSE)） |
| **小说正文 / 插图** | `心火长明/` 目录下的章节 `*.md` 与图片（如 `1000594662.jpg`） | **CC BY-NC-SA 4.0**（署名-非商业性使用-相同方式共享，见 [`LICENSE-CONTENT.md`](./LICENSE-CONTENT.md)） |

> 简言之：**代码随你用（MIT），正文和插画不得商用、且需署名并以相同方式共享（CC BY-NC-SA 4.0）。**

### 判定原则

- 可执行文件、脚本、样式、配置、构建/部署流程等 → **MIT**
- `心火长明/` 目录内的文学文本与美术作品（正文 `.md`、图片）→ **CC BY-NC-SA 4.0**
- 若某文件在归类上存在歧义，则以**内容属性**为准：属于「小说作品本身」的按 CC BY-NC-SA 4.0，属于「工具/代码」的按 MIT。

### 署名（CC BY-NC-SA 4.0 要求）

转载、改编正文或插图时，请注明：

- 作者：**KirariNeko**
- 出处：本项目仓库 <https://github.com/Kirarineko/AzureHomebound>
- 协议：CC BY-NC-SA 4.0（并保留原始链接）

---

## 📖 正文目录

小说正文位于 `心火长明/`，按章节序号命名：

```
心火长明/0000_落地过猛.md
心火长明/0001_从捡到小狐娘开始.md
...
心火长明/0030_生命与毒.md
```

## 🛠️ 项目结构

```
AzureHomebound/
├── index.html               # 阅读器主页面
├── sw.js                    # Service Worker（离线缓存）
├── manifest.webmanifest     # PWA 清单
├── icons/                   # 应用图标
├── merge_chapters.py        # 章节合并脚本
├── update.sh / update.bat   # 更新脚本
├── 心火长明/                 # 小说正文与插图
├── LICENSE                  # MIT —— 代码许可
├── LICENSE-CONTENT.md       # CC BY-NC-SA 4.0 —— 正文/插图许可（英文）
├── LICENSE-CONTENT_ZH.md    # CC BY-NC-SA 4.0 中文参考译本
└── README.md
```

---

© 2026 KirariNeko. 代码部分以 MIT 协议授权；正文与插图以 CC BY-NC-SA 4.0 授权。
