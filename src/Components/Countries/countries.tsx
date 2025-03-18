import { useState, useEffect } from 'react';
import fetchCountries from '../../api/api.tsx';
import './style.scss';
import { Search } from '../Search/search.tsx';
import { Card } from '../Card/card.tsx';
import { IData } from '../Card/types.ts';

export const Countries = () => {
  const [countries, setCountries] = useState<IData[]>([]); // Типизируем состояние
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  //const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const getCountries = async () => {
      try {
        const data = await fetchCountries();
        setCountries(data);
        setLoading(false);
        console.log(data);
      } catch (error) {
        console.error('Error:', error);
        setError('Failed to fetch countries');
        setLoading(false);
      }
    };

    getCountries();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <Search
        onSubmit={function (): void {
          throw new Error('Function not implemented.');
        }}
      ></Search>
      <ul className="countries-container">
      {countries.map((country) => (
          <Card key={country.name.common} data={country} />
        ))}

      </ul>
    </div>
  );
};

export default Countries;
