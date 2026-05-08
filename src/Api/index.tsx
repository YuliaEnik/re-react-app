export const getURL = async (search?: string) => {
  const query = search && search.trim() !== '' ? search : 'painting';
  const url = `https://openaccess-api.clevelandart.org/api/artworks?q=${encodeURIComponent(query)}&has_image=1&limit=20`;

  const res = await fetch(url);
  const data = await res.json();

  const mappedData = data.data.map(
    (item: {
      id: number;
      title: string;
      creators?: Array<{ description: string }>;
      creation_date?: string;
      images?: { web?: { url?: string } };
    }) => ({
      objectID: item.id,
      title: item.title || 'Untitled',
      artistDisplayName: item.creators?.[0]?.description || 'Unknown Artist',
      objectDate: item.creation_date || 'Date unknown',
      primaryImageSmall: item.images?.web?.url || '',
    })
  );

  const validData = mappedData.filter(
    (art: { primaryImageSmall: string }) => art.primaryImageSmall
  );

  return { data: validData };
};
