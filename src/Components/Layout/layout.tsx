import styles from './style.module.scss';
import { ThemeButton } from './../ButtonTheme/buttonTheme';
import { useTheme } from '../Context/themeProvider';



export function Layout({ children }: { children: React.ReactNode }) {
  const { theme } = useTheme();

  return (
    <div className={styles[theme]}>
      <header className={styles.header}>
        <ThemeButton />
      </header>
      <main className={styles.main}>{children}</main>
    </div>
  );
}

export default Layout;
