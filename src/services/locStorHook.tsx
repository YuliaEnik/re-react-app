import { useCallback, useState } from "react";

const useVisitedCountries = () => {
  const [visitedCountries, setVisitedCountries] = useState<Record<string, boolean>>(
    JSON.parse(localStorage.getItem('visitedCountries') ?? "{}")
  );

  const toggleVisited = useCallback((countryName: string) => {
    const newVisitedCountries = { ...visitedCountries };
    if (newVisitedCountries[countryName]) {
      delete newVisitedCountries[countryName];
    } else {
      newVisitedCountries[countryName] = true;
    }
    localStorage.setItem('visitedCountries', JSON.stringify(newVisitedCountries));
    setVisitedCountries(newVisitedCountries);
  }, [visitedCountries]);

  return { visitedCountries, toggleVisited };
};

export {useVisitedCountries};