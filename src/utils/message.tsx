import React from 'react';
import { createRoot } from 'react-dom/client';
import GlobalMessage, { MessageType } from '@/components/GlobalMessage';

let seed = 0;

const createMessage = (type: MessageType, content: string, duration = 3000) => {
  const container = document.createElement('div');
  document.body.appendChild(container);

  const id = `message-${seed++}`;
  const root = createRoot(container);

  const remove = () => {
    // 先添加淡出类名
    container.querySelector('.custom-message')?.classList.add('fade-out');

    // 延迟执行卸载
    setTimeout(() => {
      root.unmount();
      container.remove();
    }, 100); // 匹配CSS动画时长
  };

  root.render(
    <GlobalMessage
      id={id}
      type={type}
      content={content}
      duration={duration}
      onClose={remove}
    />
  );
};

const prefix = {
  success: '✅ ',
  error: '❌ ',
  warning: '⚠️ ',
  info: 'ℹ️ ',
};

export const message = {
  success: (content: string, duration?: number) =>
    createMessage('success', prefix.success + content, duration),
  error: (content: string, duration?: number) =>
    createMessage('error', prefix.error + content, duration),
  warning: (content: string, duration?: number) =>
    createMessage('warning', prefix.warning + content, duration),
  info: (content: string, duration?: number) =>
    createMessage('info', prefix.info + content, duration),
};
