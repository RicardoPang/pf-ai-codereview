import { Mastra } from '@mastra/core';
import { createLogger } from '@mastra/core';
// 导入代码评审Agent
import { codeReviewAgent } from './agents';
// 导入存储模块
import { LibSQLStore } from '@mastra/libsql';

/**
 * Mastra实例配置
 *
 * 配置OpenAI API密钥
 * 注册代码评审Agent
 * 启用CORS以解决跨域问题
 */
export const mastra = new Mastra({
  // 注册代码评审Agent
  agents: { codeReviewAgent },

  // 配置API服务器选项
  server: {
    // 配置CORS，解决跨域问题
    cors: {
      origin: '*', // 允许所有来源访问，生产环境应该限制为特定域名
      allowHeaders: ['Content-Type', 'Authorization'],
      credentials: true,
    },
  },

  // 配置存储
  storage: new LibSQLStore({
    url: 'file:../mastra.db', // 使用本地文件存储
  }),

  // 配置日志
  logger: createLogger({
    name: 'AI-Code-Review',
    level: 'debug',
  }),
});
