import { useState } from 'react'
import { Routes, Route, NavLink, Navigate, useLocation } from 'react-router-dom'
import CellDatabase from './pages/CellDatabase'
import ExperimentSOP from './pages/ExperimentSOP'
import PlateCalculator from './pages/PlateCalculator'
import LabSimulator from './pages/LabSimulator'
import SopBasics from './pages/sop/SopBasics'
import SopRedLines from './pages/sop/SopRedLines'
import SopAdvanced from './pages/sop/SopAdvanced'

const navItems = [
  { path: '/cell-database',    label: '细胞资料库', icon: '🧬' },
  {
    path: '/experiment-sop',   label: '实验 SOP',    icon: '📋',
    children: [
      { path: '/experiment-sop/basics',   label: '基础常识' },
      { path: '/experiment-sop/redlines', label: '细胞特性红线' },
      { path: '/experiment-sop/advanced', label: '进阶实验' },
    ],
  },
  { path: '/plate-calculator', label: '铺板计算器',   icon: '🔬' },
  { path: '/lab-simulator',    label: '实验模拟',     icon: '🎮' },
]

export default function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [expanded, setExpanded] = useState(['/experiment-sop'])
  const location = useLocation()

  const toggleExpand = (path) => {
    setExpanded((prev) =>
      prev.includes(path) ? prev.filter((p) => p !== path) : [...prev, path]
    )
  }

  return (
    <div className="flex h-screen bg-[#f5f5f7] text-[#1d1d1f]">

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-30 bg-black/20 backdrop-blur-sm lg:hidden transition-all duration-300"
          onClick={() => setSidebarOpen(false)} />
      )}

      {/* ======== SIDEBAR — Glass ======== */}
      <aside
        className={`fixed lg:static inset-y-0 left-0 z-40 w-60 flex flex-col transition-all duration-300 ease-out
          glass border-r-0
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}
      >
        {/* Logo */}
        <div className="px-6 py-7">
          <h1 className="text-lg font-bold tracking-tight text-[#1d1d1f]">🧫 GOOOOOD's Lab</h1>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-2 space-y-0.5 overflow-y-auto">
          {navItems.map((item) => {
            const isParentActive = item.children
              ? location.pathname.startsWith(item.path)
              : location.pathname === item.path
            const open = item.children && expanded.includes(item.path)

            return (
              <div key={item.path}>
                {item.children ? (
                  <button
                    onClick={() => toggleExpand(item.path)}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-[13px] font-medium transition-all duration-200 cursor-pointer text-left
                      ${isParentActive ? 'text-[#0071e3] bg-[#0071e3]/6' : 'text-[#1d1d1f]/70 hover:bg-black/[0.04] hover:text-[#1d1d1f]'}`}
                  >
                    <span className="text-base">{item.icon}</span>
                    <span className="flex-1">{item.label}</span>
                    <svg className={`w-3.5 h-3.5 text-[#86868b] transition-transform duration-200 ${open ? 'rotate-90' : ''}`}
                      fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                ) : (
                  <NavLink to={item.path} onClick={() => setSidebarOpen(false)}
                    className={({ isActive }) =>
                      `flex items-center gap-3 px-3 py-2.5 rounded-xl text-[13px] font-medium transition-all duration-200
                      ${isActive ? 'text-[#0071e3] bg-[#0071e3]/6' : 'text-[#1d1d1f]/70 hover:bg-black/[0.04] hover:text-[#1d1d1f]'}`
                    }>
                    <span className="text-base">{item.icon}</span>
                    {item.label}
                  </NavLink>
                )}

                {item.children && open && (
                  <div className="ml-9 mt-0.5 space-y-0.5 border-l-2 border-black/[0.06] pl-3">
                    {item.children.map((child) => (
                      <NavLink key={child.path} to={child.path} onClick={() => setSidebarOpen(false)}
                        className={({ isActive }) =>
                          `block px-3 py-1.5 rounded-lg text-[13px] transition-all duration-200
                          ${isActive ? 'text-[#0071e3] font-medium bg-[#0071e3]/4' : 'text-[#86868b] hover:text-[#1d1d1f] hover:bg-black/[0.03]'}`
                        }>
                        {child.label}
                      </NavLink>
                    ))}
                  </div>
                )}
              </div>
            )
          })}
        </nav>

        {/* Footer */}
        <div className="px-6 py-5 text-xs text-[#aeaeb2] font-medium">
          Sichuan Univ · BME · 2026
        </div>
      </aside>

      {/* ======== MAIN ======== */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Mobile top bar — Glass */}
        <header className="lg:hidden glass flex items-center gap-3 px-5 py-3">
          <button onClick={() => setSidebarOpen(true)}
            className="p-1.5 -ml-1 rounded-lg hover:bg-black/[0.04] text-[#1d1d1f]/70 transition-colors cursor-pointer">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          </button>
          <span className="font-bold text-[#1d1d1f]">🧫 GOOOOOD's Lab</span>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto p-5 sm:p-8 lg:p-10">
          <Routes>
            <Route path="/cell-database" element={<CellDatabase />} />
            <Route path="/experiment-sop" element={<ExperimentSOP />}>
              <Route index element={<Navigate to="/experiment-sop/basics" replace />} />
              <Route path="basics" element={<SopBasics />} />
              <Route path="redlines" element={<SopRedLines />} />
              <Route path="advanced" element={<SopAdvanced />} />
            </Route>
            <Route path="/plate-calculator" element={<PlateCalculator />} />
            <Route path="/lab-simulator" element={<LabSimulator />} />
            <Route path="*" element={<Navigate to="/cell-database" replace />} />
          </Routes>
        </main>
      </div>
    </div>
  )
}
