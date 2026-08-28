'use client';

import React from 'react';
import {
  ShieldAlert,
  ShieldCheck,
  Lightbulb,
  Database,
  Server,
  Lock,
  AlertTriangle,
  Zap,
  CheckCircle2,
  GitMerge,
  Code2,
} from 'lucide-react';
import { CodeWindow } from '@/components/CodeWindow';

// ==========================================
// 📝 代码片段常量区 (避免 JSX 解析冲突)
// ==========================================

const CODE_PROXY_TS = `// proxy.ts (Located at the root directory, parallel to /app)
import { clerkMiddleware } from '@clerk/nextjs/server';

export default clerkMiddleware(async (auth, req) => {
  const pathname = req.nextUrl.pathname;

  // 🛡️ Public Whitelist: Routes that bypass authentication
  const isPublicRoute =
    pathname === '/' ||
    pathname === '/about' ||
    pathname.startsWith('/sign-in') ||
    pathname.startsWith('/sign-up');

  // Enforce Clerk session protection for any route outside the whitelist
  if (!isPublicRoute) {
    await auth.protect();
  }
});

export const config = {
  // Entrance Filter: Dictates which requests run through proxy.ts
  matcher: [
    // Skip Next.js internals and all static asset files
    '/((?!_next|[^?]*\\\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for Clerk's internal auto-proxy endpoints
    '/__clerk/:path*',
    // Always run for API and tRPC routes
    '/(api|trpc)(.*)',
  ],
};`;

const CODE_GET_CURRENT_USER = `// lib/auth-service.ts
'use server';

import { auth, currentUser } from '@clerk/nextjs/server';
import { db } from '@/db';
import { week10Day2Users } from '@/db/schema';
import { eq } from 'drizzle-orm';

/**
 * Retrieves the local database integer PK (ID) for the authenticated Clerk user.
 * Automatically provisions (lazy-creates) a local user mirror row upon their first ever visit.
 */
export async function getCurrentUserId(): Promise<number | null> {
  // 1. Resolve Clerk session token from the secure request headers
  const { userId: clerkUserId } = await auth();

  // 🛡️ Guard 1: Return null instantly if no valid Clerk session is present
  // No subsequent lines of this function will ever execute if this block is entered.
  if (!clerkUserId) {
    return null;
  }

  // 2. Fetch the corresponding record from local PostgreSQL by Clerk ID (indexed column)
  const existingUser = await db
    .select({ id: week10Day2Users.id })
    .from(week10Day2Users)
    .where(eq(week10Day2Users.clerkId, clerkUserId))
    .limit(1);

  // 🛡️ Guard 2: If user snapshot is already found, return the integer ID instantly (Fast-path)
  // This is the hot-path (99.9% of requests). Exit here to save CPU and Network.
  if (existingUser.length > 0) {
    return existingUser.id;
  }

  // 3. Slow-path: First-time user detected. Get the heavy profile payload securely from Clerk
  const clerkUser = await currentUser();

  // 🛡️ Guard 3: Safe-fail by returning null if Clerk profile is unreachable
  if (!clerkUser) {
    return null;
  }

  // 4. Safely extract values and assign reliable fallbacks to prevent database constraints mismatch
  const primaryEmail = clerkUser.emailAddresses?.emailAddress || '';
  const fallbackName = clerkUser.fullName || clerkUser.firstName || 'Anonymous User';
  const avatarUrl = clerkUser.imageUrl || '';

  // 5. JIT provision the record in our local database, returning the freshly generated serial ID
  const newlyCreatedUser = await db
    .insert(week10Day2Users)
    .values({
      clerkId: clerkUser.id,
      emailSnapshot: primaryEmail,
      nameSnapshot: fallbackName,
      avatarUrlSnapshot: avatarUrl,
    })
    .returning({ id: week10Day2Users.id });

  return newlyCreatedUser?.[0]?.id || null;
}`;

