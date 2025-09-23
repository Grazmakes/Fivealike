'use client';

import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCw, Home, ChevronLeft } from 'lucide-react';

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
  errorInfo?: ErrorInfo;
}

interface BaseErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
}

// Generic Error Boundary Base Class
class BaseErrorBoundary extends Component<BaseErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: BaseErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return {
      hasError: true,
      error
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Error Boundary caught an error:', error, errorInfo);
    
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }

    this.setState({
      error,
      errorInfo
    });
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || <GenericErrorFallback error={this.state.error} />;
    }

    return this.props.children;
  }
}

// Generic Error Fallback Component
function GenericErrorFallback({ error }: { error?: Error }) {
  return (
    <div className="min-h-[200px] flex items-center justify-center p-6">
      <div className="text-center max-w-md">
        <div className="w-16 h-16 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
          <AlertTriangle size={32} className="text-red-500" />
        </div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          Something went wrong
        </h3>
        <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
          We encountered an unexpected error. Please try refreshing the page.
        </p>
        <button
          onClick={() => window.location.reload()}
          className="inline-flex items-center space-x-2 px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors"
        >
          <RefreshCw size={16} />
          <span>Refresh Page</span>
        </button>
      </div>
    </div>
  );
}

// List Error Boundary - for list-related components
interface ListErrorBoundaryProps extends BaseErrorBoundaryProps {
  listTitle?: string;
}

export function ListErrorBoundary({ children, listTitle, ...props }: ListErrorBoundaryProps) {
  const fallback = (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700">
      <div className="text-center">
        <div className="w-12 h-12 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center mx-auto mb-3">
          <AlertTriangle size={20} className="text-red-500" />
        </div>
        <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">
          {listTitle ? `Error loading &ldquo;${listTitle}&rdquo;` : 'Error loading list'}
        </h4>
        <p className="text-xs text-gray-500 dark:text-gray-400 mb-3">
          This list couldn&rsquo;t be displayed right now.
        </p>
        <button
          onClick={() => window.location.reload()}
          className="text-xs text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300 font-medium"
        >
          Try Again
        </button>
      </div>
    </div>
  );

  return (
    <BaseErrorBoundary fallback={fallback} {...props}>
      {children}
    </BaseErrorBoundary>
  );
}

// Search Error Boundary - for search components
export function SearchErrorBoundary({ children, ...props }: BaseErrorBoundaryProps) {
  const fallback = (
    <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
      <div className="flex items-center space-x-2">
        <AlertTriangle size={16} className="text-red-500 flex-shrink-0" />
        <div>
          <h4 className="text-sm font-medium text-red-800 dark:text-red-200">
            Search Error
          </h4>
          <p className="text-xs text-red-600 dark:text-red-300 mt-1">
            Unable to load search results. Please try again.
          </p>
        </div>
      </div>
    </div>
  );

  return (
    <BaseErrorBoundary fallback={fallback} {...props}>
      {children}
    </BaseErrorBoundary>
  );
}

// Modal Error Boundary - for modal components
export function ModalErrorBoundary({ children, ...props }: BaseErrorBoundaryProps) {
  const fallback = (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-gray-800 rounded-2xl max-w-md w-full p-6">
        <div className="text-center">
          <div className="w-16 h-16 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <AlertTriangle size={24} className="text-red-500" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            Modal Error
          </h3>
          <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
            This dialog encountered an error and couldn&rsquo;t be displayed properly.
          </p>
          <div className="flex space-x-3">
            <button
              onClick={() => window.history.back()}
              className="flex-1 btn-secondary py-2 text-sm"
            >
              Go Back
            </button>
            <button
              onClick={() => window.location.reload()}
              className="flex-1 btn-primary py-2 text-sm"
            >
              Refresh
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <BaseErrorBoundary fallback={fallback} {...props}>
      {children}
    </BaseErrorBoundary>
  );
}

// Feed Error Boundary - for main feed components
export function FeedErrorBoundary({ children, ...props }: BaseErrorBoundaryProps) {
  const fallback = (
    <div className="min-h-[400px] flex items-center justify-center">
      <div className="text-center max-w-sm">
        <div className="w-16 h-16 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
          <AlertTriangle size={24} className="text-red-500" />
        </div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          Feed Unavailable
        </h3>
        <p className="text-gray-600 dark:text-gray-400 text-sm mb-6">
          We&rsquo;re having trouble loading your feed right now. This might be a temporary issue.
        </p>
        <div className="space-y-2">
          <button
            onClick={() => window.location.reload()}
            className="w-full btn-primary py-2 text-sm"
          >
            <RefreshCw size={16} className="inline mr-2" />
            Refresh Feed
          </button>
          <button
            onClick={() => window.location.href = '/'}
            className="w-full btn-secondary py-2 text-sm"
          >
            <Home size={16} className="inline mr-2" />
            Go Home
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <BaseErrorBoundary fallback={fallback} {...props}>
      {children}
    </BaseErrorBoundary>
  );
}

