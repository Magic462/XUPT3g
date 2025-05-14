type MessageType = 'success' | 'error' | 'info' | 'warning';

export function showMessage(type: MessageType, text: string) {
  // 简单控制台提示
  switch (type) {
    case 'success':
      console.log(`✅ [成功] ${text}`);
      break;
    case 'info':
      console.log(`ℹ️ [信息] ${text}`);
      break;
    case 'warning':
      console.warn(`⚠️ [警告] ${text}`);
      break;
    case 'error':
    default:
      console.error(`❌ [错误] ${text}`);
      break;
  }
  // TODO：在这里加入弹窗提示
}
