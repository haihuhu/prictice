// Week5Notes.tsx — React Hook Form + zod reference card
import React from 'react';

// ==========================================
// 1. UI 基础组件 (美化后的 CodeBlock & Section)
// ==========================================

/**
 * 仿 IDE 风格的代码块组件
 */
const CodeBlock = ({ code, language = 'tsx' }: { code: string; language?: string }) => (
  <div className="relative my-4 overflow-hidden rounded-xl bg-[#1e1e1e] shadow-lg ring-1 ring-white/10">
    {/* 顶部控制栏 */}
    <div className="flex items-center justify-between bg-[#2d2d2d] px-4 py-2 text-xs text-zinc-400">
      <div className="flex gap-1.5">
        <div className="h-3 w-3 rounded-full bg-red-500/90 shadow-sm" />
        <div className="h-3 w-3 rounded-full bg-yellow-500/90 shadow-sm" />
        <div className="h-3 w-3 rounded-full bg-green-500/90 shadow-sm" />
      </div>
      <span className="font-mono font-medium tracking-wider uppercase text-zinc-500">{language}</span>
    </div>
    {/* 代码内容区 */}
    <pre className="overflow-x-auto p-5 text-[14px] leading-relaxed text-zinc-50 font-mono">
      <code>{code}</code>
    </pre>
  </div>
);

/**
 * 现代化卡片风格的区块组件
 */
const Section = ({
  title,
  icon,
  children,
}: {
  title: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
}) => (
  <section className="group relative overflow-hidden rounded-2xl bg-white p-6 md:p-8 shadow-sm ring-1 ring-zinc-200 transition-all duration-300 hover:shadow-md">
    <div className="mb-6 flex items-center gap-3">
      {icon && (
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600 ring-1 ring-indigo-100 transition-transform group-hover:scale-105">
          {icon}
        </div>
      )}
      <h2 className="text-xl font-bold tracking-tight text-zinc-800">{title}</h2>
    </div>
    <div className="space-y-4">{children}</div>
  </section>
);

// ==========================================
// 2. 主页面组件
// ==========================================

