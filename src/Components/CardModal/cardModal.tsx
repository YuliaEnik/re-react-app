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
    <li>
      <img
        className="img-modal"
        src={`https://www.artic.edu/iiif/2/${props.image_id}/full/843,/0/default.jpg`}
        alt={props.title}
      />
      <h3>
        Author: <i>{props.artist_title}</i>
      </h3>
      <h3>
        Name: <i>{props.title}</i>
      </h3>
      <h3>
        Year: <i>{props.date_display}</i>
      </h3>
      <h3>
        Artwork Type: <i>{props.artwork_type_title}</i>
      </h3>
      <h3>
        Artist info: <i>{props.artist_display}</i>
      </h3>
    </li>
  );
}
