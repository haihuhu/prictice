import React from 'react';
import { CodeWindow } from '@/components/CodeWindow';

export default function DrizzleCheatSheet() {
  return (
    <div className="max-w-5xl mx-auto p-6 space-y-12 bg- text-gray-800 rounded-xl shadow-sm leading-relaxed">
      {/* 头部标题 */}
      <header className="border-b pb-6 mb-8">
        <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 mb-4">
          🛠️ 全栈进阶架构笔记：Database 终极防坑指南
        </h1>
        <p className="text-lg text-slate-600">
          Schema 建模、物理约束、Drizzle Relations 与 Drizzle-Kit 工作流。
          这份指南融合了真实踩坑血泪史与官方标准规范，确保同一个坑，绝对不掉进去第二次！
        </p>
      </header>

      {/* 模块一：项目结构与安全红线 */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold border-b-2 border-indigo-500 pb-2 flex items-center">
          <span>01. 📁 数据库配置与安全红线 (Setup & Security)</span>
        </h2>

        <div className="bg-indigo-50 p-5 rounded-lg border border-indigo-100">
          <h3 className="font-semibold text-indigo-800 mb-3 text-lg">🔒 核心安全与配置铁律</h3>
          <ul className="list-disc pl-5 space-y-2 text-indigo-900">
            <li>
              绝对不要将 <code>.env</code> 或 <code>.env.local</code> 提交到 Git。
            </li>
            <li>
              绝对不要在客户端组件 (Client Components) 中暴露 <code>DATABASE_URL</code>。
            </li>
            <li>
              通常每张表都必须有一个 <code>id</code> 作为 Primary Key。
            </li>
            <li>
              只有当字段必须永远存在时，才使用 <code>.notNull()</code>。
            </li>
            <li>
              在修改 <code>schema.ts</code> 后，必须运行 migration 或 push。
            </li>
            <li>
              <code>schema.ts</code> 和 <code>drizzle migration</code> 文件夹必须一起提交到 Git。
            </li>
            <li>
              <strong>防误删警钟：</strong> <code>db.delete(tableName)</code> 如果后面
              <strong>
                忘加了 <code>.where()</code>
              </strong>
              ，会直接一次性清空整张物理表！每次写 delete，脑子里必须先过一遍 where。
            </li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold text-lg mb-2">📄 文件职责分工 (File Responsibilities)</h3>
          <pre className="bg-slate-900 text-slate-50 p-4 rounded-md overflow-x-auto text-sm">
            <CodeWindow
              code={`db/
├── schema.ts
│   └── 定义表 (Tables)、列 (Columns)、规则 (Rules) 及推断类型 (Inferred types)
│
└── index.ts
    └── 创建并导出唯一的、可复用的数据库实例 (db instance)`}
            />
          </pre>
        </div>

        <div>
          <h3 className="font-semibold text-lg mb-2">🔌 数据库连接标准模板 (db/index.ts)</h3>
          <p className="text-sm text-gray-600 mb-2">
            Next.js 开发环境下由于频繁热更新，必须使用全局缓存来防止创建过多连接。
          </p>
          <pre className="bg-slate-900 text-slate-50 p-4 rounded-md overflow-x-auto text-sm">
            <CodeWindow
              code={`import { drizzle } from 'drizzle-orm/postgres-js';
              import postgres from 'postgres';
              
              const connectionString = process.env.DATABASE_URL;
              
              if (!connectionString) {
                throw new Error('DATABASE_URL is missing');
              }
              
              // 缓存客户端，防止 Next.js HMR 导致连接数耗尽
              const globalForDb = globalThis as unknown as {
                client: ReturnType<typeof postgres> | undefined;
              };
              
              const client = globalForDb.client ?? postgres(connectionString);
              
              if (process.env.NODE_ENV !== 'production') {
                globalForDb.client = client;
              }
              
              export const db = drizzle(client);`}
            />
          </pre>
        </div>
      </section>

      {/* 模块二：物理建表与核心字段 */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold border-b-2 border-blue-500 pb-2 flex items-center">
          <span>02. 🏗️ Drizzle Schema 物理建表与核心字段设计</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-blue-50 p-5 rounded-lg">
            <h3 className="font-semibold text-blue-800 mb-2">
              1. 外名 (TS) 与内名 (DB) 的映射隔离
            </h3>
            <p className="text-sm text-blue-900 mb-2">
              <strong>外名（TS 属性名）：</strong> 遵循 <code>camelCase</code>（如 createdAt）。
              <br />
              <strong>内名（DB 列名）：</strong> 括号内字符串，遵循 <code>snake_case</code>（如
              'created_at'）。
            </p>
            <p className="text-sm font-bold text-blue-900">
              物理四块结构口诀：外名 → 类型 → 内名 → 约束
            </p>
            <code className="text-xs block mt-2 p-2 bg-white rounded">
              ownerId: integer('owner_id').references(...).notNull()
            </code>
          </div>

          <div className="bg-red-50 p-5 rounded-lg border border-red-200">
            <h3 className="font-semibold text-red-800 mb-2">
              ⚠️ 终极天坑：Numeric 类型的 String 双向转换
            </h3>
            <p className="text-sm text-red-900 mb-2">
              JS 浮点数计算有天然精度丢失（如 0.1+0.2）。为了绝对精确，PostgreSQL 的{' '}
              <code>numeric</code> 类型在 Drizzle 读写时会被
              <strong>强制映射为 string，而不是 number！</strong>
            </p>
            <ul className="text-xs text-red-900 list-disc pl-4 space-y-1 mt-2">
              <li>
                <strong>写库前：</strong> 必须显式 <code>String(values.price)</code> 后插入。
              </li>
              <li>
                <strong>读库后：</strong> 取出的是 <code>"19.99"</code>，计算需手动{' '}
                <code>Number(price)</code>。
              </li>
            </ul>
          </div>
        </div>

        <div>
          <h3 className="font-semibold text-lg mb-2">🚨 物理唯一性约束的联合设计 (Unique Index)</h3>
          <p className="text-sm text-gray-700 mb-2">
            SaaS 多租户项目中，不能限制项目名称全局唯一。必须使用<strong>复合唯一索引</strong>
            （如：同一个用户内，项目名称不能重复）。
          </p>
          <pre className="bg-slate-900 text-slate-50 p-4 rounded-md overflow-x-auto text-sm">
            <CodeWindow
              code={`export const projectCategories = pgTable(
  'project_categories',
  {
    id: serial('id').primaryKey(),
    userId: integer('user_id').notNull(),
    name: varchar('name', { length: 255 }).notNull(),
  },
  (table) => [
    // 将 userId 和 name 绑定在一起做复合索引
    uniqueIndex('categories_user_name_unique').on(table.userId, table.name)
  ]
);`}
            />
          </pre>
        </div>

        <div className="bg-yellow-50 p-5 rounded-lg border border-yellow-200">
          <h3 className="font-semibold text-yellow-800 mb-2">⚠️ Varchar 里的 enum 伪约束警告</h3>
          <p className="text-sm text-yellow-900">
            <code>varchar('status', &#123; enum: [...] &#125;)</code> 只是{' '}
            <strong>TS 编译期的提示</strong>，不会在数据库创建物理 Enum。必须靠
            <strong>服务端 Zod 二次校验（双端校验）</strong>
            作为安全底线。如果想要物理级死守，必须使用 PostgreSQL 的 <code>pgEnum(...)</code>。
          </p>
        </div>

        <div>
          <h3 className="font-semibold text-lg mb-2">
            📋 完整表结构与类型推断参考 (Inventory Example)
          </h3>
          <pre className="bg-slate-900 text-slate-50 p-4 rounded-md overflow-x-auto text-sm">
            <CodeWindow
              code={`import { boolean, integer, numeric, pgTable, serial, timestamp, varchar } from 'drizzle-orm/pg-core';

export const inventories = pgTable('inventories', {
  id: serial('id').primaryKey(),
  itemName: varchar('item_name', { length: 255 }).notNull(),
  category: varchar('category', {
    length: 20,
    enum: ['Electronics', 'Furniture', 'Office'], // TS 层枚举
  }).notNull(),
  quantity: integer('quantity').notNull(),
  price: numeric('price', { precision: 10, scale: 2 }).notNull(), // 注意：取出来是 String
  isInStock: boolean('is_in_stock').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
});

// TypeScript 类型推断：无需手动写 interface
export type InventoryInsert = typeof inventories.$inferSelect; // 包含生成的 id, createdAt
export type NewInventorySelect = typeof inventories.$inferInsert; // 插入类型，id/createdAt 是可选的`}
            />
          </pre>
        </div>
      </section>

      {/* 模块三：物理外键与级联策略 */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold border-b-2 border-orange-500 pb-2 flex items-center">
          <span>03. 🔗 物理外键关联与删除策略 (On Delete Strategies)</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 border rounded shadow-sm bg-white">
            <h3 className="font-bold text-orange-600">物理外键 (References)</h3>
            <p className="text-sm mt-2 text-gray-700">
              <strong>作用：</strong> 数据库强约束，阻止脏数据落库。
            </p>
            <p className="text-sm text-gray-700">
              <strong>写法：</strong> 写在 pgTable 列中：<code>.references(() =&gt; users.id)</code>
            </p>
          </div>
          <div className="p-4 border rounded shadow-sm bg-white">
            <h3 className="font-bold text-teal-600">ORM 关联 (Relations)</h3>
            <p className="text-sm mt-2 text-gray-700">
              <strong>作用：</strong> 应用层查询配置，支持简练的 <code>with</code> 嵌套查询。
            </p>
            <p className="text-sm text-gray-700">
              <strong>写法：</strong> 使用 <code>relations(...)</code> 独立声明。
            </p>
          </div>
        </div>
        <p className="text-sm font-medium bg-gray-100 p-3 rounded">
          💡 <strong>黄金口诀：</strong> 每出现一个 references（外键），通常就在 relations
          形成一对配对（一端 <code>one()</code>，一端 <code>many()</code>）。
        </p>

        <div className="bg-red-100 p-5 rounded-lg border-l-4 border-red-500 shadow-sm">
          <h3 className="font-bold text-red-900 text-lg">☢️ 核弹级 Bug 警告：互斥约束</h3>
          <p className="mt-2 text-red-800 text-sm">
            <strong>绝对禁止：</strong> <code>onDelete: 'set null'</code> 与 <code>.notNull()</code>{' '}
            同时在一个字段上使用！
            <br />
            <strong>原因：</strong> 数据库尝试置空，却被非空约束拦截，会导致系统连环崩溃。
            <br />
            <strong>铁律：</strong> 只有允许为 null（无 <code>.notNull()</code>）的字段，才能使用{' '}
            <code>set null</code> 策略。
          </p>
        </div>

        <div>
          <h3 className="font-semibold text-lg mb-3">🛡️ 删除策略选用与应用层双重保护</h3>
          <div className="space-y-4">
            <div className="p-4 bg-gray-50 border rounded-lg">
              <h4 className="font-bold text-gray-800 mb-1">
                1. Restrict / No Action (限制不准删) —— 默认最安全
              </h4>
              <p className="text-sm text-gray-600">
                <strong>场景：</strong> 父节点下挂有子节点时，严禁删除父节点。
              </p>
              <p className="text-sm text-gray-600 mt-1">
                <strong>双重防线：</strong> 数据库设 <code>no action</code> 死守；Server Action 中
                <strong>先 count 查询</strong>
                ，如果存在子数据，前置拦截并返回人类友好提示，而不是抛出数据库底层报错。
              </p>
            </div>
            <div className="p-4 bg-gray-50 border rounded-lg">
              <h4 className="font-bold text-gray-800 mb-1">2. Cascade (级联删除) —— 子随父亡</h4>
              <p className="text-sm text-gray-600">
                <strong>场景：</strong> Tasks 属于
                Project。项目一旦删除，底下任务毫无存在意义，自动抹除。
              </p>
            </div>
            <div className="p-4 bg-gray-50 border rounded-lg">
              <h4 className="font-bold text-gray-800 mb-1">
                3. Set Null (级联置空) —— 独立存活解耦
              </h4>
              <p className="text-sm text-gray-600">
                <strong>场景：</strong> Project 的
                reviewerId。审核人账号被删，但项目需保留，仅仅让“审核人”列变为空白。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 模块四：Drizzle Relations (关联查询) */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold border-b-2 border-teal-500 pb-2 flex items-center">
          <span>04. 🌲 Drizzle Relations 查询关联定义 (Relational Query)</span>
        </h2>

        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 bg-teal-50 p-4 border border-teal-200 rounded-lg">
            <h3 className="font-bold text-teal-800">
              🎯 <code>one()</code> 精确制导
            </h3>
            <p className="text-sm text-teal-900 mt-2">
              外键在 <code>one()</code> 的这一侧（子表）。<strong>必须</strong>明确提供{' '}
              <code>&#123; fields, references &#125;</code>，精确告诉 Drizzle 哪两个字段连在一起。
            </p>
          </div>
          <div className="flex-1 bg-green-50 p-4 border border-green-200 rounded-lg">
            <h3 className="font-bold text-green-800">
              🛸 <code>many()</code> 自动巡航
            </h3>
            <p className="text-sm text-green-900 mt-2">
              外键在对方表上。<strong>绝对不要</strong>在里面写映射参数。Drizzle
              能自动从对方推导出来。直接写 <code>tasks: many(week9Tasks)</code>。
            </p>
          </div>
        </div>

        <div className="bg-purple-50 p-5 border border-purple-200 rounded-lg">
          <h3 className="font-bold text-purple-900 mb-2">
            🔥 经典死穴：双外键指向同一张表 (relationName 显式对账)
          </h3>
          <p className="text-sm text-purple-800 mb-3">
            当 <code>projects</code> 的 <code>ownerId</code> 和 <code>reviewerId</code> 都指向{' '}
            <code>users.id</code> 时，Drizzle 会陷入歧义。 必须使用{' '}
            <strong>relationName（双向暗号）</strong>
            机制。两端字符串必须大小写、单复数绝对一致！注意：查询 key 不需要写 relationName。
          </p>
          <pre className="bg-slate-900 text-slate-50 p-4 rounded-md overflow-x-auto text-xs">
            <CodeWindow
              code={`// ===== 表定义 =====
export const week9Projects = pgTable('projects', {
  id: serial('id').primaryKey(),
  ownerId: integer('owner_id').references(() => users.id).notNull(),
  reviewerId: integer('reviewer_id').references(() => users.id), // 无 notNull, 允许 set null
});

// ===== RELATIONS (写在表定义完成之后，防循环引用) =====
export const usersRelations = relations(users, ({ many }) => ({
  ownerProjects: many(projects, { relationName: 'ownerProjects' }), // 配对暗号 1
  reviewProjects: many(projects, { relationName: 'reviewProjects' }), // 配对暗号 2
}));

export const projectsRelations = relations(projects, ({ one, many }) => ({
  owner: one(users, {
    fields: [projects.ownerId],
    references: [users.id],
    relationName: 'ownerProjects', // 精确指向暗号 1
  }),
  reviewer: one(users, {
    fields: [projects.reviewerId],
    references: [users.id],
    relationName: 'reviewProjects', // 精确指向暗号 2
  })
}));`}
            />
          </pre>
        </div>
      </section>

      {/* 模块五：Drizzle-Kit 工作流 */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold border-b-2 border-rose-500 pb-2 flex items-center">
          <span>05. 🚀 Drizzle-Kit 命令分工与安全工作流</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 border rounded-lg bg-gray-50">
            <h3 className="font-bold text-gray-800">
              1. <code>push</code> (快速同步)
            </h3>
            <p className="text-sm mt-1 text-gray-600">
              <strong>原理：</strong> 直接拿本地 schema 覆写数据库结构。不生成、不读迁移记录。
            </p>
            <p className="text-sm font-medium mt-1 text-blue-600">
              适合：早期练习、本地快速建表调试。
            </p>
          </div>
          <div className="p-4 border rounded-lg bg-gray-50">
            <h3 className="font-bold text-gray-800">
              2. <code>generate</code> (生成版本切片)
            </h3>
            <p className="text-sm mt-1 text-gray-600">
              <strong>原理：</strong> 对比变化，生成带版本戳的 <code>.sql</code> 迁移文件。
            </p>
            <p className="text-sm font-medium mt-1 text-purple-600">适合：正式项目、上线前准备。</p>
          </div>
          <div className="p-4 border rounded-lg bg-gray-50">
            <h3 className="font-bold text-gray-800">
              3. <code>migrate</code> (执行发布)
            </h3>
            <p className="text-sm mt-1 text-gray-600">
              <strong>原理：</strong> 执行 .sql 文件，并在数据库的 <code>__drizzle_migrations</code>{' '}
              账本中对账。
            </p>
            <p className="text-sm font-bold mt-1 text-red-600">
              ⚠️ 绝不可暴力删库/删SQL文件而不清空账本表，否则永远死循环！
            </p>
          </div>
          <div className="p-4 border rounded-lg bg-gray-50">
            <h3 className="font-bold text-gray-800">
              4. <code>studio</code> (查库可视化)
            </h3>
            <p className="text-sm mt-1 text-gray-600">
              <strong>原理：</strong> 开启本地轻量客户端直连 Neon 查数据。
            </p>
          </div>
        </div>

        <div className="bg-rose-50 p-4 border border-rose-200 rounded-lg">
          <h3 className="font-bold text-rose-900 mb-2">🚧 配置文件路径红线</h3>
          <p className="text-sm text-rose-800">
            在 <code>drizzle.config.ts</code> 中，
            <strong>
              千万不能使用 <code>@/</code> 别名定义路径！
            </strong>
            Drizzle-Kit 命令行运行在独立的 Node 环境，不认 Next.js 的路径别名。必须统一使用显式的{' '}
            <code>./db/schema.ts</code> 相对路径。
          </p>
        </div>

        <div className="bg-gray-100 p-4 rounded-lg">
          <h3 className="font-bold mb-2">✅ 标准安全变更流程 (6步法)</h3>
          <ol className="list-decimal pl-5 space-y-1 text-sm text-gray-700">
            <li>
              修改 <code>db/schema.ts</code>
            </li>
            <li>
              运行 <code>npm run drizzle:generate</code>
            </li>
            <li>
              审查生成的 <code>drizzle/xxxx_xxx.sql</code> 文件
            </li>
            <li>
              运行 <code>npm run drizzle:migrate</code>
            </li>
            <li>在应用中测试修改后的表功能</li>
            <li>
              将 <code>schema.ts</code> 与 <code>drizzle/</code> 文件夹一起提交 Git
            </li>
          </ol>
        </div>
      </section>

      {/* 模块六：快速决策指南 */}
      <section className="mt-8 bg-slate-800 text-slate-100 p-6 rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold mb-4 border-b border-slate-600 pb-2">
          ⚡ Quick Decision Guide (一秒决策器)
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 text-sm">
          <div>
            <p className="text-slate-400">需要建新表？</p>
            <p className="font-mono text-emerald-400">→ Add pgTable in schema.ts</p>
          </div>
          <div>
            <p className="text-slate-400">字段必须有值？</p>
            <p className="font-mono text-emerald-400">→ Add .notNull()</p>
          </div>
          <div>
            <p className="text-slate-400">需要自动创建时间？</p>
            <p className="font-mono text-emerald-400">→ Add timestamp(...).defaultNow()</p>
          </div>
          <div>
            <p className="text-slate-400">需要 TS 行记录类型？</p>
            <p className="font-mono text-emerald-400">→ typeof table.$inferSelect</p>
          </div>
          <div>
            <p className="text-slate-400">需要 TS 插入数据类型？</p>
            <p className="font-mono text-emerald-400">→ typeof table.$inferInsert</p>
          </div>
          <div>
            <p className="text-slate-400">需要在业务中操作库？</p>
            <p className="font-mono text-emerald-400">→ import &#123; db &#125; from '@/db'</p>
          </div>
          <div className="md:col-span-2 pt-3 border-t border-slate-600 mt-2">
            <p className="text-slate-300 font-bold mb-2">修改了 schema.ts 之后：</p>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <span className="text-xs bg-slate-700 px-2 py-1 rounded">开发/本地快调</span>
                <p className="font-mono text-sky-400 mt-1">→ npm run drizzle:push</p>
              </div>
              <div className="flex-1">
                <span className="text-xs bg-slate-700 px-2 py-1 rounded">上线/留档/团队</span>
                <p className="font-mono text-sky-400 mt-1">→ generate → review SQL → migrate</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
