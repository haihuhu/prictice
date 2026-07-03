'use client'; // 因为用到了高亮库，建议标记为客户端组件

import React from 'react';
// 引入专业的高亮组件和 VS Code Dark+ 主题
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

// ============================================================================
// 🎨 Mac + VS Code 风格深色代码块组件 (基于 react-syntax-highlighter)
// ============================================================================
const CodeWindow = ({ code, language = 'tsx' }: { code: string; language?: string }) => {
  return (
    <div className="rounded-lg overflow-hidden shadow-xl border border-gray-700/50 bg-[#1E1E1E] mb-6">
      {/* 顶部控制栏 (红黄绿按钮) */}
      <div className="flex items-center px-4 py-2 bg-[#252526] border-b border-[#333333] select-none">
        <div className="flex gap-2 flex-1">
          <div className="w-3 h-3 rounded-full bg-[#FF5F56]"></div>
          <div className="w-3 h-3 rounded-full bg-[#FFBD2E]"></div>
          <div className="w-3 h-3 rounded-full bg-[#27C93F]"></div>
        </div>
        <div className="text-[11px] text-gray-400 font-sans tracking-wide uppercase">{language}</div>
      </div>

      {/* 代码内容区：交给专业库渲染 */}
      <div className="text-[14px] leading-relaxed">
        <SyntaxHighlighter
          language={language}
          style={vscDarkPlus}
          customStyle={{
            margin: 0,
            padding: '1rem',
            background: 'transparent', // 透明背景，使用外层 div 的颜色
          }}
        >
          {code}
        </SyntaxHighlighter>
      </div>
    </div>
  );
};

