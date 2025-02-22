import './style.scss';
import { Search } from '../../Components/Search/search';
import { Card, IData } from '../../Components/Card/card';
import { Pagination } from '../../Components/Pagination/pagination';
import { useNavigate, useSearchParams } from 'react-router';
import {
  useGetAllArtworksQuery,
  useSearchArtworksQuery,
} from '../../service/getApi';
import { ModalPage } from '../ModalPage/modalPage';
import { setPage, setQuery } from '../../Store/slices';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../Store/store';
import { useEffect } from 'react';

export function HomePage(): JSX.Element {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { query, page } = useSelector((state: RootState) => state.search);
  const { isOpen } = useSelector((state: RootState) => state.modal);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const urlQuery = searchParams.get('query') || '';
    const urlPage = Number(searchParams.get('page')) || 1;

    if (urlQuery !== query) {
      dispatch(setQuery(urlQuery));
    }
    if (urlPage !== page) {
      dispatch(setPage(urlPage));
    }
  }, [dispatch, searchParams, query, page]);

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
    navigate(`?query=${searchValue}&page=${1}`);
  };

  const handlePageChange = (newPage: number) => {
    dispatch(setPage(newPage));
    navigate(`?query=${query}&page=${newPage}`);
  };

  return (
    <div className="home-page">
      <Search onSubmit={handleSearchSubmit} initialQuery={query} />
      <div className="cards-list-page">
        <ul className="cards-list">
          {(isAllLoading || isSearchLoading) && <p>Loading...</p>}
          {(isAllError || isSearchError) && <p>Error loading data</p>}
          {artList && artList.data && (
            <>
              <li className="title">
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
      {isOpen && <ModalPage />}
    </div>
  );
}
