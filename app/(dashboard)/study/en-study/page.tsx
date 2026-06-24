import React from 'react';
import {
  Sun,
  Moon,
  Code,
  Mic,
  RefreshCw,
  AlertTriangle,
  Brain,
  Headphones,
  PenTool,
  ArrowRight,
  CheckCircle2,
  ListTodo,
  Activity,
} from 'lucide-react';

const EnglishLearningPlan = () => {
  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8 font-sans text-slate-800">
      <div className="max-w-5xl mx-auto space-y-8">
        {/* 标题头部 */}
        <header className="text-center space-y-4 mb-12">
          <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
            英语学习完整计划
          </h1>
          <p className="text-lg text-slate-500 font-medium">循序渐进版 · 每日系统化训练</p>
        </header>

        {/* 模块一：全天三条线 */}
        <section className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 md:p-8">
          <div className="flex items-center gap-3 mb-6">
            <Activity className="w-7 h-7 text-blue-500" />
            <h2 className="text-2xl font-bold text-slate-800">一、全天三条线</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            {[
              {
                time: '早 5-7',
                act: '听写 + Shadowing',
                skill: '听 + 说',
                icon: Sun,
                color: 'text-amber-500',
                bg: 'bg-amber-50',
              },
              {
                time: '编程后 1h',
                act: '写英文注释 + 念 → 发我纠错',
                skill: '读 + 写 + 说',
                icon: Code,
                color: 'text-emerald-500',
                bg: 'bg-emerald-50',
              },
              {
                time: '跑步 17-18:30',
                act: '听我生成的文章语音',
                skill: '听',
                icon: Headphones,
                color: 'text-indigo-500',
                bg: 'bg-indigo-50',
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className={`p-5 rounded-xl border border-slate-100 ${item.bg} flex flex-col gap-3 transition-transform hover:-translate-y-1`}
              >
                <div className="flex justify-between items-center">
                  <span className="font-bold text-slate-700 bg-white px-3 py-1 rounded-full text-sm shadow-sm">
                    {item.time}
                  </span>
                  <item.icon className={`w-6 h-6 ${item.color}`} />
                </div>
                <div className="font-semibold text-lg text-slate-800 mt-2">{item.act}</div>
                <div className="text-sm font-medium text-slate-500 flex items-center gap-1 mt-auto">
                  <CheckCircle2 className="w-4 h-4" /> 练：{item.skill}
                </div>
              </div>
            ))}
          </div>

          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-xl border border-blue-100 flex items-start gap-4">
            <div className="bg-blue-500 p-2 rounded-full text-white shrink-0 mt-1">
              <RefreshCw className="w-5 h-5 animate-[spin_4s_linear_infinite]" />
            </div>
            <div>
              <h4 className="font-bold text-blue-900 mb-1">自循环闭环</h4>
              <p className="text-blue-800 text-sm leading-relaxed">
                今天写的注释 → 我纠错 → 扩写成文章 → 转语音 → 当天跑步听。素材自循环！
              </p>
            </div>
          </div>
        </section>

        {/* 模块二：早起2小时 */}
        <section className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 md:p-8">
          <div className="flex items-center gap-3 mb-6">
            <Sun className="w-7 h-7 text-amber-500" />
            <h2 className="text-2xl font-bold text-slate-800">二、早起 2 小时（三阶段递进）</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Phase 1 */}
            <div className="border border-slate-200 rounded-xl p-5 relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-slate-100 text-slate-500 text-xs font-bold px-3 py-1 rounded-bl-lg">
                起步
              </div>
              <h3 className="font-bold text-lg mb-1 text-slate-800">第 1-2 周</h3>
              <p className="text-sm text-slate-500 mb-4">目标：坐住，养成习惯</p>
              <ul className="space-y-3 text-sm">
                <li className="flex justify-between border-b border-slate-50 pb-2">
                  <span className="font-semibold text-slate-600">30min</span>
                  <span>听写新材料 (2-3遍封顶)</span>
                </li>
                <li className="flex justify-between border-b border-slate-50 pb-2">
                  <span className="font-semibold text-amber-500">10min</span>
                  <span className="text-slate-500">休息 (走动/喝水/无手机)</span>
                </li>
                <li className="flex justify-between border-b border-slate-50 pb-2">
                  <span className="font-semibold text-slate-600">30min</span>
                  <span>Shadowing (带稿看字, 0.75x)</span>
                </li>
                <li className="flex justify-between text-slate-400">
                  <span className="font-semibold">余下</span>
                  <span>没状态就停，不硬撑</span>
                </li>
              </ul>
            </div>

            {/* Phase 2 */}
            <div className="border border-blue-200 rounded-xl p-5 relative overflow-hidden bg-blue-50/30">
              <div className="absolute top-0 right-0 bg-blue-100 text-blue-600 text-xs font-bold px-3 py-1 rounded-bl-lg">
                加量
              </div>
              <h3 className="font-bold text-lg mb-1 text-blue-900">第 3-4 周</h3>
              <p className="text-sm text-blue-600/70 mb-4">目标：习惯稳了再上强度</p>
              <ul className="space-y-3 text-sm">
                <li className="flex justify-between border-b border-blue-100/50 pb-2">
                  <span className="font-semibold text-slate-600">40min</span>
                  <span>听写新材料</span>
                </li>
                <li className="flex justify-between border-b border-blue-100/50 pb-2">
                  <span className="font-semibold text-amber-500">10min</span>
                  <span className="text-slate-500">休息</span>
                </li>
                <li className="flex justify-between border-b border-blue-100/50 pb-2">
                  <span className="font-semibold text-slate-600">40min</span>
                  <span>Shadowing (带稿原速 → 试脱稿 0.75x)</span>
                </li>
                <li className="flex justify-between text-slate-500">
                  <span className="font-semibold">余下</span>
                  <span>机动：补注释/查疑难句</span>
                </li>
              </ul>
            </div>

            {/* Phase 3 */}
            <div className="border border-indigo-200 rounded-xl p-5 relative overflow-hidden bg-indigo-50/50 shadow-sm">
              <div className="absolute top-0 right-0 bg-indigo-500 text-white text-xs font-bold px-3 py-1 rounded-bl-lg">
                成型
              </div>
              <h3 className="font-bold text-lg mb-1 text-indigo-900">第 5 周起</h3>
              <p className="text-sm text-indigo-600/70 mb-4">目标：全套跑起来</p>
              <ul className="space-y-3 text-sm">
                <li className="flex justify-between border-b border-indigo-100 pb-2">
                  <span className="font-semibold text-slate-600">40min</span>
                  <span>听写</span>
                </li>
                <li className="flex justify-between border-b border-indigo-100 pb-2">
                  <span className="font-semibold text-amber-500">10min</span>
                  <span className="text-slate-500">休息</span>
                </li>
                <li className="flex justify-between border-b border-indigo-100 pb-2">
                  <span className="font-semibold text-slate-600">50min</span>
                  <span className="font-medium text-indigo-700">Shadowing 全程 (带稿 → 脱稿原速)</span>
                </li>
                <li className="flex justify-between text-slate-600">
                  <span className="font-semibold">20min</span>
                  <span>机动 + 复述</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* 两列布局：模块三 & 模块四 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* 模块三：编程注释 */}
          <section className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 md:p-8">
            <div className="flex items-center gap-3 mb-6">
              <Code className="w-7 h-7 text-emerald-500" />
              <h2 className="text-2xl font-bold text-slate-800">三、编程注释</h2>
            </div>

            <div className="space-y-4 mb-6">
              {[
                { stage: '第 1-2 周', qty: '挑 3-5 行核心逻辑', how: '写英文注释，发我纠错' },
                { stage: '第 3-4 周', qty: '每个函数写一句', how: '说清这个函数干啥' },
                { stage: '第 5-6 周', qty: '关键行 + 函数都写', how: '边写边大声念' },
                { stage: '第 7 周起', qty: '每行都写', how: '念 + 纠错 + 转文章听', highlight: true },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className={`flex items-center gap-4 p-3 rounded-lg ${item.highlight ? 'bg-emerald-50 border border-emerald-100' : 'bg-slate-50'}`}
                >
                  <div
                    className={`font-bold whitespace-nowrap ${item.highlight ? 'text-emerald-700' : 'text-slate-500'}`}
                  >
                    {item.stage}
                  </div>
                  <div className="w-px h-8 bg-slate-200 hidden sm:block"></div>
                  <div className="flex-1">
                    <div className="font-semibold text-slate-800 text-sm">{item.qty}</div>
                    <div className="text-sm text-slate-500">{item.how}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-amber-50 rounded-lg p-4 border border-amber-100 flex gap-3 text-sm">
              <PenTool className="w-5 h-5 text-amber-600 shrink-0" />
              <p className="text-amber-800">
                <strong className="font-bold">纠错原则：</strong>我只改语法，保留你的表达风格，不替你重写。
              </p>
            </div>
          </section>

          {/* 模块四：Shadowing 台阶 */}
          <section className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 md:p-8 flex flex-col">
            <div className="flex items-center gap-3 mb-6">
              <Mic className="w-7 h-7 text-purple-500" />
              <h2 className="text-2xl font-bold text-slate-800">四、Shadowing 阶梯</h2>
            </div>

            <p className="text-slate-500 mb-6 text-sm">防跟不上的台阶式训练法：</p>

            <div className="flex flex-wrap items-center gap-2 mb-8 flex-1 content-start">
              {['听写过的材料', '带稿 0.75x', '带稿原速', '脱稿 0.75x', '脱稿原速'].map((step, idx, arr) => (
                <React.Fragment key={idx}>
                  <div
                    className={`px-4 py-2 rounded-full text-sm font-bold shadow-sm border
                    ${
                      idx === arr.length - 1
                        ? 'bg-purple-500 text-white border-purple-600'
                        : 'bg-white text-slate-700 border-slate-200'
                    }`}
                  >
                    {idx === 0 ? step : `②③④⑤`[idx - 1] + '. ' + step}
                  </div>
                  {idx < arr.length - 1 && <ArrowRight className="w-4 h-4 text-slate-300" />}
                </React.Fragment>
              ))}
            </div>

            <div className="bg-red-50 rounded-lg p-4 border border-red-100 flex gap-3 mt-auto">
              <AlertTriangle className="w-5 h-5 text-red-500 shrink-0" />
              <p className="text-red-800 text-sm font-medium">
                <strong>铁律：</strong>用刚听写过的材料 shadow，不拿全新的。
              </p>
            </div>
          </section>
        </div>

        {/* 模块五：三个方法的定位 */}
        <section className="bg-slate-900 rounded-2xl shadow-lg p-6 md:p-8 text-slate-100">
          <div className="flex items-center gap-3 mb-8">
            <ListTodo className="w-7 h-7 text-blue-400" />
            <h2 className="text-2xl font-bold text-white">五、三个方法的定位（认清主次）</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-slate-800/50 p-5 rounded-xl border border-slate-700">
              <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center mb-4">
                <PenTool className="w-5 h-5 text-blue-400" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">听写 = 地基</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                新材料为主，老材料反复 = 默写，这时候耳朵处于停工状态。
              </p>
            </div>

            <div className="bg-slate-800/50 p-5 rounded-xl border border-slate-700">
              <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center mb-4">
                <Mic className="w-5 h-5 text-purple-400" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Shadowing = 主力</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                练嘴巴 + 实时反应能力。不要试图记内容，目的是绕开你记忆弱的短板。
              </p>
            </div>

            <div className="bg-slate-800/50 p-5 rounded-xl border border-slate-700">
              <div className="w-10 h-10 bg-amber-500/20 rounded-lg flex items-center justify-center mb-4">
                <Brain className="w-5 h-5 text-amber-400" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">脑内思维 = 保鲜剂</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                利用碎片时间防生疏。这个方法天花板低，遇到存疑的句子必须发我查证。
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default EnglishLearningPlan;
