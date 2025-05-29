import React, { useEffect } from 'react';
import './GlobalMessage.scss';

export type MessageType = 'success' | 'error' | 'info' | 'warning';

export interface MessageProps {
  id: string;
  type: MessageType;
  content: string;
  duration?: number;
  onClose?: () => void;
}

const GlobalMessage: React.FC<MessageProps> = ({
  id,
  type,
  content,
  duration = 3000,
  onClose,
}) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose?.();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  return (
    <div className={`Global-message ${type}`} id={id}>
      {content}
    </div>
  );
};

export default GlobalMessage;
