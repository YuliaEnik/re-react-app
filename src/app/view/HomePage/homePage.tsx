'use client';
import styles from './style.module.scss';
import React, { useState } from 'react';
import { setPage, setQuery } from '~/Reducers/searchReducer';
import { Search } from '~/Components/Search/search';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { Card } from '~/Components/Card/card';
import { Pagination } from '~/Components/Pagination/pagination';
import ArtworkDetails from '~/app/artworks/page';
import SelectedCards from '~/Components/SelectedCards/selectedCards';
import { IData } from '~/Data';
import { IModalCard } from '~/Components/CardModal/cardModal';

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
  artwork: IModalCard | null;
}

export default function HomePage({
  allArtworks,
  searchResults,
  query,
  page,
}: HomePageProps): JSX.Element {
  const router = useRouter();
  const dispatch = useDispatch();
  const [artworkId, setArtworkId] = useState<number | null>(null);

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
    router.push(`/?query=${searchValue}&page=1`);
  };

  const handlePageChange = (newPage: number) => {
    dispatch(setPage(newPage));
    router.push(`/?query=${query}&page=${newPage}`);
  };
  const handleCardClick = (id: number) => {
    setArtworkId(id);
  };

  const handleCloseModal = () => {
    setArtworkId(null);
  };

  return (
    <section className={styles.home_page} data-testid="home-page">
      <div className={styles.control}>
      <Search onSubmit={handleSearchSubmit} initialQuery={query} /> 
      {artList && artList.pagination && (
          <Pagination
            page={page}
            totalPages={artList.pagination.total_pages}
            onPageChange={handlePageChange}
            data-testid="pagination"
          />
        )}
        
      </div>
      <section className={styles.cards_list_page} data-testid="cards-list-page">
        <ul className={styles.cards_list}>
          {artList && artList.data && (
            <>
              <li className={styles.title} data-testid="cards-list-header">
                <h4>Image</h4>
                <h4>Author</h4>
                <h4>Name</h4>
              </li>
              {artList.data.map((data: IData) => (
                <Card {...data} key={data.id} onClick={() => handleCardClick(data.id)}/>
              ))}
            </>
          )}
        </ul>
      </section>
      <section className={styles.modal_wrapper} data-testid="artwork-modal">
      {artworkId && (
          <ArtworkDetails artworkId={artworkId}
            onClose={handleCloseModal}/>
          )}
      </section>
      <section className={styles.selected_overlay} data-testid="selected-cards">
      <SelectedCards data-testid="selected-cards"/> 
      </section>
    </section>
  );
}
