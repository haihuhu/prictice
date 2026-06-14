import React from 'react';
import { CheckCircle2, AlertTriangle, Lightbulb, Zap, BrainCircuit } from 'lucide-react';

export default function ShadcnGuide() {
  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8 font-sans text-slate-800">
      {/* Header Section */}
      <div className="space-y-4">
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <Zap className="text-yellow-500 w-8 h-8" />
          Shadcn UI 组件使用策略笔记
        </h1>

        {/* 判断口诀 / Rule of Thumb */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-start gap-3">
          <Lightbulb className="text-blue-500 w-6 h-6 flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="font-semibold text-blue-900 text-lg">核心判断口诀</h3>
            <p className="text-blue-800 mt-1">
              <strong>“样式/交互的壳”</strong> → 直接用 <br />
              <strong>“背后有逻辑要你掌握的”</strong> → 先手写原理，再套 shadcn 壳
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Category 1: Ready to Use */}
        <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
          <div className="bg-green-50 border-b border-slate-200 p-4 flex items-center gap-2">
            <CheckCircle2 className="text-green-600 w-5 h-5" />
            <h2 className="text-lg font-bold text-green-900">第一类：直接用（纯样式与交互）</h2>
          </div>
          <div className="p-4 space-y-4 text-sm">
            <p className="text-slate-500 italic mb-2">
              本质是"样式 + 交互封装"，背后没有必须掌握的核心逻辑。
            </p>

            <CategoryBlock
              title="布局 / 导航类"
              items={[
                'Sheet (侧边面板)',
                'Dialog (弹窗)',
                'Dropdown Menu',
                'Tabs',
                'Accordion',
                'Breadcrumb (面包屑)',
                'Sidebar',
              ]}
            />
            <CategoryBlock
              title="展示类"
              items={['Card', 'Table (纯展示)', 'Badge', 'Avatar', 'Separator', 'Tooltip']}
            />
            <CategoryBlock
              title="反馈类"
              items={['Toast / Sonner (消息提示)', 'Alert', 'Alert Dialog (确认框)', 'Progress']}
            />
            <CategoryBlock
              title="基础控件 (单个无复杂逻辑)"
              items={['Button', 'Input', 'Label', 'Switch', 'Checkbox', 'Skeleton']}
            />
          </div>
        </div>

        {/* Category 2: Learn Principles First */}
        <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
          <div className="bg-amber-50 border-b border-slate-200 p-4 flex items-center gap-2">
            <BrainCircuit className="text-amber-600 w-5 h-5" />
            <h2 className="text-lg font-bold text-amber-900">第二类：先学原理再包壳</h2>
          </div>
          <div className="p-4 space-y-6 text-sm">
            <p className="text-slate-500 italic mb-2">
              直接用 = 只会填空，出Bug查不出。必须先掌握底层核心逻辑。
            </p>

            <div className="space-y-2 border-l-4 border-amber-400 pl-3">
              <h3 className="font-bold text-slate-800 flex items-center gap-1">
                <AlertTriangle className="w-4 h-4 text-amber-500" /> Form (表单)
              </h3>
              <p className="text-slate-600 text-xs font-mono bg-slate-100 p-1 inline-block rounded">
                核心: react-hook-form + zod
              </p>
              <ul className="list-disc list-inside text-slate-600 space-y-1 mt-1">
                <li>
                  <span className="font-semibold text-slate-700">第4周:</span> 手写 useState 控表单
                  + 手写校验
                </li>
                <li>
                  <span className="font-semibold text-slate-700">第5-6周:</span> 手写 RHF + zod +
                  Server Action
                </li>
                <li>
                  <span className="font-semibold text-slate-700">之后:</span> 才用 shadcn Form
                  组件包起来
                </li>
              </ul>
            </div>

            <div className="space-y-2 border-l-4 border-amber-400 pl-3">
              <h3 className="font-bold text-slate-800 flex items-center gap-1">
                <AlertTriangle className="w-4 h-4 text-amber-500" /> Select / Combobox / Radio Group
              </h3>
              <ul className="list-disc list-inside text-slate-600 space-y-1 mt-1">
                <li>
                  在表单里用时，要懂它怎么跟{' '}
                  <code className="text-xs bg-slate-100 p-0.5 rounded">react-hook-form</code> 联动
                </li>
                <li>
                  先理解 <strong>"受控组件"</strong> 原理，再用 shadcn 版本
                </li>
              </ul>
            </div>

            <div className="space-y-2 border-l-4 border-amber-400 pl-3">
              <h3 className="font-bold text-slate-800 flex items-center gap-1">
                <AlertTriangle className="w-4 h-4 text-amber-500" /> DataTable (复杂表格)
              </h3>
              <p className="text-slate-600 text-xs font-mono bg-slate-100 p-1 inline-block rounded">
                核心: TanStack Table
              </p>
              <ul className="list-disc list-inside text-slate-600 space-y-1 mt-1">
                <li>纯展示的 Table 直接用</li>
                <li>
                  要<strong>排序/筛选/分页</strong> → 先懂 TanStack Table 概念，再用 shadcn 例子
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Motivation */}
      <div className="text-center py-6 border-t border-slate-200">
        <p className="text-slate-500 italic">
          "这张表存脑子里就行，别又存到'收集资料'的文件夹吃灰。😏 <br />
          <strong className="text-slate-700">你真正要动手的就两件事：现在的 Sheet 用起来！</strong>"
        </p>
      </div>
    </div>
  );
}

// 辅助组件：用于渲染分类区块
function CategoryBlock({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="mb-3">
      <h4 className="font-semibold text-slate-700 mb-1.5">{title}</h4>
      <div className="flex flex-wrap gap-2">
        {items.map((item, idx) => (
          <span
            key={idx}
            className="px-2.5 py-1 bg-slate-100 text-slate-600 rounded-md text-xs border border-slate-200"
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
