import { useState, useEffect } from 'react';

export const getURL = async (search?: string, id?: number) => {
  const baseURL = 'https://api.artic.edu/api/v1/artworks';
  const searchParams = new URLSearchParams();

  searchParams.append('fields', 'id,title,artist_title,date_display,image_id');

  let path = baseURL;

  if (search) {
    path = `${baseURL}/search`;
    searchParams.append('q', search);
  }
  if (id) {
    path = `${path}/${id}`;
  }

  const url = `${path}?${searchParams.toString()}`;

  const res = await fetch(url, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  });

  return await res.json();
};

function useLocalStorage(key: string, initional: string) {
  const [value, setValue] = useState(() => {
    const storeValue = localStorage.getItem(key);
    return storeValue ? storeValue : initional;
  });

  useEffect(() => {
    localStorage.setItem(key, value);
  }, [key, value]);

  return [value, setValue] as const;
}

export default useLocalStorage;