export default function CheatSheetPage() {
  return (
    <div className="max-w-4xl mx-auto p-6 md:p-10 font-sans text-gray-900 bg-[#F9FAFB] min-h-screen">
      {/* 顶部大标题 */}
      <h1 className="text-3xl md:text-4xl font-extrabold border-b-4 border-black pb-4 mb-8 tracking-tight">
        Next.js + TypeScript 速查卡：注册表单全链路
      </h1>

      {/* 💡 流程图 (黄色高亮框) */}
      <div className="bg-[#FFFCE8] border-l-4 border-[#F5D400] p-5 mb-10 rounded-r-md shadow-sm">
        <h2 className="font-bold text-lg mb-3 text-black flex items-center">
          <span className="mr-2 text-xl">💡</span> 一页流程图（写不出来时先看这个）
        </h2>
        <pre className="font-mono text-[14px] leading-relaxed text-gray-800 whitespace-pre-wrap font-medium">
          {`User Input (用户填表)
  → RHF register
  → handleSubmit + zodResolver 
  → Server Action (服务端函数)
      → safeParse (防绕过再校验)
      → Database check (查重 / 写库)
      → Return fieldErrors (拼凑统一错误格式)
      → revalidatePath (刷缓存)
  → Client Response (前端接收结果)
      → setError (错误回显)
      → Success redirect (跳转或清空)`}
        </pre>
      </div>

      {/* ========================================================= */}
      {/* 章节 1: Zod Schema */}
      {/* ========================================================= */}
      <div className="mb-10">
        <h2 className="bg-black text-white text-lg font-bold px-4 py-2 inline-block rounded-sm mb-4">
          一、Zod Schema — 定义"什么数据算合法"
        </h2>

        <CodeWindow
          code={`import { z } from 'zod';

// Define rules once, reuse on both client and server
const registerSchema = z
  .object({
    email: z.string().email('invalid email'),
    password: z.string().min(6, 'at least 6 chars'),
    confirmPassword: z.string(),
  })
  // Cross-field validation: ensure passwords match
  .refine((data) => data.password === data.confirmPassword, {
    message: 'passwords do not match',
    path: ['confirmPassword'], // Specifies which field gets the error
  });

// Automatically infer TypeScript type from schema
type RegisterInput = z.infer<typeof registerSchema>;`}
        />

        <div className="bg-[#FFF0F0] border-l-4 border-[#FF4D4F] p-4 text-sm text-[#CF1322] shadow-sm">
          <span className="font-bold flex items-center mb-1">⚠️ 避坑指南</span>
          <code>.refine</code> 的 <code>path</code> 决定错误显示在哪个字段下。忘了写
          path，前端不知把错误挂哪。
        </div>
      </div>

      {/* ========================================================= */}
      {/* 章节 2: RHF */}
      {/* ========================================================= */}
      <div className="mb-10">
        <h2 className="bg-black text-white text-lg font-bold px-4 py-2 inline-block rounded-sm mb-4">
          二、RHF — 管表单状态与提交
        </h2>

        <CodeWindow
          code={`const {
  register,
  handleSubmit,
  setError, 
  formState: { errors, isSubmitting },
} = useForm<RegisterInput>({
  resolver: zodResolver(registerSchema), // Bridge Zod into RHF
});

// Bind input state automatically
<input {...register('email')} />
{errors.email && <p>{errors.email.message}</p>}

// Disable button while submitting to prevent double clicks
<Button disabled={isSubmitting}>
  {isSubmitting ? 'Submitting...' : 'Submit'}
</Button>`}
        />

        <div className="bg-[#FFFCE8] border-l-4 border-[#F5D400] p-4 text-sm text-gray-800 mt-3 shadow-sm flex flex-col gap-1">
          <span className="font-bold">✨ 高频补充：</span>
          <span>
            • <b>初始化表单</b>：<code>useForm({`{ defaultValues: { email: '' } }`})</code>
          </span>
          <span>
            • <b>清空表单</b>：解构出 <code>reset</code> 函数，成功后调用 <code>reset()</code>。
          </span>
        </div>
      </div>

      {/* ========================================================= */}
      {/* 章节 3: Server Action */}
      {/* ========================================================= */}
      <div className="mb-10">
        <h2 className="bg-black text-white text-lg font-bold px-4 py-2 inline-block rounded-sm mb-4">
          三、Server Action — 服务端校验与写库
        </h2>

        <CodeWindow
          code={`'use server'; // Enforce running securely on the server

import { revalidatePath } from 'next/cache';

export async function registerAction(data: RegisterInput) {
  // 1. Re-validate on server to prevent bypass
  const result = registerSchema.safeParse(data);
  if (!result.success) {
    // Flatten nested Zod errors into a clean object
    return { fieldErrors: result.error.flatten().fieldErrors };
  }

  const cleanData = result.data;
  
  // 2. Check duplicates (mock database query)
  const existEmail = await checkEmailExists(cleanData.email);
  if (existEmail) {
    // Return custom error matching Zod's error format!
    return { fieldErrors: { email: ['email already registered'] } };
  }

  // 3. Save to database...
  await saveUser(cleanData);

  // 4. Clear cache so the UI updates
  revalidatePath('/users'); 
  
  return { success: true };
}`}
        />

        <div className="bg-[#FFF0F0] border-l-4 border-[#FF4D4F] p-4 text-sm text-[#CF1322] shadow-sm flex flex-col gap-2">
          <div>
            <span className="font-bold">⚠️ 慎用 await：</span>读内存对象的属性<b>不用 await</b>（如{' '}
            <code>res.error?.fieldErrors</code>），只有执行查库等 IO 异步操作才需要。
          </div>
        </div>
      </div>

      {/* ========================================================= */}
      {/* 章节 4: 前端接收错误 */}
      {/* ========================================================= */}
      <div className="mb-10">
        <h2 className="bg-black text-white text-lg font-bold px-4 py-2 inline-block rounded-sm mb-4">
          四、前端接收错误 → 回显到对应字段
        </h2>

        <CodeWindow
          code={`const onSubmit = async (data: RegisterInput) => {
  const res = await registerAction(data);

  if (res?.fieldErrors) {
    // Loop through server errors and set them into RHF
    Object.entries(res.fieldErrors).forEach(([key, value]) => {
      // Assert 'key' type to avoid TypeScript warnings
      setError(key as keyof RegisterInput, {
        message: value[0], 
      });
    });
    return;
  }

  // Handle success: toast notification, reset form, or redirect
};`}
        />

        <div className="bg-[#FFFCE8] border-l-4 border-[#F5D400] p-4 text-sm text-gray-800 mt-3 shadow-sm">
          <span className="font-bold">🔑 核心思想：</span>不论是 Zod
          格式错，还是服务端的查重业务错，都拼成统一的 <code>fieldErrors</code> 形状，前端{' '}
          <code>Object.entries</code> 一套逻辑全部通吃！
        </div>
      </div>
    </div>
  );
}
