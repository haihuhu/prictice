import React from 'react';

// ==============================
// 1. 数据定义区 (方便后续维护修改)
// ==============================

type Phase = '基础' | '核心' | '里程碑' | '进阶';

const getTagStyle = (phase: Phase | string) => {
  switch (phase) {
    case '基础':
      return 'bg-green-100 text-green-800';
    case '核心':
      return 'bg-blue-100 text-blue-800';
    case '里程碑':
      return 'bg-purple-100 text-purple-800';
    case '进阶':
      return 'bg-orange-100 text-orange-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

const overviewData = [
  {
    phase: '基础',
    week: 3,
    topic: 'Next.js App Router',
    criteria: '多页面 + 嵌套 layout + 动态路由',
  },
  {
    phase: '基础',
    week: 4,
    topic: 'App Router 巩固 + 表单第1层',
    criteria: '路由默写流畅 + 受控表单 + 手写校验',
  },
  {
    phase: '基础',
    week: 5,
    topic: '数据获取 + 表单第2层(rhf+zod)',
    criteria: 'async Server Component 取数 + rhf+zod 校验',
  },
  {
    phase: '基础',
    week: 6,
    topic: 'Server Actions + 提交闭环',
    criteria: 'rhf + zod + Server Action 完整提交',
  },
  {
    phase: '核心',
    week: 7,
    topic: 'Drizzle + PostgreSQL 接入',
    criteria: '建表 + migrate + 读列表',
  },
  { phase: '核心', week: 8, topic: 'CRUD 写入', criteria: 'Create / Update / Delete 全独立写' },
  {
    phase: '核心',
    week: 9,
    topic: '表单第3层 + 错误回显 + 关联表',
    criteria: 'server 校验回显 + 外键关联',
  },
  { phase: '核心', week: 10, topic: '认证基础(Better Auth)', criteria: '注册 + 登录独立写' },
  {
    phase: '核心',
    week: 11,
    topic: '保护路由 + 用户隔离',
    criteria: 'middleware + session + 数据归属',
  },
  { phase: '里程碑', week: 12, topic: '项目一：规划+骨架', criteria: '数据模型 + auth + 列表页' },
  { phase: '里程碑', week: 13, topic: '项目一：功能完善', criteria: '完整 CRUD + 校验 + 隔离' },
  { phase: '里程碑', week: 14, topic: '项目一：打磨上线', criteria: 'shadcn/ui + 部署 Vercel' },
  { phase: '进阶', week: 15, topic: 'Stripe 支付', criteria: 'checkout + webhook 跑通' },
  { phase: '进阶', week: 16, topic: 'OpenAI API', criteria: 'chat + streaming 跑通' },
  { phase: '里程碑', week: 17, topic: '项目二：规划+骨架', criteria: '产品定义 + auth + 主页面' },
  { phase: '里程碑', week: 18, topic: '项目二：核心功能', criteria: 'CRUD + AI 功能' },
  { phase: '里程碑', week: 19, topic: '项目二：订阅支付', criteria: 'Stripe 订阅 + 状态门控' },
  {
    phase: '里程碑',
    week: 20,
    topic: '项目二：上线+作品集',
    criteria: '部署 + README + demo 录屏',
  },
];

const weeklyData = [
  {
    title: 'Week 3：Next.js App Router',
    phase: '基础',
    tagText: '基础阶段',
    goal: '🎯 核心：理解"文件即路由"，按原计划执行，确认无误。',
    days: [
      { day: 'Day 1', content: '搭最小项目，建 /、/about、/products；下午独立加 /contact、/blog' },
      {
        day: 'Day 2',
        content: 'root layout.tsx + navbar；下午给 /products 加嵌套 layout（侧边栏）',
      },
      { day: 'Day 3', content: '<Link> 连接所有页；下午建 /products/[id] 动态路由，读 id' },
      { day: 'Day 4', content: 'Server vs Client Component；下午把第2周购物车嵌进来跑起来' },
      {
        day: 'Day 5',
        content: '默写验收： 60 分钟默写 layout + navbar + 首页 + 列表 + 动态详情 + 跳转',
        isMock: true,
      },
    ],
  },
  {
    title: 'Week 4：App Router 巩固 + 表单第1层',
    phase: '基础',
    tagText: '基础阶段',
    goal: '🎯 核心：路由默写流畅 + 受控表单 + 手写校验。',
    days: [
      { day: 'Day 1', content: '第3周综合复习默写' },
      { day: 'Day 2', content: '受控表单基础，useState 管理多字段 + onSubmit' },
      { day: 'Day 3', content: '手写校验逻辑（required、email 格式、密码长度），不用库' },
      { day: 'Day 4', content: '给 /contact 做完整联系表单 + 错误提示' },
      { day: 'Day 5', content: '默写验收： 默写带校验的登录表单', isMock: true },
    ],
  },
  {
    title: 'Week 5：数据获取 + 表单第2层',
    phase: '基础',
    tagText: '基础阶段',
    goal: '🎯 目标：会在 Server Component 里取数据，会用 react-hook-form + zod 写校验。',
    days: [
      {
        day: 'Day 1',
        content: '早：写 async Server Component，从假 API 取数。\n午：自己写 /users 页取假数据。',
        acceptance: '说清 Server Component 为什么能直接 await',
      },
      {
        day: 'Day 2',
        content: '早：加 loading.tsx 和 error.tsx。\n午：给 /products 加这俩状态。',
        acceptance: '能说清这两个文件什么时候触发',
      },
      {
        day: 'Day 3',
        content: '早：装 RHF，跟练最简表单。\n午：用 RHF 重写第4周的联系表单。',
        acceptance: '不看文档说出 register 和 handleSubmit 干啥',
      },
      {
        day: 'Day 4',
        content: '早：装 zod，写第一个 schema + resolver。\n午：给联系表单加 zod 校验。',
        acceptance: '能独立写一个 zod schema',
      },
      {
        day: 'Day 5',
        content: '默写验收： 60 分钟从零写一个 rhf + zod 注册表单（含两次密码一致校验）',
        isMock: true,
      },
    ],
  },
  {
    title: 'Week 6：Server Actions + 提交闭环',
    phase: '基础',
    tagText: '基础阶段',
    goal: '🎯 目标：表单数据真正"提交出去"，理解 Server Action。',
    days: [
      { day: 'Day 1', content: '复习默写 Week 5 的 rhf + zod 表单' },
      {
        day: 'Day 2',
        content: '早：跟练最简 Server Action。\n午：写 Action 把表单数据 console.log。',
        acceptance: '能说清 Server Action 和普通函数的区别',
      },
      {
        day: 'Day 3',
        content: '早：revalidatePath 跟练。\n午：做"留言板"，提交后列表自动更新。',
        acceptance: '解释为什么要 revalidatePath',
      },
      {
        day: 'Day 4',
        content: '早：rhf + zod + Server Action 三者串起来。\n午：把留言板换成完整的验证提交闭环。',
      },
      {
        day: 'Day 5',
        content: '默写验收： 60 分钟写完整提交流程：表单 → 校验 → Action → 刷新',
        isMock: true,
      },
    ],
  },
  {
    title: 'Week 7：Drizzle + PostgreSQL 接入',
    phase: '核心',
    tagText: '核心阶段',
    goal: '🎯 目标：连上真数据库，能建表、迁移、读数据。进入核心区，别急稳住。',
    days: [
      { day: 'Day 1', content: '早：注册 Neon 配 .env。\n午：重新配新数据库，跑通测试。' },
      {
        day: 'Day 2',
        content: '早：跟练 Drizzle schema (products表)。\n午：定义 tasks 表。',
        acceptance: '能说清每个字段类型怎么选',
      },
      {
        day: 'Day 3',
        content: '早：generate + migrate 推到数据库。\n午：把 tasks 表迁移上去并在 Neon 确认。',
      },
      {
        day: 'Day 4',
        content: '早：跟练 db.select() 查询。\n午：独立写 /tasks 页，从数据库读出来显示。',
      },
      {
        day: 'Day 5',
        content: '默写验收： 60分钟：定义 notes 表 + migrate + 列表页显示',
        isMock: true,
      },
    ],
  },
  {
    title: 'Week 8：CRUD 写入',
    phase: '核心',
    tagText: '核心阶段',
    goal: '🎯 目标：增删改全部跑通，结合 Server Action。',
    days: [
      { day: 'Day 1', content: '复习默写 Week 7 的建表 + 查询' },
      { day: 'Day 2', content: '早：跟练 Create (db.insert())。\n午：给 notes 加新增功能。' },
      {
        day: 'Day 3',
        content: '早：跟练 Update (db.update().where())。\n午：给 notes 加编辑功能。',
      },
      { day: 'Day 4', content: '早：跟练 Delete + 确认。\n午：给 notes 加删除功能。' },
      { day: 'Day 5', content: '默写验收： 60分钟从零写一张表的完整 CRUD 全套', isMock: true },
    ],
  },
  {
    title: 'Week 9：表单第3层 + 错误回显 + 关联表',
    phase: '核心',
    tagText: '核心阶段',
    goal: '🎯 目标：提交失败给用户看错误；学会两张表关联。',
    days: [
      { day: 'Day 1', content: '复习默写 Week 8 完整 CRUD' },
      {
        day: 'Day 2',
        content: '早：Action 返回 error 前端回显。\n午：给新增表单加服务端校验失败回显。',
        acceptance: '说清 client 和 server 校验各防什么',
      },
      { day: 'Day 3', content: '早：双层校验跟练。\n午：自己实现一个字段的双层校验。' },
      {
        day: 'Day 4',
        content: '早：跟练外键关联 (relations)。\n午：给 tasks 加 projects 关联表并带出名字。',
      },
      { day: 'Day 5', content: '默写验收： 60分钟写带关联表 + 错误回显的 CRUD', isMock: true },
    ],
  },
  {
    title: 'Week 10：认证基础（Better Auth）',
    phase: '核心',
    tagText: '核心阶段',
    goal: '🎯 目标：注册和登录独立写出来。',
    days: [
      { day: 'Day 1', content: '理论：搞清 session、cookie、token 三个概念，画登录流程图。' },
      { day: 'Day 2', content: '早：跟练 Better Auth 安装配置。\n午：自己重新配一遍配置文件。' },
      { day: 'Day 3', content: '早：跟练注册功能。\n午：独立写注册页 + 提交。' },
      { day: 'Day 4', content: '早：跟练登录功能。\n午：独立写登录页 + 提交。' },
      { day: 'Day 5', content: '默写验收： 60分钟从零写注册 + 登录两个页面', isMock: true },
    ],
  },
  {
    title: 'Week 11：保护路由 + 用户隔离',
    phase: '核心',
    tagText: '核心阶段',
    goal: '🎯 目标：没登录进不去；每个用户只看自己的数据（接单安全底线）。',
    days: [
      { day: 'Day 1', content: '复习默写 Week 10 登录注册' },
      {
        day: 'Day 2',
        content: '早：跟练 middleware 保护路由。\n午：保护 /dashboard，未登录跳转。',
      },
      {
        day: 'Day 3',
        content: '早：在 Server 端拿 current user session。\n午：在页面顶部显示当前登录用户名。',
      },
      {
        day: 'Day 4',
        content: '早：用户数据隔离查询。\n午：把 Week 9 CRUD 改成"只查/改自己的"。',
        acceptance: '说清不做隔离会有什么安全问题',
      },
      { day: 'Day 5', content: '默写验收： 登录 + 保护路由 + 用户只看自己数据', isMock: true },
    ],
  },
  {
    title: 'Week 12：项目一 规划 + 骨架',
    phase: '里程碑',
    tagText: '里程碑: Task Manager',
    goal: '🎯 建议做 Task Manager，范围小、能做完最重要。别找新教程，用已学知识拼装。',
    days: [
      { day: 'Day 1', content: '纸上写需求 + 数据模型 (users, tasks 字段) + 页面清单。' },
      { day: 'Day 2', content: '项目初始化 + Drizzle schema + 数据库 migrate。' },
      { day: 'Day 3', content: '接入 Better Auth（注册 + 登录 + 保护路由）。' },
      { day: 'Day 4', content: '主列表页，读出当前用户的任务。' },
      { day: 'Day 5', content: '验收： 周回顾，对照需求清单看进度，记录卡点。', isMock: true },
    ],
  },
  {
    title: 'Week 13：项目一 功能完善',
    phase: '里程碑',
    tagText: '里程碑: Task Manager',
    goal: '🎯 目标：核心功能全覆盖，确保每个功能的鲁棒性。',
    days: [
      { day: 'Day 1', content: 'Create 任务功能实现。' },
      { day: 'Day 2', content: 'Update 任务（编辑 + 状态切换）。' },
      { day: 'Day 3', content: 'Delete 任务 + 确认弹窗。' },
      { day: 'Day 4', content: '表单校验（zod）+ 错误回显。' },
      {
        day: 'Day 5',
        content: '验收： 用户数据隔离自测（用两个账号验证互相看不到）。',
        isMock: true,
      },
    ],
  },
  {
    title: 'Week 14：项目一 打磨上线',
    phase: '里程碑',
    tagText: '里程碑: Task Manager',
    goal: '🎯 目标：拥有一个可对外展示的基础项目。',
    days: [
      { day: 'Day 1', content: '用 shadcn/ui 美化（Button, Card, Dialog, Input）。' },
      { day: 'Day 2', content: '处理 loading / error / empty 三种状态。' },
      { day: 'Day 3', content: 'Tailwind 响应式，确保手机端能完美浏览。' },
      { day: 'Day 4', content: '部署到 Vercel + 配置线上环境变量。' },
      {
        day: 'Day 5',
        content: '验收： 复盘总结，写下哪些是真会、哪些是查了文档的。',
        isMock: true,
      },
    ],
  },
  {
    title: 'Week 15：Stripe 支付',
    phase: '进阶',
    tagText: '进阶阶段',
    goal: '🎯 目标：跑通一次测试支付。只用 test mode，不碰真钱。',
    days: [
      { day: 'Day 1', content: '理论：Stripe 概念，test mode 注册配置。' },
      { day: 'Day 2', content: '早：跟练创建 checkout session。\n午：自己写"买一个商品"的按钮。' },
      { day: 'Day 3', content: '早：支付跳转 + 回跳页设计。\n午：独立配 success / cancel 页。' },
      {
        day: 'Day 4',
        content: '早：跟练 webhook 接收事件。\n午：webhook 里把订单状态写进数据库。',
      },
      {
        day: 'Day 5',
        content: '默写验收： 60分钟写支付流程（按钮 → checkout → 回跳）',
        isMock: true,
      },
    ],
  },
  {
    title: 'Week 16：OpenAI API',
    phase: '进阶',
    tagText: '进阶阶段',
    goal: '🎯 目标：跑通 AI 调用 + 流式响应。API key 放后端调用，防泄露。',
    days: [
      { day: 'Day 1', content: '理论：API key、token、模型概念，拿 key 配置。' },
      {
        day: 'Day 2',
        content: '早：跟练基础 chat completion。\n午：写一个"输入问题返回答案"的简单页。',
      },
      { day: 'Day 3', content: '早：streaming 响应跟练。\n午：把昨日页面改成逐字流式输出。' },
      {
        day: 'Day 4',
        content: '早：整合完整功能页（输入 → loading → 流式）。\n午：加错误处理 + 输入校验。',
      },
      {
        day: 'Day 5',
        content: '默写验收： 60分钟从零写一个 AI 问答页（含 streaming）',
        isMock: true,
      },
    ],
  },
  {
    title: 'Week 17：项目二 规划 + 骨架',
    phase: '里程碑',
    tagText: '里程碑: AI SaaS',
    goal: '🎯 作品集级别：AI 内容生成 SaaS。Day 1 把范围定死，砍掉花哨功能。',
    days: [
      { day: 'Day 1', content: '产品定义 + 看 2-3 个同类站点（限时 1 小时）+ 数据模型设计。' },
      { day: 'Day 2', content: '初始化 + schema + Better Auth 接入。' },
      { day: 'Day 3', content: '核心布局搭建（navbar + sidebar + dashboard 框架）。' },
      { day: 'Day 4', content: '主功能列表页（读取当前用户的 AI 生成历史记录）。' },
      { day: 'Day 5', content: '验收： 周回顾 + 进度严格核对。', isMock: true },
    ],
  },
  {
    title: 'Week 18：项目二 核心功能',
    phase: '里程碑',
    tagText: '里程碑: AI SaaS',
    goal: '🎯 目标：完成 AI 内容生成与数据存储的完整链路。',
    days: [
      { day: 'Day 1', content: '生成记录 Create（表单提交 → 存库）。' },
      { day: 'Day 2', content: 'Update / Delete 记录功能 + 表单校验与错误回显。' },
      { day: 'Day 3', content: '正式接入 OpenAI 生成功能（使用 streaming 提升体验）。' },
      { day: 'Day 4', content: '用户配额限制逻辑（如：免费用户每天限制 N 次生成）。' },
      { day: 'Day 5', content: '验收： 整体回顾 + 账号配额自测跑通。', isMock: true },
    ],
  },
  {
    title: 'Week 19：项目二 订阅支付',
    phase: '里程碑',
    tagText: '里程碑: AI SaaS',
    goal: '🎯 目标：将平台升级为真正的商业化 SaaS 闭环。',
    days: [
      { day: 'Day 1', content: '理论：Stripe 订阅模型学习，设计价格档位（Plan）。' },
      { day: 'Day 2', content: '完成前端订阅页面 + Stripe Checkout 接口调用（月付版）。' },
      { day: 'Day 3', content: '编写 webhook 更新用户订阅状态并安全写入数据库。' },
      { day: 'Day 4', content: '按订阅状态做门控逻辑（付费用户解锁配额限制）。' },
      { day: 'Day 5', content: '验收： 用测试信用卡完整走通订阅全流程。', isMock: true },
    ],
  },
  {
    title: 'Week 20：项目二 上线 + 作品集',
    phase: '里程碑',
    tagText: '里程碑: AI SaaS',
    goal: '🎯 最终目标：打造一份完美的 Upwork 敲门砖。',
    days: [
      { day: 'Day 1', content: 'UI 整体打磨（利用 shadcn/ui 统一间距、色彩及交互体验）。' },
      { day: 'Day 2', content: '全站处理 loading / error / empty 状态 + 增加全局错误边界。' },
      { day: 'Day 3', content: '设计 Landing Page 落地页 + 基础 SEO（Metadata 配置）。' },
      { day: 'Day 4', content: '上线部署 + 绑定自定义域名 + 严格检查生产环境变量。' },
      {
        day: 'Day 5',
        content: '验收： 写英文 README + 录制高清 Demo 视频 + 复盘，为接单做准备！',
        isMock: true,
      },
    ],
  },
];

// ==============================
// 2. 主组件代码
// ==============================

const FullStackPlanPage = () => {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans p-5 md:p-10">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Header Section */}
        <header className="bg-gradient-to-br from-indigo-600 to-blue-500 rounded-[2rem] p-10 md:p-16 text-center text-white shadow-[0_10px_25px_-5px_rgba(79,70,229,0.3)]">
          <h1 className="text-3xl md:text-5xl font-bold mb-6 tracking-tight">
            🚀 全栈开发进阶计划 (Week 3-20)
          </h1>
          <div className="bg-white/15 backdrop-blur-md border border-white/20 p-6 rounded-2xl inline-block max-w-3xl text-left md:text-center shadow-sm">
            <p className="text-base md:text-lg font-medium">
              🔄 <strong className="text-amber-300">每周固定节奏：</strong>
              周一复习默写 ➔ 周二到周四新内容 (早跟练/下午独立写) ➔{' '}
              <span className="text-amber-300">周五 60分钟综合默写</span> ➔ 周末休息
            </p>
            <p className="text-sm md:text-base mt-3 text-indigo-50">
              🇬🇧 <strong className="text-amber-300">每日必做：</strong> 编程结束后 1
              小时英语闭环（写英文注释 ➔ AI 纠错 ➔ 听力）
            </p>
          </div>
        </header>

        {/* Overview Table */}
        <section>
          <h2 className="text-2xl font-bold mb-6 pb-3 border-b-2 border-slate-200 flex items-center gap-2">
            📊 学习总览表
          </h2>
          <div className="overflow-x-auto bg-white rounded-2xl shadow-sm border border-slate-200">
            <table className="w-full text-left border-collapse min-w-[800px]">
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
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {overviewData.map((row, idx) => (
                  <tr key={idx} className="hover:bg-slate-50 transition-colors">
                    <td className="p-4 px-6">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${getTagStyle(row.phase)}`}
                      >
                        {row.phase}
                      </span>
                    </td>
                    <td className="p-4 px-6 font-medium text-slate-700">{row.week}</td>
                    <td className="p-4 px-6 text-slate-800">{row.topic}</td>
                    <td className="p-4 px-6 text-slate-600">{row.criteria}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Weekly Detail Cards Grid */}
        <section>
          <h2 className="text-2xl font-bold mb-6 pb-3 border-b-2 border-slate-200 flex items-center gap-2">
            📅 每周详细执行清单
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {weeklyData.map((week, idx) => (
              <div
                key={idx}
                className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-slate-200 hover:-translate-y-1 hover:shadow-xl transition-all duration-300 flex flex-col"
              >
                {/* Card Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-5 border-b border-dashed border-slate-200 pb-5 gap-3 md:gap-0">
                  <h3 className="text-xl md:text-2xl font-bold text-indigo-600">{week.title}</h3>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap ${getTagStyle(week.phase)}`}
                  >
                    {week.tagText}
                  </span>
                </div>

                {/* Goal Section */}
                <p className="text-sm md:text-base text-slate-600 bg-slate-50 p-4 rounded-xl border-l-4 border-indigo-400 mb-6 font-medium">
                  {week.goal}
                </p>

                {/* Days List */}
                <ul className="flex flex-col gap-4 flex-1">
                  {week.days.map((day, dayIdx) => (
                    <li
                      key={dayIdx}
                      className="flex flex-col md:flex-row gap-3 md:gap-4 items-start"
                    >
                      {/* Day Badge */}
                      <span
                        className={`px-2.5 py-1 rounded-md text-sm font-semibold whitespace-nowrap mt-1 ${
                          day.isMock ? 'bg-red-500 text-white shadow-sm' : 'bg-slate-800 text-white'
                        }`}
                      >
                        {day.day}
                      </span>

                      {/* Content & Acceptance */}
                      <div className="flex-1 bg-slate-50/80 p-3 md:p-4 rounded-xl border border-slate-100 text-sm md:text-[0.95rem] leading-relaxed text-slate-700 w-full">
                        <div className="whitespace-pre-wrap">{day.content}</div>
                        {day.acceptance && (
                          <div className="mt-3 text-sm text-emerald-700 bg-emerald-50 border border-emerald-100 px-3 py-2 rounded-lg font-medium flex items-center gap-2">
                            <span className="text-emerald-500">✓</span>
                            <span>验收：{day.acceptance}</span>
                          </div>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default FullStackPlanPage;
