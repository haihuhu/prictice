import { db } from '@/db';
import { week9Projects, week9Tasks, week9Users, week9ProjectCategories } from '@/db/schema';

// 生成数据的配置
const USER_COUNT = 50;
const CATEGORIES_PER_USER = 3; // 每个用户有 3 个分类
const PROJECTS_PER_USER = 4; // 每个用户有 4 个项目
const TASK_MIN_PER_PROJECT = 2;
const TASK_MAX_PER_PROJECT = 5;

// 分类名称池
const categoryNamePool = [
  'Education', 'Finance', 'Healthcare', 'Inventory', 'Support', 'Analytics', 'Booking', 'Expense',
  'Catalog', 'Warehouse', 'Billing', 'HR', 'Events', 'Content', 'Subscription', 'Tracking',
  'Progress', 'Restaurant', 'CRM', 'Recruitment', 'Approval', 'Maintenance', 'Feedback', 'Resource',
  'Marketing', 'Sales', 'Legal', 'Compliance', 'Research', 'Development', 'Testing', 'Deployment',
  'Security', 'Performance', 'Design', 'UI/UX', 'Documentation', 'Training', 'Consulting', 'Planning',
  'Strategy', 'Budgeting', 'Reporting', 'Integration', 'Migration', 'Optimization', 'Automation', 'Monitoring',
];

// 名字池
const firstNames = [
  'Alice', 'Bob', 'Charlie', 'Diana', 'Ethan', 'Fiona', 'George', 'Hannah', 'Ivan', 'Julia',
  'Kevin', 'Laura', 'Michael', 'Nancy', 'Oscar', 'Patricia', 'Quinn', 'Rachel', 'Steve', 'Tina',
  'Ulysses', 'Victoria', 'William', 'Xena', 'Yuri', 'Zoe', 'Adam', 'Brenda', 'Carlos', 'Daisy',
  'Edward', 'Flora', 'Greg', 'Helen', 'Ian', 'Jasmine', 'Kyle', 'Linda', 'Mason', 'Nora',
  'Peter', 'Quincy', 'Rosa', 'Sam', 'Tara', 'Uma', 'Victor', 'Wendy', 'Xavier', 'Yvonne',
];
const lastNames = [
  'Smith', 'Johnson', 'Brown', 'Wilson', 'Davis', 'Miller', 'Taylor', 'Anderson', 'Thomas', 'Jackson',
  'White', 'Harris', 'Martin', 'Thompson', 'Garcia', 'Martinez', 'Robinson', 'Clark', 'Rodriguez', 'Lewis',
  'Lee', 'Walker', 'Hall', 'Allen', 'Young', 'King', 'Wright', 'Scott', 'Green', 'Baker',
  'Adams', 'Nelson', 'Carter', 'Mitchell', 'Perez', 'Roberts', 'Turner', 'Phillips', 'Campbell', 'Parker',
  'Evans', 'Edwards', 'Collins', 'Stewart', 'Sanchez', 'Morris', 'Rogers', 'Reed', 'Cook', 'Morgan',
];

// 项目名称模板
const projectTemplates = [
  'Management System', 'Platform', 'Dashboard', 'Application', 'Portal',
  'Tool', 'Service', 'Module', 'Interface', 'Integration',
];

// 任务标题模板
const taskTemplates = [
  'Design database schema', 'Build REST API endpoints', 'Implement authentication',
  'Create frontend components', 'Add form validation', 'Set up error handling',
  'Write unit tests', 'Optimize performance', 'Add documentation',
  'Implement search functionality', 'Build notification system', 'Create export feature',
  'Add import functionality', 'Implement caching layer', 'Set up monitoring',
  'Add logging system', 'Create admin panel', 'Build reporting module',
  'Implement user roles', 'Add email notifications',
];

