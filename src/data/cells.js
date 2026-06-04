export const cells = [
  {
    name: 'L929',
    fullName: '小鼠成纤维细胞',
    media: 'DMEM + 10% FBS + 1% 双抗',
    confluence: '8×10⁶ – 1×10⁷',
    passage: '80%–90% 融合',
    traits: ['贴壁极速', '增殖快', 'CCK-8 / 活死染'],
    accent: 'from-[#0071e3] to-[#5ac8fa]',
    badgeBg:
      'bg-[#0071e3]/8 dark:bg-[#0071e3]/20 text-[#0071e3] dark:text-[#5ac8fa]',
    warning: null,
  },
  {
    name: 'RAW264.7',
    fullName: '小鼠巨噬细胞',
    media: 'TCM 巨噬细胞专用培养基',
    mediaHighlight: true,
    confluence: '~1×10⁷',
    passage: '70%–80% 融合',
    traits: ['贴壁较松', '刮刀代胰酶', 'LPS → M1 极化'],
    accent: 'from-[#ff9f0a] to-[#ffcc00]',
    badgeBg:
      'bg-[#ff9f0a]/8 dark:bg-[#ff9f0a]/20 text-[#ff9f0a]',
    warning: {
      icon: '🚫',
      label: '严禁使用胰酶',
      detail:
        '胰酶会切割 TLR4/CD14 受体，破坏 LPS 炎症应答功能。仅推荐细胞刮刀、EDTA 或轻柔吹打。',
    },
  },
  {
    name: 'HUVEC',
    fullName: '人脐静脉内皮细胞',
    media: 'ECM + 5% FBS + 1% ECGS + 1% 双抗',
    confluence: '3×10⁶ – 5×10⁶',
    passage: '85%–95% 融合',
    traits: ['娇贵', '划痕/血管生成', '胰酶 ≤1 min'],
    accent: 'from-[#34c759] to-[#30d158]',
    badgeBg:
      'bg-[#34c759]/8 dark:bg-[#34c759]/20 text-[#34c759]',
    warning: {
      icon: '⚠️',
      label: '胰酶严格控制 ≤1 min',
      detail:
        '超时消化导致 eNOS、VE-cadherin 表达下降。推荐 0.05% 低浓度胰酶，镜下实时监控。',
    },
  },
]

export const digestTable = [
  {
    name: 'L929',
    method: '0.25% 胰酶 · 1–2 min',
    forbid: '—',
    forbidRed: false,
  },
  {
    name: 'HUVEC',
    method: '0.05% 胰酶 · ≤1 min',
    forbid: '超时消化',
    forbidRed: true,
  },
  {
    name: 'RAW264.7',
    method: '刮刀 / EDTA / 吹打',
    forbid: '🚫 胰酶绝对禁止',
    forbidRed: true,
  },
]
