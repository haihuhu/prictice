export default function DeveloperConstitution() {
  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Title */}
        <h1 className="text-4xl font-bold text-center text-amber-900 mb-8">📜 独立开发者工程宪法</h1>

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
              <code className="bg-gray-200 px-2 py-1 rounded text-sm font-mono">git push</code> 后发起{' '}
              <code className="bg-gray-200 px-2 py-1 rounded text-sm font-mono">Pull Request</code> 时，CodeRabbit
              才会介入审计。
            </li>
            <li>
              <strong>审计心态</strong>: 编译器错误 {'>'} CodeRabbit 意见 {'>'} 个人偏好。若与编译器冲突，CodeRabbit
              意见直接忽略。
            </li>
          </ul>
        </div>

        {/* Section 3 - Team Collaboration */}
        <div className="bg-green-50 border border-green-300 rounded-lg shadow-sm p-6 mb-6">
          <h2 className="text-xl font-bold text-green-700 border-l-4 border-green-700 pl-3 mb-4">
            🤝 团队协作冲突管理 (Collaboration Conflict Resolution)
          </h2>

          <div className="mb-4">
            <h3 className="font-semibold text-gray-800 mb-2">协作场景</h3>
            <p className="text-sm text-gray-700 mb-3">
              A 在 feat/login 开发登录功能，B 在 feat/dashboard 开发仪表盘，C 紧急修复 main 分支 bug 并已合并。此时 A 和
              B 如何同步最新 main？
            </p>
          </div>

          <div className="mb-4">
            <h3 className="font-semibold text-gray-800 mb-2">定期同步 main 防止冲突积累</h3>
            <code className="bg-gray-800 text-green-400 px-3 py-2 rounded text-sm font-mono block overflow-x-auto">
              git checkout feat/login
              <br />
              git fetch origin # 拉取远程所有分支最新状态
              <br />
              git merge origin/main # 合并远程 main 到当前分支
            </code>
            <p className="text-xs text-gray-600 mt-2">
              ⚠️ 不需要先 <code className="bg-gray-200 px-1">git checkout main</code>，
              <code className="bg-gray-200 px-1">git fetch</code> 已经更新了{' '}
              <code className="bg-gray-200 px-1">origin/main</code>
            </p>
          </div>

          <div className="mb-4">
            <h3 className="font-semibold text-gray-800 mb-2">冲突解决流程</h3>
            <ol className="text-sm text-gray-700 space-y-2 list-decimal list-inside">
              <li>
                Git 提示 <code className="bg-gray-200 px-1 text-xs">CONFLICT in src/app/page.tsx</code>
              </li>
              <li>
                打开文件，找到冲突标记：
                <pre className="bg-gray-100 p-2 rounded text-xs mt-1 overflow-x-auto">
                  {`<<<<<<< HEAD
// 你的代码 (当前分支)
=======
// main 分支的代码
>>>>>>> origin/main`}
                </pre>
              </li>
              <li>手动决定保留哪部分代码，删除冲突标记</li>
              <li>
                <code className="bg-gray-200 px-1 text-xs">git add .</code> →
                <code className="bg-gray-200 px-1 text-xs ml-1">git commit -m "Resolve conflict"</code> →
                <code className="bg-gray-200 px-1 text-xs ml-1">git push</code>
              </li>
            </ol>
          </div>

          <div className="bg-yellow-50 p-3 rounded border-l-4 border-yellow-500">
            <p className="text-sm font-semibold text-yellow-800 mb-1">避免冲突的最佳实践</p>
            <ul className="text-xs text-gray-700 space-y-1">
              <li>• 功能分支尽量小（3 天内完成）</li>
              <li>• 每天或每隔 2 天同步一次 main</li>
              <li>• 团队成员尽量修改不同的文件或区域</li>
              <li>• 紧急 bug 修复后立即通知团队同步</li>
            </ul>
          </div>
        </div>

        {/* Section 4 - Warning */}
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

        {/* Section 5 - Workflow */}
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
   │  │   ├── 若 main 有新内容 -> [同步]: git fetch origin && git merge origin/main
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
          <h2 className="text-xl font-bold text-blue-900 border-l-4 border-blue-500 pl-3 mb-4">快速命令参考</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-semibold text-gray-700 mb-2">新特性开发</p>
              <code className="bg-gray-200 px-2 py-1 rounded text-xs font-mono block">git checkout -b feat/name</code>
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-700 mb-2">推送分支</p>
              <code className="bg-gray-200 px-2 py-1 rounded text-xs font-mono block">
                git push -u origin feat/name
              </code>
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-700 mb-2">同步远程 main</p>
              <code className="bg-gray-200 px-2 py-1 rounded text-xs font-mono block">
                git fetch origin && git merge origin/main
              </code>
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-700 mb-2">止损回退</p>
              <code className="bg-gray-200 px-2 py-1 rounded text-xs font-mono block">git reset --hard HEAD</code>
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-700 mb-2">清理分支</p>
              <code className="bg-gray-200 px-2 py-1 rounded text-xs font-mono block">git branch -d feat/name</code>
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-700 mb-2">解决冲突后继续</p>
              <code className="bg-gray-200 px-2 py-1 rounded text-xs font-mono block">
                git add . && git commit && git push
              </code>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
