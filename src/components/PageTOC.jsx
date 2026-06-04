import { useState, useEffect } from 'react'

export default function PageTOC({ items }) {
  const [active, setActive] = useState(0)
  const [collapsed, setCollapsed] = useState(true)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const idx = items.findIndex((item) => item.id === entry.target.id)
            if (idx >= 0) setActive(idx)
          }
        }
      },
      { rootMargin: '-20% 0px -70% 0px' }
    )

    items.forEach((item) => {
      const el = document.getElementById(item.id)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [items])

  const scrollTo = (id) => {
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
      setCollapsed(true)
    }
  }

  return (
    <div className="mb-6">
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="w-full apple-card px-5 py-3.5 flex items-center justify-between cursor-pointer hover:shadow-md transition-shadow"
      >
        <div className="flex items-center gap-2.5">
          <span className="text-base">📑</span>
          <span className="font-semibold text-[15px] text-[#1d1d1f] dark:text-white">本页目录</span>
          <span className="text-[13px] text-[#aeaeb2] dark:text-[#636366] font-medium">
            · {items.length} 个实验
          </span>
        </div>
        <svg className={`w-4 h-4 text-[#86868b] transition-transform duration-200 ${collapsed ? '' : 'rotate-90'}`}
          fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {!collapsed && (
        <div className="mt-2 apple-card overflow-hidden animate-scale-in">
          {items.map((item, idx) => (
            <button
              key={item.id}
              onClick={() => scrollTo(item.id)}
              className={`w-full flex items-center gap-3 px-5 py-2.5 text-left text-[14px] transition-colors cursor-pointer border-b border-black/[0.03] dark:border-white/[0.04] last:border-0 hover:bg-[#f5f5f7] dark:hover:bg-[#2c2c2e] ${
                idx === active
                  ? 'text-[#0071e3] font-semibold bg-[#0071e3]/4 dark:bg-[#0071e3]/10'
                  : 'text-[#1d1d1f] dark:text-white/70 font-medium'
              }`}
            >
              <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[11px] font-bold flex-shrink-0 ${
                idx === active ? 'bg-[#0071e3] text-white' : 'bg-[#e5e5ea] dark:bg-[#48484a] text-[#86868b]'
              }`}>
                {idx + 1}
              </span>
              <span className="truncate">{item.label}</span>
              {idx === active && (
                <span className="ml-auto w-1.5 h-1.5 rounded-full bg-[#0071e3] flex-shrink-0" />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
