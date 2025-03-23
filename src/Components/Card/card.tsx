import { useEffect, useState, memo, useCallback } from 'react';
import { Checkbox } from '../Checkbox/checkbox';
import { IData } from './types';
import './style.scss';

interface CardProps {
  data: IData;
}

export const Card: React.FC<CardProps> = memo( ({ data }) => {
  const [isVisited, setIsVisited] = useState(false);

  useEffect(() => {
    const visitedCountries: Record<string, boolean> = JSON.parse(localStorage.getItem('visitedCountries') ?? "{}");
    setIsVisited(!!visitedCountries[data.name.common]);
  }, [data.name.common]);

  const handleCheckboxChange = useCallback(() => {
    const visitedCountries: Record<string, boolean> = JSON.parse(localStorage.getItem('visitedCountries') ?? "{}");
    const newVisited = !isVisited;

    if (newVisited) {
      visitedCountries[data.name.common] = true; 
    } else {
      delete visitedCountries[data.name.common];
    }

    localStorage.setItem('visitedCountries', JSON.stringify(visitedCountries));
    setIsVisited(newVisited);
  }, []);


  const flagStyle: React.CSSProperties = {
    position: 'relative', 
    overflow: 'hidden',
  };

  const beforeStyle: React.CSSProperties = {
    content: '""',
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundImage:`linear-gradient(to right, rgba(255, 255, 255, 1) 9%, rgba(255, 255, 255, 0.4)), url(${data.flags.svg})`,
    backgroundSize: '30% auto',
    backgroundPosition: 'right',
    backgroundRepeat: 'no-repeat',
    filter: isVisited ? 'none' : 'grayscale(100%)',
    zIndex: -1,
  };

  return (
    <li className="cards-list_row"
    style={flagStyle}>
      <div style={beforeStyle} />
      <Checkbox checked={isVisited}
        onChange={handleCheckboxChange}
        id={data.name.common} />
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
        <i>{data.population.toLocaleString()}</i>  
      </h3>
      <h3>
        <i>{data.region}</i>
      </h3>
    </li>
  );
});
