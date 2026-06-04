import { useState, useEffect, useCallback } from 'react'

/* ================================================================
   SCENARIO DATA — 3 experimental simulation scripts
   ================================================================ */
const SCENARIOS = [
  {
    id: 'lps',
    title: 'LPS 诱导 RAW264.7 巨噬细胞转化及送样',
    icon: '🦠',
    badge: '24 孔板',
    badgeColor: 'bg-purple-100 text-purple-700',
    color: 'from-purple-600 to-indigo-600',
    steps: [
      {
        title: '放入爬片，接种 RAW264.7',
        content: (
          <div className="space-y-3">
            <p className="text-slate-600 dark:text-[#aeaeb2] leading-relaxed">
              在超净台内，用无菌镊子将<strong>细胞爬片</strong>放入 24 孔板底部，确保爬片与孔底贴合无气泡。
            </p>
            <p className="text-slate-600 dark:text-[#aeaeb2] leading-relaxed">
              按铺板计算器算出的体积，用移液器吸取 RAW264.7 细胞悬液，轻柔注入孔内，十字摇匀。
            </p>
            <div className="bg-amber-50 border border-amber-200 rounded-lg px-4 py-3 text-sm text-amber-800">
              ⚠️ <strong>RAW264.7 半贴壁细胞：</strong>仅用移液器轻柔吹打收集，<span className="text-red-700 font-bold">严禁使用胰酶。</span>
            </div>
          </div>
        ),
        checklist: [{ id: 'no-trypsin', label: '绝未使用胰酶，仅用移液器轻柔吹打收集 RAW264.7' }],
        fastForward: null,
      },
      {
        title: '等待细胞贴壁',
        content: (
          <p className="text-slate-600 dark:text-[#aeaeb2] leading-relaxed">
            将 24 孔板放入 37°C / 5% CO₂ 培养箱，等待 RAW264.7 贴壁。<strong>预计需要 24 小时。</strong>
          </p>
        ),
        checklist: [],
        fastForward: { label: '细胞贴壁', time: '24 小时', duration: 2200 },
      },
      {
        title: '加 LPS 与材料共刺激',
        content: (
          <div className="space-y-3">
            <p className="text-slate-600 dark:text-[#aeaeb2] leading-relaxed">
              从培养箱取出孔板，<strong>吸弃旧培养基</strong>（勿触碰爬片）。
            </p>
            <div className="bg-slate-100 dark:bg-[#3a3a3c] rounded-lg px-4 py-3 text-sm">
              <div className="font-semibold text-slate-700 dark:text-[#f5f5f7] mb-1">LPS 工作液</div>
              <code className="text-xs text-slate-600 dark:text-[#aeaeb2] bg-slate-200 dark:bg-[#48484a] px-2 py-0.5 rounded">
                LPS 10 mg/mL → 稀释 20,000× → 500 ng/mL（无血清培养基，避光）
              </code>
            </div>
            <p className="text-slate-600 dark:text-[#aeaeb2]">每孔加入 LPS 稀释液 + 测试材料（无血清体系）。</p>
          </div>
        ),
        checklist: [
          { id: 'serum-free', label: '已使用无血清培养基配制' },
          { id: 'lps-dark', label: 'LPS 已避光稀释至 500 ng/mL' },
        ],
        fastForward: null,
      },
      {
        title: '药物刺激孵育',
        content: (
          <p className="text-slate-600 dark:text-[#aeaeb2] leading-relaxed">
            将孔板放回培养箱，LPS + 材料共孵育 <strong>24 小时</strong>，诱导巨噬细胞 M1 极化。
          </p>
        ),
        checklist: [],
        fastForward: { label: 'LPS 刺激孵育', time: '24 小时', duration: 2200 },
      },
      {
        title: '多聚甲醛固定',
        content: (
          <div className="space-y-3">
            <p className="text-slate-600 dark:text-[#aeaeb2] leading-relaxed">
              吸弃上清，加入<strong className="text-red-700">预冷多聚甲醛 (4°C)</strong>，完全覆盖爬片。
            </p>
            <div className="bg-red-50 border-2 border-red-300 rounded-xl px-4 py-3 text-sm text-red-800">
              🚨 <strong>固定 = 10–15 分钟，不可超时。</strong>过固定导致抗原遮蔽 → 染色失败。
            </div>
          </div>
        ),
        checklist: [
          { id: 'pfa-cold', label: '多聚甲醛已 4°C 预冷' },
          { id: 'cover', label: 'PFA 完全覆盖爬片表面' },
        ],
        fastForward: { label: 'PFA 固定', time: '15 分钟', duration: 1800 },
      },
      {
        title: 'PBS 洗涤 · 准备送样',
        content: (
          <div className="space-y-3">
            <p className="text-slate-600 dark:text-[#aeaeb2] leading-relaxed">
              吸弃 PFA，沿孔壁加入 PBS <strong>轻柔洗涤 3 次</strong>（枪头贴壁，勿冲击爬片）。
            </p>
            <p className="text-slate-600 dark:text-[#aeaeb2]">最后一次保留<strong>薄层 PBS</strong>覆盖爬片，防止干燥。</p>
            <div className="bg-emerald-50 border border-emerald-200 rounded-lg px-4 py-3 text-sm text-emerald-800">
              📍 <strong>送样地址：</strong>天府科技园 B2 栋
            </div>
          </div>
        ),
        checklist: [
          { id: 'wash3', label: 'PBS 已洗涤 3 次，孔内留薄层 PBS' },
          { id: 'label', label: '已标记样品编号，封口膜密封' },
        ],
        fastForward: null,
      },
    ],
  },
  {
    id: 'cck8',
    title: 'CCK-8 细胞毒性测试',
    icon: '🧪',
    badge: '96 孔板',
    badgeColor: 'bg-sky-100 text-sky-700',
    color: 'from-sky-500 to-blue-600',
    steps: [
      {
        title: '接种 L929 细胞',
        content: (
          <div className="space-y-3">
            <p className="text-slate-600 dark:text-[#aeaeb2] leading-relaxed">
              取对数生长期 L929，消化计数后调整至 <strong>5×10⁴ cells/mL</strong>。
            </p>
            <p className="text-slate-600 dark:text-[#aeaeb2]">96 孔板每孔加入 <strong>100 μL</strong> 细胞悬液（即 <strong>5,000 cells/孔</strong>）。</p>
            <div className="bg-amber-50 border border-amber-200 rounded-lg px-4 py-3 text-sm text-amber-800">
              💡 <strong>关键步骤：</strong>边缘一圈孔（A1–A12, H1–H12, A1–H1, A12–H12）不加细胞，只加 <strong>100 μL PBS</strong> 作防蒸发屏障。
            </div>
          </div>
        ),
        checklist: [
          { id: 'edge-pbs', label: '边缘一圈孔已加入 100 μL PBS 防止培养基蒸发' },
          { id: 'counted', label: 'L929 已计数，密度调整为 5×10⁴ cells/mL' },
        ],
        fastForward: null,
      },
      {
        title: '等待细胞贴壁',
        content: (
          <p className="text-slate-600 dark:text-[#aeaeb2] leading-relaxed">
            将 96 孔板放入培养箱，等待 L929 贴壁。<strong>预计需要 24 小时</strong>，细胞应达到 70–80% 融合。
          </p>
        ),
        checklist: [],
        fastForward: { label: '细胞贴壁', time: '24 小时', duration: 2200 },
      },
      {
        title: '加入材料浸提液',
        content: (
          <div className="space-y-3">
            <p className="text-slate-600 dark:text-[#aeaeb2] leading-relaxed">
              显微镜下确认细胞已贴壁。吸弃旧培养基。
            </p>
            <div className="bg-blue-50 border border-blue-200 rounded-lg px-4 py-3 text-sm">
              <div className="font-semibold text-blue-700 mb-1">待测材料浸提液 / 目标药物</div>
              <p className="text-blue-600">每孔加入 100 μL 不同浓度的待测材料浸提液或含药培养基（含 10% FBS 的 DMEM 稀释）。</p>
              <p className="text-blue-600 text-xs mt-1">设置浓度梯度 + 空白对照 + 阳性对照，每组 ≥3 复孔。</p>
            </div>
          </div>
        ),
        checklist: [
          { id: 'gradient', label: '已设置浓度梯度、空白对照和阳性对照' },
          { id: 'triplicate', label: '每组至少 3 个复孔' },
        ],
        fastForward: null,
      },
      {
        title: '材料共孵育',
        content: (
          <p className="text-slate-600 dark:text-[#aeaeb2] leading-relaxed">
            将 96 孔板放回培养箱，待测材料与 L929 细胞 <strong>共孵育 24 小时</strong>。
          </p>
        ),
        checklist: [],
        fastForward: { label: '材料共孵育', time: '24 小时', duration: 2200 },
      },
      {
        title: '加入 CCK-8 试剂',
        content: (
          <div className="space-y-3">
            <p className="text-slate-600 dark:text-[#aeaeb2] leading-relaxed">
              每孔加入 <strong>10 μL CCK-8 试剂</strong>（即培养基体积的 10%），轻轻拍板混匀。
            </p>
            <div className="bg-amber-50 border border-amber-200 rounded-lg px-4 py-3 text-sm text-amber-800">
              ⚠️ <strong>避光操作：</strong>CCK-8 含 WST-8，见光分解导致 OD 值偏高。操作时关掉超净台照明灯。
            </div>
          </div>
        ),
        checklist: [
          { id: 'dark', label: '操作时已避光（关灯或在红光下操作）' },
          { id: '10pct', label: 'CCK-8 加入量为培养基体积的 10%（即 10 μL/孔）' },
        ],
        fastForward: null,
      },
      {
        title: '孵育显色 · 测吸光度',
        content: (
          <div className="space-y-3">
            <p className="text-slate-600 dark:text-[#aeaeb2] leading-relaxed">
              将孔板放回培养箱，<strong>避光孵育 1–4 小时</strong>，颜色变为橙色-棕色即可。
            </p>
            <p className="text-slate-600 dark:text-[#aeaeb2]">酶标仪 <strong>450 nm</strong> 测吸光度 (OD)。参考波长 630 nm 扣除背景。</p>
            <div className="bg-emerald-50 border border-emerald-200 rounded-lg px-4 py-3 text-sm text-emerald-800">
              <strong>细胞活力 (%) = (OD_sample − OD_blank) / (OD_control − OD_blank) × 100%</strong>
            </div>
          </div>
        ),
        checklist: [],
        fastForward: { label: 'CCK-8 显色孵育', time: '1–4 小时', duration: 1600 },
      },
    ],
  },
  {
    id: 'passage',
    title: '日常细胞传代避坑指南',
    icon: '🧫',
    badge: '通用',
    badgeColor: 'bg-emerald-100 text-emerald-700',
    color: 'from-emerald-500 to-teal-600',
    steps: [
      {
        title: '吸弃旧液 · PBS 洗涤',
        content: (
          <div className="space-y-3">
            <p className="text-slate-600 dark:text-[#aeaeb2] leading-relaxed">
              显微镜下确认细胞融合度达到传代标准（L929: 80–90%，RAW264.7: 70–80%，HUVEC: 85–95%）。
            </p>
            <p className="text-slate-600 dark:text-[#aeaeb2]">吸弃旧培养基，加入 <strong>1 mL PBS</strong> 轻柔润洗，去除死细胞和残留血清。</p>
          </div>
        ),
        checklist: [
          { id: 'confluent', label: '镜下确认细胞已达到传代融合度' },
          { id: 'pbs', label: 'PBS 已润洗，去除死细胞与血清' },
        ],
        fastForward: null,
        decision: null,
      },
      {
        title: '【关键决策】选择消化方式',
        content: null, // dynamically rendered
        checklist: [],
        fastForward: null,
        decision: {
          prompt: '请选择你要传代的细胞类型：',
          options: [
            {
              id: 'l929',
              label: 'L929（小鼠成纤维细胞）',
              tip: '贴壁牢固，使用 0.25% 胰酶-EDTA 消化',
              content: (
                <div className="space-y-2">
                  <p className="text-slate-600 dark:text-[#aeaeb2]">加入 <strong>1 mL 0.25% 胰酶-EDTA</strong>，37°C 孵育。</p>
                  <div className="bg-green-50 border border-green-200 rounded-lg px-4 py-3 text-sm text-green-800">
                    ✅ 1–2 分钟后细胞变圆、轻拍皿壁即脱落 → 加入含血清培养基终止消化。
                  </div>
                </div>
              ),
            },
            {
              id: 'huvec',
              label: 'HUVEC（人脐静脉内皮细胞）',
              tip: '贴壁但娇贵，使用 0.05% 低浓度胰酶',
              content: (
                <div className="space-y-2">
                  <p className="text-slate-600 dark:text-[#aeaeb2]">加入 <strong>1 mL 0.05% 胰酶</strong>（低浓度），37°C 消化。</p>
                  <div className="bg-amber-50 border border-amber-200 rounded-lg px-4 py-3 text-sm text-amber-800">
                    ⚠️ <strong>严格控制 ≤60 秒！</strong>镜下实时观察，80% 变圆立刻终止，否则内皮功能受损。
                  </div>
                </div>
              ),
            },
            {
              id: 'raw',
              label: 'RAW264.7（小鼠巨噬细胞）⚠️',
              tip: '半贴壁细胞，消化方法直接决定实验成败',
              content: (
                <div className="space-y-2">
                  <div className="bg-red-100 border-2 border-red-500 rounded-xl px-4 py-3 flex gap-3 animate-pulse">
                    <span className="text-3xl">🚫</span>
                    <div className="text-red-900">
                      <div className="font-bold text-lg">严禁使用胰酶！</div>
                      <p className="text-red-800 text-sm mt-1">
                        胰酶切割 TLR4 / CD14 膜受体 → LPS 炎症应答功能完全丧失 → 实验数据作废。
                      </p>
                    </div>
                  </div>
                  <div className="bg-green-50 border border-green-200 rounded-lg px-4 py-3 text-sm text-green-800 mt-2">
                    ✅ <strong>正确做法：</strong>使用细胞刮刀沿皿底单向轻柔刮取，或直接用移液器反复吹打。
                  </div>
                </div>
              ),
            },
          ],
        },
      },
      {
        title: '分皿传代',
        content: (
          <div className="space-y-3">
            <div className="bg-amber-50 border border-amber-200 rounded-lg px-4 py-3 text-sm">
              <div className="font-semibold text-amber-800 mb-1">⏱ 生长速率参考</div>
              <p className="text-amber-700">一天约增加 <strong>1.8 倍</strong> · 约 400 万细胞长满 · <strong>3–4 天</strong> 需再次分皿</p>
            </div>
            <p className="text-slate-600 dark:text-[#aeaeb2]">终止消化后轻柔吹打为单细胞悬液，按 <strong>1:2 – 1:4</strong> 比例分至新皿。</p>
            <p className="text-slate-600 dark:text-[#aeaeb2]">补液至 <strong>培养瓶 5–7 mL</strong> / <strong>培养皿 8–9 mL</strong>，十字摇匀。</p>
            <p className="text-slate-600 dark:text-[#aeaeb2]">标记细胞名称、代次、日期，放入 37°C / 5% CO₂ 培养箱。</p>
          </div>
        ),
        checklist: [
          { id: 'ratio', label: '已按 1:2–1:4 比例分皿' },
          { id: 'media', label: '已补液至培养瓶 5–7 mL 或培养皿 8–9 mL' },
          { id: 'mark', label: '已标记细胞名称、代次和日期' },
        ],
        fastForward: null,
        decision: null,
      },
    ],
  },
]

