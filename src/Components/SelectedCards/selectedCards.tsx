import './style.scss';

interface ISelectedProps {
  selectedCards: Array<{
    id: number;
    title: string;
    artist_title: string;
    image_id: string;
  }>;
  onUnselectAll: () => void;
  onDownload: () => void;
}

const SelectedCards: React.FC<ISelectedProps> = (props: ISelectedProps) => {
  return (
    <section className="selected-overlay">
      <div className="selected-content">
        <h2> Selected {props.selectedCards.length} cards </h2>
        <div className="modal-actions">
          <button onClick={props.onUnselectAll} className="modal-action-button">
            Unselect all
          </button>
          <button onClick={props.onDownload} className="modal-action-button">
            Download
          </button>
        </div>
        <ul className="selected-list">
          {props.selectedCards.map((card) => (
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
  );
};

export default SelectedCards;
