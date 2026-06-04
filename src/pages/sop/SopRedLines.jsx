export default function SopRedLines() {
  return (
    <div className="space-y-5">
      {/* Header warning */}
      <div className="bg-red-600 text-white rounded-xl p-5 flex gap-4 items-start">
        <span className="text-3xl flex-shrink-0">🚨</span>
        <div>
          <h3 className="font-bold text-lg">细胞消化红线 —— 用错=实验报废</h3>
          <p className="text-sm text-red-100 mt-1">
            消化方法直接影响细胞膜表面受体完整性和实验结果。以下三条红线是实验室铁律。
          </p>
        </div>
      </div>

      {/* L929 */}
      <RedCard
        cell="L929"
        subtitle="小鼠成纤维细胞 · 贴壁细胞"
        rule="必须使用胰酶"
        severity="high"
        details={[
          '贴壁牢固，不经胰酶消化无法充分解离',
          '推荐：0.25% 胰酶-EDTA，37°C，1–2 min',
          '消化终点：细胞变圆、轻拍皿壁即脱落',
        ]}
      />

      {/* HUVEC */}
      <RedCard
        cell="HUVEC"
        subtitle="人脐静脉内皮细胞 · 贴壁细胞"
        rule="必须使用胰酶 · 严格控制 ≤1 min"
        severity="critical"
        details={[
          '超时消化将导致内皮功能标志物（eNOS、VE-cadherin）表达下降',
          '推荐：0.05% 胰酶（低浓度），37°C，≤60 秒',
          '显微镜下实时观察，约 80% 细胞变圆立即终止',
          '划痕与血管生成实验尤其敏感，消化损伤直接导致实验失败',
        ]}
      />

      {/* RAW264.7 */}
      <RedCard
        cell="RAW264.7"
        subtitle="小鼠巨噬细胞 · 半贴壁免疫细胞"
        rule="严禁使用胰酶！"
        severity="forbidden"
        details={[
          '胰酶会切割细胞膜表面 TLR4、CD14 等受体，直接破坏 LPS 炎症应答功能',
          '胰酶消化后的 RAW264.7 做 LPS 刺激实验 = 废数据',
          '推荐方法①：无酶细胞刮刀，沿皿底单向轻柔刮取',
          '推荐方法②：0.02% EDTA（PBS 配制），37°C 孵育 5–10 min 后轻柔吹打',
          '推荐方法③（最优）：直接用移液器吸取培养基反复轻柔吹打，半贴壁细胞即脱落',
        ]}
      />

      {/* Summary table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="px-5 py-3.5 border-b border-slate-100">
          <h3 className="font-semibold text-slate-800 text-sm">📊 消化方法速查表</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-50 text-left">
                <th className="px-5 py-2.5 font-medium text-slate-600">细胞系</th>
                <th className="px-5 py-2.5 font-medium text-slate-600">贴壁类型</th>
                <th className="px-5 py-2.5 font-medium text-slate-600">推荐消化法</th>
                <th className="px-5 py-2.5 font-medium text-slate-600">禁忌</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              <tr>
                <td className="px-5 py-2.5 font-semibold">L929</td>
                <td className="px-5 py-2.5 text-slate-600">贴壁</td>
                <td className="px-5 py-2.5"><span className="bg-green-50 text-green-700 text-xs px-2 py-0.5 rounded-full">0.25% 胰酶</span></td>
                <td className="px-5 py-2.5 text-slate-500">—</td>
              </tr>
              <tr className="bg-red-50/50">
                <td className="px-5 py-2.5 font-semibold">HUVEC</td>
                <td className="px-5 py-2.5 text-slate-600">贴壁</td>
                <td className="px-5 py-2.5"><span className="bg-amber-50 text-amber-700 text-xs px-2 py-0.5 rounded-full">0.05% 胰酶 ≤1 min</span></td>
                <td className="px-5 py-2.5 text-red-600 font-medium">超时消化</td>
              </tr>
              <tr className="bg-red-50/50">
                <td className="px-5 py-2.5 font-semibold">RAW264.7</td>
                <td className="px-5 py-2.5 text-slate-600">半贴壁</td>
                <td className="px-5 py-2.5"><span className="bg-green-50 text-green-700 text-xs px-2 py-0.5 rounded-full">刮刀 / EDTA / 吹打</span></td>
                <td className="px-5 py-2.5 text-red-600 font-bold">🚫 胰酶</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

function RedCard({ cell, subtitle, rule, severity, details }) {
  const config = {
    high:     { border: 'border-l-red-500',  bg: 'bg-red-50',  badge: 'bg-red-100 text-red-700',  icon: '⚠️' },
    critical: { border: 'border-l-red-600',  bg: 'bg-red-50',  badge: 'bg-red-600 text-white',     icon: '🔴' },
    forbidden:{ border: 'border-l-red-700',  bg: 'bg-red-100', badge: 'bg-red-700 text-white',     icon: '🚫' },
  }
  const c = config[severity]

  return (
    <div className={`bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden border-l-4 ${c.border}`}>
      <div className={`px-5 py-3.5 border-b border-slate-100 flex items-center justify-between ${severity === 'forbidden' ? 'bg-red-50' : ''}`}>
        <div>
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-900">{cell}</span>
            <span className="text-xs text-slate-400">{subtitle}</span>
          </div>
        </div>
        <span className={`text-xs font-bold px-3 py-1 rounded-full ${c.badge}`}>
          {c.icon} {rule}
        </span>
      </div>
      <div className="px-5 py-4">
        <ul className="space-y-1.5">
          {details.map((d, i) => (
            <li key={i} className="flex gap-2 text-sm text-slate-700">
              <span className="text-slate-300 mt-0.5">•</span>
              <span>{d}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
