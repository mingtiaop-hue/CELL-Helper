import { useState, useRef, useCallback, useEffect } from 'react'

const ROWS = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H']
const COLS = Array.from({ length: 12 }, (_, i) => i + 1)

const PAINTS = [
  { id: null,      label: '🧹 橡皮擦', color: '',           cellBg: 'bg-white dark:bg-[#2c2c2e]', dot: 'bg-[#e5e5ea]' },
  { id: 'blank',   label: '⬜ Blank',   color: '#e5e5ea',   cellBg: 'bg-[#e5e5ea] dark:bg-[#48484a]', dot: 'bg-[#aeaeb2]' },
  { id: 'control', label: '🟦 Control', color: '#c6e0f5',   cellBg: 'bg-[#c6e0f5] dark:bg-[#1a3a5c]', dot: 'bg-[#0071e3]' },
  { id: 'sample',  label: '🟩 Sample',  color: '#d4f0d4',   cellBg: 'bg-[#d4f0d4] dark:bg-[#1a3c1a]', dot: 'bg-[#34c759]' },
  { id: 'drug1',   label: '🟨 Drug A',  color: '#fff3c4',   cellBg: 'bg-[#fff3c4] dark:bg-[#3c3a1a]', dot: 'bg-[#ff9f0a]' },
  { id: 'drug2',   label: '🟪 Drug B',  color: '#e8d5f5',   cellBg: 'bg-[#e8d5f5] dark:bg-[#2c1a3c]', dot: 'bg-[#af52de]' },
  { id: 'pos',     label: '🟥 Positive',color: '#fdd4d4',   cellBg: 'bg-[#fdd4d4] dark:bg-[#3c1a1a]', dot: 'bg-[#ff3b30]' },
]

// Empty 8x12 grid
const emptyGrid = () => ROWS.map(() => COLS.map(() => null))

