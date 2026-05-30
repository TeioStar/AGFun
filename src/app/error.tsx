'use client';

import { useEffect } from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-[60vh] items-center justify-center animate-fade-in">
      <div className="max-w-md text-center">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-red-500/10">
          <AlertTriangle size={32} className="text-red-400" />
        </div>
        <h2 className="text-lg font-semibold">出了点问题</h2>
        <p className="mt-2 text-sm text-[var(--text-muted)]">
          {error.message || '页面加载失败，请重试。'}
        </p>
        <button
          onClick={reset}
          className="mt-6 inline-flex items-center gap-2 rounded-xl bg-primary-500 px-5 py-2.5 text-sm font-semibold text-white transition-all hover:bg-primary-600 active:scale-[0.98]"
        >
          <RefreshCw size={15} />
          重试
        </button>
      </div>
    </div>
  );
}
