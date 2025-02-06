import React, { ReactNode } from 'react';
import './errorboundary.scss';

interface ErrorBoundaryState {
  isError: boolean;
  error?: Error;
}

interface ErrorBoundaryProps {
  children: ReactNode;
}

export default class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  state = { isError: false };

  static getDerivedStateFromError(error: Error) {
    return { isError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error occured:', error, errorInfo);
  }

  render(): ReactNode {
    if (this.state.isError) {
      return (
        <div className="error-wrapper" data-testid="notFound">
          <div className="error"></div>
        </div>
      );
    }

    return this.props.children;
  }
}
