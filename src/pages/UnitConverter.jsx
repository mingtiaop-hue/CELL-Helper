import { useState, useMemo } from 'react'

const MODES = [
  { id: 'mass2conc', label: '质量 → 浓度', icon: '⚖️' },
  { id: 'conc2mass', label: '浓度 → 质量', icon: '🧪' },
  { id: 'dilution',  label: '稀释计算',   icon: '💧' },
  { id: 'percent',   label: '百分比溶液',  icon: '📊' },
]

/* ================================================================
   SHARED INPUT STYLES
   ================================================================ */
const inputClass =
  'w-full rounded-xl border border-black/10 dark:border-white/10 bg-[#f5f5f7] dark:bg-[#2c2c2e] px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#0071e3]/20 focus:border-[#0071e3] transition-all duration-200'

/* ================================================================
   INPUT WITH ABSOLUTE RIGHT LABEL
   ================================================================ */
function InputWithUnit({ value, onChange, placeholder, unit, unitType = 'text', options, onUnitChange, unitValue }) {
  const pr = unitType === 'select' ? 'pr-20' : unit.length > 4 ? 'pr-16' : 'pr-12'
  return (
    <div className="relative w-full">
      <input type="number" value={value} onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={`${inputClass} ${pr}`} />
      {unitType === 'select' ? (
        <select value={unitValue} onChange={(e) => onUnitChange(e.target.value)}
          className="absolute right-2 top-1/2 -translate-y-1/2 text-[13px] font-medium text-[#86868b] dark:text-[#98989d] bg-transparent border-0 cursor-pointer appearance-none pr-3 focus:outline-none">
          {options.map((o) => <option key={o.v} value={o.v}>{o.l}</option>)}
        </select>
      ) : (
        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[13px] font-medium text-[#86868b] dark:text-[#98989d] pointer-events-none select-none">
          {unit}
        </span>
      )}
    </div>
  )
}

/* ================================================================
   MODE 1: Mass → Concentration
   ================================================================ */
function MassToConc({ mw, setMw }) {
  const [mass, setMass] = useState('')
  const [massUnit, setMassUnit] = useState('mg')
  const [volume, setVolume] = useState('')
  const [volUnit, setVolUnit] = useState('mL')

  const result = useMemo(() => {
    const m = parseFloat(mass)
    const w = parseFloat(mw)
    const v = parseFloat(volume)
    if (!m || !w || !v || m <= 0 || w <= 0 || v <= 0) return null

    const massMg = massUnit === 'g' ? m * 1000 : massUnit === 'μg' ? m / 1000 : m
    const volMl = volUnit === 'L' ? v * 1000 : volUnit === 'μL' ? v / 1000 : v
    const massG = massMg / 1000
    const volL = volMl / 1000
    const molarity = massG / w / volL
    const mgPerMl = massMg / volMl

    return {
      molarityM: molarity, molarityMM: molarity * 1000,
      molarityμM: molarity * 1e6, molarityNM: molarity * 1e9,
      mgPerMl, μgPerMl: mgPerMl * 1000,
    }
  }, [mass, massUnit, mw, volume, volUnit])

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <Label>质量</Label>
          <InputWithUnit value={mass} onChange={setMass} placeholder="例：5"
            unitType="select" options={[{ v: 'mg', l: 'mg' }, { v: 'g', l: 'g' }, { v: 'μg', l: 'μg' }]}
            unitValue={massUnit} onUnitChange={setMassUnit} />
        </div>
        <div>
          <Label>分子量 (MW)</Label>
          <InputWithUnit value={mw} onChange={setMw} placeholder="例：180.16" unit="g/mol" />
        </div>
        <div>
          <Label>溶液体积</Label>
          <InputWithUnit value={volume} onChange={setVolume} placeholder="例：10"
            unitType="select" options={[{ v: 'mL', l: 'mL' }, { v: 'L', l: 'L' }, { v: 'μL', l: 'μL' }]}
            unitValue={volUnit} onUnitChange={setVolUnit} />
        </div>
      </div>

      {result ? (
        <div className="bg-gradient-to-br from-[#0071e3]/6 to-[#0071e3]/2 ring-1 ring-[#0071e3]/15 rounded-2xl px-6 py-5 space-y-4 animate-scale-in">
          <div className="text-center">
            <div className="text-[14px] font-semibold text-[#86868b] dark:text-[#98989d] uppercase tracking-wider mb-1">摩尔浓度</div>
            <MolarityDisplay mM={result.molarityMM} μM={result.molarityμM} nM={result.molarityNM} />
          </div>
          <div className="h-px bg-[#0071e3]/10" />
          <div className="grid grid-cols-2 gap-3 text-center">
            <StatBox value={result.mgPerMl.toFixed(2)} unit="mg/mL" label="质量浓度" />
            <StatBox value={result.μgPerMl.toFixed(1)} unit="μg/mL" label="质量浓度" />
          </div>
        </div>
      ) : (
        <EmptyState icon="⚖️" text="输入质量、分子量和体积，自动计算浓度" />
      )}
    </div>
  )
}

