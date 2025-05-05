import './style.scss';

export interface IModalCard {
  id: number;
  title: string;
  artist_title: string;
  date_display: string;
  image_id: string;
  artwork_type_title: string;
  artist_display: string;
}

export function CardModal(props: IModalCard): JSX.Element {
  return (
    <li data-testid="card-modal">
      <img
        className="img-modal"
        src={`https://www.artic.edu/iiif/2/${props.image_id}/full/843,/0/default.jpg`}
        alt={props.title}
        data-testid="card-modal-image"
      />
      <h3 data-testid="card-modal-artist">
        Author: <i>{props.artist_title}</i>
      </h3>
      <h3 data-testid="card-modal-title">
        Name: <i>{props.title}</i>
      </h3>
      <h3 data-testid="card-modal-date">
        Year: <i>{props.date_display}</i>
      </h3>
      <h3 data-testid="card-modal-artwork-type">
        Artwork Type: <i>{props.artwork_type_title}</i>
      </h3>
      <h3 data-testid="card-modal-artist-info">
        Artist info: <i>{props.artist_display}</i>
      </h3>
    </li>
  );
}
