// components/learning-plan.tsx
'use client';

import { useState } from 'react';

type WeekKey = 'week9' | 'week10' | 'week11' | 'week12';

const weeks: { key: WeekKey; label: string; title: string }[] = [
  { key: 'week9', label: 'Week 9', title: '外键关联 + 关联查询' },
  { key: 'week10', label: 'Week 10', title: 'Clerk 认证快速跑通' },
  { key: 'week11', label: 'Week 11', title: 'Better Auth + 用户隔离' },
  { key: 'week12', label: 'Week 12 (Sprint)', title: '5天极速通关 Task Manager' },
];

type DayPlan = {
  day: number;
  morning?: string;
  afternoon?: string;
  tasks?: string[]; // 改为数组，用于分条展示任务
  check: string;
};

const content: Record<
  WeekKey,
  {
    goal: string;
    skills: { name: string; from: number; to: number }[];
    days: DayPlan[];
    examTitle: string;
    exam: string;
  }
> = {
  week9: {
    goal: '让数据表之间产生关联，理解"一个用户有多个任务"的数据库表达方式，为 Week 11 的用户隔离打基础。',
    skills: [
      { name: '外键关联', from: 2, to: 7 },
      { name: '关联查询', from: 2, to: 7 },
      { name: 'Drizzle 基础', from: 6, to: 7.5 },
    ],
    days: [
      {
        day: 1,
        morning: '复习默写 Week 7 — products 表完整 CRUD',
        afternoon: '外键理论：理解 users → tasks 关系图',
        check: 'Week 7 CRUD 默写 70%+，能说清外键作用',
      },
      {
        day: 2,
        morning: '跟练定义外键：users + tasks 表，references',
        afternoon: '独立建外键：categories + products 关联',
        check: '不看笔记写 .references()，能说清 .notNull()',
      },
      {
        day: 3,
        morning: '跟练 Drizzle relations：one-to-many',
        afternoon: '独立写 relations：products 查询带出 category',
        check: '能说清外键 vs relations 区别',
      },
      {
        day: 4,
        morning: '跟练带外键 INSERT：插入 task 绑定 userId',
        afternoon: '独立写 product 表单 + category 下拉框',
        check: '能写 select 下拉框从数据库读，捕获外键错误',
      },
      {
        day: 5,
        morning: '跟练 one-to-many 双向查询：users with tasks',
        afternoon: '独立写嵌套列表：categories → products',
        check: '能写双向查询，说清两种 with 的区别',
      },
      {
        day: 6,
        morning: '跟练 UPDATE/DELETE + 外键约束：三种删除策略',
        afternoon: '独立实现安全删除：先查关联数据再判断',
        check: '能说清"先查 → 判断 → 再删"逻辑，写计数查询',
      },
      {
        day: 7,
        morning: '默写验收：authors + posts 完整关联系统',
        afternoon: '90分钟从零写（不看笔记）',
        check: '外键正确 + relations 正确 + 嵌套列表 + 删除保护',
      },
    ],
    examTitle: 'Day 7 — Final Exam',
    exam: 'authors + posts 完整关联系统：建表 → relations → 种子数据 → 嵌套列表 → 新增表单 → 删除保护',
  },
  week10: {
    goal: '用 Clerk 快速走完认证全流程：登录注册 → 保护路由 → 显示当前用户。建立完整认知。',
    skills: [
      { name: 'Clerk 认证', from: 2, to: 7 },
      { name: '保护路由', from: 2, to: 7 },
      { name: '当前用户', from: 2, to: 7 },
    ],
    days: [
      {
        day: 1,
        morning: '认证基础概念：AuthN / AuthZ / Session',
        afternoon: 'Clerk 注册 + 创建 Application + 看 Quick Start',
        check: '能说清 session 作用和 cookie vs token 区别',
      },
      {
        day: 2,
        morning: '跟练安装：npm install → env → ClerkProvider',
        afternoon: '独立重新配一遍（不看笔记）',
        check: '访问 / 自动跳转登录页，登录后能访问首页',
      },
      {
        day: 3,
        morning: '跟练 currentUser()：Server Component 获取',
        afternoon: '独立写导航栏：登录状态判断 + UserButton',
        check: '能说清 currentUser() vs useUser() 区别',
      },
      {
        day: 4,
        morning: '跟练分层保护：middleware 配置公开/保护路由',
        afternoon: '独立写多页面应用：公开页 + 保护页',
        check: '未登录访问 /dashboard 自动跳 /sign-in',
      },
      {
        day: 5,
        morning: '理解 Webhooks 作用：同步 Clerk 用户到数据库',
        afternoon: '复习 Day 1-4，画完整流程图',
        check: '能说清为什么需要 Webhook，能画流程图',
      },
      {
        day: 6,
        morning: '跟练 Webhook 接收用户数据 + 配置 schema',
        afternoon: '配置 Clerk Dashboard Webhook + 测试流程',
        check: '注册新用户后数据库自动创建记录',
      },
      {
        day: 7,
        morning: '默写验收：完整 Clerk 认证 + 用户数据同步',
        afternoon: '90分钟从零写（不看笔记）',
        check: '登录注册跑通 + Webhook 写库 + 显示用户信息',
      },
    ],
    examTitle: 'Day 7 — Final Exam',
    exam: '完整 Clerk 认证：安装配置 → 保护路由 → Webhook 同步 → 显示用户信息',
  },
  week11: {
    goal: '理解用户隔离的核心逻辑：每个用户只能看到/操作自己的数据。这是 SaaS 应用的基础能力。',
    skills: [
      { name: '用户隔离', from: 2, to: 8 },
      { name: 'Better Auth', from: 2, to: 6 },
    ],
    days: [
      {
        day: 1,
        morning: '用户隔离理论：理解必要性和数据泄露场景',
        afternoon: 'SQL 层面隔离：SELECT * FROM tasks WHERE user_id = ?',
        check: '能说清"用户隔离 = WHERE user_id"',
      },
      {
        day: 2,
        morning: '跟练查询隔离：currentUser → dbUser → userTasks',
        afternoon: '跟练新增隔离：INSERT 自动绑定当前用户',
        check: '两个账号各自看到自己的任务，互不可见',
      },
      {
        day: 3,
        morning: '跟练删除隔离：DELETE 加 WHERE userId + id',
        afternoon: '独立写 UPDATE 隔离：只能更新自己的任务',
        check: 'A 不能改 B 的任务，DELETE/UPDATE 都加双锁',
      },
      {
        day: 4,
        morning: '理解 Better Auth 定位：对比 Clerk vs Better Auth',
        afternoon: '看 Better Auth 文档，了解 session 和密码存储',
        check: '能说清什么时候用 Clerk，什么时候用 Better Auth',
      },
      {
        day: 5,
        morning: '跟练抽取工具函数：getCurrentDbUser() 统一认证',
        afternoon: '独立重构所有 actions，去掉重复代码',
        check: '所有 actions 都用统一工具函数，代码更简洁',
      },
      {
        day: 6,
        morning: '跟练 projects 多表隔离：users → projects',
        afternoon: '独立写三层隔离：隔离从根表开始',
        check: '能说清"多层关联时隔离从根表开始"',
      },
      {
        day: 7,
        morning: '默写验收：完整用户隔离系统（Clerk + PostgreSQL）',
        afternoon: '120分钟从零写（不看笔记）',
        check: '所有查询 + INSERT + UPDATE/DELETE 跨表隔离',
      },
    ],
    examTitle: 'Day 7 — Final Exam',
    exam: '完整用户隔离系统：users → categories → products，所有 CRUD 加 userId 过滤',
  },
  week12: {
    goal: '【Hackathon 冲刺】5天打通全栈闭环：从物理建模、Clerk JIT 同步、多租户安全拦截，直通 React 复杂状态联动与 Vercel 极速部署！',
    skills: [
      { name: '全栈闭环架构', from: 5, to: 9.5 },
      { name: '复杂状态联动', from: 4, to: 9 },
      { name: '防越权与部署', from: 6, to: 10 },
    ],
    days: [
      {
        day: 1,
        tasks: [
          '运行 npx create-next-app@latest 初始化纯净项目，安装 Drizzle、Postgres 与 Clerk。',
          '手敲 schema.ts，定义 Users, Categories, Projects, Tasks 4张物理表。',
          '为分类表和项目表配置 uniqueIndex（防同名），为任务表配置 onDelete: "cascade"（级联删除），推入 Neon 数据库。',
          '手写 proxy.ts 进行路由物理拦截，除登录/营销页外一律强制保护。',
          '新建 auth-service.ts，手敲 getCurrentUserId() 卫语句，实现 Clerk 首次登录自动补录本地镜像的 JIT 机制。',
        ],
        check: 'drizzle-kit push 落库成功，首次登录自动在 users 表懒补录镜像并成功拦截未登录路由。',
      },
      {
        day: 2,
        tasks: [
          '手敲 /dashboard/page.tsx，首行调用 getCurrentUserId() 锁死当前用户身份。',
          '手写 src/queries/projects.ts 查询，使用 Drizzle 的 with 三级嵌套带出分类和任务，绝对消灭 N+1。',
          '手写左侧 Aside Sidebar，加上 self-start 确保吸顶渲染。',
          '中间主面板渲染任务卡片，给 Flex 容器项套用 min-w-0 防止长文本撑爆布局。',
          '设计并实现一个优雅的 Empty State 占位图组件。',
        ],
        check:
          '完美渲染多级关系数据，吸顶与防撑爆样式生效，控制台 Network 确认无 N+1 多余 SQL 查询。',
      },
      {
        day: 3,
        tasks: [
          '手写 CategoryForm 与 ProjectForm，绑定 React Hook Form + Zod，支持传入 initialData（创建/修改双模）。',
          '在“新建项目”的弹窗中，嵌入“+ 新增分类”入口，点击弹出子 Category Dialog。',
          '实战“一个老爹管两个儿子”的状态提升：由老爹组件统筹两个弹窗的 open 状态。',
          '子表单成功后仅触发 onSuccess()，由老爹亲手执行 setOpen(false) 关窗。',
          '老爹关窗后调用 router.refresh()，即时刷新下拉框中的分类数据。',
        ],
        check: '表单互相联动极其流畅。新建分类后无需整页刷新，老爹的 Select 中立刻出现最新选项。',
      },
      {
        day: 4,
        tasks: [
          '手写核心 TaskForm，主面板点击“新建任务”或任务卡片时，从右侧滑出 Slide-over Drawer（抽屉）。',
          '重点桥接：在“所属项目”和“优先级”的 Select 组件上，手敲 <Controller> 彻底消灭 RHF 状态失联。',
          '在 handleSubmit 中加入 onInvalid 回调进行本地拦截，拒绝静默提交失败。',
          '给任务卡片增加 Checkbox，绑定 toggleTaskStatus 动作。',
          '点击 Checkbox 瞬间触发 Server Action，实现数据的秒级无感更新。',
        ],
        check:
          'Drawer 抽屉丝滑弹出，<Controller> 桥接数据双向流转正常，Checkbox 点击后秒级入库与重绘。',
      },
      {
        day: 5,
        tasks: [
          '编写 deleteProjectAction，Drizzle 查询强行双锁绑定：and(eq(id), eq(ownerId))，物理级防横向越权（IDOR）。',
          '后端写入时用 try...catch 拦截 Postgres 的唯一冲突错误（23505），统一返回 fieldErrors。',
          '前端 onSubmit 中用 Object.entries 循环扁平化错误，一键飘红对应输入框。',
          '推送到 GitHub，一键发布 Vercel 并注入生产环境变量。',
          '手写全英文 README.md 重点突出你的 Multi-tenant 防越权隔离思想，打造最强接单门面！',
        ],
        check:
          '双浏览器越权测试被物理拦截；重名报错精准在 UI 回显；Vercel 部署成功，最强履历出炉！',
      },
    ],
    examTitle: 'Day 5 — Vercel 部署上线与金牌门面',
    exam: '完成公网发布，并在手机/PC完成多租户隔离攻防自测。写一篇突出 Multi-tenant 与 IDOR 双锁防御的全英文 README，这将是你征战 Upwork 的最强诱饵！',
  },
};

