import './style.scss';
import { useDispatch } from 'react-redux';
import { openModal } from '../Actions/modalActions';

export interface IData {
  id: number;
  artist_title: string;
  title: string;
  date_display: string;
  image_id: string;
  onClick?: () => void;
}

const Card: React.FC<IData> = ({ id, artist_title, title, image_id }) => {
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(openModal({ id: id }));
  };

  return (
    <li className="cards-list_row" data-testid="card" onClick={handleClick}>
      {image_id && (
        <img
          className="cards-list_row_img"
          src={`https://www.artic.edu/iiif/2/${image_id}/full/843,/0/default.jpg`}
          alt={title}
          loading="lazy"
        />
      )}
      {artist_title && (
        <h3>
          <i>{artist_title}</i>
        </h3>
      )}
      {title && (
        <h3>
          <i>{title}</i>
        </h3>
      )}
    </li>
  );
};

export { Card };
