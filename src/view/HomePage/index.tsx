import { useEffect, useState } from 'react';
import { Search } from '../../Components/Search';
import { Card, IData } from '../../Components/Card';
import { ModalPage } from '../ModalPage';
import { CardModal, IModalCard } from '../../Components/CardModal';
import { getURL } from '../../service';
import { ErrorButton } from '../../Components/ErrorButton';
import './style.scss';

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

  const [searchValue, setSearchValue] = useState(
    localStorage.getItem('search') || ''
  );

  const [modalState, setModalState] = useState<IDataModal>({
    loading: false,
    repos: null,
  });

  const [isActive, setIsActive] = useState<boolean>(false);

  const getApi = async (): Promise<void> => {
    setAppState((prevState) => ({ ...prevState, loading: true, error: null }));
    try {
      const repos = await getURL(searchValue);
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
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
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
    getApi();
  }, []);

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

  return (
    <>
      <div className="cards-page">
        <Search
          search={searchValue}
          onChange={handleChange}
          onSubmit={handleSearch}
        />
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
