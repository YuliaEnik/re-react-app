export const getURL = async (
  page: number = 1,
  search?: string,
  id?: number
) => {
  const baseURL = 'https://api.artic.edu/api/v1/artworks';
  const searchParams = new URLSearchParams();

  searchParams.append('fields', 'id,title,artist_title,date_display,image_id');
  searchParams.append('page', page.toString());

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
