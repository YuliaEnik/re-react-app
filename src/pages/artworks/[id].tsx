import styles from './style.module.scss';
import { CardModal } from '../../Components/CardModal/cardModal';
import router from 'next/router';
import React from 'react';

export interface ArtworkDetailsProps {
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

export default function ArtworkDetails({ artwork }: ArtworkDetailsProps) {

  if (!artwork || !artwork.data) {
    return <p>No artwork data available</p>;
  }

  const artworkData = {
    ...artwork.data,
    date_display: artwork.data.date_display || 'Unknown',
    artwork_type_title: artwork.data.artwork_type_title || 'Unknown',
    artist_display: artwork.data.artist_display || 'Unknown',
  };

  const handleCloseModal = () => {
    router.push('/');
  };

  return (
    <div className={styles.modal_content} onClick={(event) => event.stopPropagation()}>
      <div className={styles.modal_header} data-testid="modal-header">
        <div className={styles.btn_modal} onClick={handleCloseModal} data-testid="close-modal-button">
          <p className={styles.btn_modal__img}>X</p>
        </div>
      </div>
      <div className={styles.modal_body} data-testid="modal-body">
       <CardModal {...artworkData} />
      </div>
    </div>
  );
}
