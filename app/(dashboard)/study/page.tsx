import React from 'react';
import Link from 'next/link';
import { overviewData, getTagStyle } from '@/lib/data'; // 请根据实际路径调整

const FullStackPlanPage = () => {
  return (
    <div className="flex flex-col gap-12 max-w-6xl mx-auto p-4 md:p-8">
      {/* Header Section */}
      <header className="bg-gradient-to-br from-indigo-600 to-blue-500 rounded-[2rem] p-10 md:p-16 text-center text-white shadow-[0_10px_25px_-5px_rgba(79,70,229,0.3)]">
        <h1 className="text-3xl md:text-5xl font-bold mb-6 tracking-tight">
          🚀 全栈开发进阶计划 (Week 3-20)
        </h1>
        <div className="bg-white/15 backdrop-blur-md border border-white/20 p-6 rounded-2xl inline-block text-left md:text-center shadow-sm">
          <p className="text-base md:text-lg font-medium">
            🔄 <strong className="text-amber-300">每周固定节奏：</strong>
            周一复习默写 ➔ 周二到周四新内容 ➔{' '}
            <span className="text-amber-300">周五 60分钟综合默写</span> ➔ 周末休息
          </p>
          <p className="text-sm md:text-base mt-3 text-indigo-50">
            🇬🇧 <strong className="text-amber-300">每日必做：</strong> 编程结束后 1
            小时英语闭环（写英文注释 ➔ AI 纠错 ➔ 听力）
          </p>
        </div>
      </header>

      {/* Overview Section */}
      <section>
        <h2 className="text-2xl font-bold mb-6 pb-3 border-b-2 border-slate-200 flex items-center gap-2">
          📊 学习总览表 (点击查看详情)
        </h2>

        {/* 💻 电脑端：保持原本的 Table 样式 (md:block 隐藏在手机端) */}
        <div className="hidden md:block overflow-x-auto bg-white rounded-2xl shadow-sm border border-slate-200">
          <table className="w-full text-left border-collapse">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="p-4 px-6 font-semibold text-slate-500 uppercase text-sm tracking-wider">
                  阶段
                </th>
                <th className="p-4 px-6 font-semibold text-slate-500 uppercase text-sm tracking-wider">
                  周次
                </th>
                <th className="p-4 px-6 font-semibold text-slate-500 uppercase text-sm tracking-wider">
                  主题
                </th>
                <th className="p-4 px-6 font-semibold text-slate-500 uppercase text-sm tracking-wider">
                  验收标准（独立写出才算过）
                </th>
                <th className="p-4 px-6 font-semibold text-slate-500 uppercase text-sm tracking-wider">
                  操作
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {overviewData.map((row, idx) => (
                <tr key={idx} className="hover:bg-slate-50 transition-colors group">
                  <td className="p-4 px-6">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${getTagStyle(row.phase)}`}
                    >
                      {row.phase}
                    </span>
                  </td>
                  <td className="p-4 px-6 font-medium text-slate-700">Week {row.week}</td>
                  <td className="p-4 px-6 text-slate-800 font-medium">{row.topic}</td>
                  <td className="p-4 px-6 text-slate-600">{row.criteria}</td>
                  <td className="p-4 px-6">
                    <Link
                      href={`/study/plan/week/${row.week}`}
                      className="text-indigo-600 font-medium  group-hover:opacity-100 transition-opacity hover:underline"
                    >
                      查看详情 &rarr;
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* 📱 手机端：改为可点击跳转的卡片 (md:hidden 隐藏在电脑端) */}
        <div className="flex flex-col  gap-4 md:hidden">
          {overviewData.map((row, idx) => (
            <Link href={`/study/plan/week/${row.week}`} key={idx}>
              <div className="bg-white rounded-xl p-5 shadow-sm border border-slate-200 hover:border-indigo-400 hover:shadow-md transition-all active:scale-[0.98] relative overflow-hidden">
                <div className="flex justify-between items-center mb-3">
                  <span
                    className={`px-2.5 py-1 rounded-md text-xs font-semibold ${getTagStyle(row.phase)}`}
                  >
                    {row.phase}阶段
                  </span>
                  <span className="text-sm font-bold text-slate-400">Week {row.week}</span>
                </div>

                <h3 className="text-lg font-bold text-slate-800 mb-2">{row.topic}</h3>

                <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
                  <p className="text-sm text-slate-600">
                    <span className="font-semibold text-slate-700">🎯 验收：</span>
                    {row.criteria}
                  </p>
                </div>

                {/* 右下角小箭头提示跳转 */}
                <div className="absolute bottom-4 right-4 text-slate-300">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="m9 18 6-6-6-6" />
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
};

export default FullStackPlanPage;
