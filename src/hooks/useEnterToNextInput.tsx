import { useRef } from 'react';
import React from 'react';

// 按enter焦点变成下一个input
export function useEnterToFocusNextInput<
  T extends HTMLElement = HTMLInputElement,
>(length: number) {
  const refs = useRef<Array<React.RefObject<T>>>([]);

  if (refs.current.length !== length) {
    refs.current = Array.from({ length }, () => React.createRef<T>());
  }

  const getRef = (index: number) => refs.current[index];

  // 调用要传是第几个input
  const handleKeyDown =
    (index: number, callback?: () => void) => (e: React.KeyboardEvent) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        if (index < refs.current.length - 1) {
          refs.current[index + 1].current?.focus();
        } else {
          // 最后一个input按enter后提交操作
          callback?.();
        }
      }
    };

  return { getRef, handleKeyDown };
}
