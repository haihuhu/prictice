import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { weeklyData, getTagStyle } from '@/lib/data'; // 引入数据

// Next.js App Router 动态路由组件
export default async function WeekDetailPage({
  params,
}: {
  params: Promise<{ [key: string]: string }>;
}) {
  // 从路由提取 week 编号
  const { weekId } = await params;
  // 查找对应周的数据
  const week = weeklyData.find((w) => w.id === parseInt(weekId));

  // 如果瞎输地址找不到数据，触发 404
  if (!week) {
    notFound();
  }

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8 min-h-screen">
      {/* 返回按钮 */}
      <Link
        href="/study"
        className="inline-flex items-center gap-2 text-indigo-600 hover:text-indigo-800 font-medium mb-8 bg-indigo-50 hover:bg-indigo-100 px-4 py-2 rounded-lg transition-colors"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="m15 18-6-6 6-6" />
        </svg>
        返回学习总览
      </Link>

      {/* 这里复用你原来写的那个详情卡片 UI */}
      <div className="bg-white rounded-3xl p-6 md:p-8 shadow-lg border border-slate-200 flex flex-col relative overflow-hidden">
        {/* 卡片顶部装饰线 */}
        <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-indigo-500 to-blue-400"></div>

        {/* Card Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 border-b border-dashed border-slate-200 pb-5 gap-3 md:gap-0 mt-2">
          <h1 className="text-2xl md:text-3xl font-bold text-indigo-600">{week.title}</h1>
          <span
            className={`px-4 py-1.5 rounded-full text-sm font-semibold whitespace-nowrap ${getTagStyle(week.phase)}`}
          >
            {week.tagText}
          </span>
        </div>

        {/* Goal Section */}
        <p className="text-base md:text-lg text-slate-700 bg-slate-50 p-5 rounded-xl border-l-4 border-indigo-400 mb-8 font-medium">
          {week.goal}
        </p>

        {/* Days List */}
        <ul className="flex flex-col gap-5 flex-1">
          {week.days.map((day, dayIdx) => (
            <li key={dayIdx} className="flex flex-col md:flex-row gap-3 md:gap-5 items-start">
              {/* Day Badge */}
              <span
                className={`px-3 py-1.5 rounded-md text-sm font-semibold whitespace-nowrap mt-1 ${
                  day.isMock ? 'bg-red-500 text-white shadow-sm' : 'bg-slate-800 text-white'
                }`}
              >
                {day.day}
              </span>

              {/* Content & Acceptance */}
              <div className="flex-1 bg-slate-50/80 p-4 md:p-5 rounded-xl border border-slate-100 text-sm md:text-base leading-relaxed text-slate-700 w-full hover:bg-slate-50 transition-colors">
                <div className="whitespace-pre-wrap">{day.content}</div>
                {day.acceptance && (
                  <div className="mt-4 text-sm text-emerald-700 bg-emerald-50 border border-emerald-100 px-4 py-3 rounded-lg font-medium flex items-center gap-2">
                    <span className="text-emerald-500 text-lg">✓</span>
                    <span>验收标准：{day.acceptance}</span>
                  </div>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
