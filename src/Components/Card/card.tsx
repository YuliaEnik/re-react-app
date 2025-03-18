import './style.scss';

interface IData {
  flags: {
    png: string;
    alt: string;
  };
  name: {
    common: string;
    official: string;
    nativeName?: {
      [key: string]: {
        official: string;
        common: string;
      };
    };
  };
  region: string;
  population: number;
}

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
        <i>{data.population}</i>
      </h3>
    </li>
  );
}