/* ================================================================
   FAST-FORWARD OVERLAY
   ================================================================ */
function FastForwardOverlay({ label, time, onDone }) {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const start = Date.now()
    const total = 2000 // animation duration
    const tick = () => {
      const elapsed = Date.now() - start
      const p = Math.min(100, (elapsed / total) * 100)
      setProgress(p)
      if (p < 100) requestAnimationFrame(tick)
      else setTimeout(onDone, 300)
    }
    requestAnimationFrame(tick)
  }, [onDone])

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

  const goPrev = () => {
    if (isFirst || animating) return
    setAnimating(true)
    setTimeout(() => {
      setCurrent((c) => Math.max(c - 1, 0))
      setChecked({})
      setFFState(null)
      setDecision(null)
      setAnimating(false)
    }, 200)
  }

  const reset = () => {
    setCurrent(0)
    setChecked({})
    setFFState(null)
    setDecision(null)
    setAnimating(false)
  }

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
            <span className={`text-xs px-2 py-0.5 rounded-full ${i === scenarioIdx ? 'bg-white dark:bg-[#2c2c2e]/20 text-white' : s.badgeColor}`}>
              {s.badge}
            </span>
          </button>
        ))}
      </div>

      {/* ======== STEPPER ======== */}
      <div className="mb-8 flex items-center">
        {scenario.steps.map((s, i) => (
          <div key={i} className="flex items-center flex-1 last:flex-[0]">
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
              <span className="text-[13px] font-semibold bg-white dark:bg-[#2c2c2e]/20 px-2.5 py-1 rounded-full flex-shrink-0">
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
              onDone={() => setFFState('done')}
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
