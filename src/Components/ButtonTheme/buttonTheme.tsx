import './style.scss';
import { ThemeContext } from '../ThemeContext/Theme-Context';

import { useContext } from 'react';

const ThemeButton = () => {
  const { toggleTheme } = useContext(ThemeContext);

  return (
    <button className="theme-button" onClick={toggleTheme}>
      THEME
    </button>
  );
};

export { ThemeButton };
