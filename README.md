# AGFun — 番游更新提醒

一站式娱乐追踪平台：追番更新、Steam 新游、史低价格，尽在掌握。

## ✨ 功能

- 📺 **Bilibili 追番** — 追踪 Bilibili 追番列表，及时获取更新通知
- 🎮 **Steam 新游** — 浏览 Steam 热门新品，搜索和排序游戏
- 💰 **史低价格** — 监控 Steam 游戏历史最低价，抓住最佳入手时机
- ⚙️ **个性化设置** — 配置 Bilibili UID、Steam ID、ITAD API Key

## 🛠 技术栈

| 类别 | 技术 |
| ---- | ---- |
| 框架 | Next.js 14 (App Router) |
| UI | React 18 + TypeScript 5.4 |
| 样式 | Tailwind CSS 3.4 + CSS 变量 |
| 图标 | Lucide React |
| 数据 | SWR (客户端) + 服务端直取 |
| API | Bilibili API · Steam Store API · IsThereAnyDeal |

## 🚀 快速开始

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev
# → http://localhost:3000
```

## 📁 项目结构

```text
src/
├── app/                    # Next.js App Router 页面
│   ├── layout.tsx          # 根布局（Navbar + 主题）
│   ├── page.tsx            # 仪表盘总览
│   ├── error.tsx           # 全局错误边界
│   ├── loading.tsx         # 全局加载骨架
│   ├── globals.css         # 主题变量 + 动画
│   ├── bangumi/            # 追番更新页
│   ├── games/              # Steam 新游页
│   ├── deals/              # 史低价格页
│   └── settings/           # 用户设置页
├── components/
│   ├── layout/             # Navbar / MobileNav
│   ├── ui/                 # 公共组件 (FilterBtn, SectionCard…)
│   └── theme/              # ThemeProvider（暗/亮切换）
├── lib/                    # API 客户端 + 工具函数
│   ├── bilibili.ts         # Bilibili 追番 API
│   ├── steam.ts            # Steam Store API
│   ├── itad.ts             # IsThereAnyDeal API
│   └── utils.ts            # cn(), timeAgo(), formatPrice()…
└── types/
    └── index.ts            # TypeScript 类型定义
```

## 🎨 主题

支持暗色/亮色切换，自动记忆偏好。点击导航栏右侧 ☀️/🌙 按钮即可切换。

## 📦 命令

```bash
npm run dev      # 开发模式
npm run build    # 生产构建
npm run start    # 启动生产服务
npm run lint     # 代码检查
```

## 📄 许可证

MIT
