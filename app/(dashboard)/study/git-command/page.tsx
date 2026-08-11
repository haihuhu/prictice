import React from 'react';

export default function DeveloperConstitution() {
  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Title */}
        <h1 className="text-4xl font-bold text-center text-amber-900 mb-8">📜 独立开发者工程宪法</h1>

        {/* Section 1 - NEW: Git Core Laws */}
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6 mb-6">
          <h2 className="text-xl font-bold text-amber-900 border-l-4 border-amber-900 pl-3 mb-4">
            1. 👑 Git 核心三定律 (The Golden Rules)
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-amber-50 p-4 rounded border border-amber-100">
              <h3 className="font-bold text-amber-900 mb-2">① 没保存 = 看不到</h3>
              <p className="text-sm text-gray-700">
                编辑器里没 <strong>Ctrl + S</strong> 保存的代码，Git 根本无法记录或暂存。敲命令前第一件事永远是保存。
              </p>
            </div>
            <div className="bg-amber-50 p-4 rounded border border-amber-100">
              <h3 className="font-bold text-amber-900 mb-2">② 未提交 = 跟着人走</h3>
              <p className="text-sm text-gray-700">
                未 commit 的代码属于工作区。你在哪个分支上执行 <code>commit</code>，代码就会永远进入那个分支的历史中。
              </p>
            </div>
            <div className="bg-amber-50 p-4 rounded border border-amber-100">
              <h3 className="font-bold text-amber-900 mb-2">③ 切分支 = 必查状态</h3>
              <p className="text-sm text-gray-700">
                切换分支前固定口诀：
                <br />
                <code>Ctrl + S</code> → <code>git status</code> → 决定暂存(stash)还是提交(commit)。
              </p>
            </div>
          </div>
        </div>

        {/* Section 2 - Updated: Branch Management */}
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6 mb-6">
          <h2 className="text-xl font-bold text-amber-900 border-l-4 border-amber-900 pl-3 mb-4">
            2. 分支管理哲学：草稿纸原则
          </h2>
          <ul className="space-y-3 text-gray-700">
            <li>
              <strong>分支的本质:</strong> 只是一个指向 Commit 的指针。不同分支原本是一家人，各自提交后才分道扬镳。
            </li>
            <li>
              <strong>main 分支 (正式本):</strong> 永远保持可交付、无错误状态。
            </li>
            <li>
              <strong>feat/xxx 分支 (草稿纸):</strong>{' '}
              每次开发功能撕下一张新草稿纸。写烂了、思路偏了，直接撕掉丢垃圾桶，绝不弄脏正式作业本。
            </li>
            <li className="bg-blue-50 p-3 rounded border-l-4 border-blue-500 text-sm mt-2">
              <strong>💡 现代 Git 规范:</strong> 彻底抛弃 <code>checkout</code>，切换分支用 <code>git switch main</code>
              ，创建新分支用 <code>git switch -c feat/name</code>，语义更清晰！
            </li>
          </ul>
        </div>

        {/* Section 3 - NEW: Safe Stash & Anti-loss */}
        <div className="bg-indigo-50 border border-indigo-200 rounded-lg shadow-sm p-6 mb-6">
          <h2 className="text-xl font-bold text-indigo-800 border-l-4 border-indigo-500 pl-3 mb-4">
            🛡️ 代码防丢与安全暂存 (Stash Best Practices)
          </h2>
          <ul className="space-y-3 text-sm text-gray-700">
            <li>
              <strong>安全暂存法:</strong> 当代码没写完但需要切分支时，不要强行 commit，使用：
              <code className="bg-indigo-100 px-2 py-1 rounded ml-2 font-mono">git stash push -u -m "说明"</code>
              <br />
              <span className="text-xs text-indigo-600 mt-1 inline-block">
                (*注: -u 必加，代表连同未跟踪的新文件一起暂存)
              </span>
            </li>
            <li>
              <strong>安全恢复法:</strong> 永远使用 <code>apply</code> 而不是 <code>pop</code>！
              <code className="bg-indigo-100 px-2 py-1 rounded ml-2 font-mono">
                git stash apply stash@&#123;0&#125;
              </code>
              <br />
              <span className="text-xs text-indigo-600 mt-1 inline-block">
                (*注: pop 会在恢复后直接删除，若冲突可能导致代码丢失。确认没问题后再 git stash drop)
              </span>
            </li>
            <li className="pt-2 border-t border-indigo-200 mt-2">
              <strong>🔍 代码去哪儿了？(排查顺序):</strong>
              1. 忘按 Ctrl+S? / 2. 错误 commit 到了上一个分支? / 3. 在 <code>git stash list</code> 里? / 4. 分支切错了 (
              <code>git branch --show-current</code>)?
            </li>
          </ul>
        </div>

        {/* Section 4 - Existing CodeRabbit */}
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6 mb-6">
          <h2 className="text-xl font-bold text-amber-900 border-l-4 border-amber-900 pl-3 mb-4">
            3. CodeRabbit 自动化审计闭环
          </h2>
          <ul className="space-y-3 text-gray-700">
            <li>
              <strong>接入方式</strong>: 必须通过 GitHub App 授权，而非手动 Webhook。
            </li>
            <li>
              <strong>激活条件</strong>: 只有当你
              <code className="bg-gray-200 px-2 py-1 rounded text-sm font-mono mx-1">git push</code> 后发起
              <code className="bg-gray-200 px-2 py-1 rounded text-sm font-mono mx-1">Pull Request</code> 时，CodeRabbit
              才会介入审计。
            </li>
            <li>
              <strong>审计心态</strong>: 编译器错误 &gt; CodeRabbit 意见 &gt; 个人偏好。若与编译器冲突，CodeRabbit
              意见直接忽略。
            </li>
          </ul>
        </div>

        {/* Section 5 - Updated Team Collaboration */}
        <div className="bg-green-50 border border-green-300 rounded-lg shadow-sm p-6 mb-6">
          <h2 className="text-xl font-bold text-green-700 border-l-4 border-green-700 pl-3 mb-4">
            🤝 团队协作冲突管理 (Collaboration & Merge)
          </h2>

          <div className="mb-4">
            <h3 className="font-semibold text-gray-800 mb-2">安全合入 main 的标准操作流</h3>
            <code className="bg-gray-800 text-green-400 px-3 py-3 rounded text-sm font-mono block overflow-x-auto whitespace-pre">
              # 1. 必查与暂存{'\n'}
              git status{'\n'}
              git stash push -u -m "save work"{'\n\n'}# 2. 拉取最新情报 (不直接改变当前代码){'\n'}
              git fetch origin{'\n\n'}# 3. 更新基座并合并{'\n'}
              git switch main{'\n'}
              git pull --ff-only origin main{'\n'}
              git merge origin/feat/xxx
            </code>
          </div>

          <div className="mb-4">
            <h3 className="font-semibold text-gray-800 mb-2">冲突解决流程</h3>
            <ol className="text-sm text-gray-700 space-y-2 list-decimal list-inside">
              <li>
                若进 Vim，保存合并按 <code className="bg-gray-200 px-1 text-xs">Esc</code> →{' '}
                <code className="bg-gray-200 px-1 text-xs">:wq</code> →{' '}
                <code className="bg-gray-200 px-1 text-xs">Enter</code>
              </li>
              <li>
                若想取消合并按 <code className="bg-gray-200 px-1 text-xs">Esc</code> →{' '}
                <code className="bg-gray-200 px-1 text-xs">:q!</code>，然后输入{' '}
                <code className="bg-gray-200 px-1 text-xs">git merge --abort</code>
              </li>
              <li>
                手动解冲突：选择要保留的代码，删掉 <code>&lt;&lt;&lt;</code> 与 <code>&gt;&gt;&gt;</code>
              </li>
              <li>
                完成：<code className="bg-gray-200 px-1 text-xs">git add 指定文件</code> →{' '}
                <code className="bg-gray-200 px-1 text-xs">git commit</code> →{' '}
                <code className="bg-gray-200 px-1 text-xs">git push</code>
              </li>
            </ol>
          </div>
        </div>

        {/* Section 6 - Warning */}
        <div className="bg-red-50 border border-red-300 rounded-lg shadow-sm p-6 mb-6">
          <h2 className="text-xl font-bold text-red-700 border-l-4 border-red-700 pl-3 mb-4">
            ⚠️ 导师红色警戒 (异常处理决策树)
          </h2>
          <p className="mb-4 text-gray-800">当开发崩盘时，不要尝试通过"修补错误代码"来修复系统，直接降维打击：</p>
          <ul className="space-y-3 text-sm">
            <li>
              <strong>如果代码写乱了但没提交</strong>:
              <br />
              <code className="bg-gray-800 text-red-300 px-3 py-2 rounded font-mono block mt-1 overflow-x-auto">
                git restore . && git clean -fd
              </code>
            </li>
            <li>
              <strong>如果逻辑写死锁且已提交</strong>:
              <br />
              <code className="bg-gray-800 text-red-300 px-3 py-2 rounded font-mono block mt-1 overflow-x-auto">
                git reset --hard HEAD
              </code>
            </li>
            <li>
              <strong>如果 CodeRabbit 误导</strong>:
              <br />
              <code className="bg-gray-800 text-red-300 px-3 py-2 rounded font-mono block mt-1 overflow-x-auto">
                @coderabbitai mark as resolved
              </code>
            </li>
          </ul>
        </div>

        {/* Section 7 - Updated Workflow */}
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6 mb-6">
          <h2 className="text-xl font-bold text-amber-900 border-l-4 border-amber-900 pl-3 mb-4">
            4. 每日工程流程图 (Workflow)
          </h2>
          <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-xs leading-relaxed font-mono">
            {`[ START ]
   │
   ├─ 1. 资产同步 (Sync Stage)
   │  ├── Ctrl + S (保存当前所有工作)
   │  ├── git switch main
   │  └── git pull --ff-only origin main ──>(确认基座为最新)
   │
   ├─ 2. 特性开发 (Develop Stage)
   │  ├── git switch -c feat/功能名
   │  ├── 核心开发
   │  │   ├── 💡 随时查状态: git status / git diff
   │  │   ├── 若 逻辑死锁 -> [止损]: git reset --hard HEAD
   │  │   ├── 若 需切分支 -> [暂存]: git stash push -u -m "msg"
   │  │   └── 若 代码跑通 -> [推进]: git add 特定文件 && git commit
   │  └── git push -u origin feat/功能名
   │
   ├─ 3. 质量审计 (Audit Stage)
   │  ├── 发起 PR -> CodeRabbit 扫描
   │  └── 若审计无误 -> [执行合并]
   │
   ├─ 4. 资产合入 (Merge Stage)
   │  ├── GitHub 执行 Squash Merge
   │  ├── git switch main && git pull
   │  └── git branch -d feat/功能名 (清理)
   │
   └─ [ DAY END / 部署就绪 ]`}
          </pre>
        </div>

        {/* Quick Commands */}
        <div className="bg-blue-50 border border-blue-300 rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-bold text-blue-900 border-l-4 border-blue-500 pl-3 mb-4">⚡ 高频快捷指令参考</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-semibold text-gray-700 mb-1">查状态 (最常用，保平安)</p>
              <code className="bg-gray-200 px-2 py-1 rounded text-xs font-mono block">git status</code>
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-700 mb-1">查当前分支</p>
              <code className="bg-gray-200 px-2 py-1 rounded text-xs font-mono block">git branch --show-current</code>
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-700 mb-1">新特性开发 (建并切分支)</p>
              <code className="bg-gray-200 px-2 py-1 rounded text-xs font-mono block">git switch -c feat/name</code>
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-700 mb-1">安全暂存当前代码</p>
              <code className="bg-gray-200 px-2 py-1 rounded text-xs font-mono block">git stash push -u -m "fix"</code>
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-700 mb-1">恢复暂存代码 (不删除stash)</p>
              <code className="bg-gray-200 px-2 py-1 rounded text-xs font-mono block">
                git stash apply stash@&#123;0&#125;
              </code>
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-700 mb-1">拉取云端情报但不合并</p>
              <code className="bg-gray-200 px-2 py-1 rounded text-xs font-mono block">git fetch origin</code>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
