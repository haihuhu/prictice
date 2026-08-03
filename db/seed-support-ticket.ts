import { db } from './index'
import { supportTickets } from './schema'

// 支持优先级
const priorities = ['low', 'medium', 'high'] as const

// 随机生成一个优先级
function getRandomPriority() {
  return priorities[Math.floor(Math.random() * priorities.length)]
}

// 随机生成标题
function getRandomTitle() {
  // 假设有一些常见的支持请求类型
  const types = [
    '无法登录账户',
    '页面加载缓慢',
    '找回密码',
    '报表生成错误',
    '功能请求',
    '数据同步失败',
    '权限申请',
    '移动端闪退',
    '发票问题',
    '更新失败',
    '图片无法上传',
    '客服回复慢',
    '通知未收到',
    '界面显示异常',
    '无法新建任务',
    '团队成员加入异常',
    'VIP功能未解锁',
    '登录提醒未收到',
    '历史记录缺失',
    '设备绑定失败'
  ]
  return `${types[Math.floor(Math.random() * types.length)]} #${Math.floor(Math.random() * 1000 + 1)}`
}

// 随机邮箱
function getRandomEmail(id: number) {
  const domains = ['gmail.com', 'qq.com', 'example.com', '163.com', 'hotmail.com', 'outlook.com']
  return `user${id}@${domains[Math.floor(Math.random() * domains.length)]}`
}

// 随机生成未来的到期日（有一定概率为null）
function getRandomDueDate() {
  if (Math.random() < 0.2) return null
  const now = new Date()
  // 随机7~90天后
  const daysToAdd = Math.floor(Math.random() * 84) + 7
  const due = new Date(now)
  due.setDate(now.getDate() + daysToAdd)
  due.setHours(0, 0, 0, 0)
  return due
}

// 随机已解决与否
function getRandomIsResolved() {
  return Math.random() < 0.4 // 40% 设为true
}

const ticketData = Array.from({ length: 100 }).map((_, i) => ({
  title: getRandomTitle(),
  customerEmail: getRandomEmail(i + 1),
  priority: getRandomPriority(),
  dueDate: getRandomDueDate(),
  isResolved: getRandomIsResolved()
}))

const seedSupportTickets = async () => {
  await db.insert(supportTickets).values(ticketData)
  console.log('100 Support tickets seeded.')
}

seedSupportTickets()