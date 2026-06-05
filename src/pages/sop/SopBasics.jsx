export default function SopBasics() {
  return (
    <div className="space-y-5">
      {/* 1. 培养基配置 */}
      <Card title="🧪 培养基配置" accent="blue">
        <table className="w-full text-sm">
          <tbody className="divide-y divide-slate-100">
            <Row label="DMEM 基础培养基" value="450 mL" />
            <Row label="胎牛血清 (FBS)" value="50 mL" />
            <Row label="双抗 (青霉素-链霉素)" value="5 mL" />
            <Row label={<span className="font-semibold text-slate-800 dark:text-white">总体积</span>} value={<span className="font-bold text-blue-700">500 mL</span>} />
          </tbody>
        </table>
        <Tip>FBS 需 56°C 灭活 30 min 后使用。配制在超净台内完成，严格无菌操作。</Tip>
      </Card>

      {/* 2. 换液频率 */}
      <Card title="🔄 换液频率" accent="green">
        <div className="text-sm text-slate-700 dark:text-[#f5f5f7] space-y-2">
          <p>常规维持：<strong>每 2–3 天更换一次培养基</strong></p>
          <ul className="list-disc list-inside space-y-1 text-slate-600 dark:text-[#aeaeb2]">
            <li>培养基颜色由红变黄（pH 下降）时需立即换液</li>
            <li>换液前 37°C 预热新鲜培养基</li>
            <li>弃旧液 → PBS 轻柔润洗 → 沿壁缓慢加入新培养基</li>
          </ul>
        </div>
      </Card>

      {/* 3. 传代与分皿 */}
      <Card title="📦 传代与分皿" accent="amber">
        <div className="space-y-3">
          <div className="bg-amber-50 border border-amber-200 rounded-lg px-4 py-3 text-sm text-amber-900">
            <strong>⏱ 生长速率：</strong>一天增加约 <strong>1.8 倍</strong> · 约 <strong>400 万</strong> 细胞即长满 · <strong>3–4 天</strong> 需分皿
          </div>

          <ol className="space-y-2.5 text-sm text-slate-700 dark:text-[#f5f5f7]">
            <li><span className="inline-flex w-5 h-5 rounded-full bg-slate-400 text-white text-xs font-bold items-center justify-center mr-2 align-middle">1</span>吸除旧培养基（不要触碰细胞层）</li>
            <li><span className="inline-flex w-5 h-5 rounded-full bg-slate-400 text-white text-xs font-bold items-center justify-center mr-2 align-middle">2</span><strong>1 mL PBS</strong> 轻柔冲洗细胞层，去除残留血清和死细胞</li>
            <li><span className="inline-flex w-5 h-5 rounded-full bg-slate-400 text-white text-xs font-bold items-center justify-center mr-2 align-middle">3</span><strong>1 mL 胰酶</strong> 消化（37°C，1–2 分钟至细胞变圆、轻拍皿壁即脱落）</li>
            <li><span className="inline-flex w-5 h-5 rounded-full bg-slate-400 text-white text-xs font-bold items-center justify-center mr-2 align-middle">4</span>加入含血清培养基终止消化，轻柔吹打至单细胞悬液</li>
            <li><span className="inline-flex w-5 h-5 rounded-full bg-slate-400 text-white text-xs font-bold items-center justify-center mr-2 align-middle">5</span>按比例分皿，补液至 <strong>培养瓶 5–7 mL</strong> / <strong>培养皿 8–9 mL</strong></li>
          </ol>
          <Tip>吹打力度轻柔，避免产生气泡和机械损伤。HUVEC 胰酶消化 ≤1 min。</Tip>
        </div>
      </Card>

      {/* 4. 细胞计数法 */}
      <Card title="🔢 细胞计数法（血球计数板）" accent="blue">
        <div className="space-y-2 text-sm text-slate-700 dark:text-[#f5f5f7]">
          <ol className="space-y-1.5">
            <li><span className="inline mr-1.5 text-blue-600 font-bold">①</span> 消化吹匀后，吸取 <strong>10 μL</strong> 细胞悬液，沿盖玻片边缘注入血球计数板</li>
            <li><span className="inline mr-1.5 text-blue-600 font-bold">②</span> 显微镜下统计 <strong>四周四个大格</strong>（每个大格含 16 小格）的细胞数</li>
            <li><span className="inline mr-1.5 text-blue-600 font-bold">③</span> 计算四个大格的平均值</li>
          </ol>
          <div className="bg-blue-50 border border-blue-200 rounded-lg px-4 py-3 text-center">
            <span className="text-sm text-blue-800">
              <strong>细胞悬液浓度 (cells/mL) = 平均每个大格细胞数 × 10⁴</strong>
            </span>
          </div>
          <Tip>压线细胞只计左侧和上侧。成团细胞按单个计。浓度过高需稀释后重新计数。</Tip>
        </div>
      </Card>

      {/* 5. 冻存与复苏 */}
      <Card title="❄️ 细胞冻存规范" accent="purple">
        <div className="space-y-3 text-sm text-slate-700 dark:text-[#f5f5f7]">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="bg-purple-50 border border-purple-200 rounded-lg px-4 py-3">
              <div className="font-semibold text-purple-800 mb-1">冻存液配方</div>
              <div className="text-purple-700">90% FBS + 10% DMSO</div>
              <div className="text-xs text-purple-500 mt-1">需 4°C 预冷，现配现用</div>
            </div>
            <div className="bg-purple-50 border border-purple-200 rounded-lg px-4 py-3">
              <div className="font-semibold text-purple-800 mb-1">细胞密度</div>
              <div className="text-purple-700">1–5 × 10⁶ cells/mL</div>
              <div className="text-xs text-purple-500 mt-1">每管 1 mL，做好标记</div>
            </div>
          </div>
          <p>梯度降温：程序降温盒（含异丙醇）→ <strong>-80°C 过夜</strong> → 次日移入液氮罐</p>

          <div className="bg-red-50 border border-red-300 rounded-lg px-4 py-3 flex gap-3">
            <span className="text-xl flex-shrink-0">🚨</span>
            <div>
              <div className="font-bold text-red-800 text-sm">DMSO 毒性警告</div>
              <div className="text-red-700 text-sm mt-0.5">
                DMSO 在 4°C 以上对细胞有毒性。从配制冻存液到放入 -80°C 冰箱，<strong>全程必须在 30 分钟内完成</strong>。
              </div>
            </div>
          </div>
        </div>
      </Card>

      <Card title="🔥 细胞复苏规范" accent="orange">
        <div className="space-y-2.5 text-sm text-slate-700 dark:text-[#f5f5f7]">
          <ol className="space-y-1.5">
            <li><span className="inline mr-1.5 text-orange-500 font-bold">①</span> 从液氮/-80°C 取出冻存管，立即投入 <strong>37°C 水浴</strong></li>
            <li><span className="inline mr-1.5 text-orange-500 font-bold">②</span> 快速摇动，<strong>1–2 分钟内完全融化</strong>（残留少量冰晶即取出）</li>
            <li><span className="inline mr-1.5 text-orange-500 font-bold">③</span> 立即加入 <strong>10 倍体积以上</strong> 预热培养基，轻柔混匀洗去 DMSO</li>
            <li><span className="inline mr-1.5 text-orange-500 font-bold">④</span> <strong>1200 rpm 离心 5 min</strong>，弃上清</li>
            <li><span className="inline mr-1.5 text-orange-500 font-bold">⑤</span> 新鲜培养基重悬，接种至培养瓶/皿</li>
          </ol>

          <div className="bg-orange-50 border border-orange-200 rounded-lg px-4 py-3">
            <div className="font-semibold text-orange-800 text-sm mb-1">复苏后注意事项</div>
            <ul className="space-y-1 text-orange-700">
              <li>• 存活率约 <strong>60%</strong>，次日换液去除死细胞</li>
              <li>• 初期培养需<strong>多加血清及生长因子</strong>，帮助细胞恢复</li>
              <li>• 传代 2–3 次后细胞状态恢复至正常，方可用于正式实验</li>
            </ul>
          </div>
        </div>
      </Card>
    </div>
  )
}

