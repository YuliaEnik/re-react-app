'use client';
import { useEffect, useState } from 'react';
import { CardModal, IModalCard } from '~/Components/CardModal/cardModal';
import { store } from '~/Store/store';
import { artworksApi } from '~/service/getApi';
import styles from './style.module.scss';

interface IArtworkDetails {
  artworkId: number;
  onClose: () => void;
}

export default function ArtworkDetails({ artworkId, onClose }: IArtworkDetails) {
  const [artwork, setArtwork] = useState<IModalCard | null>(null);


  useEffect(() => {
    const fetchArtwork = async () => {
      const result = await store.dispatch(
        artworksApi.endpoints.getArtworkDetails.initiate({
          id: artworkId,
          fields: 'id,title,artist_title,image_id,date_display,artwork_type_title,artist_display',
        })
      );

      if (result.data) {
        setArtwork(result.data.data);
      }
    };

    fetchArtwork();
  }, [artworkId]);

  if (!artwork) {
    return <p>Loading...</p>;
  }

  return (
    <div className={styles.modal_content} onClick={(event) => event.stopPropagation()}>
      <div className={styles.modal_header} data-testid="modal-header">
        <div className={styles.btn_modal} onClick={onClose} data-testid="close-modal-button">
          <p className={styles.btn_modal__img}>X</p>
        </div>
      </div>
      <div className={styles.modal_body} data-testid="modal-body">
        <CardModal {...artwork} />
      </div>
    </div>
  );
}
