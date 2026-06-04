import { useState, useMemo } from 'react'

/* ================================================================
   DATA
   ================================================================ */
const DENSITY_CHIPS = [
  { label: 'CCK-8',      value: 5000 },
  { label: '活死染',      value: 40000 },
  { label: '划痕',        value: 400000 },
  { label: 'LPS-Raw',     value: 50000 },
]

const PLATES = {
  6:   { label: '6 孔板',  volRecommend: 2000 },
  12:  { label: '12 孔板', volRecommend: 1000 },
  24:  { label: '24 孔板', volRecommend: 500 },
  48:  { label: '48 孔板', volRecommend: 250 },
  96:  { label: '96 孔板', volRecommend: 100 },
}

/* ================================================================
   STEP 1 — HEMOCYTOMETER
   ================================================================ */
function StepOne({ count, setCount, squares, setSquares, dilution, setDilution, conc }) {
  return (
    <div className="apple-card p-6 sm:p-7 animate-fade-in-up">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <span className="text-2xl">🔢</span>
        <div>
          <h3 className="font-semibold text-[17px] text-[#1d1d1f] dark:text-white dark:text-white tracking-tight">
            血球计数板 · 浓度换算
          </h3>
          <p className="text-[14px] text-[#86868b] dark:text-[#98989d] mt-0.5">
            手打计数器 → 显微镜计数 → 出浓度
          </p>
        </div>
        <span className="ml-auto text-[14px] font-semibold text-[#86868b] dark:text-[#98989d] bg-black/[0.04] dark:bg-white dark:bg-[#2c2c2e]/[0.06] px-2.5 py-1 rounded-full">
          STEP 1
        </span>
      </div>

      {/* Input row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <InputGroup
          label="手打计数总数"
          sub="显微镜下咔哒按出的总数"
          value={count}
          onChange={(v) => setCount(v === '' ? '' : parseInt(v) || 0)}
          placeholder="例：312"
        />
        <InputGroup
          label="统计大格数"
          sub="默认四角 4 大格"
          value={squares}
          onChange={(v) => setSquares(v === '' ? '' : parseInt(v) || 0)}
          placeholder="4"
        />
        <div>
          <label className="block text-[14px] font-medium text-[#1d1d1f] dark:text-white/80 dark:text-white/80 mb-1.5">
            悬液稀释倍数
          </label>
          <select
            value={dilution}
            onChange={(e) => setDilution(parseFloat(e.target.value))}
            className="w-full rounded-xl border border-black/10 dark:border-white/10 bg-[#f5f5f7] dark:bg-[#2c2c2e] px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#0071e3]/20 focus:border-[#0071e3] transition-all duration-200 appearance-none"
          >
            {[1, 1.5, 2, 5, 10, 20, 50, 100].map((v) => (
              <option key={v} value={v}>{v}×{v === 1 ? '（不稀释）' : ''}</option>
            ))}
          </select>
          <p className="text-[14px] text-[#aeaeb2] dark:text-[#636366] mt-1.5 leading-relaxed">
            例：取 10μL 悬液 + 90μL 培养基混匀后计数 → 填 10
          </p>
        </div>
      </div>

      {/* Formula */}
      <div className="mt-4 bg-[#f5f5f7] dark:bg-[#2c2c2e] rounded-xl px-4 py-2.5 text-xs text-[#86868b] dark:text-[#98989d] font-mono tracking-tight">
        浓度 = (总数 ÷ 大格数) × 10⁴ × 稀释倍数
      </div>

      {/* Result — glowing when valid */}
      <div className={`mt-5 rounded-2xl px-6 py-5 text-center transition-all duration-500 ease-out ${
        conc && conc > 0
          ? 'bg-gradient-to-br from-[#0071e3]/6 to-[#0071e3]/2 ring-1 ring-[#0071e3]/15'
          : 'bg-[#f5f5f7] dark:bg-[#2c2c2e]'
      }`}>
        <div className="text-[14px] font-semibold text-[#86868b] dark:text-[#98989d] uppercase tracking-wider mb-2">
          当前细胞悬液浓度
        </div>
        {conc && conc > 0 ? (
          <div className="number-transition">
            <span className="text-4xl font-bold text-[#0071e3] dark:text-[#5ac8fa] tracking-tight">
              {(conc / 1e4).toFixed(2)}
            </span>
            <span className="text-[#0071e3] dark:text-[#5ac8fa]/ dark:text-[#5ac8fa]/70 font-medium ml-1.5 text-base">×10⁴ cells/mL</span>
            <div className="text-sm text-[#86868b] dark:text-[#98989d] mt-1 font-mono">
              = {conc.toLocaleString()} cells/mL
            </div>
            <div className="mt-3 flex items-center justify-center gap-1.5 text-[14px] text-[#0071e3] dark:text-[#5ac8fa]/ dark:text-[#5ac8fa]/60 font-medium animate-fade-in-up">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 5v14M5 12l7 7 7-7"/></svg>
              已同步至第二步
            </div>
          </div>
        ) : (
          <span className="text-[#aeaeb2] dark:text-[#636366] text-base font-medium">输入上方数据自动计算</span>
        )}
      </div>
    </div>
  )
}