/* ---- Reusable ---- */
function Card({ title, accent = 'blue', children }) {
  const borders = { blue: 'border-l-blue-500', green: 'border-l-green-500', amber: 'border-l-amber-500', purple: 'border-l-purple-500', orange: 'border-l-orange-500', red: 'border-l-red-500' }
  return (
    <div className={`bg-white dark:bg-[#2c2c2e] rounded-xl border border-slate-200 dark:border-[#48484a] shadow-sm overflow-hidden border-l-4 ${borders[accent] || 'border-l-blue-500'}`}>
      <div className="px-5 py-3.5 border-b border-slate-100 dark:border-[#3a3a3c]">
        <h3 className="font-semibold text-slate-800 dark:text-white dark:text-white text-sm">{title}</h3>
      </div>
      <div className="px-5 py-4">{children}</div>
    </div>
  )
}

function Row({ label, value }) {
  return (
    <tr>
      <td className="py-2.5 pr-4 text-slate-600 dark:text-[#aeaeb2]">{label}</td>
      <td className="py-2.5 font-medium text-slate-800 dark:text-white dark:text-white text-right">{value}</td>
    </tr>
  )
}

function Tip({ children }) {
  return (
    <div className="mt-3 flex gap-2 text-xs text-slate-500 dark:text-[#98989d] bg-slate-50 dark:bg-[#2c2c2e] rounded-lg px-3 py-2">
      <span className="flex-shrink-0">💡</span>
      <span>{children}</span>
    </div>
  )
}
