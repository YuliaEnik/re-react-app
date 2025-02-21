import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeProvider, ThemeContext } from './themeContext.tsx';

const TestComponent = () => {
  return (
    <ThemeContext.Consumer>
      {({ theme, toggleTheme }) => (
        <div>
          <span data-testid="theme">{theme}</span>
          <button data-testid="toggle-theme" onClick={toggleTheme}>
            Toggle Theme
          </button>
        </div>
      )}
    </ThemeContext.Consumer>
  );
};

describe('ThemeProvider', () => {
  test('initial theme is light', () => {
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    const themeElement = screen.getByTestId('theme');
    expect(themeElement).toHaveTextContent('light');
  });

  test('toggles theme from light to dark to art and back to light', () => {
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    const themeElement = screen.getByTestId('theme');
    const toggleButton = screen.getByTestId('toggle-theme');

    fireEvent.click(toggleButton);
    expect(themeElement).toHaveTextContent('dark');

    fireEvent.click(toggleButton);
    expect(themeElement).toHaveTextContent('art');

    fireEvent.click(toggleButton);
    expect(themeElement).toHaveTextContent('light');
  });
});
