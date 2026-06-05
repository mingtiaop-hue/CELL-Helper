import PageTOC from '../../components/PageTOC'

const BACTERIA_TOC = [
  { id: 'bac-media',    label: '培养基配置与灭菌' },
  { id: 'bac-od',       label: '细菌复苏与 OD 值测定' },
  { id: 'bac-mic',      label: 'MIC 最低抑菌浓度测定' },
  { id: 'bac-adhesion', label: '细菌粘附实验' },
  { id: 'bac-biofilm',  label: '生物膜培养 · 结晶紫染色 · CLSM' },
  { id: 'bac-livedead', label: '细菌活死染色（荧光显微镜）' },
]

export default function SopBacteria() {
  return (
    <div className="space-y-5">
      <PageTOC items={BACTERIA_TOC} />
      {/* 1. 培养基配置 */}
      <Card id="bac-media" title="🧫 培养基配置与灭菌" accent="blue">
        <div className="space-y-3 text-sm text-slate-700 dark:text-[#f5f5f7]">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="bg-blue-50 border border-blue-200 rounded-lg px-4 py-3">
              <div className="font-semibold text-blue-800 mb-1">液体培养基</div>
              <div className="text-blue-700">3% w/v 牛肉膏蛋白胨（胰大豆蛋白）</div>
              <div className="text-xs text-blue-500 mt-1">RO 水配制</div>
            </div>
            <div className="bg-blue-50 border border-blue-200 rounded-lg px-4 py-3">
              <div className="font-semibold text-blue-800 mb-1">固体培养基</div>
              <div className="text-blue-700">3% w/v 牛肉膏蛋白胨 + 1.5% w/v 琼脂</div>
              <div className="text-xs text-blue-500 mt-1">RO 水配制</div>
            </div>
          </div>
          <div className="bg-amber-50 border border-amber-200 rounded-lg px-4 py-3 text-sm text-amber-800">
            <strong>灭菌：</strong>灭菌锅 120°C / 20 min。瓶盖不要拧太紧，上面覆盖锡纸防止水蒸气进入。
          </div>
          <ul className="space-y-1.5">
            <li><span className="inline mr-1.5 text-slate-300 dark:text-[#48484a]">•</span>液体培养基冷却至 RT 后直接放入冰箱保存</li>
            <li><span className="inline mr-1.5 text-slate-300 dark:text-[#48484a]">•</span>固体培养基在生物工作台倒满培养皿后冷却保存</li>
          </ul>
          <Tip>全程注意防菌，倒板时避免气泡。</Tip>
        </div>
      </Card>

      {/* 2. 细菌复苏与OD值测定 */}
      <Card id="bac-od" title="🦠 细菌复苏与 OD 值测定" accent="green">
        <div className="space-y-4 text-sm text-slate-700 dark:text-[#f5f5f7]">
          {/* 复苏 */}
          <div>
            <h4 className="font-semibold text-slate-800 dark:text-white mb-2">细菌复苏</h4>
            <p>冰箱中保存的菌液取 <strong>10 μL</strong> 加入约 <strong>10 mL</strong> 液体培养基中，摇床复苏培养 <strong>12 h 以上</strong>（一般为 16 h）。</p>
          </div>

          {/* OD值测定 */}
          <div>
            <h4 className="font-semibold text-slate-800 dark:text-white mb-2">OD 值测定步骤</h4>
            <ol className="space-y-1.5">
              <li><span className="inline mr-1.5 text-green-600 font-bold">①</span> 取 1 mL 菌液，2700 rpm 离心 5 min，取沉淀用 PBS 稀释到 10 mL</li>
              <li><span className="inline mr-1.5 text-green-600 font-bold">②</span> 酶标仪开机预热 <strong>15 min</strong>，至机器提示预热完成</li>
              <li><span className="inline mr-1.5 text-green-600 font-bold">③</span> 比色皿冲洗干净，加入 2 mL PBS 放入酶标仪，空白 100% 清零</li>
              <li><span className="inline mr-1.5 text-green-600 font-bold">④</span> 测试 OD 值，观察与 0.1 的差别后稀释（如 0.321 则稀释 3.21 倍：每 1 mL 菌液 + 2.21 mL PBS）</li>
              <li><span className="inline mr-1.5 text-green-600 font-bold">⑤</span> 稀释后测试至 <strong>OD = 0.1 ± 0.05</strong> 即可使用</li>
            </ol>
          </div>

          {/* 浓度参考 */}
          <div className="bg-green-50 border border-green-200 rounded-lg px-4 py-3">
            <div className="font-semibold text-green-800 text-sm mb-2">菌群浓度参考（OD = 0.1）</div>
            <div className="grid grid-cols-3 gap-2 text-xs">
              <div className="text-center bg-white rounded-lg px-2 py-1.5">
                <div className="font-bold text-green-700">金黄色葡萄球菌</div>
                <div className="text-green-600">2×10⁷ CFU/mL</div>
              </div>
              <div className="text-center bg-white rounded-lg px-2 py-1.5">
                <div className="font-bold text-green-700">大肠杆菌</div>
                <div className="text-green-600">1×10⁸ CFU/mL</div>
              </div>
              <div className="text-center bg-white rounded-lg px-2 py-1.5">
                <div className="font-bold text-green-700">绿脓杆菌</div>
                <div className="text-green-600">1×10⁸ CFU/mL</div>
              </div>
            </div>
          </div>
          <Tip>使用时按照实验需要用培养基进一步稀释。</Tip>
        </div>
      </Card>

      {/* 3. MIC 最低抑菌浓度 */}
      <Card id="bac-mic" title="🔬 MIC 最低抑菌浓度测定" accent="purple">
        <div className="space-y-4 text-sm text-slate-700 dark:text-[#f5f5f7]">
          <div>
            <h4 className="font-semibold text-slate-800 dark:text-white mb-2">实验准备</h4>
            <ul className="space-y-1">
              <li><span className="inline mr-1.5 text-slate-300 dark:text-[#48484a]">•</span><strong>受试物：</strong>如材料内部抗菌物质，用液体培养基配制所需高浓度</li>
              <li><span className="inline mr-1.5 text-slate-300 dark:text-[#48484a]">•</span><strong>菌种：</strong>按上述步骤活化所需菌</li>
              <li><span className="inline mr-1.5 text-slate-300 dark:text-[#48484a]">•</span><strong>96 孔板：</strong>调节 OD 值为 0.1，并用液体培养基稀释 100×，目标使 96 孔板种菌数 <strong>5×10⁵ CFU/mL</strong></li>
            </ul>
          </div>

          {/* 二倍稀释法 */}
          <div>
            <h4 className="font-semibold text-slate-800 dark:text-white mb-2">二倍稀释法操作</h4>
            <div className="bg-slate-50 dark:bg-[#2c2c2e] rounded-lg px-4 py-3 space-y-2">
              <p><strong>对照组：</strong>原液 + 培养基（100 μL + 100 μL）</p>
              <p><strong>实验组：</strong></p>
              <ol className="space-y-1 ml-4">
                <li>第 2–11 列每孔加入 <strong>100 μL</strong> 培养基</li>
                <li>第 1 列加入 <strong>200 μL</strong> 材料原液</li>
                <li>从第 1 列取 100 μL → 第 2 列混匀 → 取 100 μL → 第 3 列…依次至第 10/11 列</li>
                <li>最后一列取 100 μL <strong>弃去</strong>，保证每孔皆为 100 μL</li>
                <li>每孔加入 <strong>100 μL</strong> 菌液</li>
              </ol>
            </div>
          </div>

          {/* 关键提示 */}
          <div className="space-y-2">
            <div className="bg-amber-50 border border-amber-200 rounded-lg px-4 py-3 text-sm text-amber-800">
              ⚠️ <strong>每孔稀释后必须换枪头</strong>，避免枪头残余细菌带入下一孔。
            </div>
            <div className="bg-amber-50 border border-amber-200 rounded-lg px-4 py-3 text-sm text-amber-800">
              💡 实验组和对照组的孔尽量放在<strong>中间</strong>，边缘孔不用。完成加样后<strong>周围一圈孔滴适量 PBS</strong>，防止蒸发。
            </div>
          </div>

          {/* 结果观察 */}
          <div>
            <h4 className="font-semibold text-slate-800 dark:text-white mb-2">培养与结果观察</h4>
            <p>37°C 培养箱培养 <strong>16–20 h</strong>。从最低浓度孔开始观察：<strong>MIC 值 = 第一个肉眼观察不到细菌生长的孔（澄清）</strong> 对应的材料浓度。</p>
          </div>

          {/* 滴板法 */}
          <div className="bg-purple-50 border border-purple-200 rounded-lg px-4 py-3">
            <div className="font-semibold text-purple-800 text-sm mb-2">特殊情况：滴板法（材料颜色干扰时）</div>
            <ul className="space-y-1 text-purple-700 text-sm">
              <li>• 准备平板，标记好 9 个点</li>
              <li>• 从材料高浓度开始取样，PBS 稀释菌液（SA: 10³/10⁴/10⁵；PA/EC: 10⁵/10⁶/10⁷，根据浑浊度判断）</li>
              <li>• 取 8 个浓度 + 对照组，分别滴到 9 个点上（稀释倍数相同滴同一板），每个点 <strong>10 μL</strong></li>
              <li>• 培养 18–24 h，次日数菌落数并拍照</li>
            </ul>
          </div>
        </div>
      </Card>

      {/* 4. 细菌粘附实验 */}
      <Card id="bac-adhesion" title="🧽 细菌粘附实验" accent="orange">
        <div className="space-y-3 text-sm text-slate-700 dark:text-[#f5f5f7]">
          <div className="flex items-center gap-2 text-xs text-slate-400 dark:text-[#98989d] mb-2">
            <span className="bg-orange-100 text-orange-700 px-2 py-0.5 rounded-full font-medium">三天实验</span>
          </div>

          <Section num="1" title="第一天：准备">
            <ul className="space-y-1">
              <li><span className="inline mr-1.5 text-slate-300">•</span>提前一天倒板，复苏所需细菌（10 μL 菌液 + 约 10 mL 液体培养基，摇床过夜）</li>
            </ul>
          </Section>

          <Section num="2" title="第二天上午：接菌">
            <ul className="space-y-1">
              <li><span className="inline mr-1.5 text-slate-300">•</span>材料用 75% 酒精泡洗，PBS/HEPES 清洗掉酒精</li>
              <li><span className="inline mr-1.5 text-slate-300">•</span>分光仪预热 → 菌液分装 1 mL × 2 管 → 2700 rpm 离心 5 min</li>
              <li><span className="inline mr-1.5 text-slate-300">•</span>吸掉上清，加 10 mL 溶剂 → 比色皿测 OD → 稀释至 <strong>OD = 0.100 ± 0.03</strong></li>
              <li><span className="inline mr-1.5 text-slate-300">•</span>OD 0.1 菌液再稀释 10× → 每个样品孔中加入 <strong>1 mL</strong> 菌液 → 封存后培养 <strong>4 h</strong></li>
            </ul>
          </Section>

          <Section num="3" title="第二天下午：超声涂板">
            <ul className="space-y-1">
              <li><span className="inline mr-1.5 text-slate-300">•</span>取出孔板，吸取溶液，材料放入 EP 管 → 每管加 <strong>1 mL PBS</strong></li>
              <li><span className="inline mr-1.5 text-slate-300">•</span>超声 <strong>10 min</strong> → 吸取适量菌液稀释所需倍数</li>
              <li><span className="inline mr-1.5 text-slate-300">•</span>取 <strong>100 μL 涂板</strong> + 取 <strong>10 μL 滴板</strong> → 培养箱过夜</li>
            </ul>
          </Section>

          <Section num="4" title="第三天：拍照">
            <ul className="space-y-1">
              <li><span className="inline mr-1.5 text-slate-300">•</span>上午取出拍照，计数菌落</li>
            </ul>
          </Section>
        </div>
      </Card>

      {/* 5. 生物膜培养与结晶紫染色 */}
      <Card id="bac-biofilm" title="🎨 生物膜培养 · 结晶紫染色 · CLSM" accent="red">
        <div className="space-y-4 text-sm text-slate-700 dark:text-[#f5f5f7]">

          <Section num="1" title="生物膜培养">
            <ul className="space-y-1">
              <li><span className="inline mr-1.5 text-slate-300">•</span>10 μL 过夜培养菌液 + 990 μL 含 1% 葡萄糖的 TSB 培养基</li>
              <li><span className="inline mr-1.5 text-slate-300">•</span>24 孔板培养 <strong>24–48 h</strong> 形成菌膜</li>
            </ul>
            <div className="mt-2 text-xs text-slate-400">TLC 处理后的孔板更易形成菌膜</div>
          </Section>

          <Section num="2" title="固定">
            <ul className="space-y-1">
              <li><span className="inline mr-1.5 text-slate-300">•</span>胰岛素针<strong>轻柔</strong>吸出菌液，晾干 10–15 min</li>
              <li><span className="inline mr-1.5 text-slate-300">•</span>甲醇室温固定 <strong>15–30 min</strong></li>
              <li><span className="inline mr-1.5 text-slate-300">•</span>胰岛素针轻柔吸出甲醇，生物安全柜/烘箱中彻底风干</li>
            </ul>
          </Section>

          <Section num="3" title="结晶紫染色">
            <ul className="space-y-1">
              <li><span className="inline mr-1.5 text-slate-300">•</span>每孔加 500 μL <strong>0.1% 结晶紫</strong>，室温染色 15–20 min</li>
              <li><span className="inline mr-1.5 text-slate-300">•</span>吸出结晶紫，PBS 清洗</li>
              <li><span className="inline mr-1.5 text-slate-300">•</span>彻底晾干 → 直接拍照或荧光显微镜拍照</li>
              <li><span className="inline mr-1.5 text-slate-300">•</span>每孔加 <strong>95% 乙醇或 33% 冰醋酸</strong>，室温溶解 10–15 min 至完全溶解</li>
              <li><span className="inline mr-1.5 text-slate-300">•</span>新 96 孔板中拍照并测量吸光度 <strong>OD₅₉₅</strong></li>
            </ul>
          </Section>

          <Section num="4" title="CLSM 共聚焦观察">
            <ul className="space-y-1">
              <li><span className="inline mr-1.5 text-slate-300">•</span>吸出菌液后 PBS 清洗 → 超声 10 min 分散生物膜细菌 → 稀释后涂板</li>
              <li><span className="inline mr-1.5 text-slate-300">•</span>共聚焦皿中重复上述培养 → 去掉菌液 → 加入细菌活死染料 → 共聚焦观察</li>
            </ul>
          </Section>
        </div>
      </Card>

      {/* 6. 细菌活死染色 */}
      <Card id="bac-livedead" title="🔬 细菌活死染色（荧光显微镜）" accent="cyan">
        <div className="space-y-3 text-sm text-slate-700 dark:text-[#f5f5f7]">
          <div className="bg-amber-50 border border-amber-200 rounded-lg px-4 py-3 text-sm text-amber-800">
            ⚠️ <strong>全程注意避光操作。</strong>
          </div>
          <ol className="space-y-1.5">
            <li><span className="inline mr-1.5 text-cyan-500 font-bold">①</span>吸出菌液后 PBS 清洗，超声 10 min 分散生物膜细菌</li>
            <li><span className="inline mr-1.5 text-cyan-500 font-bold">②</span>稀释后涂板，在共聚焦皿中重复培养</li>
            <li><span className="inline mr-1.5 text-cyan-500 font-bold">③</span>培养后去掉菌液，加入细菌活死染料</li>
            <li><span className="inline mr-1.5 text-cyan-500 font-bold">④</span>共聚焦显微镜观察拍摄</li>
          </ol>
        </div>
      </Card>
    </div>
  )
}

