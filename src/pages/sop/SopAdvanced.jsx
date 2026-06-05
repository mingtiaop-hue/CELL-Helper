import PageTOC from '../../components/PageTOC'

const ADVANCED_TOC = [
  { id: 'exp-cck8',      label: 'CCK-8 细胞毒性测试（浸提液法）' },
  { id: 'exp-livedead',  label: 'Calcein-AM / PI 活死细胞双染' },
  { id: 'exp-scratch',   label: '内皮细胞划痕迁移实验' },
  { id: 'exp-transwell', label: 'Transwell 细胞迁移实验' },
  { id: 'exp-lps-ros',   label: 'LPS-Raw 氧化应激实验' },
  { id: 'exp-lps-macro', label: 'LPS 诱导巨噬细胞转化 · 外送染色' },
]

export default function SopAdvanced() {
  return (
    <div className="space-y-6">
      <PageTOC items={ADVANCED_TOC} />

      {/* Experiment 1: CCK-8 Cytotoxicity */}
      <div className="bg-white dark:bg-[#2c2c2e] rounded-xl border border-slate-200 dark:border-[#48484a] shadow-sm overflow-hidden">
        <div className="px-5 py-3.5 border-b border-slate-100 dark:border-[#3a3a3c] flex items-center gap-3">
          <span className="text-xl">🧪</span>
          <div>
            <div id="exp-cck8" className="scroll-mt-20" />
            <h3 className="font-semibold text-slate-800 dark:text-white text-sm">CCK-8 细胞毒性测试（浸提液法）</h3>
            <p className="text-xs text-slate-400 dark:text-[#98989d]">96 孔板 · L929 · 材料浸提</p>
          </div>
          <span className="ml-auto bg-sky-100 text-sky-700 text-xs font-medium px-2.5 py-0.5 rounded-full">96 孔板</span>
        </div>
        <div className="px-5 py-4 space-y-5">
          <Section num="1" title="种板">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-2">
              <ParamBox label="细胞密度" value="5,000–10,000 cells/孔" />
              <ParamBox label="每孔体积" value="100 μL 完全培养基" />
              <ParamBox label="培养条件" value="37°C / 5% CO₂ 过夜贴壁" />
            </div>
          </Section>

          <Section num="2" title="浸提液制备">
            <div className="bg-blue-50 border border-blue-200 rounded-lg px-4 py-3 text-sm space-y-1">
              <p className="text-blue-800"><strong>水凝胶：</strong>约 200 μL / 1 mL 完全培养基</p>
              <p className="text-blue-800"><strong>固体材料：</strong>0.2 g/mL 完全培养基</p>
              <p className="text-blue-700 text-xs mt-1">37°C 浸提 24 h → 离心收集上清 → 即为浸提液</p>
            </div>
            <div className="mt-2 bg-amber-50 border border-amber-200 rounded-lg px-4 py-3 text-sm text-amber-800">
              💡 <strong>材料灭菌困难？</strong>制备好浸提液后使用<strong>滤菌膜过滤</strong>。过滤后的浸提液可冷冻保存。
            </div>
          </Section>

          <Section num="3" title="加药处理">
            <ul className="space-y-1.5 text-sm text-slate-700 dark:text-[#f5f5f7]">
              <li><span className="inline mr-1.5 text-slate-300">•</span>弃去细胞原培养基，每孔加入 <strong>100 μL</strong> 不同处理组浸提液</li>
              <li><span className="inline mr-1.5 text-slate-300">•</span>37°C / 5% CO₂ 继续培养 <strong>24 h</strong>（或其他时间组）</li>
            </ul>
          </Section>

          <Section num="4" title="CCK-8 检测">
            <div className="space-y-2 text-sm text-slate-700 dark:text-[#f5f5f7]">
              <div className="bg-slate-50 dark:bg-[#2c2c2e] rounded-lg px-4 py-3 font-mono text-xs text-slate-600 dark:text-[#aeaeb2]">
                CCK-8 工作液 = CCK-8 试剂 : 完全培养基 = <strong>1:9</strong> 稀释
              </div>
              <ul className="space-y-1.5">
                <li><span className="inline mr-1.5 text-slate-300">•</span>每孔加入 <strong>100 μL</strong> CCK-8 工作液</li>
                <li><span className="inline mr-1.5 text-slate-300">•</span>37°C <strong>避光</strong>孵育 1 h</li>
                <li><span className="inline mr-1.5 text-slate-300">•</span>酶标仪 <strong>450 nm</strong> 测定 OD 值</li>
                <li><span className="inline mr-1.5 text-slate-300">•</span><strong>细胞活力 (%) = (OD_sample − OD_blank) / (OD_control − OD_blank) × 100%</strong></li>
              </ul>
            </div>
            <div className="mt-2 space-y-1.5">
              <div className="bg-red-50 border border-red-200 rounded-lg px-4 py-3 text-sm text-red-800">
                🚨 <strong>浸提液有颜色时必须清洗：</strong>吸干原培养基 → PBS 轻轻清洗（用力会洗掉细胞）→ 吸干后再加工作液。未吸干的液体稀释工作液导致 OD 偏差。
              </div>
              <div className="bg-red-50 border border-red-200 rounded-lg px-4 py-3 text-sm text-red-800">
                🚨 <strong>CCK-8 毒性：</strong>超过 2 h 显著提升细胞毒性，活死信号重合。可洗出 CCK-8 后加入培养基再观察。
              </div>
            </div>
          </Section>
        </div>
      </div>

      {/* Experiment 2: Live/Dead Staining */}
      <div className="bg-white dark:bg-[#2c2c2e] rounded-xl border border-slate-200 dark:border-[#48484a] shadow-sm overflow-hidden">
        <div className="px-5 py-3.5 border-b border-slate-100 dark:border-[#3a3a3c] flex items-center gap-3">
          <span className="text-xl">🔬</span>
          <div>
            <div id="exp-livedead" className="scroll-mt-20" />
            <h3 className="font-semibold text-slate-800 dark:text-white text-sm">Calcein-AM / PI 活死细胞双染</h3>
            <p className="text-xs text-slate-400 dark:text-[#98989d]">荧光显微镜 · 活细胞绿色 · 死细胞红色</p>
          </div>
          <span className="ml-auto bg-green-100 text-green-700 text-xs font-medium px-2.5 py-0.5 rounded-full">荧光</span>
        </div>
        <div className="px-5 py-4 space-y-5">
          <Section num="1" title="准备工作液">
            <div className="bg-slate-50 dark:bg-[#2c2c2e] rounded-lg px-4 py-3 font-mono text-xs text-slate-600 dark:text-[#aeaeb2] space-y-1">
              <p>Calcein-AM/PI 染色工作液 = 原液稀释 <strong>1000 倍</strong>（用无血清培养基）</p>
            </div>
          </Section>

          <Section num="2" title="贝博 (BestBio) 活死染料">
            <div className="space-y-2 text-sm text-slate-700 dark:text-[#f5f5f7]">
              <div className="bg-blue-50 border border-blue-200 rounded-lg px-4 py-3 text-sm text-blue-800">
                <strong>AM 工作液：</strong>10 μL AM 原液 + 90 μL 染料稀释缓冲液（10×）→ 再加 9900 μL 无血清 DMEM（100×）→ 工作液
              </div>
              <div className="bg-red-50 border border-red-200 rounded-lg px-4 py-3 text-sm text-red-800">
                <strong>PI 工作液：</strong>10 μL PI 原液 + 90 μL 染料稀释缓冲液（10×）→ 再加 9900 μL 无血清 DMEM（100×）→ 工作液
              </div>
            </div>
          </Section>

          <Section num="3" title="染色步骤">
            <ol className="space-y-1.5 text-sm text-slate-700 dark:text-[#f5f5f7]">
              <li><span className="inline mr-1.5 text-green-600 font-bold">①</span>弃培养基，PBS 轻洗细胞 1 次</li>
              <li><span className="inline mr-1.5 text-green-600 font-bold">②</span>每孔加 AM 工作液覆盖细胞（96 孔板 50 μL 即可），<strong>染 10 min</strong>（随时镜下观察）</li>
              <li><span className="inline mr-1.5 text-green-600 font-bold">③</span>染色成功后吸出，无血清培养基洗涤 2 次</li>
              <li><span className="inline mr-1.5 text-green-600 font-bold">④</span>每孔加 PI 工作液，<strong>染 3–5 min</strong></li>
              <li><span className="inline mr-1.5 text-green-600 font-bold">⑤</span>染色成功后吸出，加无血清培养基，倒置荧光显微镜拍摄</li>
            </ol>
          </Section>

          <div className="space-y-2">
            <div className="bg-amber-50 border border-amber-200 rounded-lg px-4 py-3 text-sm text-amber-800">
              ⚠️ <strong>全程避光操作。</strong>
            </div>
            <div className="bg-red-50 border border-red-200 rounded-lg px-4 py-3 text-sm text-red-800">
              🚨 <strong>染色时间过长细胞会死</strong>，活死信号重合——严格控制时间。
            </div>
            <div className="bg-red-50 border border-red-200 rounded-lg px-4 py-3 text-sm text-red-800">
              🚨 <strong>洗涤动作要轻！</strong>动作太大会导致细胞飘走，图像中央细胞稀疏。
            </div>
            <div className="bg-amber-50 border border-amber-200 rounded-lg px-4 py-3 text-sm text-amber-800">
              💡 <strong>排枪技巧：</strong>使用排枪时将板子<strong>斜过来</strong>，所有枪头接触底部同一边后再吸出，避免 96 孔板吸除不全。
            </div>
            <div className="bg-amber-50 border border-amber-200 rounded-lg px-4 py-3 text-sm text-amber-800">
              💡 <strong>CCK-8 后做活死染：</strong>CCK-8 超过 2 h 毒性显著提升，导致活死信号重合。可将 CCK-8 洗出后加培养基，再单独染色。
            </div>
          </div>
        </div>
      </div>

      {/* Experiment 3: Scratch Migration */}
      <div className="bg-white dark:bg-[#2c2c2e] rounded-xl border border-slate-200 dark:border-[#48484a] shadow-sm overflow-hidden">
        <div className="px-5 py-3.5 border-b border-slate-100 dark:border-[#3a3a3c] flex items-center gap-3">
          <span className="text-xl">✂️</span>
          <div>
            <div id="exp-scratch" className="scroll-mt-20" />
            <h3 className="font-semibold text-slate-800 dark:text-white text-sm">内皮细胞划痕迁移实验</h3>
            <p className="text-xs text-slate-400 dark:text-[#98989d]">12 孔板 · HUVEC · 明场拍摄</p>
          </div>
          <span className="ml-auto bg-purple-100 text-purple-700 text-xs font-medium px-2.5 py-0.5 rounded-full">12 孔板</span>
        </div>
        <div className="px-5 py-4 space-y-5">
          <Section num="1" title="种板">
            <ul className="space-y-1.5 text-sm text-slate-700 dark:text-[#f5f5f7]">
              <li><span className="inline mr-1.5 text-slate-300">•</span>内皮长满后消化种板至 12 孔板，每孔 <strong>1 mL</strong></li>
              <li><span className="inline mr-1.5 text-slate-300">•</span>底部用笔<strong>画平行线</strong>方便确定拍照位置</li>
              <li><span className="inline mr-1.5 text-slate-300">•</span>培养至贴壁且<strong>完全长满</strong></li>
            </ul>
          </Section>
          <Section num="2" title="划痕">
            <ul className="space-y-1.5 text-sm text-slate-700 dark:text-[#f5f5f7]">
              <li><span className="inline mr-1.5 text-slate-300">•</span>用 <strong>200 μL 枪头</strong>划痕（尽量用同一根枪头保持宽度一致）</li>
              <li><span className="inline mr-1.5 text-slate-300">•</span>无血清 DMEM 洗涤至无漂浮细胞</li>
            </ul>
          </Section>
          <Section num="3" title="拍摄与加药">
            <ul className="space-y-1.5 text-sm text-slate-700 dark:text-[#f5f5f7]">
              <li><span className="inline mr-1.5 text-slate-300">•</span>细胞房显微镜 <strong>10× 明场</strong>拍摄，记为 <strong>0 h</strong></li>
              <li><span className="inline mr-1.5 text-slate-300">•</span>各孔加入不同材料 → 放入培养箱</li>
              <li><span className="inline mr-1.5 text-slate-300">•</span>按时间点（6h / 12h / 24h）拍摄同一位置</li>
            </ul>
          </Section>
        </div>
      </div>

      {/* Experiment 4: Transwell Migration */}
      <div className="bg-white dark:bg-[#2c2c2e] rounded-xl border border-slate-200 dark:border-[#48484a] shadow-sm overflow-hidden">
        <div className="px-5 py-3.5 border-b border-slate-100 dark:border-[#3a3a3c] flex items-center gap-3">
          <span className="text-xl">🏃</span>
          <div>
            <div id="exp-transwell" className="scroll-mt-20" />
            <h3 className="font-semibold text-slate-800 dark:text-white text-sm">Transwell 细胞迁移实验</h3>
            <p className="text-xs text-slate-400 dark:text-[#98989d]">24 孔板 · 8 μm 小室 · 结晶紫染色</p>
          </div>
          <span className="ml-auto bg-orange-100 text-orange-700 text-xs font-medium px-2.5 py-0.5 rounded-full">24 孔板</span>
        </div>
        <div className="px-5 py-4 space-y-5">
          <Section num="1" title="接种">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-2">
              <ParamBox label="L929" value="10 万 cells/孔 · 200 μL 无血清培养基" />
              <ParamBox label="HUVEC" value="5 万 cells/孔 · 200 μL 无血清培养基" />
            </div>
            <div className="mt-2 bg-amber-50 border border-amber-200 rounded-lg px-4 py-3 text-sm text-amber-800">
              💡 加细胞前可用 PBS 润一下小室。沿壁<strong>垂直缓慢加入</strong>细胞悬液，避免气泡。
            </div>
          </Section>

          <Section num="2" title="加药">
            <ul className="space-y-1.5 text-sm text-slate-700 dark:text-[#f5f5f7]">
              <li><span className="inline mr-1.5 text-slate-300">•</span>下室加入 <strong>600 μL</strong> 含有材料/水凝胶的完全培养基</li>
              <li><span className="inline mr-1.5 text-slate-300">•</span>对照组：600 μL 完全培养基</li>
              <li><span className="inline mr-1.5 text-slate-300">•</span>37°C 培养 <strong>24 h</strong></li>
            </ul>
          </Section>

          <Section num="3" title="固定与染色">
            <ol className="space-y-1.5 text-sm text-slate-700 dark:text-[#f5f5f7]">
              <li><span className="inline mr-1.5 text-orange-500 font-bold">①</span>取出小室，吸干液体，PBS 清洗 2 次（在 PBS 里涮一下）</li>
              <li><span className="inline mr-1.5 text-orange-500 font-bold">②</span><strong>4% 多聚甲醛固定 10–15 min</strong>（勿超时）→ PBS 清洗 2 次</li>
              <li><span className="inline mr-1.5 text-orange-500 font-bold">③</span><strong>0.1% 结晶紫染色 15–30 min</strong>（实时观察，也可 1 h）</li>
            </ol>
          </Section>

          <Section num="4" title="拍照">
            <ol className="space-y-1.5 text-sm text-slate-700 dark:text-[#f5f5f7]">
              <li><span className="inline mr-1.5 text-orange-500 font-bold">④</span>湿润棉签<strong>擦掉小室上层细胞</strong>（未迁移的）</li>
              <li><span className="inline mr-1.5 text-orange-500 font-bold">⑤</span>镊子夹住小室在大量水中涮洗多余结晶紫染料</li>
              <li><span className="inline mr-1.5 text-orange-500 font-bold">⑥</span>载玻片滴 1 小滴清水 → 放置小室（小室内也加点水）→ 倒置显微镜 <strong>白光 10×</strong> 拍照</li>
            </ol>
          </Section>
        </div>
      </div>

      {/* Experiment 5: LPS-Raw Oxidative Stress (existing) */}
      <div className="bg-white dark:bg-[#2c2c2e] rounded-xl border border-slate-200 dark:border-[#48484a] shadow-sm overflow-hidden">
        <div className="px-5 py-3.5 border-b border-slate-100 dark:border-[#3a3a3c] flex items-center gap-3">
          <span className="text-xl">🦠</span>
          <div>
            <div id="exp-lps-ros" className="scroll-mt-20" />
            <h3 className="font-semibold text-slate-800 dark:text-white text-sm">LPS-Raw 氧化应激实验</h3>
            <p className="text-xs text-slate-400 dark:text-[#98989d]">96 孔板 · 共聚焦拍摄 · ROS 检测</p>
          </div>
          <span className="ml-auto bg-blue-100 text-blue-700 text-xs font-medium px-2.5 py-0.5 rounded-full">96 孔板</span>
        </div>
        <div className="px-5 py-4 space-y-5">
          <Section num="1" title="种板">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-2">
              <ParamBox label="细胞密度" value="5×10⁴ cells/孔" />
              <ParamBox label="每孔体积" value="100 μL" />
              <ParamBox label="培养条件" value="过夜贴壁" />
            </div>
          </Section>
          <Section num="2" title="LPS 工作液配置">
            <div className="bg-amber-50 border border-amber-200 rounded-lg px-4 py-3 text-sm text-amber-900">
              <strong>LPS 原液：</strong>10 mg/mL → 稀释 <strong>20,000 倍</strong> → 工作浓度 <strong>500 ng/mL</strong>
              <br /><span className="text-xs text-amber-600">（例：取 1 μL 原液 + 19,999 μL 无血清培养基 → 现配现用，避光）</span>
            </div>
          </Section>
          <Section num="3" title="LPS + 材料处理">
            <ul className="space-y-1.5 text-sm text-slate-700 dark:text-[#f5f5f7]">
              <li><span className="inline mr-1.5 text-slate-300">•</span>每孔加 <strong>50 μL LPS 稀释液</strong>（500 ng/mL）+ <strong>50 μL 待测材料</strong></li>
              <li><span className="inline mr-1.5 text-slate-300">•</span>孵育 <strong>4 h</strong>（37°C / 5% CO₂）</li>
            </ul>
          </Section>
          <Section num="4" title="ROS 检测 (DCFH-DA)">
            <div className="bg-slate-50 dark:bg-[#2c2c2e] rounded-lg px-4 py-3 font-mono text-xs text-slate-600 dark:text-[#aeaeb2]">
              DCFH-DA 工作液 = 10 μL 原液 + 9,990 μL 无血清培养基（稀释 1,000 倍）
            </div>
            <ul className="space-y-1.5 mt-2 text-sm text-slate-700 dark:text-[#f5f5f7]">
              <li><span className="inline mr-1.5 text-slate-300">•</span>每孔加 100 μL → 避光孵育 20–30 min → 无血清培养基洗涤 2–3 次</li>
            </ul>
          </Section>
          <Section num="5" title="Hoechst 核染色 + 共聚焦">
            <ul className="space-y-1.5 text-sm text-slate-700 dark:text-[#f5f5f7]">
              <li><span className="inline mr-1.5 text-slate-300">•</span>每孔加 100 μL Hoechst → 避光 10 min → 共聚焦 FITC/DAPI/明场拍摄</li>
            </ul>
          </Section>
          <Section num="6" title="12h 后验证">
            <div className="flex flex-wrap gap-3">
              <span className="bg-purple-50 text-purple-700 text-xs font-medium px-3 py-1.5 rounded-full border border-purple-200">🧪 CCK-8</span>
              <span className="bg-purple-50 text-purple-700 text-xs font-medium px-3 py-1.5 rounded-full border border-purple-200">🔬 活/死细胞双染</span>
            </div>
          </Section>
        </div>
      </div>

      {/* Experiment 6: LPS Macrophage Transformation (existing) */}
      <div className="bg-white dark:bg-[#2c2c2e] rounded-xl border border-slate-200 dark:border-[#48484a] shadow-sm overflow-hidden">
        <div className="px-5 py-3.5 border-b border-slate-100 dark:border-[#3a3a3c] flex items-center gap-3">
          <span className="text-xl">🔬</span>
          <div>
            <h3 className="font-semibold text-slate-800 dark:text-white text-sm">LPS 诱导巨噬细胞转化 · 外送染色</h3>
            <p className="text-xs text-slate-400 dark:text-[#98989d]">24 孔板 · 细胞爬片 · 免疫荧光</p>
          </div>
          <span className="ml-auto bg-purple-100 text-purple-700 text-xs font-medium px-2.5 py-0.5 rounded-full">24 孔板</span>
        </div>
        <div className="px-5 py-4 space-y-5">
          <Section num="1" title="种板 + 贴壁">
            <div className="bg-amber-50 border border-amber-200 rounded-lg px-4 py-3 text-sm text-amber-800 mb-2">
              ⚠️ 24 孔板内<strong>预先放置适配的细胞爬片</strong>（无菌操作），再接种细胞。
            </div>
            <p className="text-sm text-slate-700 dark:text-[#f5f5f7]">接种后贴壁 <strong>24 h</strong></p>
          </Section>
          <Section num="2" title="LPS + 材料处理">
            <ul className="space-y-1.5 text-sm text-slate-700 dark:text-[#f5f5f7]">
              <li><span className="inline mr-1.5 text-slate-300">•</span>使用<strong>无血清</strong>培养基配制 LPS + 材料</li>
              <li><span className="inline mr-1.5 text-slate-300">•</span>处理 <strong>24 h</strong></li>
            </ul>
          </Section>
          <Section num="3" title="固定（关键步骤）">
            <div className="bg-red-50 border border-red-200 rounded-lg px-4 py-3 flex gap-3 text-sm">
              <span className="text-xl flex-shrink-0">⚠️</span>
              <div className="text-red-800">
                <strong>预冷多聚甲醛固定 10–15 min</strong><br />
                <span className="text-red-600">严禁超时——过固定导致抗原遮蔽，染色失败。</span>
              </div>
            </div>
          </Section>
          <Section num="4" title="洗涤 + 外送">
            <ul className="space-y-1.5 text-sm text-slate-700 dark:text-[#f5f5f7]">
              <li><span className="inline mr-1.5 text-slate-300">•</span>PBS 轻柔洗涤 <strong>3 次</strong>，孔内覆盖<strong>薄层 PBS</strong>，防止爬片干燥</li>
              <li><span className="inline mr-1.5 text-slate-300">•</span>封口膜密封孔板，标记后送样</li>
            </ul>
            <div className="mt-2 bg-blue-50 border border-blue-200 rounded-lg px-4 py-3 text-sm text-blue-800">
              📍 <strong>送样地址：</strong>天府科技园 B2 栋
            </div>
          </Section>
          <Section num="5" title="封片（收样后）">
            <ul className="space-y-1.5 text-sm text-slate-700 dark:text-[#f5f5f7]">
              <li><span className="inline mr-1.5 text-slate-300">•</span>弯头镊子<strong>挑起爬片</strong>，细胞面朝上置于载玻片 → <strong>吹干</strong>水分</li>
              <li><span className="inline mr-1.5 text-slate-300">•</span>滴加<strong>硅油</strong>，盖上盖玻片封片 → 4°C 避光保存，尽快上机拍摄</li>
            </ul>
          </Section>
        </div>
      </div>

    </div>
  )
}

/* ======== Reusable Components ======== */

function Section({ num, title, children }) {
  return (
    <div>
      <div className="flex items-center gap-2 mb-2">
        <span className="w-5 h-5 rounded-full bg-slate-700 text-white text-xs font-bold flex items-center justify-center flex-shrink-0">
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
