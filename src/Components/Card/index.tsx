import React from 'react';
import { IData } from '../../Data/data';
import './card.scss';

class Card extends React.Component<IData> {
  constructor(props: IData) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="card-wrapper" data-testid="card">
        <img
          src={`https://www.artic.edu/iiif/2/${this.props.image_id}/full/843,/0/default.jpg`}
          alt={this.props.title}
        />
        <h3>
          Author: <i>{this.props.artist_title}</i>
        </h3>
        <h3>
          Name: <i>{this.props.title}</i>
        </h3>
        <h3>
          Year: <i>{this.props.date_display}</i>
        </h3>
      </div>
    );
  }
}

export { Card };
