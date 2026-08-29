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

      {/* 主内容区：使用 space-y-10 让模块上下清晰分隔 */}
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
        </section>

        {/* ==================== 模块三 & 四 合并展示区 ==================== */}
        <section className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-bold border-b pb-2 mb-5 text-indigo-600">
            三、布局骨架 & 日常高频
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            <SnippetCard title="Flex 一维排列">
              <Snippet code="flex flex-col" desc="开启 flex / 改竖向" />
              <Snippet code="justify-between" desc="主轴两端分布" />
              <Snippet code="items-center" desc="交叉轴居中" />
              <Snippet code="gap-4 flex-1" desc="子元素间距 / 占满剩余" />
            </SnippetCard>
            <SnippetCard title="间距与尺寸">
              <Snippet code="p-4 px-2 py-3" desc="内边距：全/左右/上下" />
              <Snippet code="m-4 mx-auto" desc="外边距：全/水平居中" />
              <Snippet code="w-full min-h-screen" desc="宽满父级 / 最小高度满屏" />
              <Snippet code="w-fit w-auto" desc="刚好包住内容 / 自动" />
            </SnippetCard>
            <SnippetCard title="卡片与文本">
              <Snippet code="rounded-lg shadow-md" desc="圆角 / 阴影" />
              <Snippet code="text-2xl font-bold" desc="字号 / 粗细" />
              <Snippet code="text-center truncate" desc="对齐 / 超出变省略号" />
              <Snippet code="grid-cols-1 md:grid-cols-3" desc="响应式网格(移动优先)" />
            </SnippetCard>
          </div>
        </section>

        {/* ==================== 模块五：宽度与溢出踩坑 ==================== */}
        <section className="bg-amber-50 rounded-xl shadow-sm border border-amber-200 p-6 relative overflow-hidden">
          <div className="absolute -right-4 -top-4 bg-amber-400 text-white font-bold px-8 py-2 rotate-45 shadow-sm text-sm">
            Week 3
          </div>
          <h2 className="text-xl font-bold border-b border-amber-200 pb-2 mb-5 text-amber-800 flex items-center gap-2">
            🚧 五、踩坑专栏：宽度与溢出 (Width & Overflow)
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <PitfallCard title="1. div 是最老实的，Flex item 会被挤压">
              <p className="text-gray-600 mt-1 mb-2">
                <code>w-full</code> = 100%。普通 div 自己绝不变宽，超了就换行。
                <br />
                但在 Flex 中，子项写了 <code>w-64</code> 却被兄弟挤窄？因为 flex 子项默认允许压缩。
              </p>
              <div className="bg-amber-100/50 p-2 rounded text-amber-800 font-mono text-xs mt-auto">
                ✅ 给它加 shrink-0 (拒绝压缩) 或给兄弟加 min-w-0。
              </div>
            </PitfallCard>
            <PitfallCard title="2. Table 撑出父级 / 手机横滑真凶">
              <p className="text-gray-600 mt-1 mb-2">
                Table 默认内容优先，无视 w-full。连续无空格长字符串（如
                ID）会直接撑爆格子，导致页面横滑。
              </p>
              <div className="space-y-2 text-xs font-mono mt-auto">
                <div className="bg-white border border-amber-200 p-2 rounded">
                  ✅ table 加上 table-fixed
                </div>
                <div className="bg-white border border-amber-200 p-2 rounded">
                  ✅ 长文本单元格加上 break-all 或 truncate
                </div>
              </div>
            </PitfallCard>
          </div>
        </section>

        {/* ==================== 🌟 核心新加入：模块七 - 物理机制深度解密 ==================== */}
        <section className="bg-violet-50/70 rounded-xl shadow-sm border border-violet-200 p-6 relative overflow-hidden">
          <div className="absolute -right-4 -top-4 bg-violet-500 text-white font-bold px-8 py-2 rotate-45 shadow-sm text-sm">
            Physics
          </div>
          <h2 className="text-xl font-bold border-b border-violet-200 pb-2 mb-5 text-violet-800 flex items-center gap-2">
            ⚛️ 六、高阶体感碰撞 (Flex 物理引擎解密)
          </h2>

          <p className="text-sm text-violet-700 mb-6 bg-violet-100/50 p-3 rounded-lg border border-violet-100">
            遇到“明明写了，元素却不听话”，是因为你触发了浏览器的
            <strong>默认物理渲染引擎机制</strong>。
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            {/* 1. Sticky 失效 */}
            <DeepDiveCard title="1. Sticky 粘性定位“静默失效”大案">
              <p className="text-sm text-gray-700 mb-2">
                <strong className="text-red-500">崩溃现场：</strong> 侧边栏加了{' '}
                <code>sticky top-10</code> 却跟着页面滚走了。
              </p>
              <p className="text-sm text-gray-700 mb-3">
                <strong className="text-violet-600">原理解密：</strong> Flex 容器默认{' '}
                <code className="text-xs">align-items: stretch</code>
                。侧边栏会被强制拉伸得跟右侧内容一样高，导致<b>失去了向下滚动的物理落差空间</b>。
              </p>
              <div className="bg-gray-800 text-gray-300 p-3 rounded text-xs font-mono leading-relaxed shadow-inner">
                <span className="text-red-400">// ❌ 失效：被 stretch 拉长</span>
                <br />
                &lt;aside className="w-64 sticky top-10"&gt;
                <br />
                <br />
                <span className="text-emerald-400">// ✅ 秒破案：强制元素回到自身真实高度</span>
                <br />
                &lt;aside className="w-64 sticky top-10{' '}
                <span className="bg-violet-600 text-white px-1 rounded">self-start</span>"&gt;
              </div>
            </DeepDiveCard>

            {/* 2. Flex 长文本撑爆 */}
            <DeepDiveCard title="2. Flex 被长文本撑爆、横向溢出">
              <p className="text-sm text-gray-700 mb-2">
                <strong className="text-red-500">崩溃现场：</strong> 超长 Clerk ID 或邮箱，即使加了{' '}
                <code>truncate</code>，依然把父容器顶出横向滚动条。
              </p>
              <p className="text-sm text-gray-700 mb-3">
                <strong className="text-violet-600">原理解密：</strong> Flex 子项默认{' '}
                <code className="text-xs">min-width: auto</code>
                。为了不折断单词，浏览器赋予了它巨大的坚硬宽度，无视了 flex-1。
              </p>
              <div className="bg-gray-800 text-gray-300 p-3 rounded text-xs font-mono leading-relaxed shadow-inner">
                <span className="text-emerald-400">
                  // ✅ 秒破案：重置物理阻尼，允许宽度被压缩为 0
                </span>
                <br />
                &lt;div className="flex-1{' '}
                <span className="bg-violet-600 text-white px-1 rounded">min-w-0</span>"&gt;
                <br />
                &nbsp;&nbsp;&lt;p className="truncate"&gt;{'{clerkUserId}'}&lt;/p&gt;
                <br />
                &lt;/div&gt;
              </div>
            </DeepDiveCard>

            {/* 3. 图标被挤扁 */}
            <DeepDiveCard title="3. 小图标、侧边栏被无情挤扁">
              <p className="text-sm text-gray-700 mb-2">
                <strong className="text-red-500">崩溃现场：</strong> 左侧写了 <code>w-6 h-6</code>{' '}
                的漂亮圆形 Icon，当右侧文字一多，直接被挤成一条线。
              </p>
              <p className="text-sm text-gray-700 mb-3">
                <strong className="text-violet-600">原理解密：</strong> Flex
                容器装不下时，会按比例让所有子项“背债务”。默认{' '}
                <code className="text-xs">flex-shrink: 1</code>。
              </p>
              <div className="bg-gray-800 text-gray-300 p-3 rounded text-xs font-mono leading-relaxed shadow-inner">
                <span className="text-emerald-400">// ✅ 秒破案：上锁🔒 拒绝任何挤压</span>
                <br />
                &lt;SettingsIcon className="w-6 h-6{' '}
                <span className="bg-violet-600 text-white px-1 rounded">shrink-0</span>" /&gt;
              </div>
            </DeepDiveCard>

            {/* 4. 路由与滚动条 */}
            <DeepDiveCard title="4. 交互体验：幽灵高亮 & 页面抖动">
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-bold text-gray-800 border-b border-violet-100 pb-1 mb-1">
                    👻 首页幽灵高亮
                  </h4>
                  <p className="text-xs text-gray-600 mb-1">
                    用 <code>startsWith</code> 时，<code>/</code> 会匹配所有路由导致全亮。
                  </p>
                  <code className="bg-gray-800 text-emerald-400 p-1.5 rounded text-[11px] font-mono block">
                    const isActive = item.href === '/' ? pathname === '/' :
                    pathname.startsWith(item.href);
                  </code>
                </div>
                <div>
                  <h4 className="text-sm font-bold text-gray-800 border-b border-violet-100 pb-1 mb-1">
                    🫨 页面切换横向跳动 15px
                  </h4>
                  <p className="text-xs text-gray-600 mb-1">
                    长短页面切换时，右侧滚动条消失导致视口变宽产生位移。
                  </p>
                  <code className="bg-gray-800 text-emerald-400 p-1.5 rounded text-[11px] font-mono block">
                    &lt;html className="
                    <span className="text-white bg-violet-600 px-1 rounded">
                      scrollbar-gutter-stable
                    </span>
                    "&gt;
                  </code>
                </div>
              </div>
            </DeepDiveCard>
          </div>

          {/* 快速排查手册 (Q&A) */}
          <div className="bg-white rounded-xl p-5 border-2 border-violet-100 shadow-sm">
            <h3 className="font-bold text-violet-900 mb-4 flex items-center gap-2">
              🚑 快速排爆口诀
            </h3>
            <div className="space-y-4">
              <div className="flex gap-3 items-start">
                <span className="bg-red-100 text-red-700 font-bold px-2 py-1 rounded text-xs shrink-0">
                  Q 1
                </span>
                <div>
                  <p className="text-sm font-semibold text-gray-800">
                    为什么我写了 w-full，子元素还是没有撑满整个父容器？
                  </p>
                  <p className="text-sm text-gray-600 mt-1">
                    <strong className="text-emerald-600">A：</strong> 去查它的父容器是不是加了{' '}
                    <code>items-center</code> 或 <code>items-start</code>
                    ！这会导致子组件缩回到内容包裹线。改回默认的 <code>items-stretch</code> 即可。
                  </p>
                </div>
              </div>
              <div className="flex gap-3 items-start border-t border-violet-50 pt-4">
                <span className="bg-red-100 text-red-700 font-bold px-2 py-1 rounded text-xs shrink-0">
                  Q 2
                </span>
                <div>
                  <p className="text-sm font-semibold text-gray-800">
                    为什么在手机端测试，列表容器老是往外凸，屏幕有横向缝隙？
                  </p>
                  <p className="text-sm text-gray-600 mt-1">
                    <strong className="text-emerald-600">A：</strong>{' '}
                    绝大多数是因为写死了物理像素（如 <code>w-[375px]</code>）。外层容器一律只许写{' '}
                    <code>w-full max-w-7xl</code>，绝对不允许在外层写死具体 px！
                  </p>
                </div>
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

const PitfallCard = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="bg-amber-50/60 p-4 rounded-xl border border-amber-200 flex flex-col h-full hover:shadow-sm transition-shadow">
    <h3 className="font-bold text-amber-900 mb-3 text-sm border-b border-amber-200/60 pb-2">
      {title}
    </h3>
    <div className="flex-1 flex flex-col">{children}</div>
  </div>
);

/* 新增：底层机制专属深潜卡片 */
const DeepDiveCard = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="bg-white p-5 rounded-xl border border-violet-100 flex flex-col h-full hover:shadow-md transition-all">
    <h3 className="font-bold text-violet-900 mb-3 text-sm border-b border-violet-50 pb-2">
      {title}
    </h3>
    <div className="flex-1 flex flex-col">{children}</div>
  </div>
);

export default TailwindNotes;