const CODE_READ_ISOLATION = `// queries/projects.ts
export const getMyProjects = async () => {
  // A. Fetch current user id safely resolved on the server
  const currentUserId = await getCurrentUserId();
  
  if (!currentUserId) {
    throw new Error('UNAUTHORIZED_ACCESS_DENIED');
  }

  // B. Enforce multi-tenant data isolation directly in the SQL select query
  const projects = await db
    .select()
    .from(week9Projects)
    .where(eq(week9Projects.ownerId, currentUserId));

  return projects;
};`;

const CODE_DELETE_ISOLATION = `// actions/tasks.ts
'use server';

import { db } from '@/db';
import { week10Day2Tasks } from '@/db/schema';
import { getCurrentUserId } from '@/lib/auth-service';
import { eq, and } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';

export const deleteTask = async (taskId: number): Promise<ActionResult> => {
  try {
    const currentUserId = await getCurrentUserId();
    
    if (!currentUserId) {
      return { success: false, error: 'Authentication required.' };
    }

    // 🔒 DOUBLE LOCK: Match both the primary key AND the owner's integer ID
    const deletedRows = await db
      .delete(week10Day2Tasks)
      .where(
        and(
          eq(week10Day2Tasks.id, taskId),
          eq(week10Day2Tasks.userId, currentUserId) // 👈 核心防御
        )
      )
      .returning();

    // If rows array is empty, it means task didn't exist OR the user does not own it.
    // Fail silently or with a generic message to prevent ID scanning/enumeration.
    if (deletedRows.length === 0) {
      return { success: false, error: 'Task not found or access denied.' };
    }

    revalidatePath('/tasks');
    return { success: true };

  } catch (error) {
    console.error('SERVER_DELETE_TASK_CRASH:', error);
    return { success: false, error: 'Database transaction failed.' };
  }
};`;

const DIAGRAM_SAAS = `                              [ 用户在浏览器进行操作 ]
                                        │
                                        ▼
             [ 第一层拦截：proxy.ts ] ──▶ Clerk Middleware
                                        │ (仅拦截未登录用户)
                                        ▼
      [ 第二层拦截：Server Action / Server Component (PostgreSQL) ]
                                        │
                 ┌──────────────────────┴──────────────────────┐
                 ▼                                             ▼
       [ 身份识别 (Who are you) ]                     [ 业务授权 (What can you do) ]
         └─▶ auth() -> clerkUserId                      ├─▶ 查本地数据库 users.membership
         └─▶ getCurrentUserId() -> id                   ├─▶ 判断本月已建项目是否超出套餐上限
                                                        └─▶ 决定是否准许继续插入数据`;

// ==========================================
// ⚛️ UI 组件本体
// ==========================================

