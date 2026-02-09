import React from 'react';
import { createRoot } from 'react-dom/client';
import GlobalMessage, { MessageType } from '@/components/GlobalMessage';

// let seed = 0;

// let messageWrapper: HTMLDivElement | null = null;

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

let seed = 0;
let messageWrapper: HTMLDivElement | null = null;

const getMessageWrapper = () => {
  if (!messageWrapper) {
    messageWrapper = document.createElement('div');
    messageWrapper.id = 'global-message-wrapper';
    document.body.appendChild(messageWrapper);
  }
  return messageWrapper;
};

const createMessage = (type: MessageType, content: string, duration = 3000) => {
  const wrapper = getMessageWrapper();
  const container = document.createElement('div');

  wrapper.appendChild(container);

  const id = `message-${seed++}`;
  const root = createRoot(container);

  const remove = () => {
    container.classList.add('fade-out');

    setTimeout(() => {
      root.unmount();
      container.remove();

      // 没有 message 了就清空 wrapper（可选）
      if (wrapper.childElementCount === 0) {
        wrapper.remove();
        messageWrapper = null;
      }
    }, 200);
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
