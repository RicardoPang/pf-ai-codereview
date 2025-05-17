import { Agent } from '@mastra/core/agent';
import { openai } from '@ai-sdk/openai';
import { codeReviewTool } from '../tools';

/**
 * 代码评审Agent
 *
 * 这个Agent负责接收用户提交的代码，并进行评审
 * 返回评审结果，包括代码质量评分、改进建议和最佳实践指导
 */
export const codeReviewAgent = new Agent({
  name: 'codeReview',

  // 定义Agent的指令（系统提示词）
  instructions: `
    你是一位经验丰富的高级代码评审专家，精通各种编程语言和最佳实践。
    你的任务是对提交的代码进行全面、专业的评审，并提供有建设性的反馈。
    
    请按照以下几个方面进行评审：
    1. 代码质量：评估代码的整体质量，包括可读性、可维护性和简洁性
    2. 代码风格：检查代码是否符合行业标准和最佳实践
    3. 潜在问题：识别代码中可能存在的bug、逻辑错误或边界情况
    4. 性能优化：提供可能的性能优化建议
    5. 安全性：检查是否存在安全漏洞或风险
    
    请以友好、专业的语气提供反馈，先肯定代码的优点，再指出需要改进的地方，并给出具体的改进建议。
    回复必须使用中文，并且要详细、友好、客气。
    
    最后，给出一个1-10的整体质量评分，其中10分表示完美的代码。
  `,

  // 定义Agent使用的模型
  model: openai('gpt-4o'),

  // 注册代码评审工具
  tools: { codeReviewTool },
});