export default function AuthArchitectureNotes() {
  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4 md:px-8 font-sans text-slate-800">
      <div className="max-w-5xl mx-auto space-y-12">
        {/* Header */}
        <header className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
          <div className="flex items-center gap-3 mb-4 text-blue-600">
            <Lock className="w-8 h-8" />
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
              全栈进阶架构笔记 <span className="text-slate-300 mx-2">|</span> 第三板块
            </h1>
          </div>
          <h2 className="text-2xl font-bold text-slate-700 mb-4">
            Authentication & Access Control
          </h2>
          <p className="text-lg text-slate-600 leading-relaxed border-l-4 border-blue-500 pl-4 bg-blue-50/50 py-2 rounded-r-lg">
            本板块是全栈应用的<strong>“安全防火墙”与“多租户隔离中枢”</strong>
            。它不仅解决“当前用户是谁”的身份认证问题，更在物理数据库、Server Actions 业务逻辑中死守
            <strong>“你能看什么、能改什么”</strong>的越权防御底线。
          </p>
        </header>

        {/* Section 1: Clerk & proxy.ts */}
        <section className="space-y-6" id="clerk-proxy">
          <div className="flex items-center gap-2 border-b-2 border-slate-200 pb-2">
            <ShieldCheck className="w-6 h-6 text-emerald-600" />
            <h2 className="text-2xl font-bold">一、 Clerk 认证体系与 Next.js 16 路由保护</h2>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              <Server className="w-5 h-5 text-slate-500" />
              1.1 命名规范与架构演进：从 <code>middleware.ts</code> 变更为 <code>proxy.ts</code>
            </h3>
            <ul className="list-disc pl-6 space-y-2 text-slate-700">
              <li>
                <strong>物理位置</strong>：必须放置于项目根目录（与 <code>app</code> 目录平级，非{' '}
                <code>app</code> 文件夹内部）。
              </li>
              <li>
                <strong>弃用 API 警告</strong>：新版 Clerk 中，
                <strong>
                  <code>createRouteMatcher</code> 已经官方声明弃用 (Deprecated)
                </strong>
                。在工程实践中，绝对不要在最新代码中使用它。直接读取原生 <code>Request</code>{' '}
                对象中的 <code>pathname</code>{' '}
                进行匹配更加直观，能大幅降低构建工具对正则表达式解析的开销。
              </li>
            </ul>
          </div>

          <div className="bg-red-50 rounded-xl shadow-sm border-l-4 border-red-500 p-6 text-red-900">
            <h3 className="text-lg font-bold mb-3 flex items-center gap-2">
              <ShieldAlert className="w-6 h-6 text-red-600" />
              1.2 🚨 调试大坑：ngrok 代理或 Vercel Preview 下，Clerk 组件显示一片空白
            </h3>
            <div className="space-y-4">
              <p>
                <strong>踩坑真相</strong>：Clerk 带有极其严格的安全域（Allowed Origins）防护。当开启{' '}
                <code>ngrok</code> 本地公网隧道（例如 <code>https://xxxx.ngrok-free.app</code>
                ）进行多端/手机调试时，Clerk 客户端 JS 脚本加载时会校验宿主域名。如果发现当前的 Host
                来源不是你注册 App 时默认绑定的 <code>localhost:3000</code>，它会判定为潜在的
                CSRF（跨站请求伪造）安全威胁，
                <strong>
                  在跨域（CORS）握手时直接丢弃身份凭证和授权
                  Cookie，导致前端登录/注册卡片显示为一片空白
                </strong>
                。
              </p>
              <div className="bg-white/60 p-4 rounded-lg border border-red-200">
                <p className="font-bold mb-2">破案黄金法则：</p>
                <ol className="list-decimal pl-5 space-y-1">
                  <li>
                    <strong>配置白名单</strong>：在 <code>clerkMiddleware</code> 配置中加入{' '}
                    <code>authorizedParties</code> 显式白名单，放行你当前最新的整个 ngrok HTTPS
                    域名。
                  </li>
                  <li>
                    <strong>解绑登录路由</strong>：
                    <strong>绝不将登录、注册页面本身锁死在受保护路由中</strong>
                    。否则未登录用户访问触发拦截重定向，重定向又引回登录页，浏览器瞬间陷入{' '}
                    <strong>“重定向死循环”</strong> 导致白屏。
                  </li>
                  <li>
                    <strong>Vercel 部署报 500 崩溃</strong>：本地的 <code>.env.local</code>{' '}
                    严禁提交至 Git（Upwork 合作红线）。在 Vercel 部署后，必须手动在后台添加 Clerk
                    环境变量，且必须勾选 <strong>Preview</strong> 环境（开发分支通常部署为 Preview
                    状态），设置后需<strong>重新触发 Deployment</strong> 方能生效。
                  </li>
                </ol>
              </div>
            </div>
          </div>

          <div className="bg-slate-900 rounded-xl shadow-sm overflow-hidden">
            <div className="bg-slate-800 px-4 py-2 border-b border-slate-700 flex items-center gap-2">
              <Lightbulb className="w-4 h-4 text-yellow-400" />
              <span className="text-slate-200 font-mono text-sm">
                1.3 💡 黄金标准：proxy.ts 纯手工公开白名单拦截模板
              </span>
            </div>
            <pre className="p-4 overflow-x-auto text-sm text-slate-50 font-mono">
              <code>
                <CodeWindow code={CODE_PROXY_TS} />
              </code>
            </pre>
          </div>
        </section>

        {/* Section 2: Decoupling */}
        <section className="space-y-6" id="decoupling">
          <div className="flex items-center gap-2 border-b-2 border-slate-200 pb-2">
            <GitMerge className="w-6 h-6 text-purple-600" />
            <h2 className="text-2xl font-bold">二、 服务端与客户端身份解耦</h2>
          </div>
          <p className="text-slate-600">
            必须从<strong>运行环境</strong>、<strong>网络开销</strong>与<strong>安全边界</strong>
            三个维度将 Clerk 的三大核心 API 彻底解耦：
          </p>

          <div className="overflow-x-auto bg-white rounded-xl shadow-sm border border-slate-200">
            <table className="min-w-full divide-y divide-slate-200 text-sm">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-6 py-3 text-left font-bold text-slate-700">维度对比</th>
                  <th className="px-6 py-3 text-left font-bold text-slate-700">
                    <code>currentUser()</code>
                  </th>
                  <th className="px-6 py-3 text-left font-bold text-slate-700">
                    <code>auth()</code>
                  </th>
                  <th className="px-6 py-3 text-left font-bold text-slate-700">
                    <code>useUser()</code>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 bg-white text-slate-700">
                <tr>
                  <td className="px-6 py-4 font-bold bg-slate-50">运行宿主</td>
                  <td className="px-6 py-4">服务端 (Server Component / Action)</td>
                  <td className="px-6 py-4">服务端 (Action / Route Handler / Page)</td>
                  <td className="px-6 py-4">
                    客户端 (首行带 <code>'use client'</code>)
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 font-bold bg-slate-50">执行性质</td>
                  <td className="px-6 py-4 text-purple-600 font-medium">
                    异步 (需 <code>await</code>)
                  </td>
                  <td className="px-6 py-4 text-purple-600 font-medium">
                    异步 (需 <code>await</code>)
                  </td>
                  <td className="px-6 py-4 text-blue-600 font-medium">
                    React Hook (返回 <code>{'{ user, isLoaded }'}</code>)
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 font-bold bg-slate-50">网络开销</td>
                  <td className="px-6 py-4">
                    🐢 <strong>极重</strong>。触发外部网络请求，拉取包含邮箱、姓名、头像的完整对象。
                  </td>
                  <td className="px-6 py-4">
                    ⚡ <strong>极轻</strong>。仅本地解密 HTTP-Only Cookie 传入的 JWT
                    Token，不触发外部网络。
                  </td>
                  <td className="px-6 py-4">
                    🚂 <strong>极快</strong>。直接读取浏览器内存中的 Clerk 客户端缓存。
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 font-bold bg-slate-50">核心用途</td>
                  <td className="px-6 py-4">
                    服务端渲染<strong>展示</strong>丰富个人资料（如 <code>/profile</code>）。
                  </td>
                  <td className="px-6 py-4">
                    做<strong>安全阻断、写数据库外键、多租户隔离</strong>（提取唯一{' '}
                    <code>userId</code>）。
                  </td>
                  <td className="px-6 py-4">
                    仅用于<strong>前端 UI 级状态交互</strong>（如控制按钮 disabled、渲染头像）。
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 font-bold bg-slate-50">安全级别</td>
                  <td className="px-6 py-4 text-emerald-600">
                    ⭐️ ⭐️ ⭐️ ⭐️ ⭐️
                    <br />
                    (安全，无法篡改)
                  </td>
                  <td className="px-6 py-4 text-emerald-600">
                    ⭐️ ⭐️ ⭐️ ⭐️ ⭐️
                    <br />
                    (安全，无法篡改)
                  </td>
                  <td className="px-6 py-4 text-red-600">
                    ❌ <strong>零安全保障</strong>
                    <br />
                    一切 state 均可被伪造
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="bg-red-900 text-white rounded-xl shadow-lg p-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-20">
              <AlertTriangle className="w-24 h-24" />
            </div>
            <h3 className="text-xl font-bold mb-3 flex items-center gap-2 relative z-10">
              <AlertTriangle className="w-6 h-6 text-red-400" />
              🚨 铁闸红线（Upwork 独立开发生死线）
            </h3>
            <div className="relative z-10 space-y-2 text-red-100">
              <p>
                客户端 <code>useUser()</code> 拿到的数据<strong>只能用于显示 UI</strong>
                ，绝对、千万不能用来作为后端校验的参数。
              </p>
              <p>
                例如：一个删除 Task 的 Server Action，绝对不能接收从前端组件传过来的{' '}
                <code>userId</code>（如 <code>deleteTask(taskId, currentUserId)</code>）。
              </p>
              <div className="bg-black/30 p-4 rounded-lg border border-red-500/50 mt-4 font-bold text-white">
                黄金规范：所有涉及到写入和条件过滤的动作，必须在 Server Action
                的第一行，强行在服务端调用 <code>await auth()</code> 安全提取 clerkUserId！
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: Mirror Table & JIT */}
        <section className="space-y-6" id="mirror-table">
          <div className="flex items-center gap-2 border-b-2 border-slate-200 pb-2">
            <Database className="w-6 h-6 text-blue-600" />
            <h2 className="text-2xl font-bold">三、 本地 Users Mirror 表设计与极致控制流</h2>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <h3 className="text-xl font-bold mb-4">
              3.1 为什么不直接在业务表中关联 Clerk 的长字符串 ID？
            </h3>
            <ul className="space-y-3 text-slate-700 list-decimal pl-5">
              <li>
                <strong>物理查询性能差</strong>：在 PG 数据库中，使用长达 30-50 位的 varchar
                进行物理 <code>JOIN</code> 和索引，存储开销和查询速度远落后于 <code>integer</code>{' '}
                (自增整型)。
              </li>
              <li>
                <strong>解耦性极差</strong>：万一客户要求换掉 Clerk，改用 Auth.js 或 Supabase
                Auth，业务子表里的专属 <code>'user_...'</code> 标识会导致迁移成本等同于彻底重构。
              </li>
              <li className="bg-blue-50 p-4 rounded-lg border border-blue-100 mt-2">
                <strong>💎 工业标准解法（Mirror Table Pattern）</strong>：
                <ul className="list-disc pl-5 mt-2 space-y-1">
                  <li>
                    在本地数据库创建 <code>users</code> 表，主键使用自增的 <code>serial</code>
                    （整型）。
                  </li>
                  <li>
                    增加一列 <code>clerk_id</code>，定义为{' '}
                    <code>varchar(255).notNull().unique()</code> 承载 Clerk 唯一标识。
                  </li>
                  <li>
                    所有其他业务子表（如 <code>projects.ownerId</code>）在 Drizzle 中全部关联本地{' '}
                    <code>users.id</code>（整型外键）。
                  </li>
                </ul>
              </li>
            </ul>
          </div>

          <div className="bg-yellow-50 rounded-xl shadow-sm border border-yellow-200 p-6 text-slate-800">
            <h3 className="text-lg font-bold mb-3 flex items-center gap-2 text-yellow-800">
              <Zap className="w-5 h-5 text-yellow-600" />
              3.2 痛点复盘：return 卫语句（Early Return）的生命周期
            </h3>
            <p className="mb-2">
              <strong>破雾死律</strong>：在任何 JS/TS 函数中，
              <strong>
                <code>return</code> 语句被执行的那一瞬间，整个函数的生命周期就立即结束（暴毙）
              </strong>
              。其下方的任何查询、API、甚至 <code>console.log</code>，通通不准执行。
            </p>
            <p>
              <strong>不写 else 的“卫语句”写法</strong>：利用这个特性，不要用一层又一层的{' '}
              <code>else {'{ ... }'}</code> 去套用代码，让代码始终保持纵向扁平，极度易读。
            </p>
          </div>

          <div className="bg-slate-900 rounded-xl shadow-sm overflow-hidden">
            <div className="bg-slate-800 px-4 py-2 border-b border-slate-700 flex items-center gap-2">
              <Code2 className="w-4 h-4 text-blue-400" />
              <span className="text-slate-200 font-mono text-sm">
                🌟 getCurrentUserId() 终极 JIT 拦截器代码
              </span>
            </div>
            <pre className="p-4 overflow-x-auto text-sm text-slate-50 font-mono">
              <code>
                <CodeWindow code={CODE_GET_CURRENT_USER} />
              </code>
            </pre>
          </div>
        </section>

        {/* Section 4: Data Isolation (IDOR) */}
        <section className="space-y-6" id="data-isolation">
          <div className="flex items-center gap-2 border-b-2 border-slate-200 pb-2">
            <Lock className="w-6 h-6 text-rose-600" />
            <h2 className="text-2xl font-bold">四、 🚨 终极安全防线：多租户用户数据隔离 (IDOR)</h2>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <h3 className="text-lg font-bold text-rose-600 mb-2">4.1 安全防御不属于前端 CSS/UI</h3>
            <p className="text-slate-700">
              <strong>致命误区</strong>：在 React 里通过{' '}
              <code>if (user.id === project.ownerId)</code>{' '}
              隐藏“删除”按钮防君子不防小人。攻击者在控制台调用 <code>deleteProject(99)</code>{' '}
              就能越权删库。
            </p>
          </div>

          <h3 className="text-xl font-bold mt-8 mb-4 flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-600" />
            4.2 100% 绝对安全的 CRUD 用户隔离防御标准
          </h3>

          <div className="flex flex-col gap-6">
            {/* Read Isolation */}
            <div className="bg-slate-900 rounded-xl shadow-sm overflow-hidden flex flex-col">
              <div className="bg-emerald-900/50 px-4 py-3 border-b border-emerald-700/50 flex items-center gap-2">
                <span className="text-emerald-100 font-bold">【读】数据隔离 (Read)</span>
              </div>
              <div className="p-4 bg-emerald-50 text-emerald-900 text-sm border-b border-emerald-100">
                绝不使用“查出全表再在 JS 侧 filter”的做法。
                <strong>必须直接在 PostgreSQL 层面通过 WHERE 条件卡死查询。</strong>
              </div>
              <pre className="p-4 overflow-x-auto text-xs text-slate-50 font-mono flex-grow">
                <code>
                  <CodeWindow code={CODE_READ_ISOLATION} />
                </code>
              </pre>
            </div>

            {/* Delete/Update Isolation */}
            <div className="bg-slate-900 rounded-xl shadow-sm overflow-hidden flex flex-col">
              <div className="bg-rose-900/50 px-4 py-3 border-b border-rose-700/50 flex items-center gap-2">
                <span className="text-rose-100 font-bold">【删/改】隔离 (Delete/Update)</span>
              </div>
              <div className="p-4 bg-rose-50 text-rose-900 text-sm border-b border-rose-100">
                <strong>双条件联合物理锁</strong>：在 <code>where</code> 中，强制将主键{' '}
                <code>id</code> 与解析出的 <code>userId</code> 作为一个 <code>and</code>{' '}
                条件联合提交。
              </div>
              <pre className="p-4 overflow-x-auto text-xs text-slate-50 font-mono flex-grow">
                <code>
                  <CodeWindow code={CODE_DELETE_ISOLATION} />
                </code>
              </pre>
            </div>
          </div>
        </section>

        {/* Section 5: SaaS Boundaries */}
        <section className="space-y-6" id="saas-boundaries">
          <div className="flex items-center gap-2 border-b-2 border-slate-200 pb-2">
            <Database className="w-6 h-6 text-indigo-600" />
            <h2 className="text-2xl font-bold">五、 SaaS 会员权限控制归属</h2>
          </div>
          <p className="text-slate-700 font-medium">
            记住以下这套生产环境的<strong>“双轨制”标准 SaaS 数据归宿模式</strong>：
          </p>

          <div className="bg-indigo-950 text-indigo-200 p-6 rounded-xl overflow-x-auto font-mono text-sm leading-relaxed whitespace-pre shadow-inner">
            <CodeWindow code={DIAGRAM_SAAS} />
          </div>

          <div className="grid md:grid-cols-2 gap-6 mt-6">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
              <h3 className="font-bold text-lg mb-3 flex items-center gap-2 text-blue-700">
                <ShieldCheck className="w-5 h-5" /> Clerk 负责：身份主权
              </h3>
              <ul className="list-disc pl-5 space-y-2 text-slate-600 text-sm">
                <li>管理 Session 会话</li>
                <li>账号密码 / 邮箱验证</li>
                <li>第三方 OAuth（Google/GitHub）登录注册</li>
                <li>分发全网唯一的身份标识 ID (clerkUserId)</li>
              </ul>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
              <h3 className="font-bold text-lg mb-3 flex items-center gap-2 text-emerald-700">
                <Database className="w-5 h-5" /> PostgreSQL 负责：业务授权
              </h3>
              <ul className="list-disc pl-5 space-y-2 text-slate-600 text-sm">
                <li>管理本地自增的整数型用户 ID</li>
                <li>会员付费等级（Free/VIP/Pro）</li>
                <li>消费账单流水与 Quota (用量上限) 限制</li>
                <li>任务关系、项目归属等本地关联外键映射</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section 6: Webhooks */}
        <section className="space-y-6" id="webhooks">
          <div className="flex items-center gap-2 border-b-2 border-slate-200 pb-2">
            <Zap className="w-6 h-6 text-amber-500" />
            <h2 className="text-2xl font-bold">六、 💡 Webhook 最终数据一致性防坑</h2>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <h3 className="font-bold text-lg mb-2">
              6.1 什么是最终一致性 (Eventual Consistency)？
            </h3>
            <p className="text-slate-600 leading-relaxed">
              用户在 Clerk 修改了用户名。由于 Clerk 与你的 PostgreSQL
              是独立的两个服务器，不可能在一个事务里同时成功。Clerk 会后台发送异步 Webhook{' '}
              <code>user.updated</code> 到
              Next.js。这其中的“延迟差”导致数据短暂不一致，但在工业上完全接受，称为
              <strong>“最终一致性”</strong>。
            </p>
          </div>

          <div className="bg-amber-50 rounded-xl shadow-sm border border-amber-200 p-6">
            <h3 className="text-xl font-bold text-amber-900 mb-4 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-amber-600" />
              6.2 Webhook 必记三死律：
            </h3>
            <div className="space-y-4">
              <div className="bg-white p-4 rounded-lg border border-amber-100 shadow-sm">
                <strong className="text-amber-800 text-lg">
                  1. 签名校验 (Signature Verification)
                </strong>
                <p className="text-slate-700 mt-1">
                  必须使用 <code>svix</code> 库验证请求头签名。
                  <strong>绝对不能裸写 API 直接吞下数据</strong>，否则黑客可以伪造上万条假 JSON
                  瞬间打爆你的 PostgreSQL。
                </p>
              </div>
              <div className="bg-white p-4 rounded-lg border border-amber-100 shadow-sm">
                <strong className="text-amber-800 text-lg">2. 幂等处理 (Idempotency)</strong>
                <p className="text-slate-700 mt-1">
                  网络请求超时会导致 Clerk 重发相同事件。如果每次都 <code>insert</code>{' '}
                  必定触发唯一键冲突报错。
                  <strong>必须写成 upsert (存在即更新，不存在才插入) 逻辑。</strong>
                </p>
              </div>
              <div className="bg-white p-4 rounded-lg border border-amber-100 shadow-sm">
                <strong className="text-amber-800 text-lg">3. 兜底机制 (Fail-Safe Fallback)</strong>
                <p className="text-slate-700 mt-1">
                  服务器维护可能导致 Webhook 意外丢失。因此，上文核心逻辑中{' '}
                  <code>getCurrentUserId()</code> 的 <strong>JIT 按需自动同步</strong>
                  ，是防止业务瘫痪的最坚固底层保险。
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
