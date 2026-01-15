import { Component, type ErrorInfo, type ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundaryProvider extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    if (import.meta.env.DEV) {
      console.error(error);
      console.error(errorInfo.componentStack);
    }
  }

  render() {
    if (!this.state.hasError) return this.props.children;

    return import.meta.env.DEV ? (
      <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
        <div className="w-full max-w-2xl rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-xl font-semibold text-gray-900">일시적인 시스템 오류가 발생했습니다.</h2>
          <p className="mb-4 text-sm text-red-600">{this.state.error?.message}</p>
          <details className="rounded-md border border-gray-200 bg-gray-50 p-4">
            <summary className="cursor-pointer font-medium text-gray-700 hover:text-gray-900">세부정보</summary>
            <pre className="mt-3 overflow-auto text-xs text-gray-600">{this.state.error?.stack}</pre>
          </details>
        </div>
      </div>
    ) : (
      <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
        <div className="w-full max-w-md rounded-lg border border-gray-200 bg-white p-6 text-center shadow-sm">
          <h2 className="mb-6 text-xl font-semibold text-gray-900">일시적인 시스템 오류가 발생했습니다.</h2>
          <button
            onClick={() => window.location.reload()}
            className="w-full rounded-md bg-gray-700 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-gray-800"
          >
            새로고침
          </button>
        </div>
      </div>
    );
  }
}

export default ErrorBoundaryProvider;
