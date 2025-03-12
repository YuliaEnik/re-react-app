import { describe, it, expect } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import { ThemeProvider, useTheme } from './themeProvider';
import "@testing-library/jest-dom";
import React from 'react';

describe('ThemeProvider Component', () => {
  it('provides the initial theme as "light"', () => {
    const TestComponent = () => {
      const { theme } = useTheme();
      return <div data-testid="theme">{theme}</div>;
    };

    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    const themeElement = screen.getByTestId('theme');
    expect(themeElement).toHaveTextContent('light');
  });

  it('toggles the theme from "light" to "dark"', () => {
    const TestComponent = () => {
      const { theme, toggleTheme } = useTheme();
      return (
        <div>
          <div data-testid="theme">{theme}</div>
          <button onClick={toggleTheme} data-testid="toggle-theme">
            Toggle Theme
          </button>
        </div>
      );
    };

    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    const themeElement = screen.getByTestId('theme');
    expect(themeElement).toHaveTextContent('light');

    const toggleButton = screen.getByTestId('toggle-theme');
    fireEvent.click(toggleButton);

    expect(themeElement).toHaveTextContent('dark');
  });

  it('toggles the theme from "dark" to "art"', () => {
    const TestComponent = () => {
      const { theme, toggleTheme } = useTheme();
      return (
        <div>
          <div data-testid="theme">{theme}</div>
          <button onClick={toggleTheme} data-testid="toggle-theme">
            Toggle Theme
          </button>
        </div>
      );
    };

    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    const toggleButton = screen.getByTestId('toggle-theme');

    fireEvent.click(toggleButton);

    fireEvent.click(toggleButton);

    const themeElement = screen.getByTestId('theme');
    expect(themeElement).toHaveTextContent('art');
  });

  it('toggles the theme from "art" back to "light"', () => {
    const TestComponent = () => {
      const { theme, toggleTheme } = useTheme();
      return (
        <div>
          <div data-testid="theme">{theme}</div>
          <button onClick={toggleTheme} data-testid="toggle-theme">
            Toggle Theme
          </button>
        </div>
      );
    };

    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    const toggleButton = screen.getByTestId('toggle-theme');

    fireEvent.click(toggleButton);

    fireEvent.click(toggleButton);

    fireEvent.click(toggleButton);

    const themeElement = screen.getByTestId('theme');
    expect(themeElement).toHaveTextContent('light');
  });
});
