import styles from '../view/HomePage/style.module.scss';
import React, { JSX } from 'react';
import { Search } from '../Components/Search/search';
import { Card, IData } from '../Components/Card/card';
import { Pagination } from '../Components/Pagination/pagination';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { setPage, setQuery } from '../Reducers/searchReducer';
import SelectedCards from '../Components/SelectedCards/selectedCards';
import ArtworkDetails from './artworks/[id]';
import { GetServerSideProps } from 'next';
import { store } from '../Store/store';
import { artworksApi } from '../service/getApi';

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { query, page, artworkId } = context.query;

  const artworkIdNum = Number(artworkId);

  store.dispatch(setQuery(query as string || ''));
  store.dispatch(setPage(Number(page as string) || 1));

  const { data: allArtworks } = await store.dispatch(
    artworksApi.endpoints.getAllArtworks.initiate(Number(page) || 1)
  );

  const { data: searchResults } = await store.dispatch(
    artworksApi.endpoints.searchArtworks.initiate({
      query: query as string,
      page: Number(page) || 1,
    })
  );

  let artwork = null;
  if (artworkIdNum) {
    try {
    const result = await store.dispatch(
      artworksApi.endpoints.getArtworkDetails.initiate({
        id: Number(artworkIdNum),
        fields: 'id,title,artist_title,image_id,date_display,artwork_type_title,artist_display',
      })
    );
    const { data: artworkData, error } = result;

    if (error) {
    } else if (artworkData) {
      artwork = { data: artworkData.data }; 
    } else {
      console.error('ArtworkData is undefined');
    }
  } catch (err) {
    console.error('Error fetching artwork details:', err);
  }
  }

  return {
    props: {
      allArtworks: allArtworks || null,
      searchResults: searchResults || null,
      query: query || '',
      page: Number(page) || 1,
      artwork: artwork || null,
    },
  };
};

interface ArtworksResponse {
  data: IData[];
  pagination: {
    total_pages: number;
  };
}
interface HomePageProps {
  allArtworks: ArtworksResponse | null;
  searchResults: ArtworksResponse | null;
  query: string;
  page: number;
  artwork: {
    data: {
      id: number;
      title: string;
      artist_title: string;
      image_id: string;
      date_display?: string;
      artwork_type_title?: string;
      artist_display?: string;
    };
} | null;
}

export default function HomePage({
  allArtworks,
  searchResults,
  query,
  page,
  artwork,
}: HomePageProps): JSX.Element {
  const router = useRouter();
  const dispatch = useDispatch();

  React.useEffect(() => {;

    if (query) {
      dispatch(setQuery(query));
    }
    if (page) {
      dispatch(setPage(page));
    }
  }, [query, page, dispatch]);

  const artList = query ? searchResults : allArtworks;

  const handleSearchSubmit = (searchValue: string) => {
    dispatch(setQuery(searchValue));
    router.push({ pathname: '/', query: { query: searchValue, page: 1 } });
  };

  const handlePageChange = (newPage: number) => {
    dispatch(setPage(newPage));
    router.push({ pathname: '/', query: { query, page: newPage } });
  };

  return (
    <section className={styles.home_page} data-testid="home-page">
     <Search onSubmit={handleSearchSubmit} initialQuery={query} /> 
      <div className={styles.cards_list_page} data-testid="cards-list-page">
        <ul className={styles.cards_list}>
          {artList && artList.data && (
            <>
              <li className={styles.title} data-testid="cards-list-header">
                <h4>Image</h4>
                <h4>Author</h4>
                <h4>Name</h4>
              </li>
              {artList.data.map((data: IData) => (
                <Card {...data} key={data.id} />
              ))}
            </>
          )}
        </ul>
        {artList && artList.pagination && (
          <Pagination
            page={page}
            totalPages={artList.pagination.total_pages}
            onPageChange={handlePageChange}
            data-testid="pagination"
          />
        )}
      </div>
      {artwork && artwork.data && (
      <div className={styles.modal_wrapper} data-testid="artwork-modal">
          <ArtworkDetails artwork={artwork} />
      </div>
      )}
      <SelectedCards data-testid="selected-cards"/> 
    </section>
  );
}
