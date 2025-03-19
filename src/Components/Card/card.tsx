import './style.scss';
import { IData } from './types';

interface CardProps {
  data: IData;
}

export const Card: React.FC<CardProps> = ({ data }) => {
  return (
    <li className="cards-list_row" data-testid="card">
      <img
        className="cards-list_row_img"
        src={data.flags.png}
        alt={''}
        loading="lazy"
      />
      <h3>
        <i>{data.name.common}</i>
      </h3>
      <h3>
        <i>{data.name.official}</i>
      </h3>
      <h3>
        <i>{data.region}</i>
      </h3>
      <h3>
        <i>{data.population.toLocaleString()}</i>
      </h3>
    </li>
  );
}
