import { CodeWindow } from '@/components/CodeWindow';
import React from 'react';

export default function FullStackArchitectureNotes() {
  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8 text-slate-800 font-sans">
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Header */}
        <header className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4 flex items-center gap-3">
            <span>🛠️</span> 全栈进阶架构笔记：Full-Stack CRUD 与核心链路
          </h1>
          <p className="text-slate-600 leading-relaxed text-lg">
            这个板块是全栈应用的核心<strong>数据链路与组件架构</strong>。这里记录了曾让你苦恼数周的
            “表单静默失败”、“TS 严格类型冲突”、“想得脑壳子疼的组件拆分”等痛点。
            <br />
            <strong>目的：</strong>在之后的独立开发中，凡是表单交互与错误处理、Drizzle
            关联查询、或者是 Client/Server 组件边界划分的坑，一查此笔记立刻就能跳出来，3 秒破案！
          </p>
        </header>

        {/* 目录速查 */}
        <nav className="bg-slate-900 text-slate-100 p-6 rounded-2xl shadow-lg sticky z-10 ">
          <h2 className="text-xl font-bold mb-4">📑 速查目录 (点击直达痛点)</h2>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
            <li>
              <a href="#section-1" className="hover:text-blue-400 transition">
                一、 RHF + Zod 前后端双端校验架构与双向数据流
              </a>
            </li>
            <li>
              <a href="#section-2" className="hover:text-blue-400 transition">
                二、 🚨 史诗级天坑：表单“静默失败”防御法
              </a>
            </li>
            <li>
              <a href="#section-3" className="hover:text-blue-400 transition">
                三、 🚀 核心技术：服务端报错统一形状，前端一键自动回显
              </a>
            </li>
            <li>
              <a href="#section-4" className="hover:text-blue-400 transition">
                四、 🚨 并发竞态避坑：不要使用“先查再插”的预查询模式
              </a>
            </li>
            <li>
              <a href="#section-5" className="hover:text-blue-400 transition">
                五、 数据传递与 RHF 状态同步里的“思维暗礁”
              </a>
            </li>
            <li>
              <a href="#section-6" className="hover:text-blue-400 transition">
                六、 🏆 终极完整实战模板 (创建/编辑双用完美版)
              </a>
            </li>
            <li>
              <a href="#section-7" className="hover:text-blue-400 transition">
                七、 Drizzle 关联查询 API 终极对账单 (With vs Join)
              </a>
            </li>
            <li>
              <a href="#section-8" className="hover:text-blue-400 transition">
                八、 ⚡ Drizzle + PostgreSQL Quick Reference Cheatsheet
              </a>
            </li>
            <li className="md:col-span-2 mt-2 pt-2 border-t border-slate-700">
              <a
                href="#section-9"
                className="hover:text-rose-400 transition font-bold text-rose-300"
              >
                九、 🧠 架构心法：Client/Server 物理边界与状态提升 (Lifting State Up)
              </a>
            </li>
          </ul>
        </nav>

        {/* 一、 RHF + Zod 前后端双端校验架构 */}
        <section
          id="section-1"
          className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200"
        >
          <h2 className="text-2xl font-bold border-b-2 border-blue-500 pb-2 mb-6">
            一、 RHF + Zod 前后端双端校验架构与双向数据流
          </h2>
          <div className="space-y-6">
            <div className="bg-blue-50 p-5 rounded-lg border border-blue-100">
              <h3 className="font-bold text-blue-800 mb-3 text-lg">1.1 双端防线的核心职责</h3>
              <ul className="list-disc pl-5 space-y-2 text-slate-700">
                <li>
                  <strong>
                    前端校验（通过 RHF + <code>zodResolver</code>）
                  </strong>
                  ：目的是 <strong>“极佳的用户体验（UX）”</strong>
                  。在浏览器侧当场拦截非法格式，不发起网络请求，避免浪费服务器带宽，秒回红字。
                </li>
                <li>
                  <strong>
                    服务端校验（Server Actions <code>safeParse</code>）
                  </strong>
                  ：目的是 <strong>“系统安全（Defense-in-Depth）”</strong>
                  。前端校验极度脆弱（可被禁用 JS、伪造 Postman 请求绕过）。服务端的二次 safeParse
                  校验是防止脏数据落库的最后一道钢筋防线。
                </li>
              </ul>
            </div>

            <div className="bg-amber-50 p-5 rounded-lg border border-amber-200">
              <h3 className="font-bold text-amber-800 mb-3 text-lg">
                1.2 💡 黄金总结：RHF 的 onChange 触发规律
              </h3>
              <ol className="list-decimal pl-5 space-y-2 text-slate-700">
                <li>
                  表单初次打开时，默认是 <code>onSubmit</code> 模式。用户一边打字，它是{' '}
                  <strong>不触发</strong> 任何校验红字的。
                </li>
                <li>
                  一旦用户点击了 Submit 按钮，且某个字段（如 <code>email</code>）验证失败进了{' '}
                  <code>errors</code> 状态后，
                  <strong>
                    RHF 会对该出错字段自动切换为 <code>onChange</code> 实时监测模式
                  </strong>
                  。之后每输入一个字符，都会实时重新校验，直到红字消失，极大提升体验。
                </li>
                <li>
                  <strong>每个字段独立管理</strong>：<code>email</code>{' '}
                  报过错，它就切换为实时校验；而隔壁还没出过错的 <code>name</code>{' '}
                  依然是等提交才校验，互不干扰。
                </li>
              </ol>
            </div>
          </div>
        </section>

        {/* 二、 表单“静默失败” */}
        <section
          id="section-2"
          className="bg-white p-8 rounded-2xl shadow-sm border-l-8 border-l-red-500"
        >
          <h2 className="text-2xl font-bold pb-2 mb-4 text-red-600">
            二、 🚨 史诗级天坑：表单“静默失败”（点击提交毫无反应）
          </h2>

          <div className="space-y-4">
            <p>
              <strong>崩溃现场：</strong>点击创建按钮，页面没报错，控制台没日志，
              <code>onSubmit</code> 第一行的 console.log 也没有任何输出，仿佛点击事件根本没有触发。
            </p>
            <p>
              <strong>踩坑真相（表单契约不一致）：</strong>后端 Zod 规定了必填字段，但画页面时：1.
              你漏写了这个输入框；2. 写了却忘了 <code>...register('description')</code>。此时 RHF
              忠实地在后台跑 Zod 发现隐形字段校验失败，于是默默拦截，导致可怕的“静默挂起”。
            </p>

            <div className="bg-slate-900 rounded-lg p-5 overflow-x-auto text-sm text-green-400">
              <p className="text-yellow-400 font-bold mb-2">
                🛠️ 终极避坑黄金模板：handleSubmit 双参数防御法
              </p>
              <pre>
                <CodeWindow
                  code={`// ❌ 错误示范：只写一个 onSubmit，发生字段漏写时两眼一抹黑
<form onSubmit={handleSubmit(onSubmit)}>

// ✅ 正确规范：无条件带上 invalidCallback 调试函数！
const onInvalid = (errors: any) => {
  console.error("🚨 表单校验拦截！存在不合规或未绑定的字段:", errors);
  toast.error("表单输入有误，请检查控制台");
};

// 将其绑定到 onSubmit
<form onSubmit={handleSubmit(onSubmit, onInvalid)}>`}
                />
              </pre>
            </div>
            <p className="text-sm text-slate-500 italic">
              调试法则：点击按钮只要没日志，先看控制台。只要这行 onInvalid
              一加，漏了什么、错在哪个幽灵字段，一目了然，3秒破案！
            </p>
          </div>
        </section>

        {/* 三、 服务端报错统一形状，前端一键自动回显 */}
        <section
          id="section-3"
          className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200"
        >
          <h2 className="text-2xl font-bold border-b-2 border-emerald-500 pb-2 mb-6">
            三、 🚀 核心技术：服务端报错统一形状，前端一键自动回显
          </h2>
          <p className="mb-4 text-slate-700">
            <strong>极度高级的架构师方案：</strong>将所有类型的错误（Zod 校验 /
            数据库查重）在服务端转换成一模一样的“形状”，前端利用 Object.entries
            循环统一对账回显，100个字段也不用写一个 if。
          </p>

          <div className="space-y-6">
            <div>
              <h3 className="font-bold text-lg mb-2">3.1 统一的错误“形状”定义 (Server Action)</h3>
              <div className="bg-slate-900 rounded-lg p-5 overflow-x-auto text-sm text-slate-300">
                <pre>
                  <CodeWindow
                    code={`export type ActionResult<T = void> = 
  | { success: true; data?: T }
  | { success: false; fieldErrors?: Record<string, string[]>; error?: string };

'use server';
export const createProject = async (data: ProjectFormInput): Promise<ActionResult> => {
  // A. 第一关：Zod 服务端格式安全校验
  const res = projectSchema.safeParse(data);
  if (!res.success) {
    // 形状就是：{ name: ['too short'], budget: ['must be positive'] }
    return { success: false, fieldErrors: res.error.flatten().fieldErrors }; 
  }
  
  // 🎯 核心纪律：校验通过后，后续一律使用 values（清洗后的类型），绝不使用原始 data!
  const values = res.data;

  try {
    // B. 第二关：数据库查重业务校验 (故意拼装成和 Zod 一模一样的形状！)
    const existingTitle = await db.select().from(projects).where(eq(projects.title, values.title));
    if (existingTitle) {
      return { success: false, fieldErrors: { title: ['Current project title already exists'] } };
    }

    // C. 真正安全插库
    await db.insert(projects).values({ title: values.title, budget: String(values.budget) });
    revalidatePath('/dashboard'); 
    return { success: true };
  } catch (error) {
    // 防止敏感 SQL 结构泄露给前端
    return { success: false, error: 'Database crash, please contact admin' };
  }
};`}
                  />
                </pre>
              </div>
            </div>

            <div>
              <h3 className="font-bold text-lg mb-2 flex items-center gap-2">
                <span className="bg-red-100 text-red-600 px-2 py-1 text-xs rounded">🚨 避坑</span>
                3.2 前端 onSubmit 里的 Object.entries 终极模版
              </h3>
              <p className="text-sm text-slate-600 mb-3">
                TS 在 `setError(key, ...)` 时会报红，因为 Object.entries 出来的 key 是宽泛 string。
                <strong>必须加两层保护：1. 判断非空收窄类型；2. 使用 as keyof 强转。</strong>
              </p>
              <div className="bg-slate-900 rounded-lg p-5 overflow-x-auto text-sm text-slate-300">
                <pre>
                  <CodeWindow
                    code={`const onSubmit = async (data: ProjectFormInput) => {
  try {
    const res = await createProject(data);
    if (!res.success) {
      const fieldErrors = res.fieldErrors;
      
      // 1. 第一步类型收窄：必须判断非空，防止 entries(undefined) 崩溃
      if (fieldErrors) {
        // 2. 第二步批量回显：前端代码一行都不需要多写！
        Object.entries(fieldErrors).forEach(([key, messages]) => {
          if (messages && messages.length > 0) {
            setError(key as keyof ProjectFormInput, { message: messages[0] });
          }
        });
      }
      // 3. 第三步处理非字段型的系统大报错
      if (res.error) toast.error(res.error);
      return; // 🛑 拦截成功，必须 return，决不能继续往下执行!
    }

    // 4. 成功分支
    toast.success('Project created successfully!');
    reset(); router.refresh();
  } catch (error) { ... }
};`}
                  />
                </pre>
              </div>
            </div>
          </div>
        </section>

        {/* 四、 并发避坑：不要使用“先查再插” */}
        <section
          id="section-4"
          className="bg-white p-8 rounded-2xl shadow-sm border-l-8 border-l-orange-500"
        >
          <h2 className="text-2xl font-bold pb-2 mb-4 text-orange-600">
            四、 🚨 并发避坑：不要使用“先查再插”的预查询模式
          </h2>
          <p className="mb-4">
            这叫 <strong>并发竞态条件（Race Condition）</strong> 漏洞。如果 Alice 和 Bob
            同时提交重名记录，两人的 SELECT 都发现库里没名字，接着两人都执行 INSERT 导致脏数据或系统
            500 崩溃。
          </p>
          <div className="bg-orange-50 p-5 rounded-lg border border-orange-200 space-y-3">
            <h3 className="font-bold text-orange-800 text-lg">
              🛡️ 唯一性校验最佳实践：Drizzle Try/Catch postgres-23505
            </h3>
            <p className="text-slate-700">
              数据库才是守住一致性的唯一铁闸。必须建立物理建表的 <code>Unique Index</code>
              ，并在写入时捕获 Postgres 抛出的 <strong>23505 唯一冲突错误</strong>，优雅翻译给前端。
            </p>
            <div className="bg-slate-900 rounded-lg p-5 overflow-x-auto text-sm text-slate-300">
              <pre>
                <code>
                  <CodeWindow
                    code={`// Drizzle Schema 端：建立物理索引守护
export const projects = pgTable('projects', {
  id: serial('id').primaryKey(),
  title: varchar('title', { length: 100 }).notNull(),
}, (table) => [
  uniqueIndex('projects_title_unique').on(table.title)
]);

// Server Action 写入端
try {
  await db.insert(projects).values({ title: values.title });
} catch (error: any) {
  // 🎯 检查是不是 postgres 唯一性限制码 '23505'
  if (error.code === '23505' || error.cause?.code === '23505') {
    return { success: false, fieldErrors: { title: ['This project title is already taken.'] } };
  }
  throw error; // 其他未知数据库报错继续抛给外层 catch
}`}
                  />
                </code>
              </pre>
            </div>
          </div>
        </section>

        {/* 五、 数据传递与 RHF 状态同步 */}
        <section
          id="section-5"
          className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200"
        >
          <h2 className="text-2xl font-bold border-b-2 border-indigo-500 pb-2 mb-6">
            五、 数据传递与 RHF 状态同步里的“思维暗礁”
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-slate-50 p-5 rounded-lg border border-slate-200">
              <h3 className="font-bold text-indigo-700 mb-2">
                5.1 🚨 内存属性绝不 <code>await</code> 规范
              </h3>
              <p className="text-sm text-slate-600 mb-2">
                你曾写过 <code>await res.error?.fieldErrors</code>。这是严重脑雾！
              </p>
              <p className="text-sm text-slate-700 bg-white p-3 rounded shadow-sm border-l-4 border-indigo-400">
                <strong>心法：</strong>只有返回类型是 <code>Promise</code> 的操作才加
                await。当数据已被 await 拿到（res 已到手），通过 <code>.</code> 读属性是光速的，
                <strong>永远、千万不要在属性前写 await！</strong>
              </p>
            </div>

            <div className="bg-slate-50 p-5 rounded-lg border border-slate-200">
              <h3 className="font-bold text-indigo-700 mb-2">
                5.2 RHF reset() 在编辑时的“失灵”假象
              </h3>
              <p className="text-sm text-slate-600 mb-2">
                在弹窗里改了值点 Reset 没反应？因为它是回滚到 <code>initialData</code>{' '}
                (defaultValues)。
              </p>
              <p className="text-sm text-slate-700 bg-white p-3 rounded shadow-sm border-l-4 border-indigo-400">
                <strong>解决：</strong>编辑模式下将按钮重命名为“取消”直接关窗；或在 reset 同时加一句{' '}
                <code>toast.success("已恢复到初始数据")</code> 消除用户疑惑。
              </p>
            </div>
          </div>

          <div className="mt-6 bg-slate-50 p-5 rounded-lg border border-slate-200">
            <h3 className="font-bold text-indigo-700 mb-3 flex items-center gap-2">
              <span>🎛️</span> 5.3 Controller 桥接器双向接线心诀 (Shadcn UI 必用)
            </h3>
            <p className="text-sm text-slate-600 mb-3">
              Shadcn 复杂的自定义 DOM 绝对不吃原生的 <code>{`{...register('category')}`}</code>
              。必须靠 <code>Controller</code>！
            </p>
            <div className="bg-slate-900 rounded-lg p-5 overflow-x-auto text-sm text-slate-300">
              <pre>
                <code>
                  <CodeWindow
                    code={`<Controller
  name="category"
  control={control} // 别忘了从 useForm 解构出 control
  render={({ field }) => ( // 注意：必须是 ({ field }) 解构
    <Select
      onValueChange={field.onChange} // 💡 往外送：用户选了新值，调用此函数写回 RHF
      value={field.value || ''}      // 💡 往内拉：显示当前 RHF 表单内的最新状态
    >
      <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
      ...
    </Select>
  )}
/>`}
                  />
                </code>
              </pre>
            </div>
          </div>
        </section>

        {/* 六、 终极完整实战模板 */}
        <section id="section-6" className="bg-slate-900 text-slate-50 p-8 rounded-2xl shadow-xl">
          <h2 className="text-2xl font-bold border-b-2 border-slate-700 pb-2 mb-6 text-yellow-400 flex items-center gap-2">
            <span>🏆</span> 六、 第二板块终极完整实战模板 (创建/编辑双用周五闭环版)
          </h2>
          <p className="text-slate-300 mb-4">
            将以上所有痛点揉碎，这是一套完美的 <strong>ProjectForm</strong>{' '}
            终极防御模板。写项目时直接对照它写：
          </p>
          <div className="rounded-lg overflow-x-auto text-sm bg-black p-6 border border-slate-700 font-mono text-slate-300">
            <pre>
              <code>
                <CodeWindow
                  code={`'use client';

import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
// UI 组件略...
import { createProject, updateProject } from '@/actions/project-action';

interface ProjectFormProps {
  initialData?: ProjectSelect; // 区分编辑与创建
  onSuccess?: () => void;      // 编辑成功通知父级关窗
}

const ProjectForm = ({ initialData, onSuccess }: ProjectFormProps) => {
  const router = useRouter();

  const { register, handleSubmit, reset, setError, control, formState: { errors, isSubmitting } } = useForm<ProjectFormInput>({
    resolver: zodResolver(projectSchema),
    // 💡 兜底策略：避免 Uncontrolled 警告，绝不给 undefined
    defaultValues: initialData 
      ? { title: initialData.title, category: initialData.category, budget: Number(initialData.budget) }
      : { title: '', category: '' as any, budget: 0 },
  });

  const onSubmit = async (data: ProjectFormInput) => {
    try {
      // 💡 智能路由：根据 initialData 决定行动
      const res = initialData ? await updateProject(initialData.id, data) : await createProject(data);

      if (!res.success) {
        if (res.fieldErrors) {
          Object.entries(res.fieldErrors).forEach(([key, messages]) => {
            if (messages?.length) setError(key as keyof ProjectFormInput, { message: messages[0] });
          });
        }
        if (res.error) toast.error(res.error);
        return; // 🛑 失败拦截
      }

      toast.success(initialData ? '项目更新成功' : '项目创建成功');
      initialData ? onSuccess?.() : reset();
      router.refresh(); 

    } catch (error) { toast.error('网络发生非预期崩溃'); }
  };

  const onInvalid = (errors: any) => console.error('🚨 表单本地拦截:', errors);

  return (
    <form onSubmit={handleSubmit(onSubmit, onInvalid)} className="space-y-4">
      {/* Input */}
      <Input {...register('title')} placeholder="请输入名称" />
      {errors.title && <p className="text-red-500">{errors.title.message}</p>}

      {/* Select (Controller) */}
      <Controller
        name="category" control={control}
        render={({ field }) => (
          <Select onValueChange={field.onChange} value={field.value}>...略...</Select>
        )}
      />

      {/* Number Input：注意 valueAsNumber */}
      <Input type="number" {...register('budget', { valueAsNumber: true })} />
      
      {/* Actions */}
      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? '处理中...' : initialData ? '更新' : '提交'}
      </Button>
    </form>
  );
};
export default ProjectForm;`}
                />
              </code>
            </pre>
          </div>
        </section>

        {/* 七、 Drizzle 关联查询 API 对账单 */}
        <section
          id="section-7"
          className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200"
        >
          <h2 className="text-2xl font-bold border-b-2 border-violet-500 pb-2 mb-6">
            七、 Drizzle 关联查询 API 终极对账单 (With vs Join)
          </h2>

          <div className="space-y-8">
            {/* API 1 */}
            <div>
              <h3 className="font-bold text-xl text-violet-800 mb-3">
                🛠️ 第一轨：Relational Query API (以 with 查立体数据)
              </h3>
              <p className="text-slate-700 mb-2">
                <strong>核心特色：</strong>自动组装立体嵌套对象，开发体验极佳。必须在 schema
                显式定义 <code>relations</code>！
              </p>
              <div className="bg-slate-900 rounded-lg p-5 overflow-x-auto text-sm text-slate-300 mb-3">
                <pre>
                  <code>
                    <CodeWindow
                      code={`// 💡 避坑铁律：中间层绝不能省！查 users 到底层 tasks，必须经过 projects
const userWithDeepDetails = await db.query.users.findFirst({
  where: eq(users.id, userId),
  with: {
    projects: {      // 第二级：藤
      with: {
        tasks: true, // 第三级：瓜 (必须顺藤摸瓜)
      }
    }
  }
});`}
                    />
                  </code>
                </pre>
              </div>
            </div>

            {/* API 2 */}
            <div>
              <h3 className="font-bold text-xl text-violet-800 mb-3 flex items-center gap-2">
                🛠️ 第二轨：SQL-Style Query API (以 leftJoin/innerJoin 查扁平数据)
              </h3>
              <p className="text-slate-700 mb-2">
                <strong>核心特色：</strong>传统 SQL 思维。执行 select +
                join，完全不需要提前在代码里定义 relations！
              </p>
              <div className="bg-red-50 p-4 rounded border border-red-200 mb-3">
                <p className="font-bold text-red-700">
                  ⚡ 终极天坑：同一张表 Join 两次时的「物理重名歧义」
                </p>
                <p className="text-sm text-red-600">
                  如果有 owner_id 和 reviewer_id 同时指向 users 表，直接 leftJoin
                  会崩溃报重名冲突。必须使用 <strong>alias 别名大法！</strong>
                </p>
              </div>
              <div className="bg-slate-900 rounded-lg p-5 overflow-x-auto text-sm text-slate-300">
                <pre>
                  <code>
                    <CodeWindow
                      code={`import { alias } from 'drizzle-orm/pg-core';

// 1. 声明两个完全独立的 TypeScript 别名对象
const ownerTable = alias(users, 'project_owners');
const reviewerTable = alias(users, 'project_reviewers');

const result = await db.select({
    projectId: projects.id,
    ownerName: ownerTable.name,       // 2. 将数据降维扁平化
    reviewerName: reviewerTable.name,
  })
  .from(projects)
  // 3. eq 内部必须严格使用【别名表对象】，绝不能使用原表 users
  .leftJoin(ownerTable, eq(projects.ownerId, ownerTable.id))
  .leftJoin(reviewerTable, eq(projects.reviewerId, reviewerTable.id));`}
                    />
                  </code>
                </pre>
              </div>
            </div>

            {/* 对比表格 */}
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse rounded-lg overflow-hidden shadow-sm">
                <thead>
                  <tr className="bg-slate-800 text-white text-sm">
                    <th className="p-4 w-1/4">对比维度</th>
                    <th className="p-4 w-3/8 border-l border-slate-700">Relational (with)</th>
                    <th className="p-4 w-3/8 border-l border-slate-700">SQL-Style (join)</th>
                  </tr>
                </thead>
                <tbody className="text-sm text-slate-700 bg-white">
                  <tr className="border-b border-slate-200 hover:bg-slate-50">
                    <td className="p-4 font-bold bg-slate-50">返回数据形状</td>
                    <td className="p-4 border-l border-slate-200">立体层级结构 (如 tasks: [])</td>
                    <td className="p-4 border-l border-slate-200">完全扁平化结构</td>
                  </tr>
                  <tr className="border-b border-slate-200 hover:bg-slate-50">
                    <td className="p-4 font-bold bg-slate-50">是否依赖 relations()</td>
                    <td className="p-4 border-l border-slate-200 text-red-600 font-bold">
                      ❌ 必须定义，不写建不了树
                    </td>
                    <td className="p-4 border-l border-slate-200 text-green-600 font-bold">
                      ⚙️ 完全不依赖，只看字段
                    </td>
                  </tr>
                  <tr className="border-b border-slate-200 hover:bg-slate-50">
                    <td className="p-4 font-bold bg-slate-50">多外键冲突处理</td>
                    <td className="p-4 border-l border-slate-200">靠 relationName 命名对账</td>
                    <td className="p-4 border-l border-slate-200 text-blue-600 font-bold">
                      靠 TS 声明 alias() 临时别名
                    </td>
                  </tr>
                  <tr className="hover:bg-slate-50">
                    <td className="p-4 font-bold bg-slate-50">
                      最适业务场景 <br />
                      (💡 Upwork 选型口诀)
                    </td>
                    <td className="p-4 border-l border-slate-200 font-medium">
                      “查树状带去页面直接 map”
                      <br />
                      (实体详情页)
                    </td>
                    <td className="p-4 border-l border-slate-200 font-medium">
                      “做统计、列筛选、拼宽表”
                      <br />
                      (数据大表格/搜索过滤)
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* 八、 Drizzle + PostgreSQL Cheatsheet */}
        <section
          id="section-8"
          className="bg-sky-900 text-slate-50 p-8 rounded-2xl shadow-xl border border-sky-800"
        >
          <h2 className="text-2xl font-bold border-b-2 border-sky-700 pb-2 mb-6 flex items-center gap-2">
            <span>⚡</span> 八、 Drizzle + PostgreSQL Quick Reference
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-mono text-sm">
            <div className="bg-black/40 p-5 rounded-lg border border-sky-800">
              <h3 className="text-sky-300 font-bold mb-3 uppercase tracking-wider text-xs">
                Standard CRUD Flow Map
              </h3>
              <ul className="text-slate-300 space-y-1">
                <li>1. Form data</li>
                <li>2. → Server Action</li>
                <li>
                  3. → <span className="text-green-400">safeParse</span>
                </li>
                <li>4. → Database check (e.g. Duplicates)</li>
                <li>5. → db.insert / update / delete</li>
                <li>
                  6. → <span className="text-blue-400">revalidatePath</span>
                </li>
                <li>7. → Return errors or success</li>
              </ul>
            </div>

            <div className="bg-black/40 p-5 rounded-lg border border-sky-800">
              <h3 className="text-sky-300 font-bold mb-3 uppercase tracking-wider text-xs">
                Basic CRUD Syntax
              </h3>
              <pre className="text-slate-300">
                <code>
                  <CodeWindow
                    code={`// Read
await db.select().from(products);

// Insert
await db.insert(products).values(data);

// Update 🚨 ALWAYS USE WHERE!
await db.update(products)
  .set(data)
  .where(eq(products.id, id));

// Delete 🚨 ALWAYS USE WHERE!
await db.delete(products)
  .where(eq(products.id, id));`}
                  />
                </code>
              </pre>
            </div>

            <div className="bg-black/40 p-5 rounded-lg border border-sky-800 md:col-span-2">
              <h3 className="text-sky-300 font-bold mb-3 uppercase tracking-wider text-xs flex items-center gap-2">
                <span>⚠️</span> Important Warning
              </h3>
              <p className="text-red-400 font-sans font-bold bg-red-900/30 p-3 rounded">
                An update without <code className="bg-black px-1 rounded">where</code> may update
                every row. A delete without <code className="bg-black px-1 rounded">where</code> may
                delete every row!
              </p>
            </div>
          </div>
        </section>

        {/* 九、 架构心法：Client vs. Server Component 物理边界 与 状态提升 */}
        <section
          id="section-9"
          className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200"
        >
          <h2 className="text-2xl font-bold border-b-2 border-rose-500 pb-2 mb-6 flex items-center gap-2 text-rose-600">
            <span>🧠</span> 九、 架构心法：Client/Server 物理边界与状态提升
          </h2>

          <div className="mb-6">
            <p className="text-slate-700 leading-relaxed mb-4">
              这个板块是你曾经历过从<strong>“想得脑壳子疼，甚至突然想吐”</strong>的重度混乱，到最后
              <strong>用极具灵性的大白话一语道破 React 状态管理真谛</strong>的华丽转身。
            </p>
          </div>

          <div className="space-y-8">
            {/* 1. 物理边界 */}
            <div>
              <h3 className="font-bold text-xl text-rose-800 mb-4 flex items-center gap-2">
                1. 物理边界解密：Client vs Server Component
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div className="bg-rose-50 p-5 rounded-lg border border-rose-100">
                  <h4 className="font-bold text-rose-900 mb-2">
                    💡 什么时候必须加 <code>'use client'</code> (4类死律)
                  </h4>
                  <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
                    <li>
                      使用 <strong>React 状态/副作用</strong>（如 useState, useEffect）。
                    </li>
                    <li>
                      使用 <strong>浏览器原生交互事件</strong>（如 onClick, onChange）。
                    </li>
                    <li>
                      使用 <strong>纯浏览器全局 API</strong>（如 localStorage, window）。
                    </li>
                    <li>使用了依赖上述特性的第三方复杂交互组件（未自带声明时）。</li>
                  </ul>
                  <p className="mt-3 text-xs text-rose-700 font-bold">
                    注：page.tsx 可以写成 async，是因为框架路由层的规定，它依然受上述边界法则约束。
                  </p>
                </div>

                <div className="bg-rose-50 p-5 rounded-lg border border-rose-100">
                  <h4 className="font-bold text-rose-900 mb-2">
                    ⚡ Fetch 为什么必须“两段式” await？
                  </h4>
                  <p className="text-sm text-slate-700 mb-2">
                    <strong>第一阶段：</strong>
                    <code>await fetch(url)</code>{' '}
                    等的是“网络响应头”（状态码到了，但数据包还在路上）。
                    <br />
                    <strong>第二阶段：</strong>
                    <code>await res.json()</code> 等的是“接收全部网络体”并在CPU内存中转换成JS对象。
                  </p>
                  <blockquote className="border-l-4 border-rose-400 pl-3 py-1 italic text-slate-600 text-sm bg-white rounded shadow-sm">
                    “异步函数也就是服务器函数。第一次 await 是获取的 res 表头，第二次是获取完整的
                    body 并转换为对象。” —— 你的顿悟原话
                  </blockquote>
                </div>
              </div>

              {/* params promise */}
              <div className="bg-slate-900 rounded-lg p-5 overflow-x-auto text-sm text-slate-300">
                <p className="text-rose-400 font-bold mb-2">
                  🚨 Next.js 15+ 动态参数 params Promise 类型大坑
                </p>
                <p className="text-slate-400 mb-3 text-xs">
                  对普通对象 await 不会报错，但 TS 会查出类型骗局。必须按标准的 Promise
                  拆包类型定义！
                </p>
                <pre>
                  <CodeWindow
                    code={`const ProductIdPage = async ({ 
  params, 
  searchParams 
}: { 
  params: Promise<{ productId: string }>; 
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>; 
}) => {
  // 必须通过 await 拆开这个未拆封的“Promise 快递盒”！
  const { productId } = await params;   
  const query = await searchParams;     
};`}
                  />
                </pre>
              </div>
            </div>

            {/* 2. 状态提升 */}
            <div>
              <h3 className="font-bold text-xl text-rose-800 mb-4 flex items-center gap-2">
                2. 状态提升 (Lifting State Up)：终极解耦哲学
              </h3>

              <div className="bg-slate-50 p-5 rounded-lg border border-slate-200 mb-4">
                <blockquote className="border-l-4 border-rose-500 pl-4 py-2 italic text-slate-700 font-medium text-lg mb-3">
                  “useState 放到上一层，好往两个儿子那里分配不一样的东西，
                  <strong className="text-rose-600">同一个爹管两个儿子。</strong>”
                </blockquote>
                <p className="text-sm text-slate-600">
                  <strong>核心理念：</strong>当大儿子 (ProjectForm) 和二儿子 (CategoryFormDialog)
                  需要共享“弹窗开关状态”时，绝不能让他俩直接打电话（高耦合屎山）。必须在最近的客户端父组件（爹）中定义{' '}
                  <code>useState</code>，然后向下分发动作 <code>onOpen</code> 和状态{' '}
                  <code>isOpen</code>。
                </p>
              </div>

              <div className="bg-slate-900 rounded-lg p-5 overflow-x-auto text-sm text-slate-300">
                <p className="text-emerald-400 font-bold mb-2">
                  🌟 实战对账：子组件越“傻”越好（通过 callback 解耦）
                </p>
                <p className="text-slate-400 mb-3 text-xs">
                  绝不直接把 setOpen 塞给表单，表单只负责干活并喊“成功了！”，外层是谁负责关谁。
                </p>
                <pre>
                  <CodeWindow
                    code={`// 💡 父组件：EditButton（管理 Dialog 状态）
export const EditButton = ({ project }) => {
  const [open, setOpen] = useState(false);
  
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        {/* 子表单不知道外层是Dialog/Drawer还是独立页面，只在成功时高喊 onSuccess */}
        {/* 爹听到儿子喊成功了，爹自己亲手关窗！ */}
        <ProjectForm initialData={project} onSuccess={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  );
};`}
                  />
                </pre>
              </div>
            </div>

            {/* 3. 排查口诀 */}
            <div className="bg-rose-900 p-6 rounded-xl shadow-inner text-rose-50">
              <h3 className="font-bold text-lg text-white mb-4 flex items-center gap-2">
                <span>📌</span> 核心排查口诀 (Q & A)
              </h3>
              <ul className="space-y-4 text-sm">
                <li className="flex flex-col md:flex-row gap-2 border-b border-rose-800 pb-3">
                  <strong className="text-rose-300 min-w-max">
                    Q: 写在 SC 里的 console.log 为什么在浏览器死活看不到？
                  </strong>
                  <span>
                    A: 因为 SC 是 Server Component，代码 100% 运行在{' '}
                    <strong>终端 (Node 命令行窗口)</strong> 里，绝对不会越界发给浏览器 F12 控制台。
                  </span>
                </li>
                <li className="flex flex-col md:flex-row gap-2 border-b border-rose-800 pb-3">
                  <strong className="text-rose-300 min-w-max">
                    Q: 点击列表跳转详情卡顿，没有骨架屏？
                  </strong>
                  <span>
                    A: 因为 SC 的 <code>await</code> 会物理阻塞页面。必须在同级目录建{' '}
                    <code>loading.tsx</code>，Next.js 会自动帮你套上 Suspense 渲染它！
                  </span>
                </li>
                <li className="flex flex-col md:flex-row gap-2">
                  <strong className="text-rose-300 min-w-max">
                    Q: 用 loading.tsx 还是手写 &lt;Suspense&gt;？
                  </strong>
                  <span>
                    A: 整页等一个数据 ➔ 丢给 <code>loading.tsx</code>
                    ；页面多个独立模块并发查数据，希望各自局部转圈 ➔ 手写多个{' '}
                    <code>&lt;Suspense&gt;</code> 包裹各组件。
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
