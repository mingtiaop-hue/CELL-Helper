import { useState, useEffect, useCallback, useRef } from 'react'
import SCENARIOS from '../data/simulator'
function FastForwardOverlay({ label, time, onDone }) {
  const [progress, setProgress] = useState(0)
  const onDoneRef = useRef(onDone)
  useEffect(() => { onDoneRef.current = onDone }, [onDone])

  useEffect(() => {
    const start = Date.now()
    const total = 2000
    const tick = () => {
      const elapsed = Date.now() - start
      const p = Math.min(100, (elapsed / total) * 100)
      setProgress(p)
      if (p < 100) requestAnimationFrame(tick)
      else setTimeout(() => onDoneRef.current(), 300)
    }
    requestAnimationFrame(tick)
  }, []) // stable — uses ref to avoid resetting animation

  return (
    <div className="absolute inset-0 z-20 bg-[#1d1d1f]/80 backdrop-blur-xl rounded-[20px] flex flex-col items-center justify-center gap-5">
      <div className="text-6xl animate-bounce">⏳</div>
      <div className="text-white/90 text-lg font-semibold tracking-tight">{label}</div>
      <div className="text-white/50 text-sm font-medium">快进中 · {time}</div>

      {/* Progress bar */}
      <div className="w-48 h-1.5 bg-white dark:bg-[#2c2c2e]/15 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-[#0071e3] to-[#5ac8fa] rounded-full transition-all duration-100 ease-linear"
          style={{ width: `${progress}%` }}
        />
      </div>
      <div className="text-white/40 text-xs font-mono">{Math.round(progress)}%</div>
    </div>
  )
}

/* ================================================================
   MAIN COMPONENT
   ================================================================ */
