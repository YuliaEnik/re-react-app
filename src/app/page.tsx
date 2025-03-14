import HomePage from './view/HomePage/homePage';
import { artworksApi } from './../service/getApi';
import { store } from '~/Store/store';

export default async function Page({
  searchParams,
}: {
  searchParams: { query?: string; page?: string; id?: number };
}) {
  searchParams = await searchParams;
  const query = searchParams.query || '';
  const page =  Number(searchParams.page) || 1;
  const  artworkId =  Number(searchParams.id);

  const allArtworks = await store.dispatch(
    artworksApi.endpoints.getAllArtworks.initiate(page)
  );
  const searchResults = await store.dispatch(
    artworksApi.endpoints.searchArtworks.initiate({ query, page })
  );
  
  const artworkIdNum = Number(artworkId);
  let artwork = null;

if (artworkIdNum) {
  try {
    const result = await store.dispatch(
      artworksApi.endpoints.getArtworkDetails.initiate({
        id: Number(artworkId),
        fields: 'id,title,artist_title,image_id,date_display,artwork_type_title,artist_display',
      })
    );
    const { data: artworkData, error } = result;

    if (error) {
      console.error('Error fetching artwork details:', error);
    } else if (artworkData) {
      artwork = artworkData.data.data;
    } else {
      console.error('ArtworkData is undefined');
    }
  } catch (err) {
    console.error('Error fetching artwork details:', err);
  }
  }
  return (
    <HomePage
      allArtworks={allArtworks.data}
      searchResults={searchResults.data}
      query={query}
      page={page}
      artwork={artwork}
    />
  );
};