// 辅助函数
function randomItem<T>(arr: readonly T[] | T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function shuffleArray<T>(arr: T[]): T[] {
  return arr.sort(() => Math.random() - 0.5);
}

function generateName(index: number): string {
  const firstName = firstNames[index % firstNames.length];
  const lastName = lastNames[(index + Math.floor(index / firstNames.length)) % lastNames.length];
  const suffix = index >= firstNames.length * lastNames.length ? `_${Math.floor(index / (firstNames.length * lastNames.length))}` : '';
  return `${firstName}${lastName}`;
}

function generateCategoryName(categoryIndex: number): string {
  const baseName = categoryNamePool[categoryIndex % categoryNamePool.length];
  const suffix = Math.floor(categoryIndex / categoryNamePool.length) + 1;
  return suffix > 1 ? `${baseName}_${suffix}` : baseName;
}

function generateProjectName(categoryName: string, index: number): string {
  const template = randomItem(projectTemplates);
  return `${categoryName} ${template} #${index + 1}`;
}

function generateDescription(projectName: string): string {
  return `A comprehensive solution for ${projectName.toLowerCase()}. Includes all necessary features for efficient management and operations.`;
}

async function seed() {
  console.log('Starting seed...');
  console.time('Seed completed in');

  await db.transaction(async (tx) => {
    console.log('Clearing existing data...');
    await tx.delete(week9Tasks);
    await tx.delete(week9Projects);
    await tx.delete(week9ProjectCategories);
    await tx.delete(week9Users);

    // 1. 插入用户
    console.log(`Inserting ${USER_COUNT} users...`);
    const userNames = Array.from({ length: USER_COUNT }, (_, i) => generateName(i));
    const insertedUsers = await tx
      .insert(week9Users)
      .values(userNames.map((name) => ({ name })))
      .returning();
    console.log(`Inserted ${insertedUsers.length} users`);

    // 2. 为每个用户创建分类（每个用户有自己的分类集合）
    console.log(`Inserting categories (${CATEGORIES_PER_USER} per user)...`);
    const allCategories: { userId: number; name: string; id: number }[] = [];
    
    for (let userIdx = 0; userIdx < insertedUsers.length; userIdx++) {
      const user = insertedUsers[userIdx];
      const categoryNames = Array.from(
        { length: CATEGORIES_PER_USER },
        (_, catIdx) => generateCategoryName(userIdx * CATEGORIES_PER_USER + catIdx)
      );
      
      const insertedCats = await tx
        .insert(week9ProjectCategories)
        .values(categoryNames.map((name) => ({ name, userId: user.id })))
        .returning();
      
      allCategories.push(...insertedCats);
    }
    console.log(`Inserted ${allCategories.length} categories`);

    // 3. 为每个用户创建项目（使用该用户自己的分类）
    console.log(`Inserting projects (${PROJECTS_PER_USER} per user)...`);
    const allProjects: { id: number; ownerId: number }[] = [];
    
    for (let userIdx = 0; userIdx < insertedUsers.length; userIdx++) {
      const user = insertedUsers[userIdx];
      // 获取该用户的分类
      const userCategories = allCategories.filter((c) => c.userId === user.id);
      
      const projectValues = Array.from({ length: PROJECTS_PER_USER }, (_, projIdx) => {
        const category = userCategories[projIdx % userCategories.length];
        const projectName = generateProjectName(category.name, projIdx);
        
        // 从所有用户中随机选择 reviewer（50% 概率）
        const hasReviewer = Math.random() > 0.5;
        const reviewerId = hasReviewer
          ? insertedUsers[Math.floor(Math.random() * insertedUsers.length)].id
          : null;
        
        return {
          ownerId: user.id,
          reviewerId,
          name: projectName,
          description: generateDescription(projectName),
          status: (['inactive', 'pending', 'completed', 'cancelled'] as const)[
            Math.floor(Math.random() * 4)
          ],
          categoryId: category.id,
        };
      });
      
      const insertedProjs = await tx
        .insert(week9Projects)
        .values(projectValues)
        .returning();
      
      allProjects.push(...insertedProjs);
    }
    console.log(`Inserted ${allProjects.length} projects`);

    // 4. 为每个项目创建任务
    console.log('Inserting tasks...');
    const taskStatuses = ['completed', 'in_progress', 'pending'] as const;
    const allTasks: { projectId: number; title: string; status: 'completed' | 'in_progress' | 'pending' }[] = [];
    
    for (const project of allProjects) {
      const taskCount = Math.floor(Math.random() * (TASK_MAX_PER_PROJECT - TASK_MIN_PER_PROJECT + 1)) + TASK_MIN_PER_PROJECT;
      const shuffledTasks = shuffleArray([...taskTemplates]);
      
      for (let i = 0; i < taskCount; i++) {
        allTasks.push({
          projectId: project.id,
          title: shuffledTasks[i % shuffledTasks.length],
          status: taskStatuses[Math.floor(Math.random() * taskStatuses.length)],
        });
      }
    }
    
    // 批量插入任务（分批以避免一次性插入太多）
    const BATCH_SIZE = 100;
    for (let i = 0; i < allTasks.length; i += BATCH_SIZE) {
      const batch = allTasks.slice(i, i + BATCH_SIZE);
      await tx.insert(week9Tasks).values(batch);
    }
    console.log(`Inserted ${allTasks.length} tasks`);

    // 验证数据一致性
    console.log('\n=== Data Consistency Check ===');
    const projectsWithOwner = await tx.select({ ownerId: week9Projects.ownerId }).from(week9Projects);
    const uniqueOwnerIds = new Set(projectsWithOwner.map((p) => p.ownerId));
    console.log(`Users with projects: ${uniqueOwnerIds.size} / ${insertedUsers.length}`);
    
    const categoriesWithProjects = await tx.select({ userId: week9ProjectCategories.userId }).from(week9ProjectCategories);
    const uniqueCatUserIds = new Set(categoriesWithProjects.map((c) => c.userId));
    console.log(`Users with categories: ${uniqueCatUserIds.size} / ${insertedUsers.length}`);

    console.log('\n=== Seed Summary ===');
    console.log(`Users:      ${insertedUsers.length}`);
    console.log(`Categories: ${allCategories.length}`);
    console.log(`Projects:   ${allProjects.length}`);
    console.log(`Tasks:      ${allTasks.length}`);
    console.log(`Total:      ${allTasks.length + allProjects.length + allCategories.length + insertedUsers.length}`);
  });

  console.timeEnd('Seed completed in');
}

seed().catch((error) => {
  console.error('Seed failed:', error);
  process.exitCode = 1;
});