/* ================================================================
   MODE 2: Concentration → Mass
   ================================================================ */
function ConcToMass({ mw, setMw }) {
  const [conc, setConc] = useState('')
  const [concUnit, setConcUnit] = useState('mM')
  const [volume, setVolume] = useState('')
  const [volUnit, setVolUnit] = useState('mL')

  const result = useMemo(() => {
    const c = parseFloat(conc); const w = parseFloat(mw); const v = parseFloat(volume)
    if (!c || !w || !v || c <= 0 || w <= 0 || v <= 0) return null
    const concM = concUnit === 'M' ? c : concUnit === 'mM' ? c / 1000 : concUnit === 'μM' ? c / 1e6 : c / 1e9
    const volL = volUnit === 'L' ? v : volUnit === 'mL' ? v / 1000 : v / 1e6
    const massMg = concM * volL * w * 1000
    return { massMg, massG: massMg / 1000, massμg: massMg * 1000 }
  }, [conc, concUnit, mw, volume, volUnit])

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <Label>目标浓度</Label>
          <InputWithUnit value={conc} onChange={setConc} placeholder="例：10"
            unitType="select" options={[{ v: 'M', l: 'M' }, { v: 'mM', l: 'mM' }, { v: 'μM', l: 'μM' }, { v: 'nM', l: 'nM' }]}
            unitValue={concUnit} onUnitChange={setConcUnit} />
        </div>
        <div>
          <Label>分子量 (MW)</Label>
          <InputWithUnit value={mw} onChange={setMw} placeholder="例：58.44" unit="g/mol" />
        </div>
        <div>
          <Label>溶液体积</Label>
          <InputWithUnit value={volume} onChange={setVolume} placeholder="例：100"
            unitType="select" options={[{ v: 'mL', l: 'mL' }, { v: 'L', l: 'L' }, { v: 'μL', l: 'μL' }]}
            unitValue={volUnit} onUnitChange={setVolUnit} />
        </div>
      </div>

      {result ? (
        <div className="bg-gradient-to-br from-[#34c759]/6 to-[#34c759]/2 ring-1 ring-[#34c759]/15 rounded-2xl px-6 py-5 text-center animate-scale-in">
          <div className="text-[14px] font-semibold text-[#86868b] dark:text-[#98989d] uppercase tracking-wider mb-2">应称取质量</div>
          <div className="space-y-1">
            {result.massG >= 0.01 && (
              <div className="font-bold text-[#1d1d1f] dark:text-white text-lg">
                {result.massG.toFixed(4)} <span className="text-sm font-medium opacity-50">g</span>
              </div>
            )}
            <div className="text-3xl font-bold text-[#34c759] tracking-tight number-transition">{result.massMg.toFixed(2)}</div>
            <div className="text-[14px] font-medium text-[#34c759]/70">mg</div>
            {result.massMg < 1 && (
              <div className="font-bold text-[#1d1d1f] dark:text-white">
                = {result.massμg.toFixed(1)} <span className="text-sm font-medium opacity-50">μg</span>
              </div>
            )}
          </div>
        </div>
      ) : (
        <EmptyState icon="🧪" text="输入目标浓度、分子量和体积，计算称量质量" />
      )}
    </div>
  )
}

/* ================================================================
   MODE 3: C1V1 = C2V2
   ================================================================ */
