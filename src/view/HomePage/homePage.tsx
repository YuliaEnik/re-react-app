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
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../Store/store';
import { useEffect, useState } from 'react';
import { setPage, setQuery } from '../../Reducers/searchReducer';
import SelectedCards from '../../Components/SelectedCards/selectedCards';
import { toggleCard } from '../../Reducers/selectedCardsReducer';
import { downloadCsv } from '../../service/downloadCsv';

export function HomePage(): JSX.Element {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { query, page } = useSelector((state: RootState) => state.search);
  const { isOpen } = useSelector((state: RootState) => state.modal);
  const [searchParams] = useSearchParams();
  const [isSelectOpen, setIsSelectOpen] = useState(false);

  const selectedCards = useSelector(
    (state: RootState) => state.selectedCards.data
  );

  useEffect(() => {
    const urlQuery = searchParams.get('query') || '';
    const urlPage = Number(searchParams.get('page')) || 1;

    if (urlQuery !== query) {
      dispatch(setQuery(urlQuery));
    }
    if (urlPage !== page) {
      dispatch(setPage(urlPage));
    }

    if (selectedCards.length > 0) {
      setIsSelectOpen(true);
    } else {
      setIsSelectOpen(false);
    }
  }, [dispatch, searchParams, query, page, selectedCards]);

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

  const handleUnselectAll = () => {
    selectedCards.forEach((card) => {
      dispatch(toggleCard(card));
    });
  };

  const handleDownload = () => {
    downloadCsv(selectedCards);
  };

  return (
    <section className="home-page">
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
      <section className="modal-wrapper">{isOpen && <ModalPage />}</section>
      {isSelectOpen && (
        <SelectedCards
          selectedCards={selectedCards}
          onUnselectAll={handleUnselectAll}
          onDownload={handleDownload}
        />
      )}
    </section>
  );
}
