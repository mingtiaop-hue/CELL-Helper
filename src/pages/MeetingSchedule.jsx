import { useState, useMemo } from 'react'

const DATA_QUEUE = ['彭越程','居益','郑泽泰','陈治羽','许媛媛','罗蔚']
const LIT_QUEUE  = ['彭越程','许媛媛','郑泽泰','罗蔚','居益','陈治羽']
const START_THU = new Date('2026-07-02') // 基准周四（本周）
START_THU.setHours(0,0,0,0)
const MS_WEEK = 7 * 24 * 60 * 60 * 1000

function getCurrentWeek() {
  const now = new Date()
  const dow = now.getDay()
  const thu = new Date(now)
  thu.setDate(now.getDate() + ((4 - dow + 7) % 7))
  thu.setHours(0,0,0,0)
  return Math.round((thu - START_THU) / MS_WEEK)
}

function getPair(queue, week, offset) {
  const n = queue.length
  const s = ((week * 2 + offset) % n + n) % n
  return [queue[s], queue[(s + 1) % n]]
}

function fmtDate(d) { return `${d.getMonth()+1}月${d.getDate()}日` }

function getThursday(week) {
  const d = new Date(START_THU)
  d.setDate(d.getDate() + week * 7)
  return d
}

export default function MeetingSchedule() {
  const [offset, setOffset] = useState(0)
  const currentWeek = getCurrentWeek()
  const week = currentWeek + offset

  const dp = useMemo(() => getPair(DATA_QUEUE, week, 4), [week])
  const lp = useMemo(() => getPair(LIT_QUEUE, week, 0), [week])

  const rows = useMemo(() => {
    const r = []
    for (let w = currentWeek - 1; w <= currentWeek + 8; w++) {
      r.push({
        week: w,
        thu: getThursday(w),
        data: getPair(DATA_QUEUE, w, 4),
        lit: getPair(LIT_QUEUE, w, 0),
        isNow: w === currentWeek,
      })
    }
    return r
  }, [currentWeek])

  return (
    <div className="max-w-xl mx-auto">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-[28px] font-extrabold tracking-tight text-[#1d1d1f] dark:text-white">
          📋 组会排班
        </h1>
        <p className="mt-1.5 text-sm text-[#86868b] dark:text-[#98989d]">
          每周四 · 6人 · 数据汇报×2 + 文献汇报×2
        </p>
      </div>

      {/* Week card */}
      <div className="rounded-2xl bg-white dark:bg-[#2c2c2e] shadow-sm border border-black/[0.04] dark:border-white/[0.06] p-6 mb-5 text-center">
        {/* Nav */}
        <div className="flex items-center justify-between mb-5">
          <button onClick={() => setOffset(o => o - 1)}
            className="w-10 h-10 rounded-full border-2 border-black/[0.06] dark:border-white/[0.08] flex items-center justify-center text-lg text-[#86868b] hover:text-[#0071e3] hover:border-[#0071e3] dark:hover:text-[#5ac8fa] dark:hover:border-[#5ac8fa] transition-all cursor-pointer bg-transparent">
            ◀
          </button>
          <div>
            <div className="text-base font-bold text-[#1d1d1f] dark:text-white">
              第 {week + 1} 周
            </div>
            <div className="text-[13px] text-[#86868b] dark:text-[#98989d] mt-0.5">
              {fmtDate(getThursday(week))} 周四
            </div>
          </div>
          <button onClick={() => setOffset(o => o + 1)}
            className="w-10 h-10 rounded-full border-2 border-black/[0.06] dark:border-white/[0.08] flex items-center justify-center text-lg text-[#86868b] hover:text-[#0071e3] hover:border-[#0071e3] dark:hover:text-[#5ac8fa] dark:hover:border-[#5ac8fa] transition-all cursor-pointer bg-transparent">
            ▶
          </button>
        </div>

        {/* Two cards */}
        <div className="flex gap-3">
          <div className="flex-1 rounded-xl bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950/30 dark:to-blue-900/20 p-5">
            <div className="text-2xl mb-1.5">📊</div>
            <div className="text-[11px] font-semibold tracking-wider uppercase text-[#86868b] dark:text-[#98989d] mb-2">
              数据汇报
            </div>
            <div className="text-lg font-extrabold text-[#2b6cb0] dark:text-[#5ac8fa] leading-relaxed">
              {dp[0]}<br />{dp[1]}
            </div>
          </div>
          <div className="flex-1 rounded-xl bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950/30 dark:to-purple-900/20 p-5">
            <div className="text-2xl mb-1.5">📚</div>
            <div className="text-[11px] font-semibold tracking-wider uppercase text-[#86868b] dark:text-[#98989d] mb-2">
              文献汇报
            </div>
            <div className="text-lg font-extrabold text-[#6b46c1] dark:text-[#c4b5fd] leading-relaxed">
              {lp[0]}<br />{lp[1]}
            </div>
          </div>
        </div>

        {/* Today button */}
        {offset !== 0 && (
          <button onClick={() => setOffset(0)}
            className="mt-4 px-5 py-2 rounded-full bg-black/[0.03] dark:bg-white/[0.06] text-[13px] font-semibold text-[#86868b] hover:text-[#1d1d1f] dark:hover:text-white hover:bg-black/[0.06] dark:hover:bg-white/[0.1] transition-all cursor-pointer">
            📍 回到本周
          </button>
        )}
      </div>

      {/* Table */}
      <div className="rounded-2xl bg-white dark:bg-[#2c2c2e] shadow-sm border border-black/[0.04] dark:border-white/[0.06] p-5">
        <h2 className="text-base font-bold text-[#1d1d1f] dark:text-white mb-3">
          📅 完整排班表
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr>
                <th className="text-left py-2.5 px-2 border-b-2 border-black/[0.04] dark:border-white/[0.06] text-[11px] font-bold tracking-wide text-[#86868b] dark:text-[#98989d]">日期</th>
                <th className="text-left py-2.5 px-2 border-b-2 border-black/[0.04] dark:border-white/[0.06] text-[11px] font-bold tracking-wide text-[#86868b] dark:text-[#98989d]">数据汇报</th>
                <th className="text-left py-2.5 px-2 border-b-2 border-black/[0.04] dark:border-white/[0.06] text-[11px] font-bold tracking-wide text-[#86868b] dark:text-[#98989d]">文献汇报</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r, i) => (
                <tr key={i} className={r.isNow
                  ? 'bg-[#0071e3]/5 dark:bg-[#0071e3]/10'
                  : 'border-b border-black/[0.02] dark:border-white/[0.03]'}>
                  <td className={`py-2.5 px-2 whitespace-nowrap ${r.isNow ? 'font-bold text-[#0071e3] dark:text-[#5ac8fa]' : 'text-[#86868b] dark:text-[#98989d]'}`}>
                    {fmtDate(r.thu)}{r.isNow ? ' 👈' : ''}
                  </td>
                  <td className="py-2.5 px-2 font-semibold text-[#2b6cb0] dark:text-[#5ac8fa]">
                    {r.data[0]}<br />{r.data[1]}
                  </td>
                  <td className="py-2.5 px-2 font-semibold text-[#6b46c1] dark:text-[#c4b5fd]">
                    {r.lit[0]}<br />{r.lit[1]}
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
