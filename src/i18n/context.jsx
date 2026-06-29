import { createContext, useContext, useState, useEffect, useCallback } from 'react'

const translations = {
  zh: {
    app: { title: "GOOOOOD's Lab", subtitle: 'Fatonion · 2026' },
    nav: {
      home: '首页', cellDb: '细胞资料库', experimentSop: '实验 SOP',
      basics: '基础常识', redlines: '细胞特性红线', advanced: '进阶实验', bacteria: '细菌实验',
      plateCalc: '铺板计算器', unitConv: '试剂配制', labSim: '实验模拟',
      plateLayout: '孔板排布', dataFormat: '数据处理', meetingSchedule: '组会排班',
    },
    home: { badge: '细胞实验室效率工具', desc: '从种板计算到 SOP 规范，一站式搞定', built: '' },
    cellDb: { title: '细胞资料库', subtitle: '实验室常用细胞系 · 培养条件与消化红线' },
    plateCalc: { title: '铺板计算器', subtitle: '血球计数板计数 → 预混液配液 → 排枪铺板' },
    unitConv: { title: '试剂配制计算器', subtitle: '质量 ↔ 浓度 · 稀释 · 百分比 · 分子量换算' },
    labSim: { title: '沉浸式实验模拟', subtitle: '交互式 SOP · 防呆清单 · 时间快进' },
    plateLayout: { title: '96 孔板可视化排布', subtitle: '涂色标记 → 导出图片 → 对照加样' },
    dataFormat: { title: '数据预处理', subtitle: '酶标仪 OD → 扣除空白 → 归一化 → GraphPad Prism 就绪' },
    common: { back: '← 上一步', next: '下一步 →', complete: '完成实验', reset: '重新开始', clear: '清空全部', export: '📸 导出为图片', copy: '📋 一键复制', copied: '✅ 已复制', loadExample: '加载示例', calculating: '请输入上方数据', darkMode: '深色模式', lightMode: '浅色模式' },
  },
  en: {
    app: { title: "GOOOOOD's Lab", subtitle: 'Fatonion · 2026' },
    nav: {
      home: 'Home', cellDb: 'Cell Database', experimentSop: 'Experiment SOP',
      basics: 'Basics', redlines: 'Red Lines', advanced: 'Advanced', bacteria: 'Bacteria',
      plateCalc: 'Plate Calculator', unitConv: 'Reagent Prep', labSim: 'Lab Simulator',
      plateLayout: 'Plate Layout', dataFormat: 'Data Format', meetingSchedule: 'Meeting Schedule',
    },
    home: { badge: 'Cell Lab Productivity Tool', desc: 'From seeding math to SOP standards, all in one place', built: '' },
    cellDb: { title: 'Cell Database', subtitle: 'Common cell lines · Culture conditions · Digestion rules' },
    plateCalc: { title: 'Plate Calculator', subtitle: 'Hemocytometer → Pre-mix → Multi-channel pipetting' },
    unitConv: { title: 'Reagent Calculator', subtitle: 'Mass ↔ Molarity · Dilution · Percentage · MW' },
    labSim: { title: 'Lab Simulator', subtitle: 'Interactive SOPs · Checklists · Fast-forward' },
    plateLayout: { title: '96-Well Plate Layout', subtitle: 'Color-code → Export → Pipette by reference' },
    dataFormat: { title: 'Data Preprocessing', subtitle: 'Plate reader OD → Blank subtraction → Normalize → GraphPad Prism ready' },
    common: { back: '← Back', next: 'Next →', complete: 'Complete', reset: 'Reset', clear: 'Clear All', export: '📸 Export Image', copy: '📋 Copy', copied: '✅ Copied', loadExample: 'Load Example', calculating: 'Enter data above', darkMode: 'Dark Mode', lightMode: 'Light Mode' },
  },
}

const I18nContext = createContext({ t: translations.zh, lang: 'zh', toggleLang: () => {} })

export function I18nProvider({ children }) {
  const [lang, setLang] = useState(() => localStorage.getItem('lang') || 'zh')

  const toggleLang = useCallback(() => {
    setLang((prev) => {
      const next = prev === 'zh' ? 'en' : 'zh'
      localStorage.setItem('lang', next)
      return next
    })
  }, [])

  const t = translations[lang]

  return (
    <I18nContext.Provider value={{ t, lang, toggleLang }}>
      {children}
    </I18nContext.Provider>
  )
}

export function useI18n() {
  return useContext(I18nContext)
}
