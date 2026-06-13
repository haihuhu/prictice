import React from 'react';

const TailwindNotes = () => {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 p-4 md:p-8 font-sans pb-20">
      {/* 顶部标题区 */}
      <header className="max-w-7xl mx-auto mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
          Tailwind CSS 布局与尺寸速查笔记 ⚡️
        </h1>
        <p className="text-gray-500 font-medium">
          目标：搞清盒子边界，记住乘 4 定律，只记 90% 最常用的，告别瞎试。
        </p>
      </header>

      {/* 主内容区：使用 space-y-8 让四大模块上下清晰分隔 */}
      <main className="max-w-7xl mx-auto space-y-10">
        {/* ==================== 顶部两列：心法与排错 ==================== */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* 模块一：核心规律 */}
          <section className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-bold border-b pb-2 mb-4 text-indigo-600">
              一、两条核心规律
            </h2>
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold text-sm mb-2 text-gray-800">
                  💡 1. 写父级 还是 写自己？
                </h3>
                <ul className="list-disc list-inside text-sm space-y-1.5 text-gray-600">
                  <li>
                    <strong className="text-gray-900">文字类会继承</strong> (颜色、居中、字号) →
                    兄弟都一样，写在父级！
                  </li>
                  <li>
                    <strong className="text-gray-900">盒子类不继承</strong>{' '}
                    (内外边距、边框、宽高、背景) → 写在自己身上！
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-sm mb-2 text-gray-800">📦 2. 盒模型结构</h3>
                <div className="bg-orange-100 p-3 rounded-md border border-orange-200 relative mt-2">
                  <span className="text-xs text-orange-600 absolute top-1 left-2 font-mono">
                    margin (盒子外，无背景色)
                  </span>
                  <div className="bg-green-100 border-2 border-gray-400 p-3 mt-4 relative rounded-sm">
                    <span className="text-xs text-green-700 absolute top-1 left-2 font-mono">
                      border / padding (盒子内，染背景色)
                    </span>
                    <div className="bg-white border border-dashed border-gray-300 p-3 mt-4 text-center font-bold text-gray-400 text-sm">
                      Content (内容)
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* 排错大法 */}
          <section className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-bold border-b pb-2 mb-4 text-red-500">
              解决 "不敢改" 的根治办法
            </h2>
            <p className="text-sm text-gray-600 mb-4">
              布局乱，本质是"看不见盒子"。把盒子显出来，就不靠瞎试了。
            </p>
            <div className="space-y-4">
              <div className="bg-red-50 p-4 rounded-lg border border-red-100">
                <h3 className="font-semibold text-red-700 mb-2 text-sm">1. 调试加临时背景色</h3>
                <code className="bg-red-200 text-red-900 px-2 py-1 rounded text-xs">
                  bg-red-200
                </code>
                <code className="bg-blue-200 text-blue-900 px-2 py-1 rounded text-xs ml-2">
                  bg-blue-200
                </code>
                <p className="text-xs text-gray-500 mt-2">
                  给 div 加上背景色，盒子边界立刻可见，改完删掉。
                </p>
              </div>
              <div className="bg-white p-4 rounded-lg border-2 border-red-500 border-dashed">
                <h3 className="font-semibold text-red-600 mb-2 text-sm">2. 不确定先框出来</h3>
                <code className="bg-gray-100 text-red-600 px-2 py-1 rounded text-xs">
                  border border-red-500
                </code>
                <p className="text-xs text-gray-500 mt-2">
                  把元素描红，看清它实际占多大，再调内外边距。
                </p>
              </div>
            </div>
          </section>
        </div>

        {/* ==================== 模块二：尺寸与数值 ==================== */}
        <section className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-bold border-b pb-2 mb-5 text-blue-600">
            二、尺寸与数值体系 (告别瞎猜)
          </h2>

          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 rounded-lg p-5 mb-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h3 className="text-blue-800 font-bold text-lg">
                  📏 核心换算：数字 × 4 = 像素 (px)
                </h3>
                <p className="text-sm text-blue-600 mt-1">
                  适用于: <code>p-</code> <code>m-</code> <code>gap-</code> <code>w-</code>{' '}
                  <code>h-</code> <code>top-</code> <code>left-</code>
                </p>
              </div>
              <div className="bg-white px-4 py-2 rounded-md shadow-sm border border-blue-100 text-sm font-mono text-gray-700">
                <span className="font-bold text-blue-600">p-4</span> = 16px <br />
                <span className="font-bold text-blue-600">w-60</span> = 240px
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <SnippetCard title="1. 数字档位 (优先用它)">
              <Snippet code="0 / 1 / 2 / 3 / 4" desc="0 / 4 / 8 / 12 / 16px(最常用)" />
              <Snippet code="6 / 8 / 12 / 16" desc="24 / 32 / 48 / 64px" />
              <li className="text-xs text-red-500 bg-red-50 p-2 rounded mt-2">
                🚫 top-18 为什么失效？因为档位里没有 18！
              </li>
            </SnippetCard>

            <SnippetCard title="2. 字母档位 (容器限宽 & 字号)">
              <Snippet code="max-w-md / max-w-lg" desc="限宽 448px / 512px" />
              <Snippet code="max-w-6xl" desc="限宽 1152px (页面主容器常用)" />
              <Snippet code="text-sm / text-base" desc="字号 14px / 16px(默认)" />
              <Snippet code="text-lg / text-2xl" desc="字号 18px / 24px" />
            </SnippetCard>

            <SnippetCard title="3. 任意值 (万不得已才用)">
              <Snippet code="w-[340px]" desc="没有档位时直接写死像素" />
              <Snippet code="top-[72px]" desc="强行要 top-18 的效果" />
              <Snippet code="h-[calc(100vh-64px)]" desc="支持 CSS 原生计算" />
            </SnippetCard>
          </div>

          <div className="mt-6 bg-gray-50 border border-gray-200 rounded-lg p-4">
            <h3 className="text-sm font-bold text-gray-700 mb-2">
              🧠 宽度怎么选？（写代码前先问自己）
            </h3>
            <div className="flex flex-wrap gap-2 text-sm">
              <span className="bg-white px-3 py-1 rounded border shadow-sm">
                1. 撑满? 👉 <code className="text-blue-600">w-full</code>
              </span>
              <span className="bg-white px-3 py-1 rounded border shadow-sm">
                2. 占比? 👉 <code className="text-blue-600">w-1/2</code> /{' '}
                <code className="text-blue-600">w-1/3</code>
              </span>
              <span className="bg-white px-3 py-1 rounded border shadow-sm">
                3. 容器? 👉 <code className="text-blue-600">max-w-6xl</code>
              </span>
              <span className="bg-white px-3 py-1 rounded border shadow-sm">
                4. 固定? 👉 算像素÷4 👉 <code className="text-blue-600">w-60</code>
              </span>
            </div>
          </div>
        </section>

        {/* ==================== 模块三：布局骨架 ==================== */}
        <section className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-bold border-b pb-2 mb-5 text-indigo-600">
            三、布局骨架（钉死）
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            <SnippetCard title="Flex 一维排列 (最常用)">
              <Snippet code="flex" desc="开启 flex，默认横向" />
              <Snippet code="flex-col" desc="改竖向" />
              <Snippet code="justify-between" desc="主轴两端分布（横向时管左右）" />
              <Snippet code="justify-center" desc="主轴居中" />
              <Snippet code="items-center" desc="交叉轴居中（横向时管上下）" />
              <Snippet code="gap-4" desc="子元素间距（替代 margin）" />
              <Snippet code="flex-1" desc="子元素占满剩余空间" />
            </SnippetCard>

            <SnippetCard title="居中三件套">
              <Snippet code="max-w-6xl mx-auto" desc="限宽+左右 auto，水平居中" />
              <Snippet code="flex items-center justify-center" desc="flex 绝对居中" />
            </SnippetCard>

            <SnippetCard title="Sticky 吸顶/吸边">
              <Snippet code="sticky top-0 z-50" desc="吸顶，z-50 提层级防遮挡" />
              <Snippet code="sticky top-16 self-start" desc="吸在 header 下方" />
            </SnippetCard>
          </div>
        </section>

        {/* ==================== 模块四：日常高频 ==================== */}
        <section className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-bold border-b pb-2 mb-5 text-indigo-600">
            四、日常高频补充（迟早会撞，先收着）
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            <SnippetCard title="间距 (记 4 的倍数感)">
              <Snippet code="p-4 px-2 py-3" desc="padding：全 / 左右 / 上下" />
              <Snippet code="m-4 mx-auto mt-2" desc="margin：全 / 左右居中 / 上" />
              <Snippet code="gap-4" desc="flex/grid 间距 (优先用它)" />
              <Snippet code="space-y-2" desc="竖向子元素统一间距" />
            </SnippetCard>

            <SnippetCard title="尺寸 (非数字类)">
              <Snippet code="w-full h-screen" desc="宽满父级 / 高满屏" />
              <Snippet code="min-h-screen" desc="最小高度满屏" />
              <Snippet code="w-fit w-auto" desc="刚好包住内容 / 自动" />
            </SnippetCard>

            <SnippetCard title="文字">
              <Snippet code="text-2xl font-bold" desc="大小 / 粗细" />
              <Snippet code="text-center" desc="对齐（会继承）" />
              <Snippet code="text-gray-600" desc="颜色" />
              <Snippet code="truncate" desc="超出变省略号" />
            </SnippetCard>

            <SnippetCard title="卡片三件套">
              <Snippet code="rounded-lg" desc="圆角" />
              <Snippet code="border border-gray-200" desc="边框" />
              <Snippet code="shadow-md" desc="阴影" />
            </SnippetCard>

            <SnippetCard title="Grid 二维网格 (卡片列表必用)">
              <Snippet code="grid grid-cols-3 gap-4" desc="3 列等宽网格，带间距" />
            </SnippetCard>

            <SnippetCard title="响应式 (移动优先)">
              <Snippet code="grid-cols-1 md:grid-cols-3" desc="手机 1 列，中屏以上 3 列" />
              <p className="text-xs text-gray-400 mt-2 border-t pt-2">
                💡 记住：默认就是手机样式，加 md: lg: 是往大屏覆盖。
              </p>
            </SnippetCard>
          </div>
        </section>

        {/* ==================== 模块五：第3周踩坑专栏 (🌟 全新无损加入) ==================== */}
        <section className="bg-amber-50 rounded-xl shadow-sm border border-amber-200 p-6 relative overflow-hidden">
          {/* 背景装饰 */}
          <div className="absolute -right-4 -top-4 bg-amber-400 text-white font-bold px-8 py-2 rotate-45 shadow-sm text-sm">
            Week 3
          </div>

          <h2 className="text-xl font-bold border-b border-amber-200 pb-2 mb-5 text-amber-800 flex items-center gap-2">
            🚧 五、第 3 周踩坑专栏：宽度与溢出 (Width & Overflow)
          </h2>

          <div className="bg-white rounded-lg p-4 border border-amber-100 shadow-sm mb-6">
            <h3 className="font-bold text-amber-700 mb-1">🧶 贯穿踩坑的一条主线：</h3>
            <p className="text-sm text-gray-700 font-medium">
              "我明明写了宽度限制，元素却不听" <span className="mx-2 text-amber-400">→</span>
              <span className="bg-amber-100 text-amber-800 px-2 py-0.5 rounded">
                因为元素有自己的默认脾气在对抗你。
              </span>
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* 踩坑 1 & 2：div vs flex item */}
            <PitfallCard title="1. 普通块级 (div) vs 2. Flex item">
              <div className="space-y-3 text-sm">
                <div className="border-b border-amber-100 pb-3">
                  <span className="font-semibold text-gray-800 flex items-center gap-1">
                    🟩 div 是最老实的
                  </span>
                  <p className="text-gray-600 mt-1">
                    加了 <code className="text-indigo-600 bg-indigo-50 px-1 rounded">w-full</code> =
                    100%。内容超了就溢出或换行，但它<b>自己绝不变宽</b>。
                  </p>
                </div>
                <div>
                  <span className="font-semibold text-gray-800 flex items-center gap-1">
                    🟨 Flex item 会被挤压
                  </span>
                  <p className="text-gray-600 mt-1">
                    写了 <code className="text-indigo-600 bg-indigo-50 px-1 rounded">w-64</code>{' '}
                    却被同级元素挤窄？因为 flex 子项默认 <code className="text-xs">shrink: 1</code>{' '}
                    (空间不够我可以被压缩)。
                  </p>
                  <div className="bg-amber-100/50 p-2 rounded mt-2 text-amber-800 text-xs font-mono">
                    ✅ 护身符修法：
                    <br />
                    给它加 shrink-0 (我拒绝被压缩)
                    <br />
                    或给同级兄弟加 min-w-0 (让兄弟服软去缩)
                  </div>
                </div>
              </div>
            </PitfallCard>

            {/* 踩坑 3：Table 的坏脾气 */}
            <PitfallCard title="3. Table 最有个性，会撑爆">
              <div className="space-y-2 text-sm text-gray-700">
                <p>
                  Table 默认 <code className="text-xs">table-layout: auto</code>，
                  <b>内容宽度优先</b>于你设的 width。写了{' '}
                  <code className="text-indigo-600">w-full</code>
                  ，如果内容太多，它会撑出父级导致溢出。
                </p>
                <div className="bg-amber-100/50 p-3 rounded mt-2 border border-amber-200">
                  <p className="font-bold text-amber-800 mb-1">
                    ✅ 解法：加 table-fixed，并善用"弹性列"
                  </p>
                  <ul className="list-disc list-inside text-amber-700 text-xs space-y-1">
                    <li>
                      给 <code className="font-mono">{'<table>'}</code> 加 <b>table-fixed</b>
                      ，让它真正听从 w-full。
                    </li>
                    <li>
                      窄列 (如 Price/Action)：设固定宽 <b>w-24</b>。
                    </li>
                    <li>
                      长列 (如 Title)：<b>故意不写 width</b>，它自动弹性吃掉剩余空间。
                    </li>
                  </ul>
                </div>
              </div>
            </PitfallCard>

            {/* 踩坑 4：td 溢出 */}
            <PitfallCard title="4. td 单元格内容溢出">
              <div className="text-sm text-gray-700 space-y-2">
                <p>表格不被撑爆了，但格子里的文字太长怎么办？</p>
                <div className="grid grid-cols-1 gap-2 mt-2">
                  <div className="bg-white border border-gray-200 p-2 rounded text-xs flex flex-col gap-1">
                    <span className="font-bold text-gray-800">想要文字变 "..." (截断)：</span>
                    <code className="text-indigo-600 bg-indigo-50 p-1 rounded break-words">
                      overflow-hidden whitespace-nowrap text-ellipsis
                    </code>
                  </div>
                  <div className="bg-white border border-gray-200 p-2 rounded text-xs flex flex-col gap-1">
                    <span className="font-bold text-gray-800">想要按钮不掉出去 (不截断)：</span>
                    <span className="text-gray-600">
                      不要加溢出隐藏！直接给这列 <b>分配足够的宽度</b> (如 w-28)。
                    </span>
                  </div>
                </div>
              </div>
            </PitfallCard>

            {/* 踩坑 5：滚动条疑云 & 调试习惯 */}
            <div className="flex flex-col gap-4">
              <PitfallCard title="5. 为什么右侧滚动条一直显示？">
                <div className="text-sm text-gray-700 space-y-2">
                  <p>
                    如果是内容没满却有滚动条，大概率是<b>某处高度算超了</b>。
                  </p>
                  <ul className="list-disc list-inside text-xs text-amber-800 space-y-1 bg-amber-100/30 p-2 rounded">
                    <li>
                      元素写了 <code className="font-mono">h-screen</code>，但同时又加了
                      margin/padding，导致总高 {'>'} 100vh。
                    </li>
                    <li>body 默认的 margin 没清空。</li>
                  </ul>
                  <p className="text-xs text-gray-500 font-bold mt-1">
                    👉 动作：去 DevTools 看是 html 在滚，还是某子元素顶出来的。
                  </p>
                </div>
              </PitfallCard>

              <div className="bg-gray-800 rounded-xl p-4 text-white shadow-md">
                <h3 className="font-bold text-amber-400 mb-1 text-sm">💡 最重要的排错习惯</h3>
                <p className="text-xs leading-relaxed text-gray-300">
                  遇到“我明明写了还是不行”，第一反应是去 DevTools 或代码里<b>逐字核对</b>
                  ：写的属性对不对？是不是加错了层级（如加在 td 而非 table）？
                  <b>不要凭印象判断。</b>
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

/* ---------------- 辅助小组件 (无损复用) ---------------- */

const SnippetCard = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="bg-gray-50/80 p-4 rounded-xl border border-gray-100 flex flex-col h-full hover:shadow-sm transition-shadow">
    <h3 className="font-semibold text-gray-800 mb-3 text-sm border-b border-gray-200 pb-2">
      {title}
    </h3>
    <ul className="space-y-3 flex-1">{children}</ul>
  </div>
);

const Snippet = ({ code, desc }: { code: string; desc: string }) => (
  <li className="flex flex-col gap-1.5">
    <code className="bg-indigo-100/60 text-indigo-700 px-2 py-1 rounded-md font-mono text-[13px] break-words self-start border border-indigo-100">
      {code}
    </code>
    <span className="text-gray-500 text-xs leading-relaxed">{desc}</span>
  </li>
);

/* 第3周专属：踩坑卡片小组件 */
const PitfallCard = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="bg-amber-50/60 p-4 rounded-xl border border-amber-200 flex flex-col h-full">
    <h3 className="font-bold text-amber-900 mb-3 text-sm border-b border-amber-200/60 pb-2">
      {title}
    </h3>
    <div className="flex-1">{children}</div>
  </div>
);

export default TailwindNotes;