export default function LabSimulator() {
  const [scenarioIdx, setScenarioIdx] = useState(0)
  const [current, setCurrent] = useState(0)
  const [checked, setChecked] = useState({})
  const [animating, setAnimating] = useState(false)
  const [ffState, setFFState] = useState(null) // null | { label, time } | 'done'
  const [decision, setDecision] = useState(null) // selected option id for decision step

  const scenario = SCENARIOS[scenarioIdx]
  const step = scenario.steps[current]
  const isLast = current === scenario.steps.length - 1
  const isFirst = current === 0

  // Reset state on scenario switch
  const switchScenario = (idx) => {
    setScenarioIdx(idx)
    setCurrent(0)
    setChecked({})
    setAnimating(false)
    setFFState(null)
    setDecision(null)
  }

  // ---- Checklist ----
  const allChecked = step.checklist.length === 0 || step.checklist.every((c) => checked[c.id])

  // Decision step: need a selection
  const decisionDone = !step.decision || decision !== null

  // Fast-forward step: ffState 'done' means it's complete
  const ffDone = !step.fastForward || ffState === 'done'

  const canAdvance = allChecked && decisionDone && ffDone

  // ---- Navigation ----
  const goNext = useCallback(() => {
    if (animating) return

    // Fast-forward trigger: only needs checklist + decision, not ffDone
    if (step.fastForward && ffState !== 'done') {
      if (!allChecked || !decisionDone) return
      setFFState({ label: step.fastForward.label, time: step.fastForward.time })
      return
    }

    // Normal advance requires full conditions
    if (!canAdvance) return

    setAnimating(true)
    setTimeout(() => {
      setCurrent((c) => Math.min(c + 1, scenario.steps.length - 1))
      setChecked({})
      setFFState(null)
      setDecision(null)
      setAnimating(false)
    }, 200)
  }, [animating, step.fastForward, ffState, allChecked, decisionDone, canAdvance, scenario.steps.length])

  const goPrev = useCallback(() => {
    if (isFirst || animating) return
    setAnimating(true)
    setTimeout(() => {
      setCurrent((c) => Math.max(c - 1, 0))
      setChecked({})
      setFFState(null)
      setDecision(null)
      setAnimating(false)
    }, 200)
  }, [isFirst, animating])

  const reset = useCallback(() => {
    setCurrent(0)
    setChecked({})
    setFFState(null)
    setDecision(null)
    setAnimating(false)
  }, [])

  const handleFFDone = useCallback(() => setFFState('done'), [])

  const toggleCheck = (id) => setChecked((p) => ({ ...p, [id]: !p[id] }))

  // ======== RENDER ========
  return (
    <div className="max-w-2xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">🎮 沉浸式实验模拟</h2>
        <p className="mt-1 text-sm text-slate-500 dark:text-[#98989d]">交互式 SOP · 防呆清单 · 时间快进</p>
      </div>

      {/* ======== SCENARIO SELECTOR ======== */}
      <div className="mb-6 flex flex-wrap gap-2">
        {SCENARIOS.map((s, i) => (
          <button
            key={s.id}
            onClick={() => switchScenario(i)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-[13px] font-medium transition-all duration-200 cursor-pointer ${
              i === scenarioIdx
                ? 'bg-[#1d1d1f] text-white dark:text-white shadow-md scale-[1.01]'
                : 'bg-white dark:bg-[#2c2c2e]/80 text-[#1d1d1f] dark:text-white/60 hover:bg-white dark:bg-[#2c2c2e] hover:text-[#1d1d1f] dark:hover:text-white dark:text-white dark:text-white dark:text-white ring-1 ring-black/[0.04] dark:ring-white/[0.06]'
            }`}
          >
            <span>{s.icon}</span>
            <span className="hidden sm:inline">{s.title}</span>
            <span className="sm:hidden">{s.badge}</span>
            <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${i === scenarioIdx ? 'bg-white/25 text-white' : s.badgeColor}`}>
              {s.badge}
            </span>
          </button>
        ))}
      </div>

      {/* ======== STEPPER ======== */}
      <div className="mb-8 flex items-center">
        {scenario.steps.map((s, i) => (
          <div key={s.title} className="flex items-center flex-1 last:flex-[0]">
            <div className="flex flex-col items-center">
              <div
                className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-[14px] sm:text-xs font-bold transition-all duration-300 border-2 flex-shrink-0 ${
                  i < current
                    ? 'bg-emerald-500 border-emerald-500 text-white'
                    : i === current
                      ? 'bg-white dark:bg-[#2c2c2e] border-blue-600 text-blue-700 shadow-lg shadow-blue-200 scale-110'
                      : 'bg-white dark:bg-[#2c2c2e] border-slate-200 dark:border-[#48484a] text-slate-400 dark:text-[#98989d]'
                }`}
              >
                {i < current ? '✓' : i + 1}
              </div>
            </div>
            {i < scenario.steps.length - 1 && (
              <div className={`flex-1 h-0.5 mx-0.5 rounded transition-colors duration-300 ${i < current ? 'bg-emerald-400' : 'bg-slate-200 dark:bg-[#48484a]'}`} />
            )}
          </div>
        ))}
      </div>

      {/* ======== STEP CARD ======== */}
      <div className="relative">
        <div
          key={`${scenarioIdx}-${current}`}
          className={`apple-card apple-card-raised overflow-hidden ${
            animating ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
          } transition-all duration-300 ease-out`}
        >
          {/* Card header */}
          <div className={`bg-gradient-to-r ${scenario.color} px-6 py-5 text-white`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3 min-w-0">
                <span className="text-2xl flex-shrink-0">{scenario.icon}</span>
                <div className="min-w-0">
                  <h3 className="font-semibold text-[17px] tracking-tight leading-tight truncate">{step.title}</h3>
                  {step.fastForward && (
                    <span className="text-xs text-white/50 mt-0.5 inline-block font-medium">此步骤为等待孵育</span>
                  )}
                </div>
              </div>
              <span className="text-[13px] font-semibold bg-white/20 text-white px-2.5 py-1 rounded-full flex-shrink-0">
                {current + 1}/{scenario.steps.length}
              </span>
            </div>
          </div>

          {/* Card body */}
          <div className="px-6 py-5 space-y-4">
            {/* Decision branch */}
            {step.decision ? (
              <div className="space-y-3">
                <p className="text-sm font-semibold text-slate-700 dark:text-[#f5f5f7]">{step.decision.prompt}</p>
                {step.decision.options.map((opt) => {
                  const selected = decision === opt.id
                  return (
                    <button
                      key={opt.id}
                      onClick={() => setDecision(opt.id)}
                      className={`w-full text-left p-4 rounded-xl border-2 transition-all cursor-pointer ${
                        selected
                          ? opt.id === 'raw'
                            ? 'border-red-500 bg-red-50 shadow-md'
                            : 'border-blue-500 bg-blue-50 shadow-md'
                          : 'border-slate-200 dark:border-[#48484a] bg-white dark:bg-[#2c2c2e] hover:border-slate-300 dark:border-[#636366]'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-semibold text-sm text-slate-800 dark:text-white">{opt.label}</span>
                        {selected && (
                          <span className={`text-xs px-2 py-0.5 rounded-full font-bold ${opt.id === 'raw' ? 'bg-red-600 text-white' : 'bg-blue-600 text-white'}`}>
                            已选择
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-slate-500 dark:text-[#98989d]">{opt.tip}</p>
                      {selected && opt.content && (
                        <div className="mt-3">{opt.content}</div>
                      )}
                    </button>
                  )
                })}
              </div>
            ) : (
              /* Normal content */
              step.content
            )}

            {/* Checklist */}
            {step.checklist.length > 0 && (
              <div className="bg-slate-50 dark:bg-[#2c2c2e] rounded-xl px-4 py-3.5">
                <div className="text-xs font-semibold text-slate-500 dark:text-[#98989d] uppercase tracking-wide mb-2.5">
                  ✅ 前置确认清单
                </div>
                <div className="space-y-2">
                  {step.checklist.map((c) => (
                    <label
                      key={c.id}
                      className={`flex items-center gap-3 p-2.5 rounded-lg border cursor-pointer transition-all ${
                        checked[c.id] ? 'bg-emerald-50 border-emerald-300' : 'bg-white dark:bg-[#2c2c2e] border-slate-200 dark:border-[#48484a] hover:border-slate-300 dark:border-[#636366]'
                      }`}
                    >
                      <input type="checkbox" checked={!!checked[c.id]} onChange={() => toggleCheck(c.id)}
                        className="w-4 h-4 rounded accent-emerald-600 cursor-pointer flex-shrink-0" />
                      <span className={`text-sm ${checked[c.id] ? 'text-emerald-800 font-medium' : 'text-slate-700 dark:text-[#f5f5f7]'}`}>
                        {checked[c.id] ? '✓ ' : ''}{c.label}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            )}

            {/* Fast-forward trigger */}
            {step.fastForward && ffState !== 'done' && !step.decision && (
              <div className="text-center">
                <button
                  onClick={goNext}
                  disabled={!allChecked || !decisionDone}
                  className={`px-6 py-3 rounded-xl font-bold text-sm transition-all cursor-pointer ${
                    allChecked && decisionDone
                      ? 'bg-amber-500 text-white dark:text-white hover:bg-amber-600 active:scale-95 shadow-lg shadow-amber-200 animate-pulse'
                      : 'bg-slate-200 dark:bg-[#48484a] text-slate-400 dark:text-[#98989d] cursor-not-allowed'
                  }`}
                >
                  ⏳ 点击快进 — {step.fastForward.time}
                </button>
                {!allChecked && (
                  <p className="text-xs text-slate-400 dark:text-[#98989d] mt-1.5">请先完成上方清单</p>
                )}
              </div>
            )}
          </div>

          {/* Card footer */}
          <div className="px-6 py-4 border-t border-slate-100 dark:border-[#3a3a3c] bg-slate-50 dark:bg-[#2c2c2e]/50 flex items-center justify-between">
            <button onClick={goPrev} disabled={isFirst || animating}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                isFirst ? 'text-slate-300 dark:text-[#48484a] cursor-not-allowed' : 'text-slate-600 dark:text-[#aeaeb2] hover:bg-slate-200 dark:hover:bg-[#48484a] dark:bg-[#48484a] active:scale-95 cursor-pointer'
              }`}>
              ← 上一步
            </button>

            <span className="text-xs text-slate-400 dark:text-[#98989d]">{current + 1}/{scenario.steps.length}</span>

            {isLast ? (
              <button onClick={reset} disabled={!canAdvance}
                className={`px-5 py-2 rounded-lg text-sm font-bold transition-all cursor-pointer ${
                  canAdvance
                    ? 'bg-emerald-600 text-white dark:text-white hover:bg-emerald-700 active:scale-95 shadow-lg shadow-emerald-200'
                    : 'bg-slate-200 dark:bg-[#48484a] text-slate-400 dark:text-[#98989d] cursor-not-allowed'
                }`}>
                🎉 完成实验
              </button>
            ) : step.fastForward ? (
              /* For FF steps, the button is already in the body - show a subtle hint here */
              <button onClick={goNext} disabled={!canAdvance}
                className={`px-5 py-2 rounded-lg text-sm font-bold transition-all cursor-pointer ${
                  canAdvance
                    ? 'bg-blue-600 text-white dark:text-white hover:bg-blue-700 active:scale-95 shadow-lg shadow-blue-200'
                    : 'bg-slate-200 dark:bg-[#48484a] text-slate-400 dark:text-[#98989d] cursor-not-allowed'
                }`}>
                {ffState === 'done' ? '→ 进入下一步' : '→'}
              </button>
            ) : (
              <button onClick={goNext} disabled={!canAdvance}
                className={`px-5 py-2 rounded-lg text-sm font-bold transition-all cursor-pointer ${
                  canAdvance
                    ? 'bg-blue-600 text-white dark:text-white hover:bg-blue-700 active:scale-95 shadow-lg shadow-blue-200'
                    : 'bg-slate-200 dark:bg-[#48484a] text-slate-400 dark:text-[#98989d] cursor-not-allowed'
                }`}>
                完成，下一步 →
              </button>
            )}
          </div>

          {/* ======== FAST-FORWARD OVERLAY ======== */}
          {ffState && ffState !== 'done' && (
            <FastForwardOverlay
              label={ffState.label}
              time={ffState.time}
              onDone={handleFFDone}
            />
          )}
        </div>
      </div>

      {/* Reset */}
      <div className="mt-6 text-center">
        <button onClick={reset} className="text-xs text-slate-400 dark:text-[#98989d] hover:text-slate-600 dark:text-[#aeaeb2] underline cursor-pointer">
          重新开始当前实验
        </button>
      </div>
    </div>
  )
}
