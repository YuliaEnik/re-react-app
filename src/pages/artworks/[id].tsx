import styles from './style.module.scss';
import { CardModal } from '../../Components/CardModal/cardModal';
import { useGetArtworkDetailsQuery } from '../../service/getApi';
//import { useDispatch, useSelector } from 'react-redux';
//import { RootState } from '../../Store/store';
//import { closeModal } from '../../Actions/modalActions';
import { useRouter } from 'next/router';

export interface IModal {
  id: string;
  onClose: () => void;
}

export default function ArtworkDetails() {
  /* const dispatch = useDispatch();
  const { isOpen, id } = useSelector((state: RootState) => state.modal);
 */
  const router = useRouter();
  const { id } = router.query;

  const {
    data: artwork,
    isLoading,
    isError,
  } = useGetArtworkDetailsQuery(Number(id), {
    skip: !id,
  });

  /* const handleClose = () => {
    dispatch(closeModal());
  };
 */
  //if (!isOpen || !id) return null;

  if (isLoading) return <p>Loading...</p>;

  if (isError) return <p>Error loading artwork details</p>;

  if (!artwork || !artwork.data) return <p>No artwork data available</p>;

  return (
    /*     <>
      {artwork.data && ( */
    <div className={styles.modal_content} onClick={(event) => event.stopPropagation()}>
      <div className={styles.modal_header}>
        <div className={styles.btn_modal} onClick={() => router.back()}>
          <p className={styles.btn_modal__img}>X</p>
        </div>
      </div>
      <div className={styles.modal_body}>
        {isLoading && <p>Loading...</p>}
        {isError && <p>Error loading artwork details</p>}
        {artwork.data && <CardModal {...artwork.data} />}
      </div>
    </div>
    /* )}
    </> */
  );
}
