import './style.scss';
import { useDispatch } from 'react-redux';
import { openModal } from '../../Actions/modalActions';
import { Checkbox } from '../Checkbox/checkbox';
import { useState } from 'react';

export interface IData {
  id: number;
  artist_title: string;
  title: string;
  date_display: string;
  image_id: string;
  onClick?: () => void;
}

const Card: React.FC<IData> = (props: IData) => {
  const dispatch = useDispatch();
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = () => {
    setIsChecked((prev) => !prev);
    console.log(props.id);
  };
  const handleClick = () => {
    dispatch(openModal({ id: props.id }));
  };

  return (
    <li className="cards-list_row" data-testid="card">
      <div className="card-content" onClick={handleClick}>
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
      </div>
      <Checkbox
        id={props.id}
        checked={isChecked}
        onChange={handleCheckboxChange}
      />
    </li>
  );
};

export { Card };
