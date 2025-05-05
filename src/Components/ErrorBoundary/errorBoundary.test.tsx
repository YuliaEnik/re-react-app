import '@testing-library/jest-dom/vitest';
import { describe, it, expect, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import ErrorBoundary from '.';
import { ErrorButton } from '../ErrorButton';

describe('ErrorBoundary Component', () => {
  it('renders children when there is no error', () => {
    render(
      <ErrorBoundary>
        <div data-testid="child">Child Component</div>
      </ErrorBoundary>
    );

    expect(screen.getByTestId('child')).toBeInTheDocument();
  });

  it('renders fallback UI when an error occurs', () => {
    const consoleErrorMock = vi
      .spyOn(console, 'error')
      .mockImplementation(() => {});

    render(
      <ErrorBoundary>
        <ErrorButton />
      </ErrorBoundary>
    );

    const button = screen.getByTestId('error-button');
    fireEvent.click(button);

    expect(screen.getByTestId('notFound')).toBeInTheDocument();
    consoleErrorMock.mockRestore();
  });

  it('calls componentDidCatch when an error occurs', () => {
    const consoleErrorMock = vi
      .spyOn(console, 'error')
      .mockImplementation(() => {});

    const componentDidCatchSpy = vi.spyOn(
      ErrorBoundary.prototype,
      'componentDidCatch'
    );

    render(
      <ErrorBoundary>
        <ErrorButton />
      </ErrorBoundary>
    );

    const button = screen.getByTestId('error-button');
    fireEvent.click(button);

    expect(componentDidCatchSpy).toHaveBeenCalled();

    consoleErrorMock.mockRestore();
    componentDidCatchSpy.mockRestore();
  });
});
