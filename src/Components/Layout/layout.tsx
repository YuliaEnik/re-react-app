import styles from './style.module.scss';
import { useContext } from 'react';
import { ThemeButton } from './../ButtonTheme/buttonTheme';
import { ThemeContext } from './../Context/themeProvider';


export function Layout({ children }: { children: React.ReactNode }) {
  const { theme } = useContext(ThemeContext);

  return (
    <div className={theme}>
      <header className={styles.header}>
        <ThemeButton />
      </header>
      <main className={styles.main}>{children}</main>
    </div>
  );
}

export default Layout;
