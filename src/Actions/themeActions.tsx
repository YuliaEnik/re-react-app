import { createContext } from 'react';
import { ThemeContextType } from '../Components/ThemeContext/themeContext';

const ThemeContext = createContext<ThemeContextType>({
  theme: 'light',
  toggleTheme: () => {},
});

export { ThemeContext };
