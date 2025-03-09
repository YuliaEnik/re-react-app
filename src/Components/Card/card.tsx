import styles from './style.module.scss';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Checkbox } from '../Checkbox/checkbox';
import { ISelectedData, toggleCard } from '../../Reducers/selectedCardsReducer';
import { RootState } from '../../Store/store';
import { useRouter } from 'next/router';

export interface IData {
  id: number;
  artist_title: string;
  title: string;
  date_display: string;
  image_id: string;
}

const Card: React.FC<IData> = (props: IData) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const selectedCards = useSelector(
    (state: RootState) => state.selectedCards.data
  );
  const isChecked = selectedCards.some((c: ISelectedData) => c.id === props.id);

  const handleCheckboxChange = () => {
    dispatch(toggleCard(props));
  };

  const handleClick = () => {
    router.push({
      pathname: '/',
      query: { ...router.query, artworkId: props.id },
    });

  };

  return (
    <li className={styles.cards_list_row} data-testid="card">
      <div
        className={styles.content}
        onClick={handleClick}
        data-testid="card-content"
      >
        <img
          className={styles.cards_list_row_img}
          src={`https://www.artic.edu/iiif/2/${props.image_id}/full/843,/0/default.jpg`}
          alt={props.title}
          loading="lazy"
          data-testid="card-image"
        />
        <h3 data-testid="card-artist">
          <i>{props.artist_title}</i>
        </h3>
        <h3 data-testid="card-title">
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
