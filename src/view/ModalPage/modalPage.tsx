import './style.scss';
import { CardModal } from '../../Components/CardModal/cardModal';
import { useGetArtworkDetailsQuery } from '../../service/getApi';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../Store/store';
import { closeModal } from '../../Actions/modalActions';

export interface IModal {
  id: string;
  onClose: () => void;
}

const ModalPage: React.FC = () => {
  const dispatch = useDispatch();
  const { isOpen, id } = useSelector((state: RootState) => state.modal);

  const {
    data: artwork,
    isLoading,
    isError,
  } = useGetArtworkDetailsQuery(Number(id), {
    skip: !id,
  });

  const handleClose = () => {
    dispatch(closeModal());
  };

  if (!isOpen || !id) return null;

  if (isLoading) return <p>Loading...</p>;

  if (isError) return <p>Error loading artwork details</p>;

  if (!artwork || !artwork.data) return <p>No artwork data available</p>;

  return (
    <section className="modal-wrapper">
      {artwork.data && (
        <div
          className="modal-content"
          onClick={(event) => event.stopPropagation()}
        >
          <div className="modal-header">
            <div className="btn-modal" onClick={handleClose}>
              <p className="btn-modal__img">X</p>
            </div>
          </div>
          <div className="modal-body">
            {isLoading && <p>Loading...</p>}
            {isError && <p>Error loading artwork details</p>}
            {artwork.data && <CardModal {...artwork.data} />}
          </div>
        </div>
      )}
    </section>
  );
};

export { ModalPage };
