import styles from './style.module.scss';
import { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../Store/store';
import { cleanSelectedCards } from '../../Reducers/selectedCardsReducer';

export default function ModalSelectedCards() {
  const selectedCards = useSelector(
    (state: RootState) => state.selectedCards.data
  );
  const howManySelected = selectedCards.length;
  const dispatch = useDispatch();
  const linkRef = useRef<HTMLAnchorElement | null>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true); // Устанавливаем флаг, что код выполняется на клиенте
  }, []);

  const unselectAllCards = () => dispatch(cleanSelectedCards());

  const onDownloadFile = () => {
    if (!isClient) return; // Не выполняем на сервере

    const headers = ['name', 'artist', 'image_id', 'url'];
    const csvRows = selectedCards.map((card) => [
      card.id,
      card.artist_title,
      card.title,
      card.date_display,
      card.image_id,
      `https://www.artic.edu/iiif/2/${card.image_id}/full/843,/0/default.jpg`,
    ]);

    const csvContent = [
      headers.join(','),
      ...csvRows.map((row) => row.join(',')),
    ].join('\n');

    const csvFileBody = `data:text/csv;charset=utf-8,${encodeURIComponent(csvContent)}`;
    const linkElement = linkRef.current;

    if (linkElement) {
      linkElement.href = csvFileBody;
      linkElement.download = `${howManySelected}_artworks.csv`;
    }
  };
  if (!isClient) {
    return null; // На сервере возвращаем null
  }

  return (
    !!howManySelected && (
      <section className={styles.selecte_overlay} data-testid="selected-cards">
        <div className={styles.selected_content}>
          <h2 className={styles.selected_title}>
            Selected {selectedCards.length} cards
          </h2>
          <div className={styles.modal_actions}>
            <button onClick={unselectAllCards} className={styles. modal_action_button}>
              Unselect all
            </button>
            <a
              ref={linkRef}
              className={styles.modal_action_button}
              onClick={onDownloadFile}
            >
              Download
            </a>
          </div>
          <ul className={styles.selected_list}>
            {selectedCards.map((card) => (
              <li className={styles.selected_card} key={card.id}>
                <img
                  src={`https://www.artic.edu/iiif/2/${card.image_id}/full/843,/0/default.jpg`}
                  alt={card.title}
                  loading="lazy"
                  className={styles.img}
                />
                <h3>{card.artist_title}</h3>
                <h3>{card.title}</h3>
              </li>
            ))}
          </ul>
        </div>
      </section>
    )
  );
}
