import { ThemeContext } from '../ThemeContext/ThemeContext';
import './style.scss';

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
