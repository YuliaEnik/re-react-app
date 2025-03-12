'use client';
import styles from './style.module.scss';
import React from 'react';

export interface ICheckbox {
  id: number;
  checked?: boolean;
  onChange?: () => void;
}

const Checkbox: React.FC<ICheckbox> = (props: ICheckbox) => {
  const idCheckbox = String(props.id);

  return (
    <div className={styles.checkbox} data-testid="checkbox">
      <input
        type="checkbox"
        id={idCheckbox}
        checked={props.checked || false}
        onChange={props.onChange}
      />
      <label htmlFor={idCheckbox}></label>
    </div>
  );
};

export { Checkbox };