export default function PlateLayout() {
  const [grid, setGrid] = useState(emptyGrid)
  const [paint, setPaint] = useState('sample')
  const [isDrawing, setIsDrawing] = useState(false)
  const gridRef = useRef(null)
  const gridScrollRef = useRef(null)
  const lastCell = useRef(null)

  const scrollGrid = (dir) => {
    const el = gridScrollRef.current
    if (el) el.scrollBy({ left: dir * 250, behavior: 'smooth' })
  }

  // Mouse/touch painting
  const paintCell = useCallback((r, c) => {
    const key = `${r},${c}`
    if (lastCell.current === key) return
    lastCell.current = key
    setGrid((prev) => {
      const next = prev.map((row) => [...row])
      next[r][c] = next[r][c] === paint ? null : paint
      return next
    })
  }, [paint])

  const handlePointerDown = (r, c) => {
    setIsDrawing(true)
    lastCell.current = null
    paintCell(r, c)
  }

  const handlePointerEnter = (r, c) => {
    if (isDrawing) paintCell(r, c)
  }

  useEffect(() => {
    const stop = () => setIsDrawing(false)
    window.addEventListener('pointerup', stop)
    return () => window.removeEventListener('pointerup', stop)
  }, [])

  // Export as image (pure canvas, no dependency)
  const exportImage = () => {
    const isDark = document.documentElement.classList.contains('dark')
    const canvas = document.createElement('canvas')
    const cellSize = 60; const pad = 40; const headerPad = 30
    canvas.width = headerPad + 12 * cellSize + pad * 2
    canvas.height = headerPad + 8 * cellSize + pad * 2
    const ctx = canvas.getContext('2d')

    // Background
    ctx.fillStyle = isDark ? '#1c1c1e' : '#ffffff'
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    const paintMap = { blank: '#e5e5ea', control: '#c6e0f5', sample: '#d4f0d4', drug1: '#fff3c4', drug2: '#e8d5f5', pos: '#fdd4d4' }
    const darkPaintMap = { blank: '#48484a', control: '#1a3a5c', sample: '#1a3c1a', drug1: '#3c3a1a', drug2: '#2c1a3c', pos: '#3c1a1a' }

    // Column numbers
    ctx.fillStyle = isDark ? '#636366' : '#aeaeb2'
    ctx.font = '11px sans-serif'
    for (let c = 0; c < 12; c++) {
      ctx.fillText(String(c + 1), pad + headerPad + c * cellSize + cellSize / 2 - 3, headerPad - 8)
    }

    // Rows
    for (let r = 0; r < 8; r++) {
      ctx.fillText(ROWS[r], pad + 8, headerPad + r * cellSize + cellSize / 2 + 4)
      for (let c = 0; c < 12; c++) {
        const x = pad + headerPad + c * cellSize; const y = headerPad + r * cellSize
        const paintId = grid[r][c]
        ctx.fillStyle = paintId ? (isDark ? (darkPaintMap[paintId] || '#3a3a3c') : (paintMap[paintId] || '#eee')) : (isDark ? '#2c2c2e' : '#fff')
        ctx.fillRect(x + 1, y + 1, cellSize - 2, cellSize - 2)
        ctx.strokeStyle = isDark ? '#48484a' : '#d2d2d7'
        ctx.lineWidth = 1
        ctx.strokeRect(x + 1, y + 1, cellSize - 2, cellSize - 2)
        ctx.fillStyle = isDark ? '#98989d' : '#86868b'
        ctx.font = '9px sans-serif'
        ctx.fillText(`${ROWS[r]}${c + 1}`, x + 3, y + 12)
      }
    }

    canvas.toBlob((blob) => {
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a'); a.href = url; a.download = '96well-plate.png'; a.click()
      URL.revokeObjectURL(url)
    })
  }

  // Get color info for a cell
  const getCellStyle = (r, c) => {
    const paintId = grid[r][c]
    if (!paintId) return 'bg-white dark:bg-[#2c2c2e] border-[#e5e5ea] dark:border-[#48484a]'
    const p = PAINTS.find((x) => x.id === paintId)
    return `${p?.cellBg || ''} border-[#d2d2d7] dark:border-[#636366]`
  }

  const getPaintDot = (r, c) => {
    const paintId = grid[r][c]
    if (!paintId) return null
    const p = PAINTS.find((x) => x.id === paintId)
    return p?.dot || ''
  }

  return (
    <div className="max-w-6xl mx-auto animate-fade-in-up">
      <div className="mb-8">
        <h2 className="text-[32px] font-bold text-[#1d1d1f] dark:text-white tracking-tight">96 孔板可视化排布</h2>
        <p className="mt-1.5 text-[16px] text-[#86868b] dark:text-[#98989d] font-medium">
          涂色标记 → 导出图片 → 对照加样
        </p>
      </div>

      {/* Paint toolbar */}
      <div className="mb-6 flex flex-wrap gap-2 p-3 bg-[#f5f5f7] dark:bg-[#2c2c2e] rounded-2xl">
        {PAINTS.map((p) => (
          <button key={p.id ?? 'eraser'} onClick={() => setPaint(p.id)}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-[13px] font-medium transition-all cursor-pointer ${
              paint === p.id
                ? 'bg-white dark:bg-[#3a3a3c] text-[#1d1d1f] dark:text-white shadow-sm ring-1 ring-black/[0.06] dark:ring-white/[0.08]'
                : 'text-[#86868b] dark:text-[#98989d] hover:bg-white/60 dark:hover:bg-[#3a3a3c]/60'
            }`}>
            <span className={`w-3.5 h-3.5 rounded ${p.dot}`} />
            {p.label}
          </button>
        ))}
        <button onClick={() => setGrid(emptyGrid)}
          className="ml-auto px-4 py-2 rounded-xl text-[13px] font-medium text-[#ff3b30] hover:bg-[#ff3b30]/6 transition-colors cursor-pointer">
          清空全部
        </button>
      </div>

      {/* Grid with horizontal scroll for mobile */}
      <div className="relative">
        <div className="overflow-x-auto pb-2 -mx-4 px-4 scroll-smooth" ref={(el) => { gridScrollRef.current = el }}
          style={{ WebkitOverflowScrolling: 'touch' }}>
          <div ref={gridRef} className="inline-block min-w-[700px] w-full bg-white dark:bg-[#1c1c1e] rounded-2xl p-4 sm:p-6 apple-card select-none"
            style={{ touchAction: 'none' }}>
          {/* Column numbers */}
          <div className="flex mb-1 ml-8">
            {COLS.map((c) => (
              <div key={c} className="flex-1 text-center text-[11px] font-semibold text-[#aeaeb2] dark:text-[#636366]">{c}</div>
            ))}
          </div>
          {/* Rows */}
          <div className="space-y-1">
            {ROWS.map((row, r) => (
              <div key={row} className="flex items-center gap-1">
                <div className="w-7 text-center text-[11px] font-bold text-[#aeaeb2] dark:text-[#636366] flex-shrink-0">{row}</div>
                {COLS.map((col, c) => {
                  const paintId = grid[r][c]
                  const dot = getPaintDot(r, c)
                  return (
                    <div key={col}
                      onPointerDown={() => handlePointerDown(r, c)}
                      onPointerEnter={() => handlePointerEnter(r, c)}
                      className={`flex-1 aspect-square rounded-md border cursor-pointer transition-all duration-75 flex items-center justify-center text-[10px] font-medium text-[#86868b] dark:text-[#98989d] hover:ring-2 hover:ring-[#0071e3]/30 ${isDrawing ? '' : ''} ${getCellStyle(r, c)}`}
                      title={`${row}${col}${paintId ? ' - ' + (PAINTS.find((p) => p.id === paintId)?.label || '') : ''}`}>
                      {dot && <span className={`w-2 h-2 rounded-full ${dot}`} />}
                      {!dot && <span className="opacity-30 text-[9px]">{row}{col}</span>}
                    </div>
                  )
                })}
              </div>
            ))}
          </div>
        </div>
        </div>
        {/* Mobile scroll arrows */}
        <div className="flex justify-between mt-2 sm:hidden">
          <button onClick={() => scrollGrid(-1)}
            className="w-10 h-10 rounded-xl bg-white dark:bg-[#2c2c2e] shadow-md ring-1 ring-black/[0.06] dark:ring-white/[0.08] flex items-center justify-center cursor-pointer active:scale-95 transition-all">
            <svg className="w-5 h-5 text-[#1d1d1f] dark:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button onClick={() => scrollGrid(1)}
            className="w-10 h-10 rounded-xl bg-white dark:bg-[#2c2c2e] shadow-md ring-1 ring-black/[0.06] dark:ring-white/[0.08] flex items-center justify-center cursor-pointer active:scale-95 transition-all">
            <svg className="w-5 h-5 text-[#1d1d1f] dark:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>

      {/* Action buttons */}
      <div className="mt-6 flex flex-wrap gap-3">
        <button onClick={exportImage}
          className="btn-apple btn-primary px-6 py-3 text-sm font-semibold cursor-pointer">
          📸 导出为图片
        </button>
        <button onClick={() => setGrid(emptyGrid)}
          className="bg-[#f5f5f7] dark:bg-[#2c2c2e] px-6 py-3 rounded-xl text-sm font-medium text-[#1d1d1f] dark:text-white hover:bg-[#e5e5ea] dark:hover:bg-[#3a3a3c] transition-colors cursor-pointer">
          清空重来
        </button>
      </div>
    </div>
  )
}
