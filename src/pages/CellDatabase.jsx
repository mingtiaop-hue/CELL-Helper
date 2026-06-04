const cells = [
  {
    name: 'L929', fullName: '小鼠成纤维细胞',
    media: 'DMEM + 10% FBS + 1% 双抗',
    confluence: '8×10⁶ – 1×10⁷', passage: '80%–90% 融合',
    traits: ['贴壁极速', '增殖快', 'CCK-8 / 活死染'],
    accent: 'from-[#0071e3] to-[#5ac8fa]', badgeBg: 'bg-[#0071e3]/8 dark:bg-[#0071e3]/20 text-[#0071e3] dark:text-[#5ac8fa]',
    warning: null,
  },
  {
    name: 'RAW264.7', fullName: '小鼠巨噬细胞',
    media: 'TCM 巨噬细胞专用培养基',
    mediaHighlight: true,
    confluence: '~1×10⁷', passage: '70%–80% 融合',
    traits: ['贴壁较松', '刮刀代胰酶', 'LPS → M1 极化'],
    accent: 'from-[#ff9f0a] to-[#ffcc00]', badgeBg: 'bg-[#ff9f0a]/8 dark:bg-[#ff9f0a]/20 text-[#ff9f0a]',
    warning: { icon: '🚫', label: '严禁使用胰酶', detail: '胰酶会切割 TLR4/CD14 受体，破坏 LPS 炎症应答功能。仅推荐细胞刮刀、EDTA 或轻柔吹打。' },
  },
  {
    name: 'HUVEC', fullName: '人脐静脉内皮细胞',
    media: 'ECM + 5% FBS + 1% ECGS + 1% 双抗',
    confluence: '3×10⁶ – 5×10⁶', passage: '85%–95% 融合',
    traits: ['娇贵', '划痕/血管生成', '胰酶 ≤1 min'],
    accent: 'from-[#34c759] to-[#30d158]', badgeBg: 'bg-[#34c759]/8 dark:bg-[#34c759]/20 text-[#34c759]',
    warning: { icon: '⚠️', label: '胰酶严格控制 ≤1 min', detail: '超时消化导致 eNOS、VE-cadherin 表达下降。推荐 0.05% 低浓度胰酶，镜下实时监控。' },
  },
]

const digestTable = [
  { name: 'L929', method: '0.25% 胰酶 · 1–2 min', forbid: '—', forbidRed: false },
  { name: 'HUVEC', method: '0.05% 胰酶 · ≤1 min', forbid: '超时消化', forbidRed: true },
  { name: 'RAW264.7', method: '刮刀 / EDTA / 吹打', forbid: '🚫 胰酶绝对禁止', forbidRed: true },
]

export default function CellDatabase() {
  return (
    <div className="max-w-5xl mx-auto">
      <div className="mb-10">
        <h2 className="text-[32px] font-bold text-[#1d1d1f] dark:text-white dark:text-white tracking-tight">细胞资料库</h2>
        <p className="mt-1.5 text-[16px] text-[#86868b] dark:text-[#98989d] font-medium">
          实验室常用细胞系 · 培养条件与消化红线
        </p>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
        {cells.map((c) => (
          <div key={c.name} className="apple-card overflow-hidden animate-fade-in-up">
            {/* Accent bar + header */}
            <div className={`h-2 bg-gradient-to-r ${c.accent}`} />
            <div className="px-5 pt-4 pb-5">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-bold text-[#1d1d1f] dark:text-white dark:text-white tracking-tight">{c.name}</h3>
                <span className={`text-[13px] font-semibold px-2.5 py-0.5 rounded-full ${c.badgeBg}`}>
                  {c.fullName}
                </span>
              </div>

              <div className="space-y-3">
                <div>
                  <div className="text-[14px] font-semibold text-[#aeaeb2] dark:text-[#636366] uppercase tracking-wider mb-0.5">培养基</div>
                  <div className={`text-[13px] leading-relaxed font-medium ${c.mediaHighlight ? 'text-[#ff9f0a] dark:text-[#ffcc00]' : 'text-[#1d1d1f] dark:text-white/80'}`}>{c.media} {c.mediaHighlight && <span className="text-[11px] ml-1 px-1.5 py-0.5 rounded bg-[#ff9f0a]/10 dark:bg-[#ff9f0a]/20">⚠️ 特殊培养基</span>}</div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <div className="text-[14px] font-semibold text-[#aeaeb2] dark:text-[#636366] uppercase tracking-wider mb-0.5">10cm 皿满度</div>
                    <div className="text-[13px] font-semibold text-[#1d1d1f] dark:text-white">{c.confluence}</div>
                  </div>
                  <div>
                    <div className="text-[14px] font-semibold text-[#aeaeb2] dark:text-[#636366] uppercase tracking-wider mb-0.5">传代时机</div>
                    <div className="text-[13px] font-semibold text-[#1d1d1f] dark:text-white">{c.passage}</div>
                  </div>
                </div>

                <div>
                  <div className="text-[14px] font-semibold text-[#aeaeb2] dark:text-[#636366] uppercase tracking-wider mb-1.5">特性与用途</div>
                  <div className="flex flex-wrap gap-1.5">
                    {c.traits.map((t) => (
                      <span key={t} className="text-[13px] px-2.5 py-1 rounded-lg bg-[#f5f5f7] dark:bg-[#2c2c2e] text-[#1d1d1f] dark:text-white/70 dark:text-white/70 font-medium">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                {c.warning && (
                  <div className="bg-[#ff3b30]/5 border border-[#ff3b30]/15 rounded-2xl px-3.5 py-3 flex gap-2.5 items-start animate-fade-in-up">
                    <span className="text-base">{c.warning.icon}</span>
                    <div>
                      <div className="text-[13px] font-bold text-[#ff3b30]">{c.warning.label}</div>
                      <div className="text-[13px] text-[#ff3b30]/80 mt-0.5 leading-relaxed">{c.warning.detail}</div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Digest table */}
      <div className="apple-card p-5 sm:p-6">
        <h3 className="font-semibold text-[16px] text-[#1d1d1f] dark:text-white tracking-tight mb-4">消化方法速查</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left border-b border-black/[0.04] dark:border-white/[0.06]">
                <th className="pb-3 text-[13px] font-semibold text-[#aeaeb2] dark:text-[#636366] uppercase tracking-wider">细胞系</th>
                <th className="pb-3 text-[13px] font-semibold text-[#aeaeb2] dark:text-[#636366] uppercase tracking-wider">推荐方法</th>
                <th className="pb-3 text-[13px] font-semibold text-[#aeaeb2] dark:text-[#636366] uppercase tracking-wider">禁忌</th>
              </tr>
            </thead>
            <tbody>
              {digestTable.map((r) => (
                <tr key={r.name} className="border-b border-black/[0.02] dark:border-white/[0.04] last:border-0">
                  <td className="py-3 text-[13px] font-semibold text-[#1d1d1f] dark:text-white">{r.name}</td>
                  <td className="py-3">
                    <span className="inline-block text-[13px] font-medium bg-[#34c759]/8 dark:bg-[#34c759]/20 text-[#34c759] px-2.5 py-1 rounded-full whitespace-nowrap">
                      {r.method}
                    </span>
                  </td>
                  <td className={`py-3 text-[13px] font-medium whitespace-nowrap ${r.forbidRed ? 'text-[#ff3b30]' : 'text-[#86868b] dark:text-[#98989d]'}`}>
                    {r.forbid}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
