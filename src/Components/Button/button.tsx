import './style.scss';
import { IButton } from './types';

export function Button({
  children,
  type = 'button',
  disabled = false,
  onClick,
}: IButton) {
  return (
    <button
      className={`button_submit ${disabled ? 'disabled' : ''}`}
      type={type}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