const Week5Notes = () => {
  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <article className="mx-auto max-w-4xl space-y-8 px-6">
        {/* 页面头部：渐变标题与简介 */}
        <header className="mb-12 text-center space-y-4">
          <h1 className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-4xl font-extrabold text-transparent sm:text-5xl">
            Week 5 · React Hook Form + Zod
          </h1>
          <p className="text-lg font-medium text-zinc-500">
            数据获取 (Data Fetching) ⚡ 表单进阶处理 (Form Level 2)
          </p>
        </header>

        {/* 1. RHF skeleton */}
        <Section
          title="1. react-hook-form 基础骨架"
          icon={
            <svg fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="h-6 w-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
            </svg>
          }
        >
          <p className="text-sm text-zinc-600">
            使用 <code>zodResolver</code> 将 Zod 校验规则与 RHF 完美桥接。强烈建议配置{' '}
            <code>defaultValues</code>。
          </p>
          <CodeBlock
            code={`import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

const {
  register,
  handleSubmit,
  formState: { errors },
} = useForm<FormValues>({
  resolver: zodResolver(formSchema), // bridge RHF and zod
  // 最佳实践：总是提供默认值，避免 React 报 "uncontrolled component" 错误
  defaultValues: {
    email: "",
    password: "",
  }
});`}
          />
          <CodeBlock
            code={`// register — 解构并绑定到原生 input 上，接管 onChange/onBlur/ref/name
<Input {...register('email')} />

// handleSubmit — 高阶函数：先执行校验，全通过后才会调用 onSubmit
<form onSubmit={handleSubmit(onSubmit)}>

// errors — 可选链处理，因为初始状态下或者未出错时该字段是没有 message 的
<p className="text-red-500 text-sm">{errors.email?.message}</p>`}
          />
        </Section>

        {/* 2. zod schema */}
        <Section
          title="2. zod schema 骨架"
          icon={
            <svg fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="h-6 w-6">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
          }
        >
          <p className="text-sm text-zinc-600">
            定义数据模型和校验规则。通过 <code>z.infer</code> 自动提取 TypeScript 类型，实现{' '}
            <b>Single Source of Truth</b>（单一数据源）。
          </p>
          <CodeBlock
            code={`import { z } from 'zod';

export const formSchema = z
  .object({
    // 支持直接在第二个参数/配置对象中自定义错误信息 (Custom Error Message)
    name: z.string().min(3, "名字至少需要3个字符").max(20),
    email: z.string().email("请输入有效的邮箱格式"), 
    password: z.string().min(8).max(20),
    confirm: z.string(),
  })
  // refine 常用于跨字段校验 (如：两次密码是否一致)
  .refine((data) => data.password === data.confirm, {
    message: 'Passwords do not match', // 错误提示信息
    path: ['confirm'],                 // 指定将错误挂载到哪一个字段上
  });

// auto-generate TS type from schema (自动推导类型)
export type FormValues = z.infer<typeof formSchema>;`}
          />
        </Section>

        {/* 3. zod validators */}
        <Section
          title="3. zod 校验方法备查"
          icon={
            <svg fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="h-6 w-6">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
              />
            </svg>
          }
        >
          <p className="text-sm text-zinc-600">
            大多数基础校验都可以传入第二个参数，作为校验失败时的<b>自定义报错信息</b>
            。这在页面错误回显时非常关键。
          </p>
          <CodeBlock
            code={`// -------------------------
// String (字符串类型校验)
// -------------------------
z.string().min(3, '不能少于3个字符')      // 限制最小长度 (最常用的必填+长度校验)
z.string().max(20, '不能超过20个字符')    // 限制最大长度
z.string().email('请输入有效的邮箱')      // 内部封装了正则，一键校验邮箱格式
z.string().url('必须是以 http/https 开头的有效链接')
z.string().regex(/^[a-z]+$/, '只能包含小写字母') // 强密码/特定格式常用，全能兜底方案
z.string().nonempty('此项不能为空')       // 强制非空 (注: Zod 3.23+ 更推荐写 .min(1))
z.string().trim()                         // 预处理：在校验前自动去除首尾空格 (防用户误敲空格)

// -------------------------
// Number (数值类型校验)
// -------------------------
z.number().min(0, '不能小于0').max(100)   // 限制数值范围 (如：考试打分 0-100)
z.number().int('必须是整数')              // 拒绝小数
z.number().positive()                     // 必须严格 > 0
z.number().nonnegative()                  // 必须 >= 0 (允许为 0)

// 💡 进阶避坑: 原生 <input type="number"> 返回的其实是 string
// 直接用 z.number() 会报错，强烈建议使用 z.coerce.number() 自动将字符串转为数字
z.coerce.number().min(18, '必须满18岁') 

// -------------------------
// 修饰符 (可选 / 允许为空 / 默认值)
// -------------------------
z.string().optional()                     // 允许值为 undefined (用户没填时不报错)
z.string().nullable()                     // 允许值为 null (常用于兼容后端历史接口)
z.string().optional().default('guest')    // 兜底逻辑：如果没传或为 undefined，则默认赋为 'guest'

// -------------------------
// 复杂结构 (枚举 / 数组 / 嵌套对象)
// -------------------------
// 枚举：常配合 <select> 或 RadioGroup 使用，限制值只能是其中之一
z.enum(['admin', 'user', 'guest'], { 
  errorMap: () => ({ message: '请选择有效的角色' }) 
})

// 数组：常配合 Checkbox 多选框使用
z.array(z.string()).min(1, '至少需要选择一项') 

// 嵌套对象：完美契合复杂的多层级表单 (如：单独把省市区包在一个 address 对象里)
z.object({ 
  address: z.object({ 
    city: z.string().min(1, '城市必填') 
  }) 
})`}
          />
        </Section>

        {/* 4. useForm methods */}
        <Section
          title="4. useForm 其他常用方法"
          icon={
            <svg fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="h-6 w-6">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
              />
            </svg>
          }
        >
          <CodeBlock
            code={`const {
  watch,        // 实时监听字段值变化 (会触发重渲染，慎用或局部使用)
  reset,        // 重置表单到初始状态 (defaultValues)
  setError,     // 手动设置错误 (下周 Server Actions 返回错误时常用)
  setValue,     // 手动修改某个字段的值 (如点击按钮填入默认邮箱)
  getValues,    // 获取当前所有值 (不会触发重渲染，适合在普通函数中读取)
  trigger,      // 手动触发校验 (如：未提交时先验证某一步骤)
  control,      // 将 RHF 的上下文传递给受控组件 (如 shadcn UI 的 <Controller> / <FormField>)
} = useForm<FormValues>({ resolver: zodResolver(formSchema) });`}
          />
          <CodeBlock
            code={`// 场景：提交成功后清空表单
const onSubmit = async (data: FormValues) => {
  await submitToServer(data);
  reset();
};

// 场景：后端返回邮箱已注册，手动把错误回显到对应字段
setError('email', {
  type: 'server',
  message: 'Email already exists',
});`}
          />
        </Section>

        {/* 5. formState */}
        <Section
          title="5. formState 属性"
          icon={
            <svg fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="h-6 w-6">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          }
        >
          <CodeBlock
            code={`const { formState: {
  errors,        // 表单当前的错误对象 (包含所有未通过校验的字段)
  isSubmitting,  // 是否正在提交 (异步 onSubmit 执行期间为 true → 用于禁用按钮)
  isValid,       // 表单是否完全符合规则 (无错误为 true)
  isDirty,       // 表单是否被修改过 (与 defaultValues 比较)
} } = useForm();`}
          />
          <CodeBlock
            code={`// prevent double submit (防止重复提交，提供良好的交互反馈)
<button 
  disabled={isSubmitting} 
  className="disabled:opacity-50 disabled:cursor-not-allowed"
>
  {isSubmitting ? 'Submitting...' : 'Submit'}
</button>`}
          />
        </Section>

        {/* 6. Server Component fetch */}
        <Section
          title="6. Server Component 数据获取"
          icon={
            <svg fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="h-6 w-6">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01"
              />
            </svg>
          }
        >
          <p className="text-sm text-zinc-600">
            在 Next.js App Router 中，服务端组件可以直接使用 `async/await` 发起 Fetch 请求，无需使用
            `useEffect`。
          </p>
          <CodeBlock
            code={`// 默认没有 'use client'，这是一个服务端组件 (Server Component)
const Page = async () => {
  // 原生 fetch 的拓展，默认会有缓存或者可以直接控制 revalidate
  const res = await fetch('https://api.example.com/data');
  const data = await res.json();
  
  return <div>{/* render data */}</div>;
};

// 配合文件约定使用：
// loading.tsx → 在 fetch 处于 pending 状态时自动展示的骨架屏/Loading
// error.tsx  → 当 fetch 抛出异常时自动拦截 (必须在首行写 'use client')`}
          />
        </Section>

        {/* 7. pitfalls */}
        <Section
          title="7. 最容易踩的坑 ⚠️"
          icon={
            <svg fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="h-6 w-6">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          }
        >
          <ul className="space-y-3 text-sm text-zinc-700">
            <li className="flex items-start gap-2">
              <span className="mt-0.5 text-red-500">❌</span>
              <span>
                <span className="font-semibold text-red-600">errors 漏写可选链</span>： 忘记加{' '}
                <code className="rounded bg-rose-50 px-1.5 py-0.5 text-rose-700">?.</code> → 直接写
                <code className="mx-1 rounded bg-rose-50 px-1.5 py-0.5 text-rose-700">
                  errors.email.message
                </code>
                。 正确写法是{' '}
                <code className="rounded bg-emerald-50 px-1.5 py-0.5 text-emerald-700">
                  errors.email?.message
                </code>
                ，因为没报错时 email 属性是 undefined。
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-0.5 text-red-500">❌</span>
              <span>
                <span className="font-semibold text-red-600">refine 的位置错误</span>： 必须写在{' '}
                <code className="rounded bg-zinc-100 px-1.5 py-0.5 text-zinc-900">.object(...)</code>{' '}
                的最后面。因为它是用来做多字段联合校验的，必须在对象级别拿到所有字段的数据结构才能执行。
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-0.5 text-red-500">❌</span>
              <span>
                <span className="font-semibold text-red-600">error.tsx 忘加指令</span>：
                错误处理组件内部会用到 React 的交互/钩子，如果没有在文件顶部写{' '}
                <code className="rounded bg-zinc-100 px-1.5 py-0.5 text-zinc-900">'use client'</code> →
                会直接导致页面崩溃。
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-0.5 text-red-500">❌</span>
              <span>
                <span className="font-semibold text-red-600">忘记写 defaultValues</span>： 在{' '}
                <code>useForm</code> 初始化时如果不提供默认值，输入框一开始可能是 undefined
                变为后来的字符串，React 终端会报{' '}
                <i>"A component is changing an uncontrolled input to be controlled."</i> 警告。
              </span>
            </li>
          </ul>
        </Section>
      </article>
    </div>
  );
};

export default Week5Notes;
