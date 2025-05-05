import './style.scss';
import React, { useState } from 'react';

export const ErrorButton: React.FC = () => {
  const [isError, setIsError] = useState(false);

  const madeError = () => {
    setIsError(true);
  };

  if (isError) {
    throw new Error('oops, looks like you made a mistake');
  }

  return (
    <button
      className="error-button"
      onClick={madeError}
      data-testid="error-button"
    >
      ErrorButton
    </button>
  );
};
