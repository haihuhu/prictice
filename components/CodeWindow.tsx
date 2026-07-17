import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

// ============================================================================
// 🎨 Mac + VS Code 风格深色代码块组件 (基于 react-syntax-highlighter)
// ============================================================================
export const CodeWindow = ({ code, language = 'tsx' }: { code: string; language?: string }) => {
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
