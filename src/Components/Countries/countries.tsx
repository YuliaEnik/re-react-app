import { useState, useEffect } from 'react';
import fetchCountries from '../../api/api.tsx';
import { Search } from '../Search/search.tsx';
import { Card } from '../Card/card.tsx';
import { IData } from '../Card/types.ts';
import './style.scss';

export const Countries = () => {
  const [countries, setCountries] = useState<IData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRegion, setSelectedRegion] = useState<string>('');
  const [sortBy, setSortBy] = useState<'population' | 'name'>('population');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [isSorted, setIsSorted] = useState(false);

  useEffect(() => {
    const getCountries = async () => {
      try {
        const data = await fetchCountries();
        setCountries(data);
        setLoading(false);
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

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleRegionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedRegion(event.target.value);
  };

  const handleSort = (type: 'population' | 'name') => {
    setIsSorted(true);
    if (type === sortBy) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(type);
      setSortOrder('asc');
    }
  };

  const filteredCountries = countries.filter((country) => {
    const matchesSearch = country.name.common.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         country.name.official.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRegion = selectedRegion ? country.region === selectedRegion : true;
    return matchesSearch && matchesRegion;
  });

  const sortedCountries = isSorted 
  ? [...filteredCountries].sort((a, b) => {
    if (sortBy === 'population') {
      return sortOrder === 'asc' ? a.population - b.population : b.population - a.population;
    } else {
      return sortOrder === 'asc'
        ? a.name.common.localeCompare(b.name.common)
        : b.name.common.localeCompare(a.name.common);
    }
  })
  : filteredCountries;

  const regions = Array.from(new Set(countries.map((country) => country.region)));

  return (
    <>
      <Search
        search={searchTerm}
        onChange={handleSearchChange}
        onSubmit={(e) => {
          e.preventDefault();
        }}
      />
      <ul className="countries-container">
        <li className="title">
          <h3>
            <i>Visited</i>
          </h3>
          <h3>
            <i>Flag</i>
          </h3>
          <h3 className="nav">
            <i>Name common</i>
            <button className="sort-buttons" onClick={() => handleSort('name')}>
            ⇅
            </button>
          </h3>
          <h3>
            <i>Name official</i>
          </h3>
          <h3 className="nav">
            <i>Population</i>
            <button className="sort-buttons" onClick={() => handleSort('population')}>
            ⇅
            </button>
          </h3>
          <h3 className="nav">
            <i>Region</i>
            <select
        value={selectedRegion}
        onChange={handleRegionChange}
        className="region-select"
      >
        <option value="">All</option>
        {regions.map((region) => (
          <option key={region} value={region}>
            {region}
          </option>
        ))}
      </select>
          </h3>
        </li>
        {sortedCountries.map((country) => (
          <Card key={country.name.common} data={country} />
        ))}
      </ul>
    </>
  );
};

export default Countries;
