# 🧫 CELL-Helper — 细胞实验室助手

> 一个为细胞生物学实验室打造的瑞士军刀 Web 工具。覆盖细胞资料速查、铺板计算、实验 SOP 规范与交互式模拟。

**四川大学 · 生物医学工程 · 2026**

---

## ✨ 功能

| 模块 | 说明 |
|------|------|
| 🧬 **细胞资料库** | L929 / RAW264.7 / HUVEC 培养条件卡片、消化方法速查表、禁忌红线警告 |
| 📋 **实验 SOP** | 基础常识（配液/换液/传代/冻存复苏）、细胞消化红线、进阶实验操作规范 |
| 🔬 **铺板计算器** | 血球计数板浓度换算 → 预混液铺板计算，支持快捷密度芯片与冗余量调节 |
| 🎮 **实验模拟** | 交互式 SOP：LPS 巨噬细胞转化、CCK-8 毒性测试、日常传代避坑——带 checklist 与时间快进 |

### 核心细胞系覆盖

- **L929** 小鼠成纤维细胞 — CCK-8 / 活死染
- **RAW264.7** 小鼠巨噬细胞 — LPS → M1 极化（🚫 严禁胰酶）
- **HUVEC** 人脐静脉内皮细胞 — 划痕 / 血管生成（⚠️ 胰酶 ≤1 min）

---

## 🛠 技术栈

| 技术 | 用途 |
|------|------|
| React 19 | UI 框架 |
| Vite 8 | 构建工具 |
| Tailwind CSS 4 | 原子化 CSS + 深色模式 |
| React Router 7 | 客户端路由 |

纯前端 SPA，无需后端。`build` 后为完全静态文件，可部署至 GitHub Pages / Vercel / Netlify。

---

## 🚀 本地运行

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 生产构建
npm run build

# 预览生产构建
npm run preview
```

---

## 📁 项目结构

```
CELL-Helper/
├── public/
│   ├── favicon.svg          # 实验室主题图标
│   └── 404.html             # 自定义 404 页面
├── src/
│   ├── main.jsx             # 入口
│   ├── App.jsx              # 根组件：侧边栏导航 + 路由
│   ├── index.css            # 全局样式（Apple 风格、毛玻璃、动画）
│   ├── data/
│   │   ├── cells.js         # 细胞系数据
│   │   ├── calculator.js    # 铺板计算器常量
│   │   ├── sop.js           # SOP 内容数据
│   │   └── simulator.js     # 实验模拟场景数据
│   └── pages/
│       ├── CellDatabase.jsx  # 细胞资料库
│       ├── ExperimentSOP.jsx # 实验 SOP 布局
│       ├── PlateCalculator.jsx # 铺板计算器
│       ├── LabSimulator.jsx  # 实验模拟
│       └── sop/
│           ├── SopBasics.jsx     # 基础常识
│           ├── SopRedLines.jsx   # 细胞消化红线
│           └── SopAdvanced.jsx   # 进阶实验
├── index.html
├── vite.config.js
├── package.json
└── README.md
```

---

## 🎨 设计

- **Apple 风格**：SF Pro 字体、毛玻璃侧边栏、apple-card 卡片
- **深色模式**：手动切换，localStorage 持久化
- **移动端适配**：可折叠侧边栏 + 响应式布局
- **微交互动画**：fade-in-up、scale-in、快进进度条、步骤过渡

---

## 📝 License

MIT — 仅供学习与实验室内部使用。细胞实验操作请以导师指导为准。