/* ================================================================
   STEP 2 — PRE-MIX PLATING (DECOUPLED)
   ================================================================ */
function StepTwo({ conc }) {
  const [density, setDensity] = useState('5000')
  const [plateKey, setPlateKey] = useState('96')
  const [volPerWell, setVolPerWell] = useState(PLATES['96'].volRecommend)
  const [wellCount, setWellCount] = useState('')
  const [showRedundancy, setShowRedundancy] = useState(false)
  const [redundancy, setRedundancy] = useState(1.1)

  const plate = PLATES[plateKey]

  // When plate changes, auto-set recommended volume
  const handlePlateChange = (key) => {
    setPlateKey(key)
    setVolPerWell(PLATES[key].volRecommend)
  }

  // Chips
  const handleChip = (value) => {
    setDensity(String(value))
  }

  // Calculation
  const result = useMemo(() => {
    const d = parseInt(density)
    const v = parseInt(volPerWell)
    const n = parseInt(wellCount)
    if (!conc || conc <= 0 || !d || d <= 0 || !v || v <= 0 || !n || n <= 0) return null

    const totalCells = d * n * redundancy
    const totalVol   = v * n * redundancy
    const stockVol   = totalCells / conc * 1e6    // μL
    const mediumVol  = totalVol - stockVol

    return {
      totalCells: Math.round(totalCells),
      totalVol,
      stockVol,
      mediumVol,
      valid: stockVol > 0 && mediumVol > 0,
      cellsPerWell: d,
      perWellVol: v,
    }
  }, [conc, density, volPerWell, wellCount, redundancy])

  return (
    <div className="apple-card p-6 sm:p-7 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <span className="text-2xl">🧪</span>
        <div>
          <h3 className="font-semibold text-[17px] text-[#1d1d1f] dark:text-white dark:text-white tracking-tight">
            预混液铺板计算
          </h3>
          <p className="text-[14px] text-[#86868b] dark:text-[#98989d] mt-0.5">
            离心管预混 → 排枪分装
          </p>
        </div>
        <span className="ml-auto text-[14px] font-semibold text-[#86868b] dark:text-[#98989d] bg-black/[0.04] dark:bg-white dark:bg-[#2c2c2e]/[0.06] px-2.5 py-1 rounded-full">
          STEP 2
        </span>
      </div>

      {/* Connection from Step 1 */}
      <div className="flex items-center gap-3 mb-6 text-[14px] text-[#86868b] dark:text-[#98989d]">
        <div className="flex-1 h-px bg-black/[0.06]" />
        <span className="flex-shrink-0">
          {conc && conc > 0
            ? `浓度：${(conc / 1e4).toFixed(2)} ×10⁴ cells/mL`
            : '⬆️ 请先完成第一步'}
        </span>
        <div className="flex-1 h-px bg-black/[0.06]" />
      </div>

      {/* ======== THREE INDEPENDENT SETTINGS ======== */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-6">
        {/* 1. Cell density */}
        <div>
          <label className="block text-[14px] font-medium text-[#1d1d1f] dark:text-white/80 dark:text-white/80 mb-2">
            目标细胞密度 <span className="font-normal text-[#aeaeb2] dark:text-[#636366]">(cells/孔)</span>
          </label>
          {/* Quick chips */}
          <div className="flex flex-wrap gap-1.5 mb-2.5">
            {DENSITY_CHIPS.map((chip) => (
              <button
                key={chip.label}
                onClick={() => handleChip(chip.value)}
                className={`px-2.5 py-1 rounded-lg text-[14px] font-medium transition-all duration-200 cursor-pointer
                  ${String(chip.value) === density
                    ? 'bg-[#0071e3] text-white dark:text-white shadow-sm'
                    : 'bg-[#f5f5f7] dark:bg-[#2c2c2e] text-[#1d1d1f] dark:text-white/60 hover:bg-black/[0.06] hover:text-[#1d1d1f] dark:hover:text-white dark:text-white dark:text-white'
                  }`}
              >
                {chip.label} <span className="opacity-70">{chip.value.toLocaleString()}</span>
              </button>
            ))}
          </div>
          <input
            type="number" value={density}
            onChange={(e) => setDensity(e.target.value)}
            placeholder="手动输入"
            className="w-full rounded-xl border border-black/10 dark:border-white/10 bg-[#f5f5f7] dark:bg-[#2c2c2e] px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#0071e3]/20 focus:border-[#0071e3] transition-all duration-200"
          />
        </div>

        {/* 2. Plate type + volume */}
        <div>
          <label className="block text-[14px] font-medium text-[#1d1d1f] dark:text-white/80 dark:text-white/80 mb-2">孔板类型</label>
          <select
            value={plateKey}
            onChange={(e) => handlePlateChange(e.target.value)}
            className="w-full rounded-xl border border-black/10 dark:border-white/10 bg-[#f5f5f7] dark:bg-[#2c2c2e] px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#0071e3]/20 focus:border-[#0071e3] transition-all duration-200 appearance-none mb-2.5"
          >
            {Object.entries(PLATES).map(([k, v]) => (
              <option key={k} value={k}>{v.label}（推荐 {v.volRecommend} μL/孔）</option>
            ))}
          </select>
          <label className="block text-[14px] font-medium text-[#86868b] dark:text-[#98989d] mb-1">单孔加液体积 (μL)</label>
          <input
            type="number" value={volPerWell}
            onChange={(e) => setVolPerWell(e.target.value === '' ? '' : parseInt(e.target.value))}
            className="w-full rounded-xl border border-black/10 dark:border-white/10 bg-[#f5f5f7] dark:bg-[#2c2c2e] px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#0071e3]/20 focus:border-[#0071e3] transition-all duration-200"
          />
        </div>

        {/* 3. Well count */}
        <div>
          <InputGroup
            label="计划铺设孔数"
            sub="含复孔与对照"
            value={wellCount}
            onChange={(v) => setWellCount(v === '' ? '' : parseInt(v) || 0)}
            placeholder="例：12"
          />
          {/* Collapsible redundancy */}
          <button
            onClick={() => setShowRedundancy(!showRedundancy)}
            className="mt-3 text-[14px] text-[#86868b] dark:text-[#98989d] hover:text-[#1d1d1f] dark:hover:text-white dark:text-white dark:text-white dark:text-white transition-colors cursor-pointer flex items-center gap-1"
          >
            <svg className={`w-3 h-3 transition-transform duration-200 ${showRedundancy ? 'rotate-90' : ''}`}
              fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path d="M9 5l7 7-7 7"/></svg>
            加液冗余 · {redundancy.toFixed(1)}×
          </button>
          {showRedundancy && (
            <div className="mt-2 flex items-center gap-2 animate-scale-in">
              <input
                type="range" min={1.0} max={1.5} step={0.05}
                value={redundancy}
                onChange={(e) => setRedundancy(parseFloat(e.target.value))}
                className="flex-1 h-1.5 bg-[#e5e5ea] dark:bg-[#48484a] rounded-full accent-[#0071e3] cursor-pointer"
              />
              <span className="text-xs font-semibold text-[#1d1d1f] dark:text-white dark:text-white w-8 text-right">{redundancy.toFixed(1)}×</span>
            </div>
          )}
        </div>
      </div>

      {/* ======== RESULT ======== */}
      {!conc || conc <= 0 ? (
        <div className="bg-[#f5f5f7] dark:bg-[#2c2c2e] rounded-2xl px-6 py-10 text-center">
          <span className="text-4xl block mb-3">⬆️</span>
          <p className="text-sm text-[#86868b] dark:text-[#98989d] font-medium">请先在第一步完成血球计数</p>
          <p className="text-xs text-[#aeaeb2] dark:text-[#636366] mt-1">浓度数据将自动传递到此处</p>
        </div>
      ) : !result ? (
        <div className="bg-[#f5f5f7] dark:bg-[#2c2c2e] rounded-2xl px-6 py-10 text-center">
          <span className="text-4xl block mb-3">📝</span>
          <p className="text-sm text-[#86868b] dark:text-[#98989d] font-medium">请填写目标密度、孔板类型和孔数</p>
        </div>
      ) : !result.valid ? (
        <div className="bg-[#ff3b30]/5 border border-[#ff3b30]/15 rounded-2xl px-5 py-4 text-sm text-[#ff3b30] font-medium">
          ⚠️ 细胞浓度不足以达到目标接种密度。请离心重悬浓缩或降低目标密度。
        </div>
      ) : (
        <div className="animate-scale-in">
          {/* Summary */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5">
            <StatBox value={result.totalCells.toLocaleString()} unit="cells" label="需要总细胞数" />
            <StatBox value={result.mediumVol.toFixed(1)} unit="μL" label="加入培养基" accent />
            <StatBox value={result.stockVol.toFixed(1)} unit="μL" label="吸取细胞悬液" accent />
            <StatBox value={result.perWellVol + ' μL'} unit="" label="每孔分装" />
          </div>

          {/* Operation cards */}
          <div className="bg-gradient-to-br from-[#f5f5f7] to-white rounded-2xl ring-1 ring-black/[0.04] dark:ring-white/[0.06] overflow-hidden">
            <div className="px-5 py-3.5 border-b border-black/[0.04] dark:border-white/[0.06]">
              <h4 className="font-semibold text-sm text-[#1d1d1f] dark:text-white dark:text-white tracking-tight">
                📋 预混液铺板操作卡
              </h4>
            </div>
            <div className="p-5 space-y-3">
              <OpCard num="❶" title="准备离心管" accent="bg-[#0071e3]">
                取无菌离心管，加入{' '}
                <strong className="text-[#0071e3] dark:text-[#5ac8fa]">{result.mediumVol.toFixed(1)} μL</strong>{' '}
                新鲜培养基。
                <div className="text-[14px] text-[#aeaeb2] dark:text-[#636366] mt-0.5">
                  = 总量 {result.totalVol.toFixed(1)} μL − 悬液 {result.stockVol.toFixed(1)} μL
                </div>
              </OpCard>

              <OpCard num="❷" title="加入细胞悬液" accent="bg-[#34c759]">
                将计数后的原悬液充分吹打均匀，准确吸取{' '}
                <strong className="text-[#34c759]">{result.stockVol.toFixed(1)} μL</strong>{' '}
                加入管中。
                <div className="text-[14px] text-[#aeaeb2] dark:text-[#636366] mt-0.5">
                  = {result.totalCells.toLocaleString()} cells ÷ {conc.toLocaleString()} cells/mL × 10⁶
                </div>
              </OpCard>

              <OpCard num="❸" title="混匀 · 排枪分装" accent="bg-[#ff9f0a]">
                轻柔吹打混匀配成预混液，使用<strong>排枪</strong>向每孔加入{' '}
                <strong className="text-[#ff9f0a]">{result.perWellVol} μL</strong>。
                <div className="text-[14px] text-[#aeaeb2] dark:text-[#636366] mt-0.5">
                  预混液总体积 {result.totalVol.toFixed(1)} μL · 可铺 {wellCount} 孔
                  {redundancy > 1 && `（含 ${Math.ceil(parseInt(wellCount) * (redundancy - 1))} 孔冗余）`}
                </div>
              </OpCard>

              <OpCard num="❹" title="十字摇匀 · 放入培养箱" accent="bg-[#8e8e93]">
                十字摇匀法轻柔晃动孔板使细胞均匀分布。标记日期、细胞种类、密度。
                37°C / 5% CO₂ 培养。
              </OpCard>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

/* ================================================================
   REUSABLE WIDGETS
   ================================================================ */
function InputGroup({ label, sub, value, onChange, placeholder }) {
  return (
    <div>
      <label className="block text-[14px] font-medium text-[#1d1d1f] dark:text-white/80 dark:text-white/80 mb-1.5">
        {label} {sub && <span className="font-normal text-[#aeaeb2] dark:text-[#636366]">({sub})</span>}
      </label>
      <input
        type="number" value={value} onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-xl border border-black/10 dark:border-white/10 bg-[#f5f5f7] dark:bg-[#2c2c2e] px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#0071e3]/20 focus:border-[#0071e3] transition-all duration-200"
        inputMode="numeric"
      />
    </div>
  )
}

function StatBox({ value, unit, label, accent }) {
  return (
    <div className={`rounded-2xl p-3.5 text-center transition-all duration-300 ${
      accent ? 'bg-[#0071e3]/5 dark:bg-[#0071e3]/15 ring-1 ring-[#0071e3]/10' : 'bg-[#f5f5f7] dark:bg-[#2c2c2e]'
    }`}>
      <div className={`text-lg font-bold tracking-tight number-transition ${accent ? 'text-[#0071e3] dark:text-[#5ac8fa]' : 'text-[#1d1d1f] dark:text-white'}`}>
        {value}{unit && <span className="text-xs font-medium opacity-50 ml-0.5">{unit}</span>}
      </div>
      <div className="text-[14px] text-[#86868b] dark:text-[#98989d] mt-0.5 font-medium">{label}</div>
    </div>
  )
}

function OpCard({ num, title, accent, children }) {
  return (
    <div className="bg-white dark:bg-[#2c2c2e] rounded-2xl p-4 ring-1 ring-black/[0.03] dark:ring-white/[0.05] hover:ring-black/[0.06] transition-all duration-200">
      <div className="flex items-center gap-2.5 mb-1.5">
        <span className={`w-5 h-5 rounded-full ${accent} text-white dark:text-white text-[14px] font-bold flex items-center justify-center flex-shrink-0`}>
          {num}
        </span>
        <span className="font-semibold text-[14px] text-[#1d1d1f] dark:text-white dark:text-white tracking-tight">{title}</span>
      </div>
      <p className="text-[14px] text-[#1d1d1f] dark:text-white/70 dark:text-white/70 ml-[30px]">{children}</p>
    </div>
  )
}

/* ================================================================
   MAIN PAGE
   ================================================================ */
export default function PlateCalculator() {
  const [count, setCount] = useState('')
  const [squares, setSquares] = useState(4)
  const [dilution, setDilution] = useState(1)

  // Derived concentration
  const concentration = useMemo(() => {
    const c = parseInt(count)
    const s = parseInt(squares)
    if (!c || !s || c <= 0 || s <= 0) return null
    return (c / s) * 1e4 * dilution
  }, [count, squares, dilution])

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-8">
        <h2 className="text-[32px] font-bold text-[#1d1d1f] dark:text-white dark:text-white tracking-tight">铺板计算器</h2>
        <p className="mt-1.5 text-[16px] text-[#86868b] dark:text-[#98989d] font-medium">
          血球计数板计数 → 预混液配液 → 排枪铺板
        </p>
      </div>

      <div className="space-y-6">
        <StepOne
          count={count} setCount={setCount}
          squares={squares} setSquares={setSquares}
          dilution={dilution} setDilution={setDilution}
          conc={concentration}
        />
        <StepTwo conc={concentration} />
      </div>
    </div>
  )
}
