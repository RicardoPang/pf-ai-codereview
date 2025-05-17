# AI Code Review

## 项目概述

这是一个AI驱动的代码评审工具，使用mastra和OpenAI实现。该工具可以对用户提交的代码进行智能评审，提供改进建议和最佳实践指导。

## 功能特点

- 代码质量评估
- 代码风格检查
- 潜在bug识别
- 性能优化建议
- 安全漏洞检测

## 技术栈

- Mastra AI Agent
- OpenAI API
- GraphQL API
- 响应式前端设计
- 玻璃态UI设计风格

## 安装与使用

### 安装依赖

```bash
npm install
```

### 开发环境运行

```bash
npm run dev
```

### 构建生产版本

```bash
npm run build
```

## API使用说明

### GraphQL API

项目提供了GraphQL API接口，可以通过以下方式调用：

```graphql
mutation ReviewCode($code: String!, $language: String!) {
  reviewCode(code: $code, language: $language) {
    feedback
    suggestions
    quality_score
  }
}
```

### 前端调用

前端可以通过mastra客户端直接调用agent：

```javascript
import { createClient } from '@mastra/client';

const client = createClient();
const result = await client.agent.codeReview.review({
  code: 'your code here',
  language: 'javascript',
});
```

## 注意事项

- API密钥安全性：确保OpenAI API密钥安全存储
- CORS处理：已解决跨域问题
- 响应式设计：适配各种设备尺寸
- 浏览器兼容性：支持主流现代浏览器
