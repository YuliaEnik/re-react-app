import React from 'react';
import './errorbutton.scss';

export default class ErrorButton extends React.Component {
  state = { isError: false };

  madeError = () => {
    this.setState({ isError: true });
  };

  render(): React.ReactNode {
    if (this.state.isError) {
      throw new Error('oops, looks like you made a mistake');
    }

    return (
      <button className="error-button" onClick={this.madeError}>
        ErrorButton
      </button>
    );
  }
}
