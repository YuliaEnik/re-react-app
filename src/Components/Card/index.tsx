import React from 'react';
import { IData } from '../../Data/data';
import './card.scss';

interface CardState {
  imgError: boolean;
}
class Card extends React.Component<IData, CardState> {
  constructor(props: IData) {
    super(props);
    this.state = {
      imgError: false,
    };
  }

  render() {
    return (
      <li className="card-wrapper" data-testid="card">
        {this.props.primaryImageSmall && !this.state.imgError ? (
          <img
            src={this.props.primaryImageSmall}
            alt={this.props.title || 'Artwork'}
            onError={() => this.setState({ imgError: true })}
            style={{ width: '100%', height: 'auto', objectFit: 'cover' }}
          />
        ) : (
          <div className="image-placeholder">🖼️ Image not available</div>
        )}
        <h3>
          Author: <i>{this.props.artistDisplayName || 'Unknown'}</i>
        </h3>
        <h3>
          Name: <i>{this.props.title || 'Untitled'}</i>
        </h3>
        <h3>
          Year: <i>{this.props.objectDate || 'Unknown'}</i>
        </h3>
      </li>
    );
  }
}

export { Card };
