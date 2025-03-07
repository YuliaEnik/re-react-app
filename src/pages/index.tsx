import styles from '../view/HomePage/style.module.scss';
import React, { JSX } from 'react';
import { Search } from '../Components/Search/search';
import { Card, IData } from '../Components/Card/card';
import { Pagination } from '../Components/Pagination/pagination';
import { useRouter } from 'next/router';
import {
  useGetAllArtworksQuery,
  useSearchArtworksQuery,
} from '../service/getApi';
//import { ModalPage } from '../view/ModalPage/modalPage';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../Store/store';
import { setPage, setQuery } from '../Reducers/searchReducer';
import SelectedCards from '../Components/SelectedCards/selectedCards';
import ArtworkDetails from './artworks/[id]';
//import { toggleCard } from '../../Reducers/selectedCardsReducer';
//import { downloadCsv } from '../../service/downloadCsv';

export default function HomePage(): JSX.Element {
  const router = useRouter();
  const dispatch = useDispatch();
  const { query, page } = useSelector((state: RootState) => state.search);
  //const { isOpen } = useSelector((state: RootState) => state.modal);
  //const [searchParams] = useSearchParams();
  //const [isSelectOpen, setIsSelectOpen] = useState(false);

  React.useEffect(() => {
    const urlQuery = (router.query.query as string) || '';
    const urlPage = Number(router.query.page as string) || 1;

    if (urlQuery !== query) {
      dispatch(setQuery(urlQuery));
    }
    if (urlPage !== page) {
      dispatch(setPage(urlPage));
    }
  }, [router.query, dispatch, query, page]);

  const {
    data: allArtworks,
    isLoading: isAllLoading,
    isError: isAllError,
  } = useGetAllArtworksQuery(page, { skip: !!query });

  const {
    data: searchResults,
    isLoading: isSearchLoading,
    isError: isSearchError,
  } = useSearchArtworksQuery({ query, page }, { skip: !query });

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
    <section className={styles.home_page}>
      <Search onSubmit={handleSearchSubmit} initialQuery={query} />
      <div className={styles.cards_list_page}>
        <ul className={styles.cards_list}>
          {(isAllLoading || isSearchLoading) && <p>Loading...</p>}
          {(isAllError || isSearchError) && <p>Error loading data</p>}
          {artList && artList.data && (
            <>
              <li className={styles.title}>
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
          />
        )}
      </div>
      <section className={styles.modal_wrapper}>
        {/* {isOpen && <ModalPage />} */}
        <ArtworkDetails />
      </section>
      <SelectedCards />
    </section>
  );
}