function SkillBar({ name, from, to }: { name: string; from: number; to: number }) {
  return (
    <div className="flex items-center gap-3">
      <span className="text-sm font-medium text-gray-700 dark:text-gray-300 w-28 shrink-0 truncate">
        {name}
      </span>
      <div className="flex items-center gap-2 flex-1">
        <span className="text-xs text-gray-500 w-4">{from}</span>
        <div className="flex-1 h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
          <div
            className="h-full bg-gray-300 dark:bg-gray-600 rounded-full"
            style={{ width: `${(from / 10) * 100}%` }}
          />
        </div>
        <div className="relative flex-1 h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-full transition-all duration-500"
            style={{ width: `${((to - from) / 10) * 100}%` }}
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-[10px] font-bold text-white drop-shadow-sm">
              +{Number((to - from).toFixed(1))}
            </span>
          </div>
        </div>
        <span className="text-xs font-semibold text-blue-600 dark:text-blue-400 w-5">{to}</span>
      </div>
    </div>
  );
}

export default function LearningPlan() {
  const [activeWeek, setActiveWeek] = useState<WeekKey>('week12');
  const current = content[activeWeek];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-gray-950 dark:to-gray-900 py-8 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            🚀 The Ultimate Sprint Plan
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            Master database relations, authentication, and full-stack closure
          </p>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 overflow-x-auto snap-x scrollbar-hide bg-white dark:bg-gray-800 rounded-xl p-2 shadow-sm border border-gray-200 dark:border-gray-700 mb-8">
          {weeks.map((week) => (
            <button
              key={week.key}
              onClick={() => setActiveWeek(week.key)}
              className={`flex-1 min-w-[160px] snap-center py-3 px-4 rounded-lg text-sm font-medium transition-all duration-200 ${
                activeWeek === week.key
                  ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-md'
                  : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              <span className="block">{week.label}</span>
              <span
                className={`text-xs mt-0.5 block truncate ${
                  activeWeek === week.key ? 'text-blue-100' : 'text-gray-400'
                }`}
              >
                {week.title}
              </span>
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="space-y-6">
          {/* Goal */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="flex items-start gap-3">
              <span className="text-2xl shrink-0 mt-0.5">🎯</span>
              <div>
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  Sprint Goal
                </h2>
                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                  {current.goal}
                </p>
              </div>
            </div>
          </div>

          {/* Skill Progress */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-xl">📊</span>
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                Skill Progress
              </h2>
            </div>
            <div className="space-y-3">
              {current.skills.map((skill) => (
                <SkillBar key={skill.name} {...skill} />
              ))}
            </div>
          </div>

          {/* Daily Schedule */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
            <div className="p-6 pb-4 border-b border-gray-100 dark:border-gray-700">
              <div className="flex items-center gap-2">
                <span className="text-xl">📅</span>
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Daily Schedule
                </h2>
              </div>
            </div>
            <div className="divide-y divide-gray-100 dark:divide-gray-700">
              {current.days.map((day) => (
                <div
                  key={day.day}
                  className="p-6 hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors"
                >
                  <div className="flex items-start gap-4">
                    <div className="shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm shadow-sm">
                      D{day.day}
                    </div>
                    <div className="flex-1 min-w-0">
                      {/* 动态判断渲染模式 */}
                      {day.tasks ? (
                        <div className="mb-3">
                          <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider block mb-3">
                            ⚡ Execution Checklist
                          </span>
                          <ul className="space-y-2">
                            {day.tasks.map((task, idx) => (
                              <li key={idx} className="flex items-start gap-2.5">
                                <span className="text-indigo-500 dark:text-indigo-400 shrink-0 mt-[2px] text-lg">
                                  •
                                </span>
                                <span className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                                  {task}
                                </span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                          <div>
                            <span className="text-xs font-semibold text-yellow-600 dark:text-yellow-400 uppercase tracking-wide">
                              ☀️ Morning
                            </span>
                            <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">
                              {day.morning}
                            </p>
                          </div>
                          <div>
                            <span className="text-xs font-semibold text-orange-600 dark:text-orange-400 uppercase tracking-wide">
                              🌤️ Afternoon
                            </span>
                            <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">
                              {day.afternoon}
                            </p>
                          </div>
                        </div>
                      )}

                      <div className="flex items-start gap-2 bg-green-50 dark:bg-green-900/20 rounded-lg p-3 mt-4 border border-green-100 dark:border-green-900/30">
                        <span className="text-green-600 dark:text-green-400 shrink-0 mt-0.5">
                          ✅
                        </span>
                        <p className="text-sm text-green-700 dark:text-green-300">
                          <span className="font-semibold">Milestone Check: </span>
                          {day.check}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Exam / Milestone */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="flex items-start gap-3">
              <span className="text-2xl shrink-0 mt-0.5">🏆</span>
              <div>
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {current.examTitle}
                </h2>
                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                  {current.exam}
                </p>
                <div className="mt-3 flex items-center gap-2 text-sm text-amber-600 dark:text-amber-400">
                  <span>⏱️</span>
                  <span className="font-medium">
                    Hackathon Mode: Deploy to production and secure your multi-tenant perimeter!
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}