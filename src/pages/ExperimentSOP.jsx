import { NavLink, Outlet, useLocation } from 'react-router-dom'

const tabs = [
  { path: '/experiment-sop/basics',   label: '🧪 基础常识' },
  { path: '/experiment-sop/redlines', label: '⚠️ 细胞特性红线' },
  { path: '/experiment-sop/advanced', label: '🔬 进阶实验' },
]

export default function ExperimentSOP() {
  const location = useLocation()

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">📋 实验 SOP</h2>
        <p className="mt-1 text-sm text-slate-500 dark:text-[#98989d]">标准化实验操作流程 · 实验室独家规范</p>
      </div>

      {/* Sub-nav tabs */}
      <div className="flex flex-wrap gap-1.5 mb-6 p-1 bg-slate-100 dark:bg-[#3a3a3c] rounded-xl">
        {tabs.map((tab) => {
          const isActive = location.pathname === tab.path
          return (
            <NavLink
              key={tab.path}
              to={tab.path}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-100 ${
                isActive
                  ? 'bg-white dark:bg-[#2c2c2e] text-slate-900 dark:text-white dark:text-white shadow-sm'
                  : 'text-slate-500 dark:text-[#98989d] hover:text-slate-700 dark:text-[#f5f5f7] hover:bg-white dark:bg-[#2c2c2e]/60'
              }`}
            >
              {tab.label}
            </NavLink>
          )
        })}
      </div>

      {/* Content */}
      <Outlet />
    </div>
  )
}
