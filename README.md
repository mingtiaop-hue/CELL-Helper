# 🧫 CELL-Helper — 细胞实验室助手

> 一个为细胞生物学实验室打造的瑞士军刀 Web 工具。覆盖细胞资料速查、铺板计算、试剂配制、实验 SOP、孔板排布、数据预处理与交互式模拟。

**四川大学 · 生物医学工程 · 2026**

---

## ✨ 功能

| 模块 | 说明 |
|------|------|
| 🏠 **首页仪表盘** | 模块快捷入口 + 统计数据总览 |
| 🧬 **细胞资料库** | L929 / RAW264.7 / HUVEC 培养条件卡片、消化方法速查、红线警告 |
| 📋 **实验 SOP** | 基础常识 / 细胞红线 / 进阶实验(6) / 细菌实验(6)，共 12 个标准实验 |
| ⚗️ **试剂配制** | 质量↔摩尔浓度 / C₁V₁=C₂V₂ 稀释 / 百分比溶液，常用分子量速查 |
| 🔬 **铺板计算器** | 血球计数 → 预混液铺板，密度快捷芯片 + 冗余量调节，输入自动记忆 |
| 🎨 **孔板排布** | 8×12 网格可视化涂色标记，滑动批量涂色，导出 PNG 图片对照加样 |
| 📊 **数据处理** | 酶标仪 OD 值粘贴 → 扣除 Blank → Control 归一化 → Grouped 分组输出，一键复制进 GraphPad Prism |
| 🎮 **实验模拟** | 4 个交互式实验（LPS 转化 / CCK-8 毒性 / 细胞毒性+活死染 / 传代避坑），checklist + 时间快进 |

### 核心覆盖

- **细胞系**：L929 / RAW264.7 / HUVEC
- **细菌**：金黄色葡萄球菌 / 大肠杆菌 / 绿脓杆菌
- **实验类型**：CCK-8 / 活死双染 / 划痕迁移 / Transwell / LPS-ROS / MIC / 细菌粘附 / 生物膜·CLSM
- **国际化**：中英文一键切换，语言偏好本地记忆

---

## 🛠 技术栈

| 技术 | 用途 |
|------|------|
| React 19 | UI 框架 |
| Vite 8 | 构建工具 |
| Tailwind CSS 4 | 原子化 CSS + 深色模式 |
| React Router 7 | 客户端路由 |

纯前端 SPA，无需后端。`build` 后为完全静态文件，部署于 GitHub Pages。

---

## 🚀 本地运行

```bash
npm install      # 安装依赖
npm run dev      # 启动开发服务器
npm run build    # 生产构建
npm run preview  # 预览生产构建
```

---

## 📁 项目结构

```
CELL-Helper/
├── public/
│   ├── favicon.svg              # 实验室主题图标
│   └── 404.html                 # 自定义 404 页面
├── src/
│   ├── main.jsx                 # 入口
│   ├── App.jsx                  # 根组件：侧边栏 + 路由 + 中英文 + 暗黑模式
│   ├── index.css                # 全局样式（Apple 风格、毛玻璃、动画）
│   ├── components/
│   │   ├── BackToTop.jsx        # 回到顶部浮动按钮
│   │   └── PageTOC.jsx          # 页面内实验目录导航
│   ├── i18n/
│   │   └── context.jsx          # 中英文翻译上下文
│   ├── data/
│   │   ├── cells.js             # 细胞系数据
│   │   ├── calculator.js        # 铺板计算器常量
│   │   └── simulator.jsx        # 实验模拟场景数据
│   └── pages/
│       ├── Home.jsx             # 首页仪表盘
│       ├── CellDatabase.jsx     # 细胞资料库
│       ├── ExperimentSOP.jsx    # 实验 SOP 布局
│       ├── PlateCalculator.jsx  # 铺板计算器
│       ├── UnitConverter.jsx    # 试剂配制计算器
│       ├── PlateLayout.jsx      # 96孔板可视化排布
│       ├── DataFormat.jsx       # 酶标仪数据预处理
│       ├── LabSimulator.jsx     # 交互式实验模拟
│       └── sop/
│           ├── SopBasics.jsx    # 基础常识
│           ├── SopRedLines.jsx  # 细胞消化红线
│           ├── SopAdvanced.jsx  # 进阶实验 (6)
│           └── SopBacteria.jsx  # 细菌实验 (6)
├── index.html
├── vite.config.js
└── package.json
```

---

## 🎨 设计

- **Apple 风格**：SF Pro 字体、毛玻璃侧边栏、apple-card 卡片
- **深色模式**：手动切换 + 跟随系统，localStorage 持久化
- **中英文切换**：侧边栏一键切换，语言偏好本地记忆
- **移动端适配**：可折叠侧边栏 + 响应式布局
- **输入记忆**：铺板计算器参数自动保存，刷新/次日不丢失
- **微交互动画**：fade-in-up、scale-in、快进进度条、步骤过渡

---

## 📝 License

MIT — 仅供学习与实验室内部使用。细胞实验操作请以导师指导为准。
