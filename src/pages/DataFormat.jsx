import { useState, useMemo, useRef } from 'react'

export default function DataFormat() {
  const [rawData, setRawData] = useState('')
  const [blankWells, setBlankWells] = useState('')
  const [controlWells, setControlWells] = useState('')
  const [copied, setCopied] = useState(false)
  const resultRef = useRef(null)

  // Parse raw data into 2D array
  const parsed = useMemo(() => {
    const lines = rawData.trim().split('\n').filter(Boolean)
    return lines.map((line) =>
      line.split(/[\t,;]+/).map((v) => {
        const n = parseFloat(v.trim())
        return isNaN(n) ? null : n
      })
    )
  }, [rawData])

  // Parse well references like "A1,A2,A3" or "A1:A3" or "A1-A3"
  const parseWellRefs = (str) => {
    const wells = []
    const parts = str.split(/[,;\s]+/).filter(Boolean)
    parts.forEach((part) => {
      const rangeMatch = part.match(/^([A-H])(\d+)[:\-]([A-H])?(\d+)?$/i)
      if (rangeMatch) {
        // Range like A1:A3 or A1-A3
        const r1 = rangeMatch[1].toUpperCase()
        const c1 = parseInt(rangeMatch[2])
        const r2 = (rangeMatch[3] || r1).toUpperCase()
        const c2 = rangeMatch[4] ? parseInt(rangeMatch[4]) : c1
        for (let r = r1.charCodeAt(0); r <= r2.charCodeAt(0); r++) {
          const startC = r === r1.charCodeAt(0) ? c1 : 1
          const endC = r === r2.charCodeAt(0) ? c2 : 12
          for (let c = startC; c <= endC; c++) {
            wells.push(`${String.fromCharCode(r)}${c}`)
          }
        }
      } else {
        // Single well like A1
        const m = part.match(/^([A-H])(\d+)$/i)
        if (m) wells.push(m[1].toUpperCase() + m[2])
      }
    })
    return wells
  }

  // Map well IDs (like "A1") to parsed data coordinates
  // Assume data rows = wells in order A1..A12, B1..B12, etc.
  const wellToValue = useMemo(() => {
    if (!parsed.length || !parsed[0].length) return {}
    const flat = parsed.flat()
    const map = {}
    const allWells = []
    for (const r of 'ABCDEFGH') {
      for (let c = 1; c <= 12; c++) {
        allWells.push(`${r}${c}`)
      }
    }
    allWells.forEach((w, i) => {
      map[w] = i < flat.length ? flat[i] : null
    })
    return { map, flat, allWells }
  }, [parsed])

  // Calculate results
  const result = useMemo(() => {
    if (!parsed.length) return null

    const blankList = parseWellRefs(blankWells)
    const controlList = parseWellRefs(controlWells)

    // Get flat values
    const flat = parsed.flat().filter((v) => v !== null)
    if (!flat.length) return null

    // Calculate blank average
    const blankVals = blankList
      .map((w) => wellToValue.map[w])
      .filter((v) => v !== null && v !== undefined)
    const blankAvg = blankVals.length ? blankVals.reduce((a, b) => a + b, 0) / blankVals.length : 0

    // Calculate control average (after blank subtraction)
    const controlVals = controlList
      .map((w) => wellToValue.map[w])
      .filter((v) => v !== null && v !== undefined)
      .map((v) => v - blankAvg)
    const controlAvg = controlVals.length ? controlVals.reduce((a, b) => a + b, 0) / controlVals.length : 1

    // Subtract blank from all values, then normalize to control%
    const normalized = flat.map((v) => {
      const corrected = v - blankAvg
      return controlAvg !== 0 ? (corrected / controlAvg) * 100 : 0
    })

    return {
      blankAvg,
      controlAvg: controlAvg + blankAvg, // raw control avg
      normalized,
      flat: flat.map((v) => v - blankAvg),
    }
  }, [parsed, blankWells, controlWells, wellToValue])

  // Generate grouped output for GraphPad Prism
  const groupedOutput = useMemo(() => {
    if (!result || !parsed.length) return ''

    // Try to detect groups from data layout
    // Assume columns = groups, rows = replicates (per group)
    // Or user pasted a standard layout

    // Simple approach: treat each column of the first row as a group label
    const numCols = Math.max(...parsed.map((r) => r.length))
    const groups = []
    for (let c = 0; c < numCols; c++) {
      const group = []
      for (let r = 0; r < parsed.length; r++) {
        if (parsed[r][c] !== null && parsed[r][c] !== undefined) {
          group.push(parsed[r][c])
        }
      }
      if (group.length > 0) groups.push(group)
    }

    if (groups.length < 2) {
      // Flattened format - return as single group
      const vals = result.normalized
      return vals.map((v) => v.toFixed(2)).join('\t')
    }

    // Output as tab-separated grouped format
    const maxRows = Math.max(...groups.map((g) => g.length))
    const header = groups.map((_, i) => `Group ${i + 1}`).join('\t')
    const rows = []
    for (let r = 0; r < maxRows; r++) {
      rows.push(groups.map((g) => (r < g.length ? g[r].toFixed(2) : '')).join('\t'))
    }
    return header + '\n' + rows.join('\n')
  }, [result, parsed])

  // Enhanced grouped output with blank subtraction + normalization
  const prismOutput = useMemo(() => {
    if (!result || !parsed.length) return ''

    const numCols = Math.max(...parsed.map((r) => r.length))
    const groups = []
    for (let c = 0; c < numCols; c++) {
      const group = []
      for (let r = 0; r < parsed.length; r++) {
        if (parsed[r][c] !== null && parsed[r][c] !== undefined) {
          group.push(parsed[r][c])
        }
      }
      if (group.length > 0) groups.push(group)
    }

    // Normalize each group
    const normGroups = groups.map((g) => {
      const blankAvg = result.blankAvg
      const controlRaw = result.controlAvg
      return g.map((v) => {
        const corrected = v - blankAvg
        return controlRaw - blankAvg !== 0 ? (corrected / (controlRaw - blankAvg)) * 100 : 0
      })
    })

    const maxRows = Math.max(...normGroups.map((g) => g.length))
    const header = normGroups.map((_, i) => `Group ${i + 1}`).join('\t')
    const rows = []
    for (let r = 0; r < maxRows; r++) {
      rows.push(
        normGroups.map((g) => (r < g.length ? g[r].toFixed(2) : '')).join('\t')
      )
    }

    return `Cell Viability (% of Control)\n\n${header}\n${rows.join('\n')}`
  }, [result, parsed])

  const copyToClipboard = () => {
    navigator.clipboard.writeText(prismOutput).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  // Quick example
  const loadExample = () => {
    setRawData(
      '0.045\t0.052\t0.048\t1.234\t1.198\t1.215\t0.987\t1.001\t0.978\t0.756\t0.789\t0.771\n' +
      '0.051\t0.047\t0.053\t1.189\t1.245\t1.227\t0.965\t0.992\t0.981\t0.742\t0.798\t0.782\n' +
      '0.049\t0.055\t0.046\t1.201\t1.256\t1.198\t0.956\t0.988\t0.972\t0.768\t0.775\t0.793'
    )
    setBlankWells('A1:A3')
    setControlWells('A4:A6, B4:B6, C4:C6')
  }

  return (
    <div className="max-w-4xl mx-auto animate-fade-in-up">
      <div className="mb-8">
        <h2 className="text-[32px] font-bold text-[#1d1d1f] dark:text-white tracking-tight">数据预处理</h2>
        <p className="mt-1.5 text-[16px] text-[#86868b] dark:text-[#98989d] font-medium">
          酶标仪 OD → 扣除空白 → 归一化 → 分组 → GraphPad Prism 就绪
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input */}
        <div className="space-y-4">
          <div className="apple-card p-5">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-[16px] text-[#1d1d1f] dark:text-white">📋 原始数据</h3>
              <button onClick={loadExample}
                className="text-[13px] text-[#0071e3] hover:underline cursor-pointer font-medium">
                加载示例
              </button>
            </div>
            <textarea value={rawData} onChange={(e) => setRawData(e.target.value)}
              placeholder="从酶标仪复制 OD 值粘贴到这里&#10;支持 Tab / 逗号 / 分号分隔&#10;每行 = 一排孔，每列 = 一个孔"
              className="w-full h-36 rounded-xl border border-black/10 dark:border-white/10 bg-[#f5f5f7] dark:bg-[#2c2c2e] p-3.5 text-[13px] font-mono resize-y focus:outline-none focus:ring-2 focus:ring-[#0071e3]/20 focus:border-[#0071e3] transition-all"
            />
            {parsed.length > 0 && (
              <p className="mt-2 text-[13px] text-[#86868b] dark:text-[#98989d]">
                识别到 {parsed.length} 行 × {Math.max(...parsed.map((r) => r.length))} 列数据
              </p>
            )}
          </div>

          <div className="apple-card p-5 space-y-3">
            <div>
              <label className="block text-[14px] font-medium text-[#1d1d1f] dark:text-white/80 mb-1.5">
                ⬜ Blank（空白孔）
              </label>
              <input value={blankWells} onChange={(e) => setBlankWells(e.target.value)}
                placeholder="例: A1:A3 或 A1,A2,A3"
                className="w-full rounded-xl border border-black/10 dark:border-white/10 bg-[#f5f5f7] dark:bg-[#2c2c2e] px-3.5 py-2.5 text-[13px] focus:outline-none focus:ring-2 focus:ring-[#0071e3]/20 focus:border-[#0071e3] transition-all"
              />
              <p className="text-[12px] text-[#aeaeb2] dark:text-[#636366] mt-1">支持范围格式 A1:A3 或逗号分隔 A1,B1,C1</p>
            </div>
            <div>
              <label className="block text-[14px] font-medium text-[#1d1d1f] dark:text-white/80 mb-1.5">
                🟦 Control（对照组）
              </label>
              <input value={controlWells} onChange={(e) => setControlWells(e.target.value)}
                placeholder="例: A4:A6, B4:B6"
                className="w-full rounded-xl border border-black/10 dark:border-white/10 bg-[#f5f5f7] dark:bg-[#2c2c2e] px-3.5 py-2.5 text-[13px] focus:outline-none focus:ring-2 focus:ring-[#0071e3]/20 focus:border-[#0071e3] transition-all"
              />
            </div>
          </div>
        </div>

        {/* Output */}
        <div className="space-y-4">
          {result ? (
            <>
              <div className="apple-card p-5">
                <h3 className="font-semibold text-[16px] text-[#1d1d1f] dark:text-white mb-3">📊 计算结果</h3>
                <div className="grid grid-cols-3 gap-3 text-center">
                  <div className="bg-[#f5f5f7] dark:bg-[#2c2c2e] rounded-xl px-3 py-2.5">
                    <div className="text-[12px] text-[#aeaeb2] dark:text-[#636366] font-medium">Blank 均值</div>
                    <div className="font-bold text-[#1d1d1f] dark:text-white text-sm">{result.blankAvg.toFixed(4)}</div>
                  </div>
                  <div className="bg-[#f5f5f7] dark:bg-[#2c2c2e] rounded-xl px-3 py-2.5">
                    <div className="text-[12px] text-[#aeaeb2] dark:text-[#636366] font-medium">Control 均值</div>
                    <div className="font-bold text-[#1d1d1f] dark:text-white text-sm">{result.controlAvg.toFixed(4)}</div>
                  </div>
                  <div className="bg-[#34c759]/8 rounded-xl px-3 py-2.5">
                    <div className="text-[12px] text-[#34c759] font-medium">Cell Viability</div>
                    <div className="font-bold text-[#34c759] text-sm">vs Control 100%</div>
                  </div>
                </div>
              </div>

              <div ref={resultRef} className="apple-card p-5">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold text-[16px] text-[#1d1d1f] dark:text-white">📋 GraphPad Prism 格式</h3>
                  <button onClick={copyToClipboard}
                    className={`px-4 py-1.5 rounded-lg text-[13px] font-semibold transition-all cursor-pointer ${
                      copied
                        ? 'bg-[#34c759] text-white'
                        : 'bg-[#0071e3] text-white hover:bg-[#0077ed] active:scale-95'
                    }`}>
                    {copied ? '✅ 已复制' : '📋 一键复制'}
                  </button>
                </div>
                <pre className="bg-[#f5f5f7] dark:bg-[#1c1c1e] rounded-xl p-4 text-[12px] font-mono text-[#1d1d1f] dark:text-[#f5f5f7] overflow-x-auto whitespace-pre max-h-80 overflow-y-auto leading-relaxed">
                  {prismOutput}
                </pre>
                <p className="mt-2 text-[12px] text-[#aeaeb2] dark:text-[#636366]">
                  复制后直接粘贴到 GraphPad Prism → 选择 Grouped → 自动生成图表
                </p>
              </div>
            </>
          ) : (
            <div className="apple-card p-10 text-center">
              <span className="text-4xl block mb-3">📋</span>
              <p className="text-sm text-[#86868b] dark:text-[#98989d] font-medium">粘贴酶标仪数据并指定 Blank/Control 后自动生成</p>
              <p className="text-xs text-[#aeaeb2] dark:text-[#636366] mt-1">点击「加载示例」查看效果</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
