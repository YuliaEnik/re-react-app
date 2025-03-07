import { createContext, ReactNode, useContext, useState } from 'react';

type ThemeKey = 'light' | 'dark' | 'art';

type ThemeContextType = {
  theme: ThemeKey;
  toggleTheme: () => void;
};

type ThemeProviderProps = {
  children: ReactNode;
};
export const ThemeContext = createContext<ThemeContextType>({
  theme: 'light',
  toggleTheme: () => {},
});

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const [theme, setTheme] = useState<ThemeKey>('light');

  const toggleTheme = () => {
    if (theme === 'light') {
      setTheme('dark');
    } else if (theme === 'dark') {
      setTheme('art');
    } else {
      setTheme('light');
    }
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
export const useTheme = () => useContext(ThemeContext);
export type { ThemeContextType };
