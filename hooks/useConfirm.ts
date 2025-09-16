import { useState } from 'react';
import { ConfirmType } from '@/components/ConfirmDialog';

interface ConfirmOptions {
  title: string;
  message: string;
  type?: ConfirmType;
  confirmText?: string;
  cancelText?: string;
}

interface ConfirmState extends ConfirmOptions {
  isOpen: boolean;
  onConfirm: (() => void) | null;
  onCancel: (() => void) | null;
}

export function useConfirm() {
  const [state, setState] = useState<ConfirmState>({
    isOpen: false,
    title: '',
    message: '',
    type: 'info',
    confirmText: '確認',
    cancelText: '取消',
    onConfirm: null,
    onCancel: null,
  });

  const confirm = (options: ConfirmOptions): Promise<boolean> => {
    return new Promise((resolve) => {
      setState({
        isOpen: true,
        title: options.title,
        message: options.message,
        type: options.type || 'info',
        confirmText: options.confirmText || '確認',
        cancelText: options.cancelText || '取消',
        onConfirm: () => {
          setState(prev => ({ ...prev, isOpen: false }));
          resolve(true);
        },
        onCancel: () => {
          setState(prev => ({ ...prev, isOpen: false }));
          resolve(false);
        },
      });
    });
  };

  const close = () => {
    setState(prev => ({ ...prev, isOpen: false }));
  };

  return {
    confirm,
    close,
    state,
  };
}
