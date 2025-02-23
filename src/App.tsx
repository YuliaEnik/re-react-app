import './App.scss';
import { useContext } from 'react';
import { ThemeButton } from './Components/ButtonTheme/buttonTheme';
import {
  ThemeContext,
  ThemeProvider,
} from './Components/ThemeContext/themeContext';
import { HomePage } from './view/HomePage/homePage';

export function App(): JSX.Element {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

export function AppContent(): JSX.Element {
  const { theme } = useContext(ThemeContext);

  return (
    <div className={theme}>
      <header className="header">
        <ThemeButton />
      </header>
      <main className="main">
        <HomePage />
      </main>
    </div>
  );
}

export default App;
