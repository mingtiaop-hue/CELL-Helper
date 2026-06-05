import { useState, useEffect } from 'react'
import { Routes, Route, NavLink, Navigate, useLocation, useNavigate } from 'react-router-dom'
import { I18nProvider, useI18n } from './i18n/context'
import CellDatabase from './pages/CellDatabase'
import ExperimentSOP from './pages/ExperimentSOP'
import PlateCalculator from './pages/PlateCalculator'
import LabSimulator from './pages/LabSimulator'
import UnitConverter from './pages/UnitConverter'
import Home from './pages/Home'
import PlateLayout from './pages/PlateLayout'
import DataFormat from './pages/DataFormat'
import BackToTop from './components/BackToTop'
import SopBasics from './pages/sop/SopBasics'
import SopRedLines from './pages/sop/SopRedLines'
import SopAdvanced from './pages/sop/SopAdvanced'
import SopBacteria from './pages/sop/SopBacteria'

export default function App() {
  return <I18nProvider><AppShell /></I18nProvider>
}

function AppShell() {
  const { t, lang, toggleLang } = useI18n()
  const navigate = useNavigate()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [expanded, setExpanded] = useState(() => {
    const saved = localStorage.getItem('sidebar-expanded')
    return saved ? JSON.parse(saved) : ['/experiment-sop']
  })
  const [dark, setDark] = useState(() => {
    const saved = localStorage.getItem('theme')
    if (saved) return saved === 'dark'
    return window.matchMedia?.('(prefers-color-scheme: dark)').matches ?? false
  })
  const location = useLocation()

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark)
    localStorage.setItem('theme', dark ? 'dark' : 'light')
  }, [dark])

  // Follow system theme changes
  useEffect(() => {
    const mq = window.matchMedia('(prefers-color-scheme: dark)')
    const handler = (e) => {
      if (!localStorage.getItem('theme')) setDark(e.matches)
    }
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  const toggleExpand = (path) => {
    setExpanded((prev) => {
      const next = prev.includes(path) ? prev.filter((p) => p !== path) : [...prev, path]
      localStorage.setItem('sidebar-expanded', JSON.stringify(next))
      return next
    })
  }

  const navItems = [
    { path: '/cell-database',    label: t.nav.cellDb,       icon: '🧬' },
    { path: '/experiment-sop',   label: t.nav.experimentSop, icon: '📋',
      children: [
        { path: '/experiment-sop/basics',   label: t.nav.basics },
        { path: '/experiment-sop/redlines', label: t.nav.redlines },
        { path: '/experiment-sop/advanced', label: t.nav.advanced },
        { path: '/experiment-sop/bacteria', label: t.nav.bacteria },
      ],
    },
    { path: '/unit-converter',  label: t.nav.unitConv,     icon: '⚗️' },
    { path: '/plate-calculator', label: t.nav.plateCalc,    icon: '🔬' },
    { path: '/plate-layout',    label: t.nav.plateLayout,   icon: '🎨' },
    { path: '/data-format',     label: t.nav.dataFormat,    icon: '📊' },
    { path: '/lab-simulator',   label: t.nav.labSim,        icon: '🎮' },
  ]

  return (
    <div className="flex h-screen bg-[#f5f5f7] dark:bg-[#1c1c1e] text-[#1d1d1f] dark:text-[#f5f5f7] transition-colors duration-300">

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-30 bg-black/20 backdrop-blur-sm lg:hidden transition-all duration-300"
          onClick={() => setSidebarOpen(false)} />
      )}

      {/* ======== SIDEBAR ======== */}
      <aside
        className={`fixed lg:static inset-y-0 left-0 z-40 w-60 flex flex-col transition-all duration-300 ease-out
          glass
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}
      >
        {/* Logo + toggles */}
        <div className="px-5 py-6 flex items-center justify-between">
          <button onClick={() => navigate('/')}
            className="text-lg font-bold tracking-tight text-[#1d1d1f] dark:text-white hover:opacity-70 transition-opacity cursor-pointer">
            🧫 {t.app.title}
          </button>
          <div className="flex items-center gap-1">
            <button onClick={toggleLang}
              className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold transition-all duration-200 cursor-pointer hover:bg-black/[0.05] dark:hover:bg-white/[0.08]"
              title={lang === 'zh' ? 'Switch to English' : '切换到中文'}>
              {lang === 'zh' ? 'EN' : '中'}
            </button>
            <button onClick={() => setDark(!dark)}
              className="w-8 h-8 rounded-lg flex items-center justify-center text-sm transition-all duration-200 cursor-pointer hover:bg-black/[0.05] dark:hover:bg-white/[0.08]"
              title={dark ? t.common.lightMode : t.common.darkMode}>
              {dark ? '☀️' : '🌙'}
            </button>
          </div>
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
                  <button onClick={() => toggleExpand(item.path)}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-[13px] font-medium transition-all duration-200 cursor-pointer text-left
                      ${isParentActive
                        ? 'text-[#0071e3] bg-[#0071e3]/6 dark:bg-[#0071e3]/15'
                        : 'text-[#1d1d1f]/70 hover:bg-black/[0.04] hover:text-[#1d1d1f] dark:text-white/60 dark:hover:bg-white/[0.04] dark:hover:text-white'}`}
                  >
                    <span className="text-base">{item.icon}</span>
                    <span className="flex-1">{item.label}</span>
                    <svg className={`w-3.5 h-3.5 text-[#86868b] dark:text-[#98989d] transition-transform duration-200 ${open ? 'rotate-90' : ''}`}
                      fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                ) : (
                  <NavLink to={item.path} onClick={() => setSidebarOpen(false)}
                    className={({ isActive }) =>
                      `flex items-center gap-3 px-3 py-2.5 rounded-xl text-[13px] font-medium transition-all duration-200
                      ${isActive
                        ? 'text-[#0071e3] bg-[#0071e3]/6 dark:bg-[#0071e3]/15'
                        : 'text-[#1d1d1f]/70 hover:bg-black/[0.04] hover:text-[#1d1d1f] dark:text-white/60 dark:hover:bg-white/[0.04] dark:hover:text-white'}`
                    }>
                    <span className="text-base">{item.icon}</span>
                    {item.label}
                  </NavLink>
                )}

                {item.children && open && (
                  <div className="ml-9 mt-0.5 space-y-0.5 border-l-2 border-black/[0.06] dark:border-white/[0.08] pl-3">
                    {item.children.map((child) => (
                      <NavLink key={child.path} to={child.path} onClick={() => setSidebarOpen(false)}
                        className={({ isActive }) =>
                          `block px-3 py-1.5 rounded-lg text-[13px] transition-all duration-200
                          ${isActive
                            ? 'text-[#0071e3] font-medium bg-[#0071e3]/4 dark:bg-[#0071e3]/10'
                            : 'text-[#86868b] hover:text-[#1d1d1f] hover:bg-black/[0.03] dark:text-[#98989d] dark:hover:text-white dark:hover:bg-white/[0.03]'}`
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
        <div className="px-6 py-5 text-xs text-[#aeaeb2] dark:text-[#636366] font-medium">
          {t.app.subtitle}
        </div>
      </aside>

      {/* ======== MAIN ======== */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Mobile top bar */}
        <header className="lg:hidden glass flex items-center justify-between gap-3 px-5 py-3">
          <div className="flex items-center gap-3">
            <button onClick={() => setSidebarOpen(true)}
              className="p-1.5 -ml-1 rounded-lg hover:bg-black/[0.04] dark:hover:bg-white/[0.06] text-[#1d1d1f]/70 dark:text-white/60 transition-colors cursor-pointer">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            </button>
            <span className="font-bold text-[#1d1d1f] dark:text-white">🧫 {t.app.title}</span>
          </div>
          <div className="flex items-center gap-1">
            <button onClick={toggleLang}
              className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold hover:bg-black/[0.04] dark:hover:bg-white/[0.06] transition-colors cursor-pointer">
              {lang === 'zh' ? 'EN' : '中'}
            </button>
            <button onClick={() => setDark(!dark)}
              className="w-8 h-8 rounded-lg flex items-center justify-center text-sm hover:bg-black/[0.04] dark:hover:bg-white/[0.06] transition-colors cursor-pointer">
              {dark ? '☀️' : '🌙'}
            </button>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto p-5 sm:p-8 lg:p-10">
          {/* Breadcrumb — hidden on home page */}
          {location.pathname !== '/' && (
            <div className="mb-4">
              <button onClick={() => navigate('/')}
                className="inline-flex items-center gap-1.5 text-[13px] font-medium text-[#86868b] dark:text-[#98989d] hover:text-[#0071e3] dark:hover:text-[#5ac8fa] transition-colors cursor-pointer">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
                返回首页
              </button>
            </div>
          )}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cell-database" element={<CellDatabase />} />
            <Route path="/experiment-sop" element={<ExperimentSOP />}>
              <Route index element={<Navigate to="/experiment-sop/basics" replace />} />
              <Route path="basics" element={<SopBasics />} />
              <Route path="redlines" element={<SopRedLines />} />
              <Route path="advanced" element={<SopAdvanced />} />
              <Route path="bacteria" element={<SopBacteria />} />
            </Route>
            <Route path="/plate-calculator" element={<PlateCalculator />} />
            <Route path="/lab-simulator" element={<LabSimulator />} />
            <Route path="/unit-converter" element={<UnitConverter />} />
            <Route path="/plate-layout" element={<PlateLayout />} />
            <Route path="/data-format" element={<DataFormat />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </div>
      <BackToTop />
    </div>
  )
}
