import './style.scss';

export interface IData {
  id: number;
  title: string;
  artist_title: string;
  date_display: string;
  image_id: string;
  onClick?: () => void;
  isActive: boolean;
}

export function Card(props: IData): JSX.Element {
  return (
    <li className="cards-list_row" data-testid="card" onClick={props.onClick}>
      <img
        className="cards-list_row_img"
        src={`https://www.artic.edu/iiif/2/${props.image_id}/full/843,/0/default.jpg`}
        alt={props.title}
        loading="lazy"
      />
      <h3>
        <i>{props.artist_title}</i>
      </h3>
      <h3>
        <i>{props.title}</i>
      </h3>
    </li>
  );
}
