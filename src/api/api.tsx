import axios from 'axios';

export default async function fetchCountries() {
  const url =
    'https://restcountries.com/v3.1/all?fields=name,population,region,flags';

  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error('Error fetching countries:', error);
    throw error;
  }
}