/* ======== Reusable Components ======== */

function Card({ title, accent = 'blue', id, children }) {
  const borders = {
    blue: 'border-l-blue-500', green: 'border-l-green-500',
    amber: 'border-l-amber-500', purple: 'border-l-purple-500',
    orange: 'border-l-orange-500', red: 'border-l-red-500',
    cyan: 'border-l-cyan-500',
  }
  return (
    <div id={id} className={`scroll-mt-20 bg-white dark:bg-[#2c2c2e] rounded-xl border border-slate-200 dark:border-[#48484a] shadow-sm overflow-hidden border-l-4 ${borders[accent] || 'border-l-blue-500'}`}>
      <div className="px-5 py-3.5 border-b border-slate-100 dark:border-[#3a3a3c]">
        <h3 className="font-semibold text-slate-800 dark:text-white text-sm">{title}</h3>
      </div>
      <div className="px-5 py-4">{children}</div>
    </div>
  )
}

function Section({ num, title, children }) {
  return (
    <div>
      <div className="flex items-center gap-2 mb-1.5">
        <span className="w-5 h-5 rounded-full bg-slate-700 text-white text-xs font-bold flex items-center justify-center flex-shrink-0">
          {num}
        </span>
        <h4 className="text-sm font-semibold text-slate-700 dark:text-[#f5f5f7]">{title}</h4>
      </div>
      {children}
    </div>
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
