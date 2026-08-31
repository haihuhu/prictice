// components/learning-plan.tsx
'use client';

import { useState } from 'react';

type WeekKey = 'week9' | 'week10' | 'week11' | 'week12' | 'week13';

const weeks: { key: WeekKey; label: string; title: string }[] = [
  { key: 'week9', label: 'Week 9', title: '外键关联 + 关联查询' },
  { key: 'week10', label: 'Week 10', title: 'Clerk 认证快速跑通' },
  { key: 'week11', label: 'Week 11', title: 'Better Auth + 用户隔离' },
  { key: 'week12', label: 'Week 12', title: '冲刺(上)：建模与读闭环' },
  { key: 'week13', label: 'Week 13', title: '冲刺(下)：三大表单与全闭环' },
];

const content: Record<
  WeekKey,
  {
    goal: string;
    skills: { name: string; from: number; to: number }[];
    days: { day: number; morning: string; afternoon: string; check: string }[];
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
        morning: '复习默写 Week 7 — products 表完整 CRUD（不看笔记）',
        afternoon: '外键理论：理解 users → tasks 关系图，回答三个核心问题',
        check: 'Week 7 CRUD 默写 70%+，能说清外键作用',
      },
      {
        day: 2,
        morning: '跟练定义外键：users + tasks 表，references 语法',
        afternoon: '独立建外键：categories + products 关联',
        check: '不看笔记写 .references()，能说清 .notNull() 含义',
      },
      {
        day: 3,
        morning: '跟练 Drizzle relations：one-to-many 双向关联',
        afternoon: '独立写 relations：products 查询带出 category',
        check: '能说清外键 vs relations 区别，写 with: { category: true }',
      },
      {
        day: 4,
        morning: '跟练带外键 INSERT：插入 task 绑定 userId',
        afternoon: '独立写 product 表单 + category 下拉框 + 外键错误处理',
        check: '能写 select 下拉框从数据库读，捕获外键错误',
      },
      {
        day: 5,
        morning: '跟练 one-to-many 双向查询：users with tasks',
        afternoon: '独立写嵌套列表：categories → products 层级展示',
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
        morning: '认证基础概念：Authentication / Authorization / Session',
        afternoon: 'Clerk 注册 + 创建 Application + 看 Quick Start',
        check: '能说清 session 作用和 cookie vs token 区别',
      },
      {
        day: 2,
        morning: '跟练安装：npm install → env → ClerkProvider → middleware',
        afternoon: '独立重新配一遍（不看笔记）',
        check: '访问 / 自动跳转登录页，登录后能访问首页',
      },
      {
        day: 3,
        morning: '跟练 currentUser()：Server Component 获取用户信息',
        afternoon: '独立写导航栏：登录状态判断 + UserButton 组件',
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
        check: '登录注册跑通 + Webhook 写库 + 显示数据库用户信息',
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
        check: '能说清"用户隔离 = WHERE user_id"，服务端必须校验',
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
        check: 'A 不能改 B 的任务，DELETE/UPDATE 都加 WHERE userId',
      },
      {
        day: 4,
        morning: '理解 Better Auth 定位：对比 Clerk vs Better Auth',
        afternoon: '看 Better Auth 文档，了解 session 和密码存储',
        check: '能说清什么时候用 Clerk，什么时候用 Better Auth',
      },
      {
        day: 5,
        morning: '跟练抽取工具函数：getCurrentDbUser() 统一认证逻辑',
        afternoon: '独立重构所有 actions，去掉重复代码',
        check: '所有 actions 都用统一工具函数，代码更简洁',
      },
      {
        day: 6,
        morning: '跟练 projects 多表隔离：users → projects → tasks',
        afternoon: '独立写三层隔离：隔离从根表开始',
        check: '能说清"多层关联时隔离从根表开始"',
      },
      {
        day: 7,
        morning: '默写验收：完整用户隔离系统（Clerk + PostgreSQL）',
        afternoon: '120分钟从零写（不看笔记）',
        check: '所有查询 + INSERT + UPDATE/DELETE 都隔离，跨表也隔离',
      },
    ],
    examTitle: 'Day 7 — Final Exam',
    exam: '完整用户隔离系统：users → categories → products，所有 CRUD 加 userId 过滤',
  },
  week12: {
    goal: '终极冲刺（上）：构建 4 张核心物理表，接入 Clerk 并手写 proxy.ts 安全拦截。实现 getCurrentUserId 的 JIT 懒创建，完成包含 with 的复杂关联查询与多租户越权审计。',
    skills: [
      { name: '物理建模', from: 5, to: 9 },
      { name: '路由拦截', from: 4, to: 8.5 },
      { name: '关联查询', from: 6, to: 9.5 },
    ],
    days: [
      {
        day: 1,
        morning: 'Next.js 纯净初始化，关闭 AI 自动补全，手动安装 drizzle-orm、postgres、clerk。',
        afternoon:
          '手敲 4 张物理表建模（Users, Categories, Projects, Tasks），配置级联删除与复合索引。',
        check: 'drizzle-kit push 确认 4 张物理表在 Neon 控制台完美落地。',
      },
      {
        day: 2,
        morning: '配置 <ClerkProvider>，理清 Next.js 最新路由规范中 proxy.ts 替代中间件的本质。',
        afternoon:
          '手敲 proxy.ts，使用 req.nextUrl.pathname 校验路由，一律强制 auth.protect() 拦截。',
        check: '未登录用户访问 /dashboard 成功被安全拦截并踢回。',
      },
      {
        day: 3,
        morning: '新建 auth-service.ts，理清后台如何静默完成用户 JIT（懒创建）同步。',
        afternoon:
          '手写 getCurrentUserId() 控制流与卫语句，区分直接返回 ID 的热路径与补录的冷路径。',
        check: '不偷懒手敲卫语句，确保 currentUser() 通过 db.insert() 自动补录。',
      },
      {
        day: 4,
        morning:
          '在 /dashboard/page.tsx 第一行锁死当前用户。手敲 projects.ts 关联查询（with 三级嵌套）。',
        afternoon:
          '手写 Aside Sidebar 渲染项目/分类，主面板渲染任务列表并设计 Empty State 空卡片。',
        check: '成功查出当前用户项目及关联分类/任务，消灭 N+1 天坑。',
      },
      {
        day: 5,
        morning: '多租户数据隔离黑客自测：开启 Chrome（账号 A）与 Edge（账号 B）双开浏览器测试。',
        afternoon: '强行在 A 浏览器传入 B 账号的项目 ID 请求，验证物理层拦截。',
        check: '测试 eq(ownerId, currentUserId) 强绑定，直接返回 404，拒绝越权展示。',
      },
    ],
    examTitle: 'Day 5 — 安全黑客自测验证',
    exam: '在双浏览器环境下，尝试各类越权获取数据的 API 渗透，确保后台直接在 SQL 层面（eq ownerId）实现了完美的数据物理隔离与拦截！',
  },
  week13: {
    goal: '终极冲刺（下）：手写三大表单，实现状态提升联动与 <Controller> 桥接。打通级联清理、唯一冲突查重，最终完成 Vercel 部署与展示级全英文 README。',
    skills: [
      { name: '表单联动', from: 4, to: 9 },
      { name: '复杂状态', from: 5, to: 9.5 },
      { name: '全栈闭环', from: 6, to: 10 },
    ],
    days: [
      {
        day: 6,
        morning: '手写 CategoryForm：绑定 React Hook Form + Zod，提交触发 createCategoryAction。',
        afternoon: '新建项目弹窗中嵌入新增分类，子表单成功后关窗并即时刷新父级下拉框。',
        check: '深刻理解“一个爹管两个儿子”的组件状态提升哲学。',
      },
      {
        day: 7,
        morning: '手写 ProjectForm，支持传入 initialData 区分修改/创建模式。',
        afternoon:
          '手写 <Controller> 桥接 Select 组件；写 saveProjectAction 与 onInvalid 本地拦截。',
        check: 'field.onChange 与 field.value 完美接线，彻底消灭 RHF 状态失联。',
      },
      {
        day: 8,
        morning: '/projects 渲染项目列表，编写带双锁（and(id, ownerId)）的 deleteProjectAction。',
        afternoon: '手写 AlertDialog 二次确认弹窗，确认后触发删除与 router.refresh()。',
        check: '去 Neon 数据库控制台验证，项目删除后底下的 Tasks 瞬间物理消失。',
      },
      {
        day: 9,
        morning:
          '手写抽屉式（Drawer） TaskForm，温习 defaultValues 处理 date 格式化（YYYY-MM-DD）。',
        afternoon: '卡片左侧加一键 Toggle 的 Checkbox；右下角加 Trash 按钮并调用带双锁的安全删除。',
        check: '卡片一键修改状态极速响应，安全删除功能防越权跑通。',
      },
      {
        day: 10,
        morning: '后端写入时 try...catch 拦截 Postgres 唯一冲突(23505)，返回统一 fieldErrors。',
        afternoon: '前端用 Object.entries 一键飘红回显；微调防撑爆样式；推 GitHub 部署 Vercel。',
        check: '同名分类创建精准飘红；撰写重点突出安全思想的全英文 README 作为门面！',
      },
    ],
    examTitle: 'Day 10 — Vercel 部署与架构展示',
    exam: '将你的项目一键推送到 Vercel。写一封重点突出 "Multi-tenant Isolation" 和 "JIT User Sync" 的精美英文 README，这将是你满分毕业的金牌门面！',
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
  const [activeWeek, setActiveWeek] = useState<WeekKey>('week12'); // 默认展示最新的冲刺周
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
            Five weeks to master database relations, authentication, and full-stack closure
          </p>
        </div>

        {/* Tabs - 优化了横向滚动防止 5 个 Tab 挤压 */}
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
                  Weekly Goal
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
                      <div className="flex items-start gap-2 bg-green-50 dark:bg-green-900/20 rounded-lg p-3 mt-4">
                        <span className="text-green-600 dark:text-green-400 shrink-0 mt-0.5">
                          ✅
                        </span>
                        <p className="text-sm text-green-700 dark:text-green-300">
                          <span className="font-semibold">Check: </span>
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
                  <span className="font-medium">No notes. No AI. Just you and the code.</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
