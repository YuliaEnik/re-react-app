import { useCallback, useEffect, useState } from 'react';
import { Search } from '../../Components/Search';
import { Card, IData } from '../../Components/Card';
import { ModalPage } from '../ModalPage';
import { CardModal, IModalCard } from '../../Components/CardModal';
import { getURL } from '../../service';
import { ErrorButton } from '../../Components/ErrorButton';
import './style.scss';
import { Pagination } from '../../Components/Pagination';
import { useSearchParams } from 'react-router-dom';

export interface IDataApi {
  loading?: boolean;
  repos?: IData[] | null;
  error?: string | null;
}

export interface IDataModal {
  loading?: boolean;
  repos?: IModalCard[] | null;
}

export function HomePage(): JSX.Element {
  const [appState, setAppState] = useState<IDataApi>({
    loading: false,
    repos: null,
    error: null,
  });
  const [, setSearchParams] = useSearchParams();

  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);

  const [searchValue, setSearchValue] = useState(
    localStorage.getItem('search') || ''
  );

  const [modalState, setModalState] = useState<IDataModal>({
    loading: false,
    repos: null,
  });

  const [isActive, setIsActive] = useState<boolean>(false);

  const getApi = useCallback(async (): Promise<void> => {
    setAppState((prevState) => ({ ...prevState, loading: true, error: null }));
    try {
      const repos = await getURL(page, searchValue);
      const total = repos.pagination.total_pages;
      setTotalPages(total);
      if (repos && repos.data) {
        setAppState((prevState) => ({
          ...prevState,
          loading: false,
          repos: repos.data,
          error: null,
        }));
      } else {
        throw new Error('Something go wrong');
      }
    } catch (error) {
      setAppState((prevState) => ({
        ...prevState,
        loading: false,
        error: error instanceof Error ? error.message : 'Something go wrong',
      }));
    }
  }, [searchValue, page]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setPage(1);
    localStorage.setItem('search', searchValue);
    setAppState((prevState) => ({
      ...prevState,
      loading: true,
      repos: null,
      error: null,
    }));
    getApi();
  };

  useEffect(() => {
    setAppState((prevState) => ({ ...prevState, loading: true, error: null }));
    setSearchParams({ page: page.toString() });
    getApi();
  }, [getApi, setSearchParams, page]);

  const openModal = (id: number) => {
    setIsActive(true);
    showDataModal(id);
  };
  const closeModal = () => {
    setIsActive(false);
  };

  const showDataModal = (id: number) => {
    setModalState({ loading: true });
    const apiUrl = `https://api.artic.edu/api/v1/artworks/${id}`;
    fetch(apiUrl)
      .then((res) => res.json())
      .catch((error) => console.log(error))
      .then((repos) => {
        setModalState({ loading: false, repos: repos.data });
        console.log(repos.data);
      });
  };

  const handlePageChange = (page: number) => {
    setSearchParams({ page: page.toString() });
    setPage(page);
  };

  return (
    <>
      <div className="home-page">
        <Search
          search={searchValue}
          onChange={handleChange}
          onSubmit={handleSearch}
        />
        <div className="cards-list-page">
          <ul className="cards-list">
            {appState.loading && <p className="loading">Loading...</p>}
            {appState.repos && (
              <>
                <li className="cards-list_row title">
                  <h4>Image</h4>
                  <h4>Author</h4>
                  <h4>Name</h4>
                </li>
                {appState.repos.map((data: IData) => (
                  <Card
                    {...data}
                    key={data.id}
                    onClick={() => openModal(data.id)}
                  />
                ))}
              </>
            )}
          </ul>
          <Pagination
            page={page}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
        <ModalPage isActive={isActive} closeModal={closeModal}>
          {modalState.loading && <p className="loading">Loading...</p>}
          {modalState.repos && (
            <CardModal
              id={0}
              title={''}
              artist_title={''}
              date_display={''}
              image_id={''}
              artwork_type_title={''}
              artist_display={''}
              {...modalState.repos}
            />
          )}
        </ModalPage>
      </div>
      <ErrorButton />
    </>
  );
}
