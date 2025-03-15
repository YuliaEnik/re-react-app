import { CardForm } from '../../Components/CardForm/cardform';
import './style.scss';

export function Home(): JSX.Element {
  return (
    <div className="cards-page">
      <CardForm />
    </div>
  );
}
