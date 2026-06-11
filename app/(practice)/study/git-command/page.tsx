export default function DeveloperConstitution() {
  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-8">
      <div className="max-w-4xl">
        {/* Title */}
        <h1 className="text-4xl font-bold text-center text-amber-900 mb-8">
          📜 独立开发者工程宪法
        </h1>

        {/* Section 1 */}
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6 mb-6">
          <h2 className="text-xl font-bold text-amber-900 border-l-4 border-amber-900 pl-3 mb-4">
            1. 分支管理哲学：草稿纸原则
          </h2>
          <ul className="space-y-3">
            <li>
              <strong>main 分支 (正式本)</strong>: 永远保持可交付、无错误状态。
            </li>
            <li>
              <strong>feat/xxx 分支 (草稿纸)</strong>:
              每次开发功能撕下一张新草稿纸。写烂了、思路偏了，直接撕掉丢垃圾桶（删除分支），绝不弄脏正式作业本。
            </li>
            <li className="bg-blue-50 p-3 rounded border-l-4 border-blue-500">
              <strong>核心口诀</strong>: 写代码前必切分支，合并代码前必做审计。
            </li>
          </ul>
        </div>

        {/* Section 2 */}
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6 mb-6">
          <h2 className="text-xl font-bold text-amber-900 border-l-4 border-amber-900 pl-3 mb-4">
            2. CodeRabbit 自动化审计闭环
          </h2>
          <ul className="space-y-3">
            <li>
              <strong>接入方式</strong>: 必须通过 GitHub App 授权，而非手动 Webhook。
            </li>
            <li>
              <strong>激活条件</strong>: 只有当你{' '}
              <code className="bg-gray-200 px-2 py-1 rounded text-sm font-mono">git push</code>{' '}
              后发起{' '}
              <code className="bg-gray-200 px-2 py-1 rounded text-sm font-mono">Pull Request</code>{' '}
              时，CodeRabbit 才会介入审计。
            </li>
            <li>
              <strong>审计心态</strong>: 编译器错误 {'>'} CodeRabbit 意见 {'>'}{' '}
              个人偏好。若与编译器冲突，CodeRabbit 意见直接忽略。
            </li>
          </ul>
        </div>

        {/* Section 3 - Warning */}
        <div className="bg-red-50 border border-red-300 rounded-lg shadow-sm p-6 mb-6">
          <h2 className="text-xl font-bold text-red-700 border-l-4 border-red-700 pl-3 mb-4">
            ⚠️ 导师红色警戒 (异常处理决策树)
          </h2>
          <p className="mb-4">当开发崩盘时，不要尝试通过"修补错误代码"来修复系统，直接降维打击：</p>
          <ul className="space-y-2">
            <li>
              <strong>如果代码写乱了</strong>:
              <br />
              <code className="bg-gray-800 text-green-400 px-3 py-2 rounded text-sm font-mono block mt-1 overflow-x-auto">
                git checkout . && git clean -fd
              </code>
            </li>
            <li>
              <strong>如果逻辑写死锁了</strong>:
              <br />
              <code className="bg-gray-800 text-green-400 px-3 py-2 rounded text-sm font-mono block mt-1 overflow-x-auto">
                git reset --hard HEAD
              </code>
            </li>
            <li>
              <strong>如果 CodeRabbit 误导</strong>:
              <br />
              <code className="bg-gray-800 text-green-400 px-3 py-2 rounded text-sm font-mono block mt-1 overflow-x-auto">
                @coderabbitai mark as resolved
              </code>
            </li>
          </ul>
        </div>

        {/* Section 4 - Workflow */}
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6 mb-6">
          <h2 className="text-xl font-bold text-amber-900 border-l-4 border-amber-900 pl-3 mb-4">
            3. 每日工程流程图 (Workflow)
          </h2>
          <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-xs leading-relaxed font-mono">
            {`[ START ]
   │
   ├─ 1. 资产同步 (Sync Stage)
   │  ├── git checkout main
   │  └── git pull origin main ──>(确认基座为最新版本)
   │
   ├─ 2. 特性开发 (Develop Stage)
   │  ├── git checkout -b feat/功能名
   │  ├── 核心开发 (Cursor Composer + 组件化原则)
   │  │   ├── 若 逻辑死锁/环境污染 -> [止损回退]: git reset --hard HEAD
   │  │   └── 若 代码跑通 (验证通过) -> [推进]
   │  └── git push -u origin feat/功能名
   │
   ├─ 3. 质量审计 (Audit Stage - CodeRabbit 自动触发)
   │  ├── GitHub 发起 Pull Request (feat/功能名 → main)
   │  ├── CodeRabbit AI 扫描 (等待兔子报告)
   │  │   ├── 若 [Info/Minor] -> 记录并忽略
   │  │   └── 若 [Major/Critical] -> [GOTO 开发阶段重构]
   │  └── 若审计无误 -> [执行合并]
   │
   ├─ 4. 资产合入 (Merge Stage)
   │  ├── GitHub 执行 Squash Merge (合并功能，压缩提交历史)
   │  ├── git checkout main
   │  ├── git pull origin main
   │  └── git branch -d feat/功能名 (清理临时资产)
   │
   └─ [ DAY END / 部署就绪 ]`}
          </pre>
        </div>

        {/* Quick Commands */}
        <div className="bg-blue-50 border border-blue-300 rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-bold text-blue-900 border-l-4 border-blue-500 pl-3 mb-4">
            快速命令参考
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-semibold text-gray-700 mb-2">新特性开发</p>
              <code className="bg-gray-200 px-2 py-1 rounded text-xs font-mono block">
                git checkout -b feat/name
              </code>
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-700 mb-2">推送分支</p>
              <code className="bg-gray-200 px-2 py-1 rounded text-xs font-mono block">
                git push -u origin feat/name
              </code>
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-700 mb-2">止损回退</p>
              <code className="bg-gray-200 px-2 py-1 rounded text-xs font-mono block">
                git reset --hard HEAD
              </code>
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-700 mb-2">清理分支</p>
              <code className="bg-gray-200 px-2 py-1 rounded text-xs font-mono block">
                git branch -d feat/name
              </code>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
