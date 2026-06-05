import { useNavigate } from 'react-router-dom'

const modules = [
  { path: '/cell-database',    icon: '🧬', title: '细胞资料库',    desc: '常用细胞系培养条件、消化红线速查', color: 'from-[#0071e3] to-[#5ac8fa]', bg: 'bg-[#0071e3]/5' },
  { path: '/experiment-sop',   icon: '📋', title: '实验 SOP',      desc: '细胞+细菌 12 个标准实验操作规范',  color: 'from-[#ff9f0a] to-[#ffcc00]', bg: 'bg-[#ff9f0a]/5' },
  { path: '/unit-converter',   icon: '⚗️', title: '试剂配制',      desc: '浓度换算 · 稀释计算 · 百分比溶液',  color: 'from-[#34c759] to-[#30d158]', bg: 'bg-[#34c759]/5' },
  { path: '/plate-calculator', icon: '🔬', title: '铺板计算器',    desc: '血球计数 → 预混液 → 排枪铺板',    color: 'from-[#af52de] to-[#bf5af2]', bg: 'bg-[#af52de]/5' },
  { path: '/lab-simulator',    icon: '🎮', title: '实验模拟',      desc: '交互式实验流程 · 防呆清单 · 快进',  color: 'from-[#ff3b30] to-[#ff6b60]', bg: 'bg-[#ff3b30]/5' },
]

const stats = [
  { icon: '🧫', value: '3', label: '细胞系' },
  { icon: '📝', value: '12', label: 'SOP 实验' },
  { icon: '🦠', value: '4', label: '模拟场景' },
  { icon: '⚗️', value: '4', label: '计算模式' },
]

export default function Home() {
  const navigate = useNavigate()

  return (
    <div className="max-w-4xl mx-auto animate-fade-in-up">
      {/* Hero */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#0071e3]/8 dark:bg-[#0071e3]/15 text-[13px] font-medium text-[#0071e3] dark:text-[#5ac8fa] mb-4">
          <span className="w-1.5 h-1.5 rounded-full bg-[#0071e3] dark:bg-[#5ac8fa] animate-pulse" />
          细胞实验室效率工具
        </div>
        <h1 className="text-[36px] sm:text-[42px] font-bold text-[#1d1d1f] dark:text-white tracking-tight leading-tight">
          GOOOOOD's Lab
        </h1>
        <p className="mt-3 text-[17px] text-[#86868b] dark:text-[#98989d] font-medium max-w-md mx-auto leading-relaxed">
          细胞实验室效率工具 · 从种板计算到 SOP 规范，一站式搞定
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
        {stats.map((s) => (
          <div key={s.label} className="apple-card px-4 py-3.5 text-center">
            <div className="text-2xl mb-1">{s.icon}</div>
            <div className="text-xl font-bold text-[#1d1d1f] dark:text-white tracking-tight">{s.value}</div>
            <div className="text-[13px] text-[#aeaeb2] dark:text-[#636366] font-medium">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Module cards */}
      <div className="space-y-3">
        {modules.map((m) => (
          <button
            key={m.path}
            onClick={() => navigate(m.path)}
            className="w-full apple-card p-5 sm:p-6 flex items-center gap-5 text-left hover:scale-[1.01] transition-all duration-200 cursor-pointer group"
          >
            {/* Icon */}
            <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-br ${m.color} flex items-center justify-center text-2xl flex-shrink-0 shadow-sm group-hover:shadow-md transition-shadow`}>
              {m.icon}
            </div>
            {/* Text */}
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-[17px] text-[#1d1d1f] dark:text-white tracking-tight">{m.title}</h3>
              <p className="text-[14px] text-[#86868b] dark:text-[#98989d] mt-0.5">{m.desc}</p>
            </div>
            {/* Arrow */}
            <svg className="w-5 h-5 text-[#aeaeb2] dark:text-[#636366] group-hover:text-[#0071e3] group-hover:translate-x-0.5 transition-all flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        ))}
      </div>

      {/* Support */}
      <div className="mt-10 text-center">
        <a href="https://github.com/mingtiaop-hue/CELL-Helper" target="_blank" rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-[#ff9f0a] to-[#ff6b00] text-white font-semibold text-[15px] shadow-lg shadow-[#ff9f0a]/20 hover:shadow-xl hover:scale-[1.02] active:scale-95 transition-all cursor-pointer no-underline">
          ⭐ 在 GitHub 上支持这个项目
        </a>
        <p className="mt-3 text-[13px] text-[#aeaeb2] dark:text-[#636366] font-medium">
          Fatonion · 2026
        </p>
      </div>
    </div>
  )
}
