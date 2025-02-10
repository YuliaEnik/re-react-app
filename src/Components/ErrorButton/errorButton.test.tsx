import { describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import { ErrorButton } from './';
import '@testing-library/jest-dom/vitest';

describe('test error button', () => {
  it('error button renders correctly', () => {
    render(<ErrorButton />);
    expect(screen.getByTestId('error-button')).toBeInTheDocument();
  });

  it('throws an error when clicked', () => {
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    render(<ErrorButton />);
    const button = screen.getByTestId('error-button');

    expect(() => fireEvent.click(button)).toThrowError(
      'oops, looks like you made a mistake'
    );

    consoleSpy.mockRestore();
  });
});
