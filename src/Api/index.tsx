export const getURL = async (/* search?: string, id?: number */) => {
  const path =
    'https://api.artic.edu/api/v1/artworks?fields=id,title,artist_title,date_display,image_id';
  /* const searchPath = `https://api.artic.edu/api/v1/artworks/search?q=${search}&&fields=id,title,artist_title,date_display,image_id`;

  if (search) {
    path = searchPath;
  }
  if (id) {
    path = `${path}/${id}`;
  } */

  const res = await fetch(path, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  });
  return await res.json();
};
