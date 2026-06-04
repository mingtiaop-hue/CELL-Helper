import { useState, useEffect } from 'react'

export default function BackToTop() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  if (!visible) return null

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className="fixed bottom-6 right-6 z-50 w-11 h-11 rounded-2xl bg-white dark:bg-[#2c2c2e] shadow-lg ring-1 ring-black/[0.06] dark:ring-white/[0.08] flex items-center justify-center cursor-pointer hover:scale-105 active:scale-95 transition-all duration-200 animate-fade-in-up"
    >
      <svg className="w-5 h-5 text-[#1d1d1f] dark:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
      </svg>
    </button>
  )
}
