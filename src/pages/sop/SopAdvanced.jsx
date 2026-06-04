export default function SopAdvanced() {
  return (
    <div className="space-y-6">
      {/* Experiment 1: LPS-Raw Oxidative Stress */}
      <div className="bg-white dark:bg-[#2c2c2e] rounded-xl border border-slate-200 dark:border-[#48484a] shadow-sm overflow-hidden">
        <div className="px-5 py-3.5 border-b border-slate-100 dark:border-[#3a3a3c] flex items-center gap-3">
          <span className="text-xl">🦠</span>
          <div>
            <h3 className="font-semibold text-slate-800 dark:text-white dark:text-white text-sm">LPS-Raw 氧化应激实验</h3>
            <p className="text-xs text-slate-400 dark:text-[#98989d]">96 孔板 · 共聚焦拍摄 · ROS 检测</p>
          </div>
          <span className="ml-auto bg-blue-100 text-blue-700 text-xs font-medium px-2.5 py-0.5 rounded-full">96 孔板</span>
        </div>

        <div className="px-5 py-4 space-y-5">
          {/* Stage 1: 种板 */}
          <Section num="1" title="种板">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-2">
              <ParamBox label="细胞密度" value="5×10⁴ cells/孔" />
              <ParamBox label="每孔体积" value="100 μL" />
              <ParamBox label="培养条件" value="过夜贴壁" />
            </div>
          </Section>

          {/* Stage 2: LPS 配置 */}
          <Section num="2" title="LPS 工作液配置">
            <div className="bg-amber-50 border border-amber-200 rounded-lg px-4 py-3 text-sm text-amber-900">
              <strong>LPS 原液：</strong>10 mg/mL → 稀释 <strong>20,000 倍</strong> → 工作浓度 <strong>500 ng/mL</strong>
              <br />
              <span className="text-xs text-amber-600">（例：取 1 μL 原液 + 19999 μL 无血清培养基 → 现配现用，避光）</span>
            </div>
          </Section>

          {/* Stage 3: 处理 */}
          <Section num="3" title="LPS + 材料处理">
            <div className="text-sm text-slate-700 dark:text-[#f5f5f7]">
              <ul className="space-y-1.5">
                <li className="flex gap-2"><span className="text-slate-300 dark:text-[#48484a]">•</span> 每孔加入 <strong>50 μL LPS 稀释液</strong>（500 ng/mL）</li>
                <li className="flex gap-2"><span className="text-slate-300 dark:text-[#48484a]">•</span> 每孔加入 <strong>50 μL 待测材料</strong>（或对照培养基）</li>
                <li className="flex gap-2"><span className="text-slate-300 dark:text-[#48484a]">•</span> 孵育 <strong>4 小时</strong>（37°C / 5% CO₂）</li>
              </ul>
            </div>
          </Section>

          {/* Stage 4: ROS 检测 */}
          <Section num="4" title="ROS 检测 (DCFH-DA)">
            <div className="space-y-3 text-sm text-slate-700 dark:text-[#f5f5f7]">
              <div className="bg-slate-50 dark:bg-[#2c2c2e] rounded-lg px-4 py-3 font-mono text-xs text-slate-600 dark:text-[#aeaeb2]">
                DCFH-DA 工作液 = <strong>10 μL 原液 + 9,990 μL 无血清培养基</strong>（稀释 1,000 倍）
              </div>
              <ul className="space-y-1.5">
                <li className="flex gap-2"><span className="text-slate-300 dark:text-[#48484a]">•</span> 每孔加入 <strong>100 μL</strong> 稀释后的 DCFH-DA 染料</li>
                <li className="flex gap-2"><span className="text-slate-300 dark:text-[#48484a]">•</span> 避光孵育 <strong>20–30 min</strong></li>
                <li className="flex gap-2"><span className="text-slate-300 dark:text-[#48484a]">•</span> 无血清培养基<strong>洗涤 2–3 次</strong>，去除胞外染料</li>
              </ul>
            </div>
          </Section>

          {/* Stage 5: 染色 + 拍摄 */}
          <Section num="5" title="Hoechst 核染色 + 共聚焦拍摄">
            <div className="space-y-2 text-sm text-slate-700 dark:text-[#f5f5f7]">
              <ul className="space-y-1.5">
                <li className="flex gap-2"><span className="text-slate-300 dark:text-[#48484a]">•</span> 每孔加入 <strong>100 μL Hoechst 染料</strong>，避光孵育 <strong>10 min</strong></li>
                <li className="flex gap-2"><span className="text-slate-300 dark:text-[#48484a]">•</span> 共聚焦拍摄通道：<strong>FITC (ROS 绿色) / DAPI (细胞核蓝色) / 明场</strong></li>
              </ul>
            </div>
          </Section>

          {/* Stage 6: 后续验证 */}
          <Section num="6" title="12h 后验证实验">
            <div className="flex flex-wrap gap-3">
              <span className="bg-purple-50 text-purple-700 text-xs font-medium px-3 py-1.5 rounded-full border border-purple-200">
                🧪 CCK-8 细胞活力检测
              </span>
              <span className="bg-purple-50 text-purple-700 text-xs font-medium px-3 py-1.5 rounded-full border border-purple-200">
                🔬 活/死细胞双染
              </span>
            </div>
          </Section>
        </div>
      </div>

      {/* Experiment 2: LPS Macrophage Transformation */}
      <div className="bg-white dark:bg-[#2c2c2e] rounded-xl border border-slate-200 dark:border-[#48484a] shadow-sm overflow-hidden">
        <div className="px-5 py-3.5 border-b border-slate-100 dark:border-[#3a3a3c] flex items-center gap-3">
          <span className="text-xl">🔬</span>
          <div>
            <h3 className="font-semibold text-slate-800 dark:text-white dark:text-white text-sm">LPS 诱导巨噬细胞转化 · 外送染色</h3>
            <p className="text-xs text-slate-400 dark:text-[#98989d]">24 孔板 · 细胞爬片 · 免疫荧光</p>
          </div>
          <span className="ml-auto bg-purple-100 text-purple-700 text-xs font-medium px-2.5 py-0.5 rounded-full">24 孔板</span>
        </div>

        <div className="px-5 py-4 space-y-5">
          {/* Stage 1 */}
          <Section num="1" title="种板 + 贴壁">
            <div className="space-y-2 text-sm text-slate-700 dark:text-[#f5f5f7]">
              <div className="bg-amber-50 border border-amber-200 rounded-lg px-4 py-3 text-sm text-amber-800">
                ⚠️ 关键步骤：24 孔板内<strong>预先放置适配的细胞爬片</strong>（无菌操作），再接种细胞。
              </div>
              <ul className="space-y-1.5">
                <li className="flex gap-2"><span className="text-slate-300 dark:text-[#48484a]">•</span> 接种后贴壁 <strong>24 小时</strong></li>
              </ul>
            </div>
          </Section>

          {/* Stage 2 */}
          <Section num="2" title="LPS + 材料处理">
            <div className="text-sm text-slate-700 dark:text-[#f5f5f7]">
              <ul className="space-y-1.5">
                <li className="flex gap-2"><span className="text-slate-300 dark:text-[#48484a]">•</span> 使用<strong>无血清</strong>培养基配制 LPS + 材料</li>
                <li className="flex gap-2"><span className="text-slate-300 dark:text-[#48484a]">•</span> 处理 <strong>24 小时</strong></li>
              </ul>
            </div>
          </Section>

          {/* Stage 3 */}
          <Section num="3" title="固定（关键步骤）">
            <div className="space-y-2">
              <div className="bg-red-50 border border-red-200 rounded-lg px-4 py-3 flex gap-3">
                <span className="text-xl flex-shrink-0">⚠️</span>
                <div className="text-sm text-red-800">
                  <strong>预冷的多聚甲醛固定 10–15 min</strong><br />
                  <span className="text-red-600">细胞很薄，严禁超时固定——过固定会导致抗原遮蔽，染色失败。</span>
                </div>
              </div>
            </div>
          </Section>

          {/* Stage 4 */}
          <Section num="4" title="洗涤 + 外送">
            <div className="space-y-2 text-sm text-slate-700 dark:text-[#f5f5f7]">
              <ul className="space-y-1.5">
                <li className="flex gap-2"><span className="text-slate-300 dark:text-[#48484a]">•</span> PBS 轻柔洗涤 <strong>3 次</strong></li>
                <li className="flex gap-2"><span className="text-slate-300 dark:text-[#48484a]">•</span> 孔内覆盖<strong>薄层 PBS</strong>，防止爬片干燥</li>
                <li className="flex gap-2"><span className="text-slate-300 dark:text-[#48484a]">•</span> 封口膜密封孔板，标记后送样</li>
              </ul>
              <div className="bg-blue-50 border border-blue-200 rounded-lg px-4 py-3 text-sm text-blue-800">
                📍 <strong>送样地址：</strong>天府科技园 B2 栋
              </div>
            </div>
          </Section>

          {/* Stage 5 */}
          <Section num="5" title="封片（收样后）">
            <div className="text-sm text-slate-700 dark:text-[#f5f5f7]">
              <ul className="space-y-1.5">
                <li className="flex gap-2"><span className="text-slate-300 dark:text-[#48484a]">•</span> 用弯头镊子<strong>挑起爬片</strong>，细胞面朝上置于载玻片</li>
                <li className="flex gap-2"><span className="text-slate-300 dark:text-[#48484a]">•</span> <strong>吹干</strong>爬片表面水分</li>
                <li className="flex gap-2"><span className="text-slate-300 dark:text-[#48484a]">•</span> 滴加 <strong>硅油</strong>，盖上盖玻片封片</li>
                <li className="flex gap-2"><span className="text-slate-300 dark:text-[#48484a]">•</span> 4°C 避光保存，尽快上机拍摄</li>
              </ul>
            </div>
          </Section>
        </div>
      </div>
    </div>
  )
}

/* ---- Reusable ---- */
function Section({ num, title, children }) {
  return (
    <div>
      <div className="flex items-center gap-2 mb-2">
        <span className="w-5 h-5 rounded-full bg-slate-700 text-white dark:text-white text-xs font-bold flex items-center justify-center flex-shrink-0">
          {num}
        </span>
        <h4 className="text-sm font-semibold text-slate-700 dark:text-[#f5f5f7]">{title}</h4>
      </div>
      {children}
    </div>
  )
}

function ParamBox({ label, value }) {
  return (
    <div className="bg-slate-50 dark:bg-[#2c2c2e] rounded-lg px-3 py-2.5">
      <div className="text-xs text-slate-400 dark:text-[#98989d] mb-0.5">{label}</div>
      <div className="text-sm font-medium text-slate-800 dark:text-white">{value}</div>
    </div>
  )
}
