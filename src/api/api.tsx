import axios from 'axios';
import { IData } from '../Components/Card/types';

// restcountries.com v3.1 has been shut down, so the data is combined from
// two keyless public sources: names/regions from mledoze/countries and
// population from the World Bank. Flags come from flagcdn.com.
const COUNTRIES_URL =
  'https://cdn.jsdelivr.net/gh/mledoze/countries@master/dist/countries.json';
const POPULATION_URL =
  'https://api.worldbank.org/v2/country/all/indicator/SP.POP.TOTL?format=json&mrnev=1&per_page=400';

interface ICountry {
  name: IData['name'];
  cca2: string;
  cca3: string;
  region: string;
}

interface IPopulationRow {
  countryiso3code: string;
  value: number | null;
}

export default async function fetchCountries(): Promise<IData[]> {
  try {
    const [countries, population] = await Promise.all([
      axios.get<ICountry[]>(COUNTRIES_URL),
      axios.get<[unknown, IPopulationRow[]]>(POPULATION_URL),
    ]);

    const populationByCode = new Map<string, number>();
    population.data[1].forEach(({ countryiso3code, value }) => {
      if (countryiso3code && value) populationByCode.set(countryiso3code, value);
    });

    return countries.data
      .filter(({ cca3, region }) => region && populationByCode.has(cca3))
      .map(({ name, cca2, cca3, region }) => {
        const code = cca2.toLowerCase();
        return {
          name,
          cca3,
          region,
          population: populationByCode.get(cca3) as number,
          flags: {
            png: `https://flagcdn.com/w160/${code}.png`,
            svg: `https://flagcdn.com/${code}.svg`,
            alt: name.common,
          },
        };
      });
  } catch (error) {
    console.error('Error fetching countries:', error);
    throw error;
  }
}