// Navigation Error Boundary - for navigation components
export function NavigationErrorBoundary({ children, ...props }: BaseErrorBoundaryProps) {
  const fallback = (
    <div className="p-4 bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500">
      <div className="flex items-start">
        <AlertTriangle size={16} className="text-red-500 mt-0.5 flex-shrink-0" />
        <div className="ml-3">
          <h4 className="text-sm font-medium text-red-800 dark:text-red-200">
            Navigation Error
          </h4>
          <div className="mt-2 text-xs text-red-600 dark:text-red-300">
            <button
              onClick={() => window.location.href = '/'}
              className="underline hover:no-underline"
            >
              Return to Home
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <BaseErrorBoundary fallback={fallback} {...props}>
      {children}
    </BaseErrorBoundary>
  );
}

// Profile Error Boundary - for profile-related components
export function ProfileErrorBoundary({ children, username, ...props }: BaseErrorBoundaryProps & { username?: string }) {
  const fallback = (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700">
      <div className="text-center">
        <div className="w-16 h-16 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
          <AlertTriangle size={24} className="text-red-500" />
        </div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          {username ? `Error loading @${username}` : 'Profile Error'}
        </h3>
        <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
          We couldn&rsquo;t load this profile information right now.
        </p>
        <div className="flex space-x-3 justify-center">
          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center space-x-2 px-4 py-2 btn-secondary text-sm"
          >
            <ChevronLeft size={16} />
            <span>Go Back</span>
          </button>
          <button
            onClick={() => window.location.reload()}
            className="inline-flex items-center space-x-2 px-4 py-2 btn-primary text-sm"
          >
            <RefreshCw size={16} />
            <span>Try Again</span>
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <BaseErrorBoundary fallback={fallback} {...props}>
      {children}
    </BaseErrorBoundary>
  );
}

// API Error Boundary - for components that make API calls
export function APIErrorBoundary({ children, apiName, ...props }: BaseErrorBoundaryProps & { apiName?: string }) {
  const fallback = (
    <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
      <div className="flex items-start space-x-2">
        <AlertTriangle size={16} className="text-yellow-600 dark:text-yellow-400 mt-0.5 flex-shrink-0" />
        <div>
          <h4 className="text-sm font-medium text-yellow-800 dark:text-yellow-200">
            {apiName ? `${apiName} API Error` : 'Service Error'}
          </h4>
          <p className="text-xs text-yellow-700 dark:text-yellow-300 mt-1">
            We&rsquo;re having trouble connecting to external services. Some features may be limited.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="text-xs text-yellow-800 dark:text-yellow-200 hover:underline mt-2"
          >
            Retry Connection
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <BaseErrorBoundary fallback={fallback} {...props}>
      {children}
    </BaseErrorBoundary>
  );
}

// App-level Error Boundary - catches all unhandled errors
export function AppErrorBoundary({ children, ...props }: BaseErrorBoundaryProps) {
  const fallback = (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center p-4">
      <div className="text-center max-w-md">
        <div className="w-20 h-20 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center mx-auto mb-6">
          <AlertTriangle size={40} className="text-red-500" />
        </div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          Oops! Something went wrong
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Five Alike encountered an unexpected error. Don&rsquo;t worry - your data is safe. 
          Please try refreshing the page or contact support if the problem persists.
        </p>
        <div className="space-y-3">
          <button
            onClick={() => window.location.reload()}
            className="w-full inline-flex items-center justify-center space-x-2 px-6 py-3 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors"
          >
            <RefreshCw size={20} />
            <span>Refresh Page</span>
          </button>
          <button
            onClick={() => window.location.href = '/'}
            className="w-full inline-flex items-center justify-center space-x-2 px-6 py-3 btn-secondary"
          >
            <Home size={20} />
            <span>Go to Homepage</span>
          </button>
        </div>
        
        <div className="mt-6 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg text-left">
          <details className="text-xs text-gray-500 dark:text-gray-400">
            <summary className="cursor-pointer font-medium mb-2">
              Technical Details (for developers)
            </summary>
            <pre className="whitespace-pre-wrap break-all">
              Component Error Details
            </pre>
          </details>
        </div>
      </div>
    </div>
  );

  return (
    <BaseErrorBoundary fallback={fallback} {...props}>
      {children}
    </BaseErrorBoundary>
  );
}

// Hook for manual error handling
export function useErrorHandler() {
  const handleError = (error: Error, context?: string) => {
    console.error(`Error in ${context || 'component'}:`, error);
    
    // In a real app, you'd send this to an error reporting service
    // like Sentry, Bugsnag, or LogRocket
    if (typeof window !== 'undefined' && 'gtag' in window) {
      // Example: Google Analytics error tracking
      (window as any).gtag('event', 'exception', {
        description: error.message,
        fatal: false,
        custom_map: { context }
      });
    }
  };

  return { handleError };
}