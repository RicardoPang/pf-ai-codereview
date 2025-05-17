// 初始化页面元素
document.addEventListener('DOMContentLoaded', () => {
  const submitBtn = document.getElementById('submit-btn');
  const codeInput = document.getElementById('code');
  const languageSelect = document.getElementById('language');
  const contextInput = document.getElementById('context');
  const resultsPanel = document.getElementById('results-panel');
  const loadingIndicator = document.getElementById('loading');
  const qualityScore = document.getElementById('quality-score');
  const feedbackContent = document.getElementById('feedback');
  const suggestionsList = document.getElementById('suggestions-list');

  // 绑定提交按钮点击事件
  submitBtn.addEventListener('click', async () => {
    // 获取用户输入
    const code = codeInput.value.trim();
    const language = languageSelect.value;
    const context = contextInput.value.trim();

    // 验证输入
    if (!code) {
      showToast('请输入需要评审的代码', 'error');
      return;
    }

    // 显示加载状态
    toggleLoading(true);
    resultsPanel.classList.remove('hidden');
    feedbackContent.innerHTML = '';
    suggestionsList.innerHTML = '';
    qualityScore.textContent = '--';

    try {
      // 调用代码评审API
      const response = await reviewCode(code, language, context);

      // 显示评审结果
      displayResults(response);
    } catch (error) {
      console.error('代码评审失败:', error);
      showToast('代码评审失败，请稍后重试', 'error');
      resultsPanel.classList.add('hidden');
    } finally {
      // 隐藏加载状态
      toggleLoading(false);
    }
  });

  /**
   * 调用代码评审API
   * @param {string} code - 需要评审的代码
   * @param {string} language - 编程语言
   * @param {string} context - 代码上下文或用途
   * @returns {Promise<Object>} - 评审结果
   */
  async function reviewCode(code, language, context) {
    try {
      // 构建API请求
      const requestBody = {
        code,
        language,
      };

      // 如果有上下文，则添加到请求中
      if (context) {
        requestBody.context = context;
      }

      // 发送请求到代码评审Agent
      const response = await fetch('/api/agents/codeReview/tools/codeReview', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      // 检查响应状态
      if (!response.ok) {
        throw new Error(`API请求失败: ${response.status}`);
      }

      // 解析响应数据
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('API请求错误:', error);
      throw error;
    }
  }

  /**
   * 显示评审结果
   * @param {Object} results - 评审结果
   */
  function displayResults(results) {
    // 显示质量评分
    qualityScore.textContent = results.quality_score;

    // 根据评分设置不同的颜色
    if (results.quality_score >= 8) {
      qualityScore.style.backgroundColor = '#4caf50'; // 绿色
    } else if (results.quality_score >= 6) {
      qualityScore.style.backgroundColor = '#ff9800'; // 橙色
    } else {
      qualityScore.style.backgroundColor = '#f44336'; // 红色
    }

    // 显示详细反馈（使用marked.js渲染Markdown）
    feedbackContent.innerHTML = marked.parse(results.feedback);

    // 显示改进建议
    suggestionsList.innerHTML = '';
    results.suggestions.forEach((suggestion) => {
      const li = document.createElement('li');
      li.textContent = suggestion;
      suggestionsList.appendChild(li);
    });

    // 显示成功提示
    showToast('代码评审完成', 'success');
  }

  /**
   * 切换加载状态
   * @param {boolean} isLoading - 是否正在加载
   */
  function toggleLoading(isLoading) {
    if (isLoading) {
      loadingIndicator.classList.remove('hidden');
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> 评审中...';
    } else {
      loadingIndicator.classList.add('hidden');
      submitBtn.disabled = false;
      submitBtn.innerHTML = '<i class="fas fa-search"></i> 开始评审';
    }
  }

  /**
   * 显示Toast提示
   * @param {string} message - 提示消息
   * @param {string} type - 提示类型（success, warning, error）
   */
  function showToast(message, type = 'success') {
    const toast = document.getElementById('toast');
    const toastIcon = document.getElementById('toast-icon');
    const toastMessage = document.getElementById('toast-message');

    // 设置提示内容
    toastMessage.textContent = message;

    // 设置图标和样式
    toast.className = 'toast';
    toast.classList.add(type);

    switch (type) {
      case 'success':
        toastIcon.className = 'fas fa-check-circle';
        break;
      case 'warning':
        toastIcon.className = 'fas fa-exclamation-triangle';
        break;
      case 'error':
        toastIcon.className = 'fas fa-times-circle';
        break;
    }

    // 显示提示
    toast.classList.remove('hidden');

    // 3秒后自动隐藏
    setTimeout(() => {
      toast.classList.add('hidden');
    }, 3000);
  }
});
