import { createContext } from 'react';
import { ThemeContextType } from '../Components/ThemeContext/Theme-Context';

const ThemeContext = createContext<ThemeContextType>({
  theme: 'light',
  toggleTheme: () => {},
});

export { ThemeContext };