function DilutionCalc() {
  const [c1, setC1] = useState(''); const [v1, setV1] = useState('')
  const [c2, setC2] = useState(''); const [v2, setV2] = useState('')

  const result = useMemo(() => {
    const _c1 = parseFloat(c1); const _v1 = parseFloat(v1)
    const _c2 = parseFloat(c2); const _v2 = parseFloat(v2)
    const filled = [_c1, _v1, _c2, _v2].filter(v => !isNaN(v) && v > 0).length
    if (filled < 3) return null
    if (!_c1 && _v1 && _c2 && _v2) return { label: 'C₁（原液浓度）', value: _c2 * _v2 / _v1, note: `C₁ = C₂V₂ / V₁ = ${_c2} × ${_v2} / ${_v1}` }
    if (!_v1 && _c1 && _c2 && _v2) return { label: 'V₁（需吸取原液）', value: _c2 * _v2 / _c1, note: `V₁ = C₂V₂ / C₁ = ${_c2} × ${_v2} / ${_c1}`, highlight: true }
    if (!_c2 && _c1 && _v1 && _v2) return { label: 'C₂（稀释后浓度）', value: _c1 * _v1 / _v2, note: `C₂ = C₁V₁ / V₂ = ${_c1} × ${_v1} / ${_v2}` }
    if (!_v2 && _c1 && _v1 && _c2) return { label: 'V₂（稀释后总体积）', value: _c1 * _v1 / _c2, note: `V₂ = C₁V₁ / C₂ = ${_c1} × ${_v1} / ${_c2}` }
    return null
  }, [c1, v1, c2, v2])

  return (
    <div className="space-y-5">
      <div className="bg-slate-50 dark:bg-[#2c2c2e] rounded-xl px-4 py-2.5 text-center text-[13px] font-mono text-[#86868b] dark:text-[#98989d] tracking-tight">
        C₁ × V₁ = C₂ × V₂
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-3 p-4 bg-[#f5f5f7] dark:bg-[#2c2c2e] rounded-2xl">
          <div className="text-[13px] font-semibold text-[#86868b] dark:text-[#98989d] uppercase tracking-wider">原液 (Stock)</div>
          <div>
            <Label>浓度 C₁</Label>
            <input type="number" value={c1} onChange={(e) => setC1(e.target.value)} placeholder="例：10 (mg/mL)" className={inputClass} />
          </div>
          <div>
            <Label>体积 V₁</Label>
            <input type="number" value={v1} onChange={(e) => setV1(e.target.value)} placeholder="例：?（求此值）" className={inputClass} />
          </div>
        </div>
        <div className="space-y-3 p-4 bg-[#f5f5f7] dark:bg-[#2c2c2e] rounded-2xl">
          <div className="text-[13px] font-semibold text-[#86868b] dark:text-[#98989d] uppercase tracking-wider">目标液 (Working)</div>
          <div>
            <Label>浓度 C₂</Label>
            <input type="number" value={c2} onChange={(e) => setC2(e.target.value)} placeholder="例：0.5 (mg/mL)" className={inputClass} />
          </div>
          <div>
            <Label>体积 V₂</Label>
            <input type="number" value={v2} onChange={(e) => setV2(e.target.value)} placeholder="例：100 (mL)" className={inputClass} />
          </div>
        </div>
      </div>

      {result ? (
        <div className={`rounded-2xl px-6 py-5 text-center animate-scale-in ${result.highlight
          ? 'bg-gradient-to-br from-[#ff9f0a]/8 to-[#ffcc00]/8 ring-1 ring-[#ff9f0a]/20'
          : 'bg-gradient-to-br from-[#0071e3]/6 to-[#0071e3]/2 ring-1 ring-[#0071e3]/15'}`}>
          <div className="text-[14px] font-semibold text-[#86868b] dark:text-[#98989d] uppercase tracking-wider mb-2">{result.label}</div>
          <div className="text-4xl font-bold text-[#0071e3] dark:text-[#5ac8fa] tracking-tight number-transition">
            {Number.isInteger(result.value) ? result.value : result.value.toFixed(4)}
          </div>
          <div className="text-[13px] text-[#86868b] dark:text-[#98989d] mt-2 font-mono">{result.note}</div>
        </div>
      ) : (
        <EmptyState icon="💧" text="填入任意三个值，自动求解第四个" sub="C₁V₁ = C₂V₂ 自动求解" />
      )}
    </div>
  )
}

/* ================================================================
   MODE 4: Percentage Solutions
   ================================================================ */
function PercentCalc() {
  const [mode, setMode] = useState('wv')
  const [percent, setPercent] = useState('')
  const [volume, setVolume] = useState('')

  const result = useMemo(() => {
    const p = parseFloat(percent); const v = parseFloat(volume)
    if (!p || !v || p <= 0 || v <= 0) return null
    if (mode === 'wv') {
      const massG = p / 100 * v; const massMg = massG * 1000
      return { label: '称取质量', value: massG >= 0.1 ? massG.toFixed(2) + ' g' : massMg.toFixed(1) + ' mg', formula: `${p}% (w/v) = ${p} g / 100 mL → ${v} mL 需 ${massG >= 0.1 ? massG.toFixed(2) + ' g' : massMg.toFixed(1) + ' mg'}` }
    } else {
      const volSol = p / 100 * v
      return { label: '量取体积', value: volSol.toFixed(2) + ' mL', formula: `${p}% (v/v) = ${p} mL / 100 mL → ${v} mL 需 ${volSol.toFixed(2)} mL` }
    }
  }, [percent, volume, mode])

  return (
    <div className="space-y-5">
      <div className="flex gap-2 p-1 bg-slate-100 dark:bg-[#3a3a3c] rounded-xl">
        <button onClick={() => setMode('wv')}
          className={`flex-1 py-2.5 rounded-lg text-[13px] font-medium transition-all cursor-pointer ${mode === 'wv' ? 'bg-white dark:bg-[#2c2c2e] text-[#1d1d1f] dark:text-white shadow-sm' : 'text-[#86868b] dark:text-[#98989d]'}`}>
          % w/v（质量体积比）
        </button>
        <button onClick={() => setMode('vv')}
          className={`flex-1 py-2.5 rounded-lg text-[13px] font-medium transition-all cursor-pointer ${mode === 'vv' ? 'bg-white dark:bg-[#2c2c2e] text-[#1d1d1f] dark:text-white shadow-sm' : 'text-[#86868b] dark:text-[#98989d]'}`}>
          % v/v（体积比）
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <Label>浓度百分比 (%)</Label>
          <input type="number" value={percent} onChange={(e) => setPercent(e.target.value)} placeholder="例：3" className={inputClass} />
        </div>
        <div>
          <Label>目标溶液体积 (mL)</Label>
          <input type="number" value={volume} onChange={(e) => setVolume(e.target.value)} placeholder="例：200" className={inputClass} />
        </div>
      </div>

      {result ? (
        <div className="bg-gradient-to-br from-[#34c759]/6 to-[#34c759]/2 ring-1 ring-[#34c759]/15 rounded-2xl px-6 py-5 text-center animate-scale-in">
          <div className="text-[14px] font-semibold text-[#86868b] dark:text-[#98989d] uppercase tracking-wider mb-2">{result.label}</div>
          <div className="text-3xl font-bold text-[#34c759] tracking-tight number-transition">{result.value}</div>
          <div className="text-[13px] text-[#86868b] dark:text-[#98989d] mt-2 font-mono">{result.formula}</div>
        </div>
      ) : (
        <EmptyState icon="📊" text="输入百分比和目标体积，计算称量/量取量" sub="例：3% (w/v) 牛肉膏蛋白胨 → 200 mL 需多少 g？" />
      )}
    </div>
  )
}

/* ================================================================
   MAIN PAGE
   ================================================================ */
export default function UnitConverter() {
  const [mode, setMode] = useState('mass2conc')
  const [sharedMw, setSharedMw] = useState('')
  const [toast, setToast] = useState(null)

  const handleMwClick = (mw) => {
    setSharedMw(String(mw))
    setToast(mw)
    setTimeout(() => setToast(null), 1500)
  }

  return (
    <div className="max-w-2xl mx-auto animate-fade-in-up">
      <div className="mb-8">
        <h2 className="text-[32px] font-bold text-[#1d1d1f] dark:text-white tracking-tight">试剂配制计算器</h2>
        <p className="mt-1.5 text-[16px] text-[#86868b] dark:text-[#98989d] font-medium">
          质量 ↔ 浓度 · 稀释 · 百分比 · 分子量换算
        </p>
      </div>

      {/* Mode tabs */}
      <div className="flex flex-wrap gap-1.5 mb-6 p-1 bg-slate-100 dark:bg-[#3a3a3c] rounded-xl">
        {MODES.map((m) => (
          <button key={m.id} onClick={() => setMode(m.id)}
            className={`px-4 py-2.5 rounded-lg text-[13px] font-medium transition-all cursor-pointer ${
              mode === m.id
                ? 'bg-white dark:bg-[#2c2c2e] text-[#1d1d1f] dark:text-white shadow-sm'
                : 'text-[#86868b] dark:text-[#98989d] hover:text-[#1d1d1f] dark:hover:text-white'}`}>
            <span className="mr-1.5">{m.icon}</span>{m.label}
          </button>
        ))}
      </div>

      {/* Calculator */}
      <div className="apple-card p-6 sm:p-7">
        {mode === 'mass2conc' && <MassToConc mw={sharedMw} setMw={setSharedMw} />}
        {mode === 'conc2mass' && <ConcToMass mw={sharedMw} setMw={setSharedMw} />}
        {mode === 'dilution' && <DilutionCalc />}
        {mode === 'percent' && <PercentCalc />}
      </div>

      {/* Quick MW reference */}
      <div className="mt-6 apple-card p-5">
        <h3 className="font-semibold text-[16px] text-[#1d1d1f] dark:text-white tracking-tight mb-3">🧪 常用分子量速查</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[13px]">
          {[
            { name: 'NaCl', mw: 58.44 }, { name: 'KCl', mw: 74.55 },
            { name: '葡萄糖', mw: 180.16 }, { name: '蔗糖', mw: 342.30 },
            { name: 'NaHCO₃', mw: 84.01 }, { name: 'NaOH', mw: 40.00 },
            { name: 'EDTA', mw: 292.24 }, { name: 'DMSO', mw: 78.13 },
          ].map((c) => (
            <button key={c.name} onClick={() => handleMwClick(c.mw)}
              className={`rounded-lg px-3 py-2 text-center transition-all cursor-pointer ${
                sharedMw === String(c.mw)
                  ? 'bg-[#0071e3]/10 dark:bg-[#0071e3]/20 ring-1 ring-[#0071e3]/30'
                  : 'bg-[#f5f5f7] dark:bg-[#2c2c2e] hover:bg-[#0071e3]/6 dark:hover:bg-[#0071e3]/10'
              }`}>
              <div className="font-semibold text-[#1d1d1f] dark:text-white group-hover:text-[#0071e3] transition-colors text-[13px]">{c.name}</div>
              <div className="text-[#aeaeb2] dark:text-[#636366] text-[12px]">{c.mw} g/mol</div>
            </button>
          ))}
        </div>
      </div>

      {/* Toast */}
      {toast && (
        <div className="fixed bottom-20 left-1/2 -translate-x-1/2 z-50 bg-[#1d1d1f] dark:bg-white text-white dark:text-[#1d1d1f] px-5 py-2.5 rounded-full text-[14px] font-medium shadow-lg animate-fade-in-up flex items-center gap-2">
          <span>✅</span> 已填入 MW = {toast} g/mol
        </div>
      )}
    </div>
  )
}

/* ================================================================
   REUSABLE
   ================================================================ */
function Label({ children }) {
  return <label className="block text-[14px] font-medium text-[#1d1d1f] dark:text-white/80 mb-1.5">{children}</label>
}

function EmptyState({ icon, text, sub }) {
  return (
    <div className="bg-[#f5f5f7] dark:bg-[#2c2c2e] rounded-2xl px-6 py-10 text-center">
      <span className="text-3xl block mb-3">{icon}</span>
      <p className="text-sm text-[#86868b] dark:text-[#98989d] font-medium">{text}</p>
      {sub && <p className="text-xs text-[#aeaeb2] dark:text-[#636366] mt-1">{sub}</p>}
    </div>
  )
}

function StatBox({ value, unit, label }) {
  return (
    <div className="bg-[#f5f5f7] dark:bg-[#2c2c2e] rounded-xl px-3 py-2.5">
      <div className="font-bold text-[#1d1d1f] dark:text-white text-sm">
        {value} <span className="text-xs font-medium opacity-50">{unit}</span>
      </div>
      <div className="text-[12px] text-[#aeaeb2] dark:text-[#636366] mt-0.5">{label}</div>
    </div>
  )
}

function MolarityDisplay({ mM, μM, nM }) {
  if (mM >= 1) {
    return (
      <>
        <span className="text-4xl font-bold text-[#0071e3] dark:text-[#5ac8fa] tracking-tight">{mM.toFixed(2)}</span>
        <span className="text-[#0071e3] dark:text-[#5ac8fa]/70 font-medium ml-1.5 text-base">mM</span>
      </>
    )
  } else if (μM >= 1) {
    return (
      <>
        <span className="text-4xl font-bold text-[#0071e3] dark:text-[#5ac8fa] tracking-tight">{μM.toFixed(2)}</span>
        <span className="text-[#0071e3] dark:text-[#5ac8fa]/70 font-medium ml-1.5 text-base">μM</span>
      </>
    )
  } else {
    return (
      <>
        <span className="text-4xl font-bold text-[#0071e3] dark:text-[#5ac8fa] tracking-tight">{nM.toFixed(2)}</span>
        <span className="text-[#0071e3] dark:text-[#5ac8fa]/70 font-medium ml-1.5 text-base">nM</span>
      </>
    )
  }
}
