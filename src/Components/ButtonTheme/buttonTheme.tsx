import { useTheme } from '../Context/themeProvider';
import styles from './style.module.scss';


const ThemeButton = () => {
  const { toggleTheme } = useTheme();

  return (
    <button className={styles.theme_button} onClick={toggleTheme}>
      THEME
    </button>
  );
};

export { ThemeButton };
