import './style.scss';
import { IButton } from './types';

export function Button({
  children,
  type = 'button',
  disabled,
  onClick,
}: IButton) {
  return (
    <button
      className="search_button"
      type={type}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
