import './style.scss';
import { useRef } from 'react';
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

  const unselectAllCards = () => dispatch(cleanSelectedCards());

  const ondownloadFile = () => {
    const headers = ['name', 'artist', 'image_id', 'url'];
    const csvRows = selectedCards.map((card) => [
      card.title,
      card.artist_title,
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

  return (
    !!howManySelected && (
      <section className="selected-overlay">
        <div className="selected-content">
          <h2 className="selected-title">
            Selected {selectedCards.length} cards
          </h2>
          <div className="modal-actions">
            <button onClick={unselectAllCards} className="modal-action-button">
              Unselect all
            </button>
            <a
              ref={linkRef}
              className="modal-action-button"
              onClick={ondownloadFile}
            >
              Download
            </a>
          </div>
          <ul className="selected-list">
            {selectedCards.map((card) => (
              <li className="selected-card" key={card.id}>
                <img
                  src={`https://www.artic.edu/iiif/2/${card.image_id}/full/843,/0/default.jpg`}
                  alt={card.title}
                  loading="lazy"
                  className="img"
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
